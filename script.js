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
  function setCookie(name, value, days) {
    let expires = "";
    if (typeof days === "number") {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + d.toUTCString();
    }
    document.cookie =
      name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + name + "=([^;]*)")
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  function eraseCookie(name) {
    setCookie(name, "", -1);
  }

  let points = parseInt(getCookie("cookiePoints")) || 0;
  const pointsValue = document.getElementById("points-value");
  const giantCookie = document.querySelector(".giant-cookie");

  // Autoclicker state and helpers (declared early so handlers can reference them)
  let autoclickerInterval = null;
  function startAutoclicker(intervalMs = 250) {
    if (!giantCookie || autoclickerInterval) return;
    autoclickerInterval = setInterval(() => {
      const rect = giantCookie.getBoundingClientRect();
      const ev = new MouseEvent("click", {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        bubbles: true,
        cancelable: true,
      });
      giantCookie.dispatchEvent(ev);
    }, intervalMs);
  }

  function stopAutoclicker() {
    if (autoclickerInterval) {
      clearInterval(autoclickerInterval);
      autoclickerInterval = null;
    }
  }

  function updatePointsDisplay() {
    if (!pointsValue) return;
    pointsValue.textContent = points;
  }

  updatePointsDisplay();

  const MILESTONE_KEY = "cookieMilestone100Shown";

  const milestoneAudio = new Audio("stuffs/milestone-audio.mp3");
  milestoneAudio.preload = "auto";
  milestoneAudio.volume = 0.9;

  function tryPlayMilestoneSound() {
    if (!milestoneAudio) return;
    try {
      milestoneAudio.currentTime = 0;
    } catch (e) {}
    const playPromise = milestoneAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const onUserInteract = () => {
          milestoneAudio.play().catch(() => {});
          window.removeEventListener("click", onUserInteract);
          window.removeEventListener("keydown", onUserInteract);
        };
        window.addEventListener("click", onUserInteract, { once: true });
        window.addEventListener("keydown", onUserInteract, { once: true });
      });
    }
  }

  function showMilestoneMessage() {
    if (getCookie(MILESTONE_KEY)) return;

    const box = document.getElementById("milestone-message");
    if (!box) return;

    box.style.display = "block";
    tryPlayMilestoneSound();

    const closeBtn = document.getElementById("milestone-close");
    if (closeBtn && !closeBtn._milestoneListenerAdded) {
      closeBtn._milestoneListenerAdded = true;
      closeBtn.addEventListener("click", () => {
        box.style.display = "none";
        setCookie(MILESTONE_KEY, "1", 365);
      });
    }
  }

  if (points >= 100 && !getCookie(MILESTONE_KEY)) {
    setTimeout(showMilestoneMessage, 300);
  }

  if (giantCookie) {
    giantCookie.addEventListener("click", (e) => {
      points++;
      setCookie("cookiePoints", String(points), 365);
      updatePointsDisplay();

      const plusOne = document.createElement("div");
      plusOne.className = "plus-one";
      plusOne.textContent = "+1";
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

    const leftEye = document.createElement("div");
    leftEye.className = "eye";
    leftEye.style.left = "20%";
    leftEye.style.top = "25%";
    giantCookie && giantCookie.appendChild(leftEye);

    const rightEye = document.createElement("div");
    rightEye.className = "eye";
    rightEye.style.left = "65%";
    rightEye.style.top = "25%";
    giantCookie && giantCookie.appendChild(rightEye);

    const mouth = document.createElement("div");
    mouth.className = "mouth";
    giantCookie && giantCookie.appendChild(mouth);

    const chipCount = 3 + Math.floor(Math.random() * 8);
    const placedChips = [];

    const avoidAreas = [
      {
        x: 0.3 * cookieSize,
        y: 0.25 * cookieSize,
        w: 0.15 * cookieSize,
        h: 0.15 * cookieSize,
      },
      {
        x: 0.55 * cookieSize,
        y: 0.25 * cookieSize,
        w: 0.15 * cookieSize,
        h: 0.15 * cookieSize,
      },
      {
        x: 0.3 * cookieSize,
        y: 0.6 * cookieSize,
        w: 0.4 * cookieSize,
        h: 0.2 * cookieSize,
      },
    ];

    for (let i = 0; i < chipCount; i++) {
      const chip = document.createElement("span");
      chip.className = "chip";
      const cSize = Math.max(
        8,
        Math.round(cookieSize * (0.04 + Math.random() * 0.08))
      );

      let cLeft,
        cTop,
        placed = false;
      for (let attempt = 0; attempt < 20; attempt++) {
        cLeft = Math.random() * (cookieSize - cSize);
        cTop = Math.random() * (cookieSize - cSize);
        const cx = cLeft + cSize / 2;
        const cy = cTop + cSize / 2;

        let overlaps = false;
        for (const area of avoidAreas) {
          if (
            cx > area.x &&
            cx < area.x + area.w &&
            cy > area.y &&
            cy < area.y + area.h
          ) {
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
        chip.style.width = chip.style.height = cSize + "px";
        chip.style.left = cLeft + "px";
        chip.style.top = cTop + "px";
        giantCookie && giantCookie.appendChild(chip);
      }
    }
  }

  addCookieFeatures();
  function showPanel(name, opts = {}) {
    const panel = document.getElementById("ec-panel-" + name);
    if (!panel) return;
    document.querySelectorAll(".ec-panel").forEach((p) => {
      if (p !== panel) p.style.display = "none";
    });
    panel.style.display = "block";
    return panel;
  }

  const achievementsBtn = document.getElementById("achievements-btn");
  const storeBtn = document.getElementById("store-btn");
  const leaderboardBtn = document.getElementById("leaderboard-btn");

  if (achievementsBtn)
    achievementsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPanel("achievements");
    });

  if (storeBtn)
    storeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPanel("store");
    });

  if (leaderboardBtn)
    leaderboardBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPanel("leaderboard");
    });

  document.querySelectorAll(".ec-panel .ec-panel-close").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const panel = btn.closest(".ec-panel");
      if (panel) panel.style.display = "none";
    });
  });

  document.addEventListener("click", (ev) => {
    if (ev.target.closest(".ec-toolbar") || ev.target.closest(".ec-panel")) return;
    document.querySelectorAll(".ec-panel").forEach((p) => (p.style.display = "none"));
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".ec-panel").forEach((panel) => {
      if (panel.style.display === "block") {
        const name = panel.id.replace("ec-panel-", "");
        showPanel(name);
      }
    });
  });

  // Admin button + panel behavior (modal-based auth, persisted)
  const adminBtn = document.getElementById("admin-btn");
  const adminPanel = document.getElementById("ec-panel-admin");
  const adminToggle = document.getElementById("admin-autoclick-toggle");
  const adminReset = document.getElementById("admin-reset-btn");

  const modal = document.getElementById("admin-password-modal");
  const modalInput = document.getElementById("admin-password-input");
  const modalSubmit = document.getElementById("admin-password-submit");
  const modalCancel = document.getElementById("admin-password-cancel");
  const modalClose = modal ? modal.querySelector(".admin-modal-close") : null;

  const AUTH_KEY = "ec_admin_auth";

  function openModal() {
    if (!modal) return;
    modal.style.display = "flex";
    setTimeout(() => modalInput && modalInput.focus(), 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    if (modalInput) modalInput.value = "";
  }

  if (adminBtn) {
    adminBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (localStorage.getItem(AUTH_KEY) === "1") {
        showPanel("admin");
      } else {
        openModal();
      }
    });
  }

  if (modalSubmit) {
    modalSubmit.addEventListener("click", () => {
      const v = modalInput ? modalInput.value : "";
      if (v === "12345") {
        localStorage.setItem(AUTH_KEY, "1");
        closeModal();
        showPanel("admin");
      } else {
        alert("Incorrect password");
        modalInput && modalInput.focus();
      }
    });
  }

  if (modalCancel) modalCancel.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);

  // Allow Enter key in modal input
  if (modalInput) {
    modalInput.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        modalSubmit && modalSubmit.click();
      }
      if (ev.key === "Escape") {
        closeModal();
      }
    });
  }

  // Admin panel controls
  if (adminToggle) {
    adminToggle.addEventListener("click", () => {
      if (autoclickerInterval) {
        stopAutoclicker();
        adminToggle.textContent = "Start Autoclicker";
      } else {
        startAutoclicker(200);
        adminToggle.textContent = "Stop Autoclicker";
      }
    });
  }

  if (adminReset) {
    adminReset.addEventListener("click", () => {
      if (!confirm("Reset points to 0?")) return;
      points = 0;
      setCookie("cookiePoints", String(points), 365);
      updatePointsDisplay();
      alert("Points reset to 0");
    });
  }

  // If the user manually clicks the giant cookie while autoclicker is running,
  // stop the autoclicker to give control back to the user.
  if (giantCookie) {
    giantCookie.addEventListener("click", (ev) => {
      // only stop when the click is user-initiated (isTrusted === true)
      if (ev && ev.isTrusted && autoclickerInterval) {
        stopAutoclicker();
        const t = document.getElementById("admin-autoclick-toggle");
        if (t) t.textContent = "Start Autoclicker";
      }
    });
  }
});
