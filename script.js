document.addEventListener("DOMContentLoaded", () => {
  // --- Background Cookie Animation ---
  const container = document.getElementById("cookie-bg");
  if (container) {
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
            if (Math.hypot(dx, dy) < (this.size + o.size) / 2 + 6) {
              ok = false;
              break;
            }
          }
          if (ok) { this.x = tx; this.y = ty; placed = true; break; }
        }

        const speed = 0.12 + Math.random() * 0.45;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.rotation = Math.random() * 360;
        this.vr = (Math.random() * 2 - 1) * 0.06;

        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";
        this.el.style.transform = `rotate(${this.rotation}deg)`

        this.addFeatures();
        container.appendChild(this.el);
      }

      addFeatures() {
        const eSize = Math.max(4, Math.round(this.size * 0.18));
        const leftEye = document.createElement("span");
        leftEye.className = "eye";
        leftEye.style.cssText = `width:${eSize}px; height:${eSize}px; left: 25%; top: 25%;`;
        this.el.appendChild(leftEye);

        const rightEye = document.createElement("span");
        rightEye.className = "eye";
        rightEye.style.cssText = `width:${eSize}px; height:${eSize}px; right: 25%; top: 25%;`;
        this.el.appendChild(rightEye);

        const chipCount = 2 + Math.floor(Math.random() * 6);
        for (let i = 0; i < chipCount; i++) {
            const chip = document.createElement("span");
            chip.className = "chip";
            const cSize = Math.max(2, Math.round(this.size * (0.08 + Math.random() * 0.18)));
            chip.style.cssText = `width:${cSize}px; height:${cSize}px; left:${Math.random() * (this.size - cSize)}px; top:${Math.random() * (this.size - cSize)}px;`;
            this.el.appendChild(chip);
        }
      }

      update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.rotation += this.vr * dt;
        if (this.x < -this.size) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = -this.size;
        if (this.y < -this.size) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = -this.size;
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";
        this.el.style.transform = `rotate(${this.rotation}deg)`
      }
    }

    for (let i = 0; i < targetCount; i++) cookies.push(new Cookie());
    let last = performance.now();
    function tick(now) {
      const dt = Math.max(0.5, (now - last) / 16.666);
      last = now;
      cookies.forEach(c => c.update(dt));
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // --- Cookie Clicker Logic ---
  const giantCookie = document.querySelector(".giant-cookie");
  const pointsValue = document.getElementById("points-value");
  let points = 0;
  let autoclickerInterval = null;


  function setCookie(name, value, days) {
    let expires = "";
    if (typeof days === "number") {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + d.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\[\]\\\/^])/g, '\\$1')}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function updatePointsDisplay() {
    if (pointsValue) pointsValue.textContent = points;
  }

  function addGiantCookieFeatures() {
    if (!giantCookie) return;
    giantCookie.innerHTML = `
        <div class="eye" style="left: 20%; top: 25%;"></div>
        <div class="eye" style="left: 65%; top: 25%;"></div>
        <div class="mouth"></div>
    `;
    const cookieSize = 200;
    const chipCount = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < chipCount; i++) {
        const chip = document.createElement("span");
        chip.className = "chip";
        const cSize = Math.max(8, Math.round(cookieSize * (0.04 + Math.random() * 0.08)));
        chip.style.width = chip.style.height = `${cSize}px`;
        chip.style.left = `${Math.random() * (cookieSize - cSize)}px`;
        chip.style.top = `${Math.random() * (cookieSize - cSize)}px`;
        giantCookie.appendChild(chip);
    }
  }

  if (giantCookie) {
    points = parseInt(getCookie("cookiePoints")) || 0;
    updatePointsDisplay();
    addGiantCookieFeatures();

    giantCookie.addEventListener("click", (e) => {
      if (e.isTrusted && autoclickerInterval) {
        stopAutoclicker();
      }
      points++;
      setCookie("cookiePoints", String(points), 365);
      updatePointsDisplay();

      const plusOne = document.createElement("div");
      plusOne.className = "plus-one";
      plusOne.textContent = "+1";
      plusOne.style.left = `${e.clientX}px`;
      plusOne.style.top = `${e.clientY}px`;
      document.body.appendChild(plusOne);
      setTimeout(() => plusOne.remove(), 1000);

      if (points >= 100 && !getCookie("cookieMilestone100Shown")) {
        setCookie("cookieMilestone100Shown", "1", 365);
        showMilestoneMessage();
      }
    });
  }

  // --- Milestone Message ---
  function initMilestoneFeature() {
    const box = document.getElementById("milestone-message");
    if (!box) return;

    const milestoneAudio = new Audio("stuffs/milestone-audio.mp3");
    milestoneAudio.preload = "auto";
    milestoneAudio.volume = 0.9;

    const closeBtn = document.getElementById("milestone-close");
    closeBtn.addEventListener("click", () => {
      box.style.display = "none";
    });

    window.showMilestoneMessage = () => {
      box.style.display = "block";

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

      setTimeout(() => {
        try {
          pyscript.runtime.globals.get('start_typing_animation')();
        } catch (e) {
          console.error("PyScript animation function not found or failed to run:", e);
          const textBox = document.getElementById("milestone-text");
          if(textBox) textBox.textContent = "Wow, you've hit 100 cookie clicks. Looks like you liked cookies, would you like to make some cookies on your own using our recipe?";
        }
      }, 200);
    };
  }
  initMilestoneFeature();


  // --- Panel Logic ---
  const panelContents = {
    achievements: `<h3>Achievements</h3><div class="ec-content"></div>`,
    store: `<h3>Store</h3><div class="ec-content"></div>`,
    leaderboard: `<h3>Leaderboard</h3><div class="ec-content"></div>`
  };
  const panels = {};
  let activePanel = null;

  Object.keys(panelContents).forEach(name => {
      const panel = document.createElement("div");
      panel.id = `ec-panel-instance-${name}`;
      panel.className = "ec-panel";
      panel.innerHTML = panelContents[name];
      const closeButton = document.createElement("button");
      closeButton.className = "ec-panel-close";
      closeButton.innerHTML = "&#10005;";
      closeButton.setAttribute("aria-label", `Close ${name}`);
      closeButton.addEventListener("click", e => {
          e.stopPropagation();
          hidePanel(panel);
      });
      panel.prepend(closeButton);
      document.body.appendChild(panel);
      panels[name] = panel;
  });

  function hidePanel(panel) {
    if (panel) {
      panel.classList.remove("visible");
      if (activePanel === panel) activePanel = null;
    }
  }

  function showPanel(name, triggerBtn) {
    const panel = panels[name];
    if (!panel || !triggerBtn) return;
    const isVisible = panel.classList.contains("visible");

    if (activePanel && activePanel !== panel) {
        hidePanel(activePanel);
    }

    if (isVisible) {
      hidePanel(panel);
    } else {
      const btnRect = triggerBtn.getBoundingClientRect();
      panel.style.top = `${btnRect.top - 15}px`;
      panel.style.left = `${btnRect.left + btnRect.width / 2}px`;
      panel.style.transform = 'translate(-50%, -100%)';
      panel.classList.add("visible");
      activePanel = panel;
    }
  }

  document.querySelectorAll(".ec-toolbar .ec-tool-btn").forEach(btn => {
    const name = btn.id.replace("-btn", "");
    if (panels[name]) {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        showPanel(name, btn);
      });
    }
  });

  document.addEventListener("click", e => {
    if (activePanel && !activePanel.contains(e.target) && !e.target.closest('.ec-tool-btn')) {
      hidePanel(activePanel);
    }
  });
  window.addEventListener("resize", () => hidePanel(activePanel));

  function initAdminFeature() {
    const adminBtn = document.getElementById("admin-btn");
    const passwordModal = document.getElementById("admin-password-modal");
    const backdrop = document.getElementById("modal-backdrop");

    if (!adminBtn || !passwordModal || !backdrop) {
        return;
    }

    const adminPanel = document.createElement("div");
    adminPanel.id = "ec-panel-instance-admin";
    adminPanel.className = "modal";
    adminPanel.innerHTML = `
      <button class="modal-close" aria-label="Close admin panel">&#10005;</button>
      <h3>Admin Panel</h3>
      <div class="ec-content">
        <button id="admin-autoclick-toggle" class="ec-tool-btn"><i class="fa-solid fa-arrow-pointer" style="color: #ed8796"></i></button>
        <button id="admin-reset-btn" class="ec-tool-btn"><i class="fa-solid fa-recycle"></i></button>
      </div>
    `;
    document.body.appendChild(adminPanel);

    const showModal = (modal) => {
        backdrop.classList.add("visible");
        modal.classList.add("visible");
    };
    const hideModal = (modal) => {
        backdrop.classList.remove("visible");
        modal.classList.remove("visible");
    };

    function startAutoclicker(intervalMs = 200) {
      if (!giantCookie || autoclickerInterval) return;
      const toggleBtn = adminPanel.querySelector("#admin-autoclick-toggle");
      const rect = giantCookie.getBoundingClientRect();
      const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
      });
      autoclickerInterval = setInterval(() => giantCookie.dispatchEvent(clickEvent), intervalMs);
      if(toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-hand-pointer" style="color: #a6da95"></i>';
    }

    function stopAutoclicker() {
      if (autoclickerInterval) {
        clearInterval(autoclickerInterval);
        autoclickerInterval = null;
        const toggleBtn = adminPanel.querySelector("#admin-autoclick-toggle");
        if(toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-arrow-pointer" style="color: #ed8976"></i>';
      }
    }

    adminBtn.addEventListener("click", e => {
      e.stopPropagation();
      if (localStorage.getItem("ec_admin_auth") === "1") {
        showModal(adminPanel);
      } else {
        showModal(passwordModal);
        setTimeout(() => passwordModal.querySelector("input")?.focus(), 50);
      }
    });

    passwordModal.addEventListener('click', e => {
        const target = e.target.closest('button');
        if (!target) return;
        if (target.id === 'admin-password-submit') {
            const input = passwordModal.querySelector('input');
            if (input.value === "12345") {
                localStorage.setItem("ec_admin_auth", "1");
                hideModal(passwordModal);
                showModal(adminPanel);
            } else {
                alert("Incorrect password");
                input.focus();
            }
        } else if (target.classList.contains('modal-close') || target.id === 'admin-password-cancel') {
            hideModal(passwordModal);
        }
    });

    adminPanel.addEventListener('click', e => {
        const target = e.target.closest('button');
        if (!target) return;

        if (target.classList.contains('modal-close')) {
            hideModal(adminPanel);
        } else if (target.id === 'admin-autoclick-toggle') {
            autoclickerInterval ? stopAutoclicker() : startAutoclicker();
        } else if (target.id === 'admin-reset-btn') {
            points = 0;
            setCookie("cookiePoints", "0", 365);
            updatePointsDisplay();
        }
    });
  }

  initAdminFeature();
});
