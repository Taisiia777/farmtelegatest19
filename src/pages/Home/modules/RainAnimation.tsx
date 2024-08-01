import React, { useEffect, useRef } from 'react';

const RainAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const mouse = { X: 0, Y: 0 };
    window.onmousemove = (event) => {
      mouse.X = event.clientX;
      mouse.Y = event.clientY;
    };

    const particules: any[] = [];
    const gouttes: any[] = [];
    const nombrebase = 5;
    const nombreb = 2;

    const controls = {
      rain: 2,
      Object: 'Nothing',
      alpha: 1,
      color: 200,
      auto: false,
      opacity: 1,
      saturation: 100,
      lightness: 50,
      back: 100,
      red: 0,
      green: 0,
      blue: 0,
      multi: false,
      speed: 2,
    };

    const Rain = (X: number, Y: number, nombre: number = nombreb) => {
      while (nombre--) {
        particules.push({
          vitesseX: Math.random() * 0.25,
          vitesseY: Math.random() * 9 + 1,
          X: X,
          Y: Y,
          alpha: 1,
          couleur: `hsla(${controls.color}, ${controls.saturation}%, ${controls.lightness}%, ${controls.opacity})`,
        });
      }
    };

    const explosion = (X: number, Y: number, couleur: string, nombre: number = nombrebase) => {
      while (nombre--) {
        gouttes.push({
          vitesseX: Math.random() * 4 - 2,
          vitesseY: Math.random() * -4,
          X: X,
          Y: Y,
          radius: 0.65 + Math.floor(Math.random() * 1.6),
          alpha: 1,
          couleur: couleur,
        });
      }
    };

    const rendu = () => {
      ctx.clearRect(0, 0, width, height);

      if (controls.multi) {
        controls.color = Math.random() * 360;
      }

      ctx.save();

      particules.forEach((particule) => {
        ctx.globalAlpha = particule.alpha;
        ctx.fillStyle = particule.couleur;
        ctx.fillRect(particule.X, particule.Y, particule.vitesseY / 4, particule.vitesseY);
      });

      gouttes.forEach((goutte) => {
        ctx.globalAlpha = goutte.alpha;
        ctx.fillStyle = goutte.couleur;
        ctx.beginPath();
        ctx.arc(goutte.X, goutte.Y, goutte.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      if (controls.Object === 'Umbrella') {
        ctx.beginPath();
        ctx.arc(mouse.X, mouse.Y + 10, 138, Math.PI, 2 * Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'hsla(0,100%,100%,1)';
        ctx.stroke();
      }
      if (controls.Object === 'Cup') {
        ctx.beginPath();
        ctx.arc(mouse.X, mouse.Y + 10, 143, Math.PI, 2 * Math.PI, true);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'hsla(0,100%,100%,1)';
        ctx.stroke();
      }
      if (controls.Object === 'Circle') {
        ctx.beginPath();
        ctx.arc(mouse.X, mouse.Y + 10, 138, Math.PI, 3 * Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'hsla(0,100%,100%,1)';
        ctx.stroke();
      }
      ctx.restore();

      if (controls.auto) {
        controls.color += controls.speed;
        if (controls.color >= 360) {
          controls.color = 0;
        }
      }
    };

    const update = () => {
      particules.forEach((particule, i) => {
        particule.X += particule.vitesseX;
        particule.Y += particule.vitesseY + 5;
        if (particule.Y > height - 15) {
          particules.splice(i, 1);
          explosion(particule.X, particule.Y, particule.couleur);
        }

        const umbrella =
          (particule.X - mouse.X) * (particule.X - mouse.X) + (particule.Y - mouse.Y) * (particule.Y - mouse.Y);
        if (controls.Object === 'Umbrella' && umbrella < 20000 && umbrella > 10000 && particule.Y < mouse.Y) {
          explosion(particule.X, particule.Y, particule.couleur);
          particules.splice(i, 1);
        }
        if (controls.Object === 'Cup' && umbrella > 20000 && umbrella < 30000 && particule.X + 138 > mouse.X && particule.X - 138 < mouse.X && particule.Y > mouse.Y) {
          explosion(particule.X, particule.Y, particule.couleur);
          particules.splice(i, 1);
        }
        if (controls.Object === 'Circle' && umbrella < 20000) {
          explosion(particule.X, particule.Y, particule.couleur);
          particules.splice(i, 1);
        }
      });

      gouttes.forEach((goutte, i) => {
        goutte.X += goutte.vitesseX;
        goutte.Y += goutte.vitesseY;
        goutte.radius -= 0.075;
        if (goutte.alpha > 0) {
          goutte.alpha -= 0.005;
        } else {
          goutte.alpha = 0;
        }
        if (goutte.radius < 0) {
          gouttes.splice(i, 1);
        }
      });

      let i = controls.rain;
      while (i--) {
        Rain(Math.floor(Math.random() * width), -15);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      update();
      rendu();
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }} />;
};

export default RainAnimation;
