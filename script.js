document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cookie-bg");
  if (!container) return;

  const area = window.innerWidth * window.innerHeight;
  const targetCount = Math.max(30, Math.min(120, Math.floor(area / 50000)));

  const cookies = [];

  class Cookie {
    constructor() {
      this.el = document.createElement("div");
      this.el.className = "cookie";

      this.size = Math.round(Math.random() * 44) + 16;
      this.el.style.width = this.el.style.height = this.size + "px";

      let placed = false;
      for (let attempt = 0; attempt < 40; attempt++) {
        const tx = Math.random() * (window.innerWidth - this.size);
        const ty = Math.random() * (window.innerHeight - this.size);
        let ok = true;
        for (const o of cookies) {
          const dx = tx + this.size / 2 - (o.x + o.size / 2);
          const dy = ty + this.size / 2 - (o.y + o.size / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < (this.size + o.size) / 2 + 6) {
            ok = false;
            break;
          }
        }
        if (ok) {
          this.x = tx;
          this.y = ty;
          placed = true;
          break;
        }
        if (attempt === 39) {
          this.x = tx;
          this.y = ty;
        }
      }

      const speed = 0.12 + Math.random() * 0.45;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.rotation = Math.random() * 360;
      this.vr = (Math.random() * 2 - 1) * 0.06;

      this.el.style.left = this.x + "px";
      this.el.style.top = this.y + "px";
      this.el.style.transform = `rotate(${this.rotation}deg)`;

      const chipCount = 2 + Math.floor(Math.random() * 6);

      const eOffsetY = Math.round(this.size * (0.22 + Math.random() * 0.06));
      const eOffsetX = Math.round(this.size * 0.18);
      const eSize = Math.max(4, Math.round(this.size * 0.18));
      const leftEyeCenter = {
        x: Math.max(2, eOffsetX * 0.9) + eSize / 2,
        y: eOffsetY + eSize / 2,
        r: eSize / 2,
      };
      const rightEyeCenter = {
        x:
          Math.min(
            this.size - Math.round(this.size * 0.18) - 2,
            this.size - eOffsetX
          ) +
          eSize / 2,
        y: eOffsetY + eSize / 2,
        r: eSize / 2,
      };

      const leftEye = document.createElement("span");
      leftEye.className = "eye";
      leftEye.style.width = leftEye.style.height = eSize + "px";
      leftEye.style.left = leftEyeCenter.x - eSize / 2 + "px";
      leftEye.style.top = leftEyeCenter.y - eSize / 2 + "px";
      const rightEye = document.createElement("span");
      rightEye.className = "eye";
      rightEye.style.width = rightEye.style.height = eSize + "px";
      rightEye.style.left = rightEyeCenter.x - eSize / 2 + "px";
      rightEye.style.top = rightEyeCenter.y - eSize / 2 + "px";
      this.el.appendChild(leftEye);
      this.el.appendChild(rightEye);

      const placedChips = [];
      for (let i = 0; i < chipCount; i++) {
        const chip = document.createElement("span");
        chip.className = "chip";
        const cSize = Math.max(
          2,
          Math.round(this.size * (0.08 + Math.random() * 0.18))
        );
        let cLeft = 0;
        let cTop = 0;
        let ok = false;
        for (let t = 0; t < 12; t++) {
          const left = Math.round(Math.random() * (this.size - cSize));
          const top = Math.round(Math.random() * (this.size - cSize));
          const cx = left + cSize / 2;
          const cy = top + cSize / 2;
          let coll = false;
          for (const p of placedChips) {
            const d = Math.hypot(cx - p.cx, cy - p.cy);
            if (d < cSize / 2 + p.r + 2) {
              coll = true;
              break;
            }
          }
          const dL = Math.hypot(cx - leftEyeCenter.x, cy - leftEyeCenter.y);
          const dR = Math.hypot(cx - rightEyeCenter.x, cy - rightEyeCenter.y);
          if (dL < cSize / 2 + leftEyeCenter.r + 2) coll = true;
          if (dR < cSize / 2 + rightEyeCenter.r + 2) coll = true;
          if (!coll) {
            cLeft = left;
            cTop = top;
            placedChips.push({ cx, cy, r: cSize / 2 });
            ok = true;
            break;
          }
        }
        if (!ok) {
          cLeft = Math.round(Math.random() * (this.size - cSize));
          cTop = Math.round(Math.random() * (this.size - cSize));
        }
        chip.style.width = chip.style.height = cSize + "px";
        chip.style.left = cLeft + "px";
        chip.style.top = cTop + "px";
        chip.style.opacity = 1;
        this.el.appendChild(chip);
      }

      container.appendChild(this.el);
    }

    update(dt) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.rotation += this.vr * dt * 60;

      if (this.x < -this.size) this.x = window.innerWidth;
      if (this.x > window.innerWidth) this.x = -this.size;
      if (this.y < -this.size) this.y = window.innerHeight;
      if (this.y > window.innerHeight) this.y = -this.size;

      this.el.style.left = this.x + "px";
      this.el.style.top = this.y + "px";
      this.el.style.transform = `rotate(${this.rotation}deg)`;
    }
  }

  for (let i = 0; i < targetCount; i++) cookies.push(new Cookie());

  let last = performance.now();

  function tick(now) {
    const dt = Math.max(0.5, (now - last) / 16.666);
    last = now;
    for (const c of cookies) c.update(dt);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  window.addEventListener("resize", () => {
    for (const c of cookies) {
      c.x = Math.random() * (window.innerWidth - c.size);
      c.y = Math.random() * (window.innerHeight - c.size);
    }
  });
});

// Clicker functionality
let points = parseInt(localStorage.getItem('cookiePoints')) || 0;
const pointsDisplay = document.getElementById('points-display');
const giantCookie = document.querySelector('.giant-cookie');

function updatePointsDisplay() {
  pointsDisplay.innerHTML = `<i class="fa-solid fa-hand-pointer" style="margin-right: 4px; color: #ffffff;"><i/>${points}`;
}

updatePointsDisplay();

giantCookie.addEventListener('click', (e) => {
  points++;
  localStorage.setItem('cookiePoints', points);
  updatePointsDisplay();

  // Create +1 element
  const plusOne = document.createElement('div');
  plusOne.className = 'plus-one';
  plusOne.textContent = '+1';
  plusOne.style.left = `${e.clientX}px`;
  plusOne.style.top = `${e.clientY}px`;
  document.body.appendChild(plusOne);

  // Remove after animation
  setTimeout(() => {
    plusOne.remove();
  }, 1000);
});

// Add features to giant cookie
function addCookieFeatures() {
  const cookieSize = 200;

  // Add eyes
  const leftEye = document.createElement('div');
  leftEye.className = 'eye';
  leftEye.style.left = '20%';
  leftEye.style.top = '25%';
  giantCookie.appendChild(leftEye);

  const rightEye = document.createElement('div');
  rightEye.className = 'eye';
  rightEye.style.left = '65%';
  rightEye.style.top = '25%';
  giantCookie.appendChild(rightEye);

  const mouth = document.createElement('div');
  mouth.className = 'mouth';
  giantCookie.appendChild(mouth);

  const chipCount = 3 + Math.floor(Math.random() * 8);
  const placedChips = [];

  const avoidAreas = [
    { x: 0.3 * cookieSize, y: 0.25 * cookieSize, w: 0.15 * cookieSize, h: 0.15 * cookieSize },
    { x: 0.55 * cookieSize, y: 0.25 * cookieSize, w: 0.15 * cookieSize, h: 0.15 * cookieSize },
    { x: 0.3 * cookieSize, y: 0.6 * cookieSize, w: 0.4 * cookieSize, h: 0.2 * cookieSize }
  ];

  for (let i = 0; i < chipCount; i++) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    const cSize = Math.max(8, Math.round(cookieSize * (0.04 + Math.random() * 0.08)));

    let cLeft, cTop, placed = false;
    for (let attempt = 0; attempt < 20; attempt++) {
      cLeft = Math.random() * (cookieSize - cSize);
      cTop = Math.random() * (cookieSize - cSize);
      const cx = cLeft + cSize / 2;
      const cy = cTop + cSize / 2;

      let overlaps = false;
      for (const area of avoidAreas) {
        if (cx > area.x && cx < area.x + area.w && cy > area.y && cy < area.y + area.h) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        for (const p of placedChips) {
          const dx = cx - p.cx;
          const dy = cy - p.cy;
          if (Math.hypot(dx, dy) < (cSize + p.size) / 2 + 4) {
            overlaps = true;
            break;
          }
        }
      }
      if (!overlaps) {
        placedChips.push({ cx, cy, size: cSize });
        placed = true;
        break;
      }
    }
    if (placed) {
      chip.style.width = chip.style.height = cSize + 'px';
      chip.style.left = cLeft + 'px';
      chip.style.top = cTop + 'px';
      giantCookie.appendChild(chip);
    }
  }
}

addCookieFeatures();
