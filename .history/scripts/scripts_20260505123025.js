const canvas = document.getElementById("dot-canvas");
const ctx = canvas.getContext("2d");

let mouse = { x: -1000, y: -1000 };

const dotRadius = 1.5;
const dotSpacing = 11;
const cursorRadius = 500;
const bulgeStrength = 67;
const glowRadius = 200;
const glowColor = "#647da2";
const dotColor = "#373e53";

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += dotSpacing) {
    for (let y = 0; y < canvas.height; y += dotSpacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let radius = dotRadius;
      if (dist < cursorRadius) {
        const force = (1 - dist / cursorRadius) * (bulgeStrength / 20);
        radius = dotRadius + force;
      }

      let color = dotColor;
      if (dist < glowRadius) {
        const glowT = 1 - dist / glowRadius;
        color = `rgba(100, 125, 162, ${glowT * 0.8})`;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();