"use client";

import React, { useEffect, useRef } from "react";

interface InteractiveEngineeringBackgroundProps {
  variant?: "light" | "dark";
  isFixed?: boolean;
  className?: string;
}

/**
 * InteractiveEngineeringBackground
 * Lienzo cinético con física vectorial y ondas armónicas.
 * - Modo "light": Líneas en grafito/azul para fondos claros.
 * - Modo "dark": Malla topológica en BLANCO puro luminoso y pulsos blancos para fondos azules/oscuros.
 */
export const InteractiveEngineeringBackground: React.FC<InteractiveEngineeringBackgroundProps> = ({
  variant = "light",
  isFixed = true,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const isDark = variant === "dark";

    // Densidad de píxeles
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    // Parámetros del retículo
    const SPACING = isDark ? 48 : 54;
    let cols = 0;
    let rows = 0;

    interface NodePoint {
      x0: number;
      y0: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      originAlpha: number;
      alpha: number;
      col: number;
      row: number;
    }

    interface DataPulse {
      fromCol: number;
      fromRow: number;
      toCol: number;
      toRow: number;
      progress: number;
      speed: number;
      color: string;
    }

    let nodes: NodePoint[] = [];
    let pulses: DataPulse[] = [];

    const resize = () => {
      if (!canvas || !container) return;
      const rect = isFixed
        ? { width: window.innerWidth, height: window.innerHeight }
        : container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform antes de escalar
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;
      nodes = [];
      pulses = [];

      const baseAlpha = isDark ? 0.22 : 0.12;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = c * SPACING - SPACING / 2;
          const y0 = r * SPACING - SPACING / 2;
          nodes.push({
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
            originAlpha: baseAlpha,
            alpha: baseAlpha,
            col: c,
            row: r,
          });
        }
      }
    };

    // Física del cursor
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: isDark ? 190 : 170,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isFixed) {
        mouse.targetX = clientX;
        mouse.targetY = clientY;
      } else {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = clientX - rect.left;
        mouse.targetY = clientY - rect.top;
      }
    };

    const handlePointerLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("resize", resize);

    resize();

    // Generador de pulsos de transacciones
    const spawnPulse = () => {
      if (nodes.length === 0 || pulses.length > (isDark ? 14 : 10)) return;
      const randomCol = Math.floor(Math.random() * (cols - 1));
      const randomRow = Math.floor(Math.random() * (rows - 1));
      const isHorizontal = Math.random() > 0.5;

      pulses.push({
        fromCol: randomCol,
        fromRow: randomRow,
        toCol: isHorizontal ? randomCol + 1 : randomCol,
        toRow: isHorizontal ? randomRow : randomRow + 1,
        progress: 0,
        speed: 0.025 + Math.random() * 0.035,
        color: isDark
          ? Math.random() > 0.35
            ? "#ffffff" // Blanco puro
            : "#38bdf8" // Cian cielo brillante
          : Math.random() > 0.35
          ? "#2563eb"
          : "#059669",
      });
    };

    let pulseInterval = setInterval(spawnPulse, isDark ? 450 : 600);

    let time = 0;

    const render = () => {
      time += 0.016;

      // Suavizado del puntero con interpolación lineal
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Resplandor de linterna interactiva al pasar el mouse
      if (mouse.x > -500 && mouse.x < width + 500 && mouse.y > -500 && mouse.y < height + 500) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.4
        );
        if (isDark) {
          mouseGlow.addColorStop(0, "rgba(255, 255, 255, 0.09)");
          mouseGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.04)");
          mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          mouseGlow.addColorStop(0, "rgba(37, 99, 235, 0.07)");
          mouseGlow.addColorStop(0.5, "rgba(59, 130, 246, 0.025)");
          mouseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        }
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 1. Actualización de física en cada nodo
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const waveX = Math.sin(time * 0.7 + n.y0 * 0.012) * 3.5;
        const waveY = Math.cos(time * 0.8 + n.x0 * 0.012) * 3.5;

        const dx = mouse.x - (n.x0 + waveX);
        const dy = mouse.y - (n.y0 + waveY);
        const dist = Math.sqrt(dx * dx + dy * dy);

        let forceX = 0;
        let forceY = 0;
        let targetAlpha = n.originAlpha;

        if (dist < mouse.radius) {
          const power = 1 - dist / mouse.radius;
          forceX = -dx * power * 0.3;
          forceY = -dy * power * 0.3;
          targetAlpha = isDark ? 0.25 + power * 0.65 : 0.12 + power * 0.55;
        }

        const targetX = n.x0 + waveX + forceX;
        const targetY = n.y0 + waveY + forceY;

        n.x += (targetX - n.x) * 0.12;
        n.y += (targetY - n.y) * 0.12;
        n.alpha += (targetAlpha - n.alpha) * 0.1;
      }

      // 2. Dibujo de las líneas de la topología (EN BLANCO PARA MODO DARK)
      ctx.lineWidth = isDark ? 0.95 : 0.85;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const currentIdx = r * cols + c;
          const currentNode = nodes[currentIdx];
          if (!currentNode) continue;

          // Conexión horizontal
          if (c < cols - 1) {
            const rightNode = nodes[currentIdx + 1];
            if (rightNode) {
              const edgeAlpha = Math.max(currentNode.alpha, rightNode.alpha) * (isDark ? 0.8 : 0.65);
              if (isDark) {
                // BLANCO PURO con alpha dinámico
                ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`;
              } else {
                ctx.strokeStyle = `rgba(148, 163, 184, ${edgeAlpha})`;
              }
              ctx.beginPath();
              ctx.moveTo(currentNode.x, currentNode.y);
              ctx.lineTo(rightNode.x, rightNode.y);
              ctx.stroke();
            }
          }

          // Conexión vertical
          if (r < rows - 1) {
            const bottomNode = nodes[(r + 1) * cols + c];
            if (bottomNode) {
              const edgeAlpha = Math.max(currentNode.alpha, bottomNode.alpha) * (isDark ? 0.8 : 0.65);
              if (isDark) {
                // BLANCO PURO con alpha dinámico
                ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`;
              } else {
                ctx.strokeStyle = `rgba(148, 163, 184, ${edgeAlpha})`;
              }
              ctx.beginPath();
              ctx.moveTo(currentNode.x, currentNode.y);
              ctx.lineTo(bottomNode.x, bottomNode.y);
              ctx.stroke();
            }
          }
        }
      }

      // 3. Dibujo de pulsos transaccionales en tiempo real
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const fromIdx = pulse.fromRow * cols + pulse.fromCol;
        const toIdx = pulse.toRow * cols + pulse.toCol;
        const fromNode = nodes[fromIdx];
        const toNode = nodes[toIdx];

        if (fromNode && toNode) {
          const curX = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
          const curY = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, isDark ? 2.5 : 2.2, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = isDark ? 10 : 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 4. Dibujo de vértices / nodos (EN BLANCO PARA MODO DARK)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.alpha <= 0.05) continue;

        ctx.beginPath();
        const isHovered = n.alpha > (isDark ? 0.35 : 0.25);
        const radius = isHovered ? 2.3 : 1.35;
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);

        if (isDark) {
          if (isHovered) {
            // Nodo blanco brillante resplandeciente
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(n.alpha * 1.5, 1)})`;
            ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${n.alpha * 1.1})`;
            ctx.fill();
          }
        } else {
          if (isHovered) {
            ctx.fillStyle = `rgba(37, 99, 235, ${n.alpha * 1.4})`;
          } else {
            ctx.fillStyle = `rgba(100, 116, 139, ${n.alpha})`;
          }
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
        clearInterval(pulseInterval);
      } else {
        pulseInterval = setInterval(spawnPulse, isDark ? 450 : 600);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(pulseInterval);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [variant, isFixed]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`${
        isFixed ? "fixed inset-0" : "absolute inset-0"
      } pointer-events-none z-0 overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
      {variant === "light" && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/20 to-slate-50/60 pointer-events-none" />
      )}
      {variant === "dark" && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40 pointer-events-none" />
      )}
    </div>
  );
};
