import React, { useEffect, useRef } from "react";

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const maxConfettis = 150;
    const particles: Particle[] = [];

    const possibleColors = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ];

    interface Particle {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
      draw: () => void;
    }

    function randomFromTo(from: number, to: number) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function confettiParticle(): Particle {
      const particle: Particle = {
        x: Math.random() * W, // x
        y: Math.random() * H - H, // y
        r: randomFromTo(11, 33), // radius
        d: Math.random() * maxConfettis + 11,
        color:
          possibleColors[Math.floor(Math.random() * possibleColors.length)],
        tilt: Math.floor(Math.random() * 33) - 11,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        draw: function () {
          context.beginPath();
          context.lineWidth = this.r / 2;
          context.strokeStyle = this.color;
          context.moveTo(this.x + this.tilt + this.r / 3, this.y);
          context.lineTo(
            this.x + this.tilt,
            this.y + this.tilt + this.r / 5
          );
          context.stroke();
        },
      };
      return particle;
    }

    function Draw() {
      requestAnimationFrame(Draw);

      context.clearRect(0, 0, W, H);

      for (let i = 0; i < maxConfettis; i++) {
        particles[i].draw();
      }

      let particle: Particle;
      let remainingFlakes = 0;
      for (let i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        if (
          particle.x > W + 30 ||
          particle.x < -30 ||
          particle.y > H
        ) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }
    }

    window.addEventListener("resize", () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });

    for (let i = 0; i < maxConfettis; i++) {
      particles.push(confettiParticle());
    }

    canvas.width = W;
    canvas.height = H;
    Draw();

    return () => {
      // Cleanup on component unmount
      window.removeEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} />;
};

export default Confetti;
