import { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colors = theme === 'light'
      ? ['#315eff', '#426bff', '#6960db', '#9356b8']
      : ['#638cff', '#82a5ff', '#9683ef', '#b184da'];
    const pointer = { x: 0, y: 0, active: false };
    const center = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let disposed = false;

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.lineCap = 'round';

      center.x = width * 0.56;
      center.y = height * 0.48;
      const spacing = Math.max(25, Math.sqrt(width * height / 1800));
      const columns = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      particles = Array.from({ length: columns * rows }, (_, index) => {
        const x = (index % columns + 0.1 + Math.random() * 0.8) * spacing;
        const y = (Math.floor(index / columns) + 0.1 + Math.random() * 0.8) * spacing;
        const phase = Math.random() * Math.PI * 2;
        const violetWeight = Math.exp(-(((x / width - 0.08) / 0.38) ** 2 + ((y / height - 0.9) / 0.42) ** 2));
        const purple = Math.random() < violetWeight;
        return {
          x,
          y,
          phase,
          size: 0.2 + Math.random() ** 2 * 0.55,
          scale: 0.5 + Math.random() ** 2 * 3.5,
          opacity: 0.35 + Math.random() * 0.55,
          color: colors[purple ? (phase > 4.5 ? 3 : 2) : (phase > 4.5 ? 1 : 0)],
        };
      });
      draw(0);
    }

    function draw(delta) {
      context.clearRect(0, 0, width, height);
      elapsed += delta;

      // Ease the invisible ring toward the pointer, or let it wander when idle.
      const interactive = pointer.active && !motionQuery.matches;
      const targetX = interactive ? pointer.x : width * (0.56 + Math.sin(elapsed * 0.13) * 0.08);
      const targetY = interactive ? pointer.y : height * (0.48 + Math.sin(elapsed * 0.17) * 0.08);
      const easing = 1 - Math.exp(-delta * 1.2);
      center.x += (targetX - center.x) * easing;
      center.y += (targetY - center.y) * easing;
      const radius = Math.min(width * 0.65, height * 0.43) * (1 + Math.sin(elapsed * 0.45) * 0.16);
      const ringWidth = Math.max(1, radius * 0.23);

      for (const particle of particles) {
        const dx = particle.x - center.x;
        const dy = particle.y - center.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.exp(-(((distance - radius) / ringWidth) ** 2));
        const angle = Math.atan2(dy, dx) + Math.sin(elapsed * 0.3 + particle.phase) * 0.18;
        const x = particle.x + Math.sin(elapsed * 0.4 + particle.phase) * 2 + Math.cos(angle) * influence * 4;
        const y = particle.y + Math.cos(elapsed * 0.35 + particle.phase) * 2 + Math.sin(angle) * influence * 4;
        const edgeFade = Math.max(0, Math.min(1,
          particle.x / 55, (width - particle.x) / 55,
          particle.y / 55, (height - particle.y) / 55,
        ));
        const length = particle.size + influence * particle.scale;

        context.strokeStyle = particle.color;
        context.globalAlpha = particle.opacity * (0.5 + influence * 0.5) * edgeFade;
        context.lineWidth = Math.max(0.4, length * 0.45);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(
          x + Math.cos(angle) * length,
          y + Math.sin(angle) * length,
        );
        context.stroke();
      }
    }

    function animate(time) {
      if (disposed || motionQuery.matches || document.hidden) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      draw(delta);
      frame = window.requestAnimationFrame(animate);
    }

    function syncAnimation() {
      window.cancelAnimationFrame(frame);
      previousTime = 0;
      if (!motionQuery.matches && !document.hidden) {
        frame = window.requestAnimationFrame(animate);
      } else {
        draw(0);
      }
    }

    function movePointer(event) {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function clearPointer() {
      pointer.active = false;
    }

    resize();
    syncAnimation();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', clearPointer);
    window.addEventListener('blur', clearPointer);
    document.addEventListener('visibilitychange', syncAnimation);
    motionQuery.addEventListener('change', syncAnimation);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      document.documentElement.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('blur', clearPointer);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionQuery.removeEventListener('change', syncAnimation);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />;
}
