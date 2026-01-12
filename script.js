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

// Helper functions for HTTP cookies
function setCookie(name, value, days) {
  let expires = "";
  if (typeof days === "number") {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + d.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function eraseCookie(name) {
  setCookie(name, "", -1);
}

let points = parseInt(getCookie('cookiePoints')) || 0;
const pointsDisplay = document.getElementById('points-display');
const giantCookie = document.querySelector('.giant-cookie');

function updatePointsDisplay() {
  if (!pointsDisplay) return;
  pointsDisplay.innerHTML = `<i class="fa-solid fa-hand-pointer" style="margin-right: 4px; color: #ffffff;"></i>${points}`;
}

updatePointsDisplay();

const MILESTONE_KEY = 'cookieMilestone100Shown';

const milestoneAudio = new Audio('message_popup_sound.wav');
milestoneAudio.preload = 'auto';
milestoneAudio.volume = 0.9;

function tryPlayMilestoneSound() {
  if (!milestoneAudio) return;
  try {
    milestoneAudio.currentTime = 0;
  } catch (e) {

  }
  const playPromise = milestoneAudio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const onUserInteract = () => {
        milestoneAudio.play().catch(() => {});
        window.removeEventListener('click', onUserInteract);
        window.removeEventListener('keydown', onUserInteract);
      };
      window.addEventListener('click', onUserInteract, { once: true });
      window.addEventListener('keydown', onUserInteract, { once: true });
    });
  }
}

function showMilestoneMessage() {
  if (getCookie(MILESTONE_KEY)) return;

  const box = document.createElement('div');
  box.id = 'milestone-message';
  box.style.position = 'fixed';
  box.style.left = '50%';
  box.style.top = '20%';
  box.style.transform = 'translateX(-50%)';
  box.style.background = 'rgba(0,0,0,0.88)';
  box.style.color = '#fff';
  box.style.padding = '18px 20px';
  box.style.borderRadius = '8px';
  box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
  box.style.zIndex = 9999;
  box.style.maxWidth = '90%';
  box.style.width = '480px';
  box.style.fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
  box.style.fontSize = '15px';
  box.style.lineHeight = '1.35';

  box.innerHTML = `
    <div style="position:relative;padding-right:34px;">
      <div>Wow, you've hit 100 cookie clicks. Looks like you liked cookies, would you like to make some cookies on your own using our recipe?</div>
      <button aria-label="Close milestone" id="milestone-close" style="position:absolute;right:0;top:0;border:none;background:transparent;color:#fff;font-size:20px;cursor:pointer;padding:6px 8px;line-height:1">×</button>
    </div>
  `;

  document.body.appendChild(box);

  tryPlayMilestoneSound();

  const closeBtn = document.getElementById('milestone-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      box.remove();
      setCookie(MILESTONE_KEY, '1', 365);
    });
  }
}

if (points >= 100 && !getCookie(MILESTONE_KEY)) {
  setTimeout(showMilestoneMessage, 300);
}

if (giantCookie) {
  giantCookie.addEventListener('click', (e) => {
    points++;
    setCookie('cookiePoints', String(points), 365);
    updatePointsDisplay();

    const plusOne = document.createElement('div');
    plusOne.className = 'plus-one';
    plusOne.textContent = '+1';
    plusOne.style.left = `${e.clientX}px`;
    plusOne.style.top = `${e.clientY}px`;
    document.body.appendChild(plusOne);

    setTimeout(() => {
      plusOne.remove();
    }, 1000);

    if (points >= 100 && !getCookie(MILESTONE_KEY)) {
      showMilestoneMessage();
    }
  });
}

function addCookieFeatures() {
  const cookieSize = 200;

  // Add eyes
  const leftEye = document.createElement('div');
  leftEye.className = 'eye';
  leftEye.style.left = '20%';
  leftEye.style.top = '25%';
  giantCookie && giantCookie.appendChild(leftEye);

  const rightEye = document.createElement('div');
  rightEye.className = 'eye';
  rightEye.style.left = '65%';
  rightEye.style.top = '25%';
  giantCookie && giantCookie.appendChild(rightEye);

  const mouth = document.createElement('div');
  mouth.className = 'mouth';
  giantCookie && giantCookie.appendChild(mouth);

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
      giantCookie && giantCookie.appendChild(chip);
    }
  }
}

addCookieFeatures();

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .ec-toolbar { position: fixed; top: 12px; left: 12px; right: 12px; pointer-events: none; z-index: 10000; }
    .ec-left, .ec-right { display: inline-flex; gap: 8px; pointer-events: auto; }
    .ec-left { float: left; }
    .ec-right { float: right; }

    .ec-tool-btn {
      background: rgba(0,0,0,0.7);
      color: #fff;
      border: 0;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      font-size: 14px;
      transition: background .12s;
    }
    .ec-tool-btn:hover { background: rgba(0,0,0,0.85); }

    .ec-panel {
      position: fixed;
      top: 56px;
      width: 320px;
      max-width: calc(100% - 48px);
      background: rgba(18,18,18,0.96);
      color: #fff;
      border-radius: 10px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.6);
      padding: 12px;
      z-index: 10001;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      font-size: 14px;
      line-height: 1.35;
    }
    .ec-panel h3 { margin: 0 0 8px 0; font-size: 16px; }
    .ec-panel .ec-panel-close {
      position: absolute;
      right: 8px;
      top: 8px;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
    .ec-panel.right { right: 12px; }
    .ec-panel.left { left: 12px; }

    .ec-panel .ec-content { max-height: 360px; overflow: auto; padding-top: 6px; }
    @media (max-width: 420px) {
      .ec-panel { width: calc(100% - 32px); left: 16px; right: 16px; }
      .ec-panel.right { right: 16px; left: 16px; }
    }
  `;
  document.head.appendChild(style);

  const toolbar = document.createElement('div');
  toolbar.className = 'ec-toolbar';
  const left = document.createElement('div');
  left.className = 'ec-left';
  const right = document.createElement('div');
  right.className = 'ec-right';

  function createBtn(text, id) {
    const b = document.createElement('button');
    b.className = 'ec-tool-btn';
    b.type = 'button';
    b.textContent = text;
    b.dataset.ecId = id;
    return b;
  }

  const achievementsBtn = createBtn('Achievements', 'achievements');
  const storeBtn = createBtn('Store', 'store');
  const leaderboardBtn = createBtn('Leaderboard', 'leaderboard');

  left.appendChild(achievementsBtn);
  left.appendChild(storeBtn);
  right.appendChild(leaderboardBtn);
  toolbar.appendChild(left);
  toolbar.appendChild(right);
  document.body.appendChild(toolbar);

  function openPanel(name, opts = {}) {
    const existing = document.getElementById('ec-panel-' + name);
    if (existing) {
      existing.style.display = 'block';
      return existing;
    }

    const panel = document.createElement('div');
    panel.className = 'ec-panel ' + (opts.position === 'right' ? 'right' : 'left');
    panel.id = 'ec-panel-' + name;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'ec-panel-close';
    closeBtn.setAttribute('aria-label', 'Close ' + name);
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', () => panel.remove());
    panel.appendChild(closeBtn);

    const title = document.createElement('h3');
    title.textContent = opts.title || name;
    panel.appendChild(title);

    const content = document.createElement('div');
    content.className = 'ec-content';
    content.innerHTML = opts.html || `<div style="opacity:.9">No content yet.</div>`;
    panel.appendChild(content);

    document.body.appendChild(panel);
    return panel;
  }

  achievementsBtn.addEventListener('click', () => {
    openPanel('achievements', {
      position: 'left',
      title: 'Achievements',
      html: `
        <div>
          <p style="margin:0 0 8px 0">Your achievements will appear here.</p>
          <ul style="margin:0 0 8px 16px">
            <li>dalam perbaikan...</li>
          </ul>
        </div>
      `
    });
  });

  storeBtn.addEventListener('click', () => {
    openPanel('store', {
      position: 'left',
      title: 'Store',
      html: `
        <div>
          <p style="margin:0 0 8px 0">Buy upgrades from here.</p>
          <button class="ec-tool-btn" style="margin-top:6px">dalam perbaikan...</button>
        </div>
      `
    });
  });

  leaderboardBtn.addEventListener('click', () => {
    openPanel('leaderboard', {
      position: 'right',
      title: 'Leaderboard',
      html: `
        <div>
          <p style="margin:0 0 8px 0">Top players (placeholder).</p>
          <ol style="margin:0 0 8px 18px">
            <li>dalam perbaikan...</li>
          </ol>
          <div style="opacity:.85;font-size:12px">Connect to your server/DB to populate live leaderboard.</div>
        </div>
      `
    });
  });

  document.addEventListener('click', (ev) => {
    if (ev.target.closest('.ec-toolbar') || ev.target.closest('.ec-panel')) return;
    const panels = document.querySelectorAll('.ec-panel');
    panels.forEach(p => p.remove());
  });
});
