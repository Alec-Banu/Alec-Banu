const canvas = document.getElementById("dot-canvas");
const ctx = canvas.getContext("2d");

let mouse = { x: -1000, y: -1000 };
const spacing = 11;
const dotRadius = 1.5;
const cursorRadius = 150;

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

  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let radius = dotRadius;
      if (dist < cursorRadius) {
        radius = dotRadius + (1 - dist / cursorRadius) * 3;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#373e53";
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();