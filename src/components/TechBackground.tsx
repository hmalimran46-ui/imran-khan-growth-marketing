import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for digital marketing intelligence network (subtle, slow, luxury green)
    const particleCount = Math.min(Math.floor(width / 32), 42);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
      colorType: 'emerald' | 'electric' | 'forest' | 'gold';
    }> = [];

    const colors = {
      emerald: 'rgba(16, 185, 129, ',
      electric: 'rgba(0, 245, 155, ',
      forest: 'rgba(5, 150, 105, ',
      gold: 'rgba(245, 158, 11, ',
    };

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const colorType: 'emerald' | 'electric' | 'forest' | 'gold' =
        typeRand > 0.88 ? 'gold' : typeRand > 0.55 ? 'electric' : typeRand > 0.25 ? 'emerald' : 'forest';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle digital network connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 145;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `${colors[p1.colorType]}${alpha})`);
            grad.addColorStop(1, `${colors[p2.colorType]}${alpha * 0.4})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw particle node
        const currentAlpha = p1.baseAlpha * (0.75 + 0.25 * Math.sin(time * p1.pulseSpeed + p1.pulseOffset));
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${colors[p1.colorType]}${currentAlpha})`;
        ctx.fill();

        // Subtle outer glow for larger key data nodes
        if (p1.radius > 1.6) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `${colors[p1.colorType]}${currentAlpha * 0.16})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020805]" aria-hidden="true">
      {/* 1. Deep Forest Charcoal Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_-20%,rgba(6,78,59,0.35),rgba(2,8,5,1))]" />

      {/* 2. Atmospheric Emerald & Electric Green Light Blooms */}
      <motion.div
        animate={{
          scale: [1, 1.12, 0.96, 1],
          opacity: [0.2, 0.32, 0.2],
          x: [0, 25, -20, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[8%] w-[650px] md:w-[900px] h-[550px] md:h-[750px] bg-[#064e3b]/40 rounded-full blur-[170px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.15, 1.1],
          opacity: [0.12, 0.24, 0.12],
          x: [0, -35, 25, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[28%] right-[-5%] w-[500px] md:w-[750px] h-[500px] md:h-[700px] bg-[#059669]/25 rounded-full blur-[180px]"
      />

      {/* 3. Subtle Electric Green Highlight Accent */}
      <motion.div
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[58%] left-[-10%] w-[450px] md:w-[650px] h-[450px] md:h-[650px] bg-[#00f59b]/15 rounded-full blur-[160px]"
      />

      {/* 4. Luxury Warm Gold Accent Flare (Marketing conversion & revenue signal) */}
      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[20%] w-[350px] md:w-[500px] h-[350px] md:h-[450px] bg-[#d97706]/15 rounded-full blur-[150px]"
      />

      {/* 5. Precision Technical Digital Marketing Grid & Coordinate Matrix */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="emerald-tech-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#10b981" strokeWidth="0.6" strokeDasharray="3 6" />
              <circle cx="0" cy="0" r="1.2" fill="#00f59b" />
              <circle cx="80" cy="80" r="0.8" fill="#34d399" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#emerald-tech-grid)" />
        </svg>
      </div>

      {/* 6. Abstract Digital Marketing Growth Curves (Ascending ROI & Traffic Vectors) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="growth-curve-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" stopOpacity="0" />
            <stop offset="40%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#00f59b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="growth-curve-conversion" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" stopOpacity="0" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -100,600 C 300,580 500,420 800,340 C 1100,260 1400,120 1900,40"
          fill="none"
          stroke="url(#growth-curve-emerald)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M -50,750 C 350,700 650,540 950,420 C 1250,300 1550,180 2000,80"
          fill="none"
          stroke="url(#growth-curve-conversion)"
          strokeWidth="1.2"
          strokeDasharray="12 8"
          animate={{ strokeDashoffset: [0, -250] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* 7. Subtle Background Marketing Analytics Indicator Stream (Right Side Top) */}
      <div className="absolute top-[12%] right-[6%] hidden xl:flex flex-col gap-2.5 opacity-[0.08] pointer-events-none font-mono text-[10px] text-emerald-400">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ALGORITHM_METRICS_ACTIVE</span>
        </div>
        <div className="w-36 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-emerald-400" />
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-400">
          <span>ROAS INDEX</span>
          <span>99.4%</span>
        </div>
      </div>

      {/* 8. Interactive & Ambient Canvas Node Network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* 9. Center Negative Space & Vignette Depth Mask (Ensures Crystal-Clear Headline Readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020805]/30 to-[#020805] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,8,5,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
