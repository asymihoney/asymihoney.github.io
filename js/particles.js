const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, dots = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const DOT_COUNT = 90;
const LINK_DIST = 140;

for (let i = 0; i < DOT_COUNT; i++) {
  dots.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.6
  });
}

function animate() {
  ctx.fillStyle = '#0a0d10';
  ctx.fillRect(0, 0, w, h);

  // draw faint links between nearby dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINK_DIST) {
        ctx.strokeStyle = `rgba(79, 209, 197, ${0.12 * (1 - dist / LINK_DIST)})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  // draw + move dots
  dots.forEach(d => {
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > w) d.vx *= -1;
    if (d.y < 0 || d.y > h) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(238, 241, 243, 0.5)';
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();