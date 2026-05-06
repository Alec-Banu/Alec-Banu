const canvas = document.getElementById("dot-canvas");
const ctx = canvas.getContext("2d");

let mouse = { x: -1000, y: -1000 };

const dotRadius = 1.5;
const dotSpacing = 11;
const cursorRadius = 500;
const bulgeStrength = 67;
const glowRadius = 200;
const glowColor = "#647da2";
const gradientFrom = "#373e53";
const gradientTo = "#8892b0";
const waveAmplitude = 2;

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.width = "100%";
canvas.style.height = "100%";

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

let time = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.01;

  const cols = canvas.width;
  const rows = canvas.height;

  for (let x = 0; x < cols; x += dotSpacing) {
    for (let y = 0; y < rows; y += dotSpacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // wave offset
      const wave = Math.sin(x * 0.05 + time) * waveAmplitude;
      const drawY = y + wave;

      // bulge effect
      let radius = dotRadius;
      if (dist < cursorRadius) {
        const force = (1 - dist / cursorRadius) * (bulgeStrength / 20);
        radius = dotRadius + force;
      }

      // gradient color based on position
      const t = y / rows;
      let color = lerpColor(gradientFrom, gradientTo, t);

      // glow color near cursor
      if (dist < glowRadius) {
        const glowT = 1 - dist / glowRadius;
        color = lerpColor(color, glowColor, glowT);
      }

      ctx.beginPath();
      ctx.arc(x, drawY, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();