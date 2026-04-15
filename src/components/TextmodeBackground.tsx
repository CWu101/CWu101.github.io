import { useEffect, useRef, useState } from "react";
import { textmode } from "textmode.js";

function getFontSize() {
  return 6;
}

export function TextmodeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let hasRevealed = false;
    const canvas = document.createElement("canvas");
    canvas.className = "textmode-canvas";
    mount.appendChild(canvas);

    const tm = textmode.create({
      canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      fontSize: getFontSize(),
      frameRate: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 16 : 30,
    });

    tm.windowResized(() => {
      tm.resizeCanvas(window.innerWidth, window.innerHeight);
      tm.fontSize(getFontSize());
    });

    tm.draw(() => {
      const grid = tm.grid;
      if (!grid) {
        return;
      }

      if (!hasRevealed) {
        hasRevealed = true;
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      }

      tm.background(0);

      const time = tm.frameCount * 0.02;

      for (let gridY = 0; gridY < grid.rows; gridY += 1) {
        for (let gridX = 0; gridX < grid.cols; gridX += 1) {
          const nx = gridX / grid.cols;
          const ny = gridY / grid.rows;

          const plasma1 = Math.sin(nx * 8 + time);
          const plasma2 = Math.sin(ny * 6 + time * 1.3);
          const plasma3 = Math.sin((nx + ny) * 4 + time * 0.8);
          const plasma4 = Math.sin(Math.sqrt(nx * nx + ny * ny) * 12 + time * 1.5);

          const combined = (plasma1 + plasma2 + plasma3 + plasma4) / 4;
          const intensity = (combined + 1) / 2;
          const tone = Math.round(35 + intensity * 220);

          if (intensity > 0.8) {
            tm.char("█");
          } else if (intensity > 0.6) {
            tm.char("▓");
          } else if (intensity > 0.4) {
            tm.char("▒");
          } else if (intensity > 0.2) {
            tm.char("░");
          } else if (intensity > 0.1) {
            tm.char("·");
          } else {
            tm.char(" ");
          }

          tm.charColor(tone, tone, tone);
          tm.cellColor(0, 0, 0);

          const x = gridX + 1 - grid.cols / 2;
          const y = gridY - grid.rows / 2;

          tm.push();
          tm.translate(x, y, 0);
          tm.rect(1, 1);
          tm.pop();
        }
      }
    });

    return () => {
      tm.destroy();
      mount.replaceChildren();
    };
  }, []);

  return (
    <div className={`textmode-background${isReady ? " is-ready" : ""}`} ref={mountRef} />
  );
}
