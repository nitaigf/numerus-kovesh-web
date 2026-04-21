import { onCleanup, onMount } from "solid-js";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  velocity: number;
}

export default function StarfieldCanvas() {
  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    const canvas = canvasRef;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.max(80, Math.floor((canvas.width * canvas.height) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        velocity: Math.random() * 0.012 + 0.003,
      }));
    };

    const drawNebula = () => {
      const gradient = context.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.15,
        0,
        canvas.width * 0.2,
        canvas.height * 0.15,
        canvas.width * 0.8,
      );
      gradient.addColorStop(0, "rgba(77, 126, 255, 0.22)");
      gradient.addColorStop(0.45, "rgba(32, 79, 180, 0.12)");
      gradient.addColorStop(1, "rgba(1, 8, 18, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const accent = context.createRadialGradient(
        canvas.width * 0.78,
        canvas.height * 0.24,
        0,
        canvas.width * 0.78,
        canvas.height * 0.24,
        canvas.width * 0.45,
      );
      accent.addColorStop(0, "rgba(125, 219, 255, 0.16)");
      accent.addColorStop(1, "rgba(1, 8, 18, 0)");
      context.fillStyle = accent;
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();

      for (const star of stars) {
        star.alpha += star.velocity;
        if (star.alpha >= 0.95 || star.alpha <= 0.18) {
          star.velocity *= -1;
        }

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(228, 243, 255, ${star.alpha})`;
        context.shadowBlur = 10;
        context.shadowColor = "rgba(163, 219, 255, 0.42)";
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    onCleanup(() => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    });
  });

  return <canvas ref={canvasRef} class="starfield" aria-hidden="true" />;
}