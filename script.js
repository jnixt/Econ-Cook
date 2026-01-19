document.addEventListener("DOMContentLoaded", () => {
  // --- First-visit flow: language modal first, then must-read bar ---

  const LS_LANG = "ec_lang_pref";   // 'en' or 'id'
  const LS_ACK = "ec_must_read_ack"; // '1' when acknowledged

  // show/hide modal helpers (reuse existing backdrop)
  function showModal(modal) {
    const backdrop = document.getElementById("modal-backdrop");
    if (!backdrop || !modal) return;
    backdrop.classList.add("visible");
    modal.classList.add("visible");
    modal.style.display = "block";
  }
  function hideModal(modal) {
    const backdrop = document.getElementById("modal-backdrop");
    if (!backdrop || !modal) return;
    backdrop.classList.remove("visible");
    modal.classList.remove("visible");
    modal.style.display = "none";
  }

  // Language selection modal: shown first if no language in storage
  function initLanguageModal(onSelected) {
    const langModal = document.getElementById("language-select-modal");
    const backdrop = document.getElementById("modal-backdrop");
    if (!langModal || !backdrop) {
      // no modal available, fall back to callback with stored or default
      onSelected && onSelected(localStorage.getItem(LS_LANG) || "en");
      return;
    }

    const enBtn = document.getElementById("lang-en");
    const idBtn = document.getElementById("lang-id");
    const closeBtn = langModal.querySelector(".modal-close");

    const blockBackdrop = (e) => {
      if (langModal.classList.contains("visible")) { e.stopPropagation(); e.preventDefault(); }
    };

    const mark = (lang) => {
      if (enBtn) { enBtn.setAttribute("aria-pressed", String(lang === "en")); enBtn.style.outline = lang === "en" ? "2px solid #a6da95" : "none"; }
      if (idBtn) { idBtn.setAttribute("aria-pressed", String(lang === "id")); idBtn.style.outline = lang === "id" ? "2px solid #a6da95" : "none"; }
    };

    const choose = (lang) => {
      localStorage.setItem(LS_LANG, lang);
      mark(lang);
      hideModal(langModal);
      backdrop.removeEventListener("click", blockBackdrop, { capture: true });
      onSelected && onSelected(lang);
    };

    // If language already chosen, immediately call back
    const existing = localStorage.getItem(LS_LANG);
    if (existing) {
      mark(existing);
      onSelected && onSelected(existing);
      return;
    }

    enBtn?.addEventListener("click", () => choose("en"));
    idBtn?.addEventListener("click", () => choose("id"));
    if (closeBtn) closeBtn.addEventListener("click", () => choose("en")); // fallback

    backdrop.addEventListener("click", blockBackdrop, { capture: true });
    setTimeout(() => showModal(langModal), 120);
  }

  // Show the must-read bar (non-modal) after language is selected.
  // This bar requires clicking "Got it!" to set the ack flag.
  function showMustReadBar() {
    if (localStorage.getItem(LS_ACK) === "1") return; // already acknowledged
    const bar = document.getElementById("must-read-bar");
    const textEl = document.getElementById("must-read-bar-text");
    if (!bar || !textEl) return;

    const lang = localStorage.getItem(LS_LANG) || "en";
    if (lang === "id") {
      textEl.textContent = "Situs ini masih dalam pengembangan berat. Kesalahan atau hal serupa mungkin terjadi. Semoga Anda menikmati situs ini!";
    } else {
      textEl.textContent = "This site is still under heavy development. Errors or similar stuff may be expected. Hope you enjoy this site!";
    }

    // show the bar
    bar.style.display = "flex";
    // optional small entrance animation
    bar.style.transform = "translateY(10px)";
    bar.style.opacity = "0";
    setTimeout(() => {
      bar.style.transition = "transform 220ms ease, opacity 220ms ease";
      bar.style.transform = "translateY(0)";
      bar.style.opacity = "1";
    }, 20);

    const gotIt = document.getElementById("must-read-bar-gotit");
    const acknowledge = () => {
      localStorage.setItem(LS_ACK, "1");
      // hide with animation
      bar.style.transform = "translateY(10px)";
      bar.style.opacity = "0";
      setTimeout(() => { bar.style.display = "none"; }, 240);
    };
    gotIt?.addEventListener("click", acknowledge, { once: true });
  }

  // Combined flow: language modal first (if needed) then must-read bar
  function initFirstVisitFlow() {
    // if already acknowledged, nothing to do
    if (localStorage.getItem(LS_ACK) === "1") return;
    initLanguageModal(() => {
      // after language chosen (or already set) show the must-read bar
      showMustReadBar();
    });
  }

  // Call during initialization (place near other init calls)
  initFirstVisitFlow();
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
            milestoneAudio.play().catch(() => { });
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
          if (textBox) textBox.textContent = "Wow, you've hit 100 cookie clicks. Looks like you liked cookies, would you like to make some cookies on your own using our recipe?";
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
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-hand-pointer" style="color: #a6da95"></i>';
    }

    function stopAutoclicker() {
      if (autoclickerInterval) {
        clearInterval(autoclickerInterval);
        autoclickerInterval = null;
        const toggleBtn = adminPanel.querySelector("#admin-autoclick-toggle");
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-arrow-pointer" style="color: #ed8976"></i>';
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

(function () {
  const COOKIE_NAME = "ec_leaderboard";
  const COOKIE_DAYS = 365;
  const USERNAME_COOKIE = "ec_username";
  const MAX_SAVED = 50;       // trim cookie to this many top entries
  const SHOW_TOP = 10;        // how many entries to show in the UI
  const WIDGET_ID = "ec-leaderboard-widget";

  function setCookie(name, value, days, path = "/") {
    const expires = days ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString() : "";
    document.cookie = name + "=" + value + expires + "; path=" + path;
  }

  function getCookie(name) {
    const pairs = document.cookie ? document.cookie.split("; ") : [];
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      if (p.indexOf(name + "=") === 0) {
        return p.substring(name.length + 1);
      }
    }
    return null;
  }

  function deleteCookie(name, path = "/") {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + path;
  }

  // ---------- Storage API (cookie JSON) ----------
  function loadLeaderboard() {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return [];
    try {
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(item => ({
        name: String(item.name || "").trim(),
        clicks: Number(item.clicks) || 0
      })).filter(item => item.name.length > 0);
    } catch (err) {
      console.warn("Failed to parse leaderboard cookie:", err);
      return [];
    }
  }

  function saveLeaderboard(list) {
    // keep only top MAX_SAVED by clicks, sorted desc
    const trimmed = list
      .slice()
      .sort((a, b) => b.clicks - a.clicks || a.name.localeCompare(b.name))
      .slice(0, MAX_SAVED);
    const json = JSON.stringify(trimmed);
    setCookie(COOKIE_NAME, encodeURIComponent(json), COOKIE_DAYS);
  }

  function addOrUpdatePlayer(name, clicks) {
    if (!name) return;
    name = String(name).trim();
    if (!name) return;
    clicks = Number(clicks) || 0;

    const list = loadLeaderboard();
    const idx = list.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
    if (idx === -1) {
      list.push({ name, clicks });
    } else {
      // keep best score — change to overwrite if you prefer "latest"
      if (clicks > list[idx].clicks) list[idx].clicks = clicks;
    }
    saveLeaderboard(list);
  }

  function getTop(n = SHOW_TOP) {
    const list = loadLeaderboard();
    return list.sort((a, b) => b.clicks - a.clicks || a.name.localeCompare(b.name)).slice(0, n);
  }

  function clearLeaderboard() {
    deleteCookie(COOKIE_NAME);
  }

  // ---------- UI helpers ----------
  function createEl(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const k in attrs) {
      if (k === "class") el.className = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (!c) return;
      if (typeof c === "string") el.appendChild(document.createTextNode(c));
      else el.appendChild(c);
    });
    return el;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---------- Centered overlay for username ----------
  function showUsernameOverlay(onSubmitCallback) {
    // If already present, do nothing
    if (document.getElementById("ec-username-overlay")) return;

    // overlay
    const overlay = createEl("div", { id: "ec-username-overlay" });
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.55)",
      zIndex: 99999,
    });

    // centered box
    const box = createEl("div", { id: "ec-username-box" });
    Object.assign(box.style, {
      background: "#fff",
      padding: "24px",
      borderRadius: "10px",
      minWidth: "320px",
      maxWidth: "90%",
      boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    });

    const title = createEl("h2", { html: "Fill your username" });
    title.style.marginTop = "0";
    title.style.marginBottom = "12px";
    const subtitle = createEl("p", { html: "Please enter a display name to use on the leaderboard." });
    subtitle.style.marginTop = "0";
    subtitle.style.marginBottom = "18px";
    subtitle.style.color = "#444";
    subtitle.style.fontSize = "0.95rem";

    const nameInput = createEl("input", { type: "text", placeholder: "Your username", id: "ec-overlay-username" });
    Object.assign(nameInput.style, {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      fontSize: "1rem",
      marginBottom: "12px"
    });

    const btnRow = createEl("div");
    btnRow.style.display = "flex";
    btnRow.style.justifyContent = "center";
    btnRow.style.gap = "8px";

    const submitBtn = createEl("button", { type: "button", html: "Start" });
    Object.assign(submitBtn.style, {
      padding: "10px 16px",
      borderRadius: "6px",
      border: "none",
      background: "#2b8aef",
      color: "#fff",
      cursor: "pointer"
    });

    const skipBtn = createEl("button", { type: "button", html: "Use anonymous" });
    Object.assign(skipBtn.style, {
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      background: "#fff",
      cursor: "pointer"
    });

    btnRow.appendChild(submitBtn);
    btnRow.appendChild(skipBtn);

    // allow pressing Enter
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });

    submitBtn.addEventListener("click", () => {
      const val = (nameInput.value || "").trim();
      const username = val.length ? val : "anonymous";
      setCookie(USERNAME_COOKIE, encodeURIComponent(username), COOKIE_DAYS);
      if (typeof onSubmitCallback === "function") onSubmitCallback(username);
      overlay.remove();
    });

    skipBtn.addEventListener("click", () => {
      const username = "anonymous";
      setCookie(USERNAME_COOKIE, encodeURIComponent(username), COOKIE_DAYS);
      if (typeof onSubmitCallback === "function") onSubmitCallback(username);
      overlay.remove();
    });

    box.appendChild(title);
    box.appendChild(subtitle);
    box.appendChild(nameInput);
    box.appendChild(btnRow);

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Focus input
    setTimeout(() => nameInput.focus(), 50);
  }

  // ---------- Widget rendering ----------
  function renderWidget(container, initialUsername) {
    container.innerHTML = ""; // clear

    const title = createEl("h3", { html: "Leaderboard (cookie)" });
    container.appendChild(title);

    // Controls
    const controls = createEl("div", { class: "ec-controls" });
    const nameInput = createEl("input", { type: "text", placeholder: "Your name", id: "ec-name-input" });
    nameInput.style.marginRight = "8px";
    if (initialUsername) nameInput.value = initialUsername;

    let runtimeClicks = 0;
    const clicksLabel = createEl("span", { id: "ec-clicks-label", html: "0" });
    clicksLabel.style.margin = "0 8px";

    const incBtn = createEl("button", { type: "button", html: "+1 click" });
    incBtn.addEventListener("click", () => {
      runtimeClicks++;
      clicksLabel.innerHTML = String(runtimeClicks);
    });

    const saveBtn = createEl("button", { type: "button", html: "Save score" });
    saveBtn.style.marginLeft = "8px";
    saveBtn.addEventListener("click", () => {
      const name = nameInput.value || initialUsername || "anonymous";
      addOrUpdatePlayer(name, runtimeClicks);
      renderLeaderboardTable(container);
      showTemporaryMessage(container, `Saved ${runtimeClicks} clicks for "${name}"`);
    });

    const clearBtn = createEl("button", { type: "button", html: "Clear leaderboard" });
    clearBtn.style.marginLeft = "8px";
    clearBtn.addEventListener("click", () => {
      if (!confirm("Clear local leaderboard cookie?")) return;
      clearLeaderboard();
      runtimeClicks = 0;
      clicksLabel.innerHTML = "0";
      renderLeaderboardTable(container);
      showTemporaryMessage(container, "Leaderboard cleared");
    });

    const controlsRow = createEl("div", { class: "ec-controls-row" }, [
      nameInput, incBtn, clicksLabel, saveBtn, clearBtn
    ]);
    controlsRow.style.marginBottom = "10px";
    container.appendChild(controlsRow);

    // Leaderboard container
    const lbContainer = createEl("div", { id: "ec-leaderboard-table" });
    container.appendChild(lbContainer);

    // Initial table render
    renderLeaderboardTable(container);
  }

  function renderLeaderboardTable(container) {
    const lbContainer = container.querySelector("#ec-leaderboard-table");
    if (!lbContainer) return;

    const top = getTop(SHOW_TOP);
    if (top.length === 0) {
      lbContainer.innerHTML = "<p>No entries yet.</p>";
      return;
    }

    // Build table
    const table = createEl("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.maxWidth = "360px";
    table.style.marginTop = "6px";

    const thead = createEl("thead");
    const headerRow = createEl("tr");
    ["#", "Player", "Clicks"].forEach(h => {
      const th = createEl("th", { html: h });
      th.style.border = "1px solid #ddd";
      th.style.padding = "6px 8px";
      th.style.background = "#f5f5f5";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = createEl("tbody");
    top.forEach((p, i) => {
      const row = createEl("tr");
      const idxTd = createEl("td", { html: String(i + 1) });
      const nameTd = createEl("td", { html: escapeHtml(p.name) });
      const clicksTd = createEl("td", { html: String(p.clicks) });
      [idxTd, nameTd, clicksTd].forEach(td => {
        td.style.border = "1px solid #ddd";
        td.style.padding = "6px 8px";
      });
      row.appendChild(idxTd);
      row.appendChild(nameTd);
      row.appendChild(clicksTd);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    lbContainer.innerHTML = "";
    lbContainer.appendChild(table);
  }

  function showTemporaryMessage(container, text, ms = 1800) {
    let msg = container.querySelector(".ec-temp-msg");
    if (!msg) {
      msg = createEl("div", { class: "ec-temp-msg" });
      msg.style.marginTop = "8px";
      msg.style.color = "#2a6f2a";
      container.appendChild(msg);
    }
    msg.textContent = text;
    setTimeout(() => {
      if (msg && msg.parentNode) msg.parentNode.removeChild(msg);
    }, ms);
  }

  // ---------- Public initializer ----------
  function init(options = {}) {
    const parent = options.parent || document.body;
    let container = document.getElementById(WIDGET_ID);
    if (!container) {
      container = createEl("div", { id: WIDGET_ID });
      // basic inline styling so widget looks reasonable without CSS file
      container.style.border = "1px solid #ccc";
      container.style.padding = "12px";
      container.style.borderRadius = "8px";
      container.style.maxWidth = "420px";
      container.style.fontFamily = "Arial, sans-serif";
      container.style.background = "#fff";
      container.style.position = "relative";
      container.style.margin = "18px";
      parent.appendChild(container);
    }

    const storedUsername = getCookie(USERNAME_COOKIE);
    const username = storedUsername ? decodeURIComponent(storedUsername) : null;

    if (username) {
      // If username exists, render widget immediately with prefilled name
      renderWidget(container, username);
    } else {
      // Show overlay that centers the "Fill your username" prompt
      showUsernameOverlay(function (submittedName) {
        renderWidget(container, submittedName);
      });
    }
  }

  // Auto-init: create widget in document.body after DOMContentLoaded
  function autoInit() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => init());
    } else {
      init();
    }
  }

  // Expose API
  window.ECLeaderboard = {
    init,
    addOrUpdatePlayer,
    loadLeaderboard,
    clearLeaderboard,
    getTop
  };

  // Kick off automatically
  autoInit();
})();
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

  // JSON helpers for storing structured data in cookies
  function getCookieJSON(name) {
    const raw = getCookie(name);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }
  function setCookieJSON(name, obj, days) {
    try {
      setCookie(name, JSON.stringify(obj), days);
    } catch (e) {
      // ignore
    }
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

  // Leaderboard cookie name: 'ec_leaderboard' -> JSON object { username: points, ... }
  function writePlayerToLeaderboard(username, score) {
    if (!username) return;
    const board = getCookieJSON("ec_leaderboard") || {};
    board[username] = Number(score) || 0;
    setCookieJSON("ec_leaderboard", board, 365);
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
      // persist user's local points (used for local display)
      setCookie("cookiePoints", String(points), 365);
      updatePointsDisplay();

      // auto-store into the leaderboard cookie under the player's username if available
      const username = (getCookie("ec_username") || "").trim();
      if (username) {
        writePlayerToLeaderboard(username, points);
      }

      // milestone handling unchanged (but no "+1" visual)
      if (points >= 100 && !getCookie("cookieMilestone100Shown")) {
        setCookie("cookieMilestone100Shown", "1", 365);
        if (typeof window.showMilestoneMessage === "function") {
          window.showMilestoneMessage();
        }
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
    // leaderboard simplified: will render only username input + player's username & clicks
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

  function renderLeaderboardPanel(panel) {
    if (!panel) return;
    const content = panel.querySelector(".ec-content");
    if (!content) return;

    content.innerHTML = ""; // clear previous

    // Username input (auto-saves)
    const usernameLabel = document.createElement("label");
    usernameLabel.textContent = "Player username:";
    usernameLabel.style.display = "block";
    usernameLabel.style.marginBottom = "6px";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Enter your username";
    usernameInput.value = getCookie("ec_username") || "";
    usernameInput.style.padding = "6px";
    usernameInput.style.width = "100%";
    usernameInput.maxLength = 64;

    // Display area: shows only current player's username and clicks count
    const display = document.createElement("div");
    display.style.marginTop = "12px";
    display.style.fontWeight = "600";

    function refreshDisplay() {
      const name = (getCookie("ec_username") || "").trim();
      const pts = parseInt(getCookie("cookiePoints")) || 0;
      if (name) {
        display.textContent = `${name} — ${pts} clicks`;
      } else {
        display.textContent = `No username set. Enter a username to track your clicks.`;
      }
    }

    // Auto-save username on input (debounce small)
    let saveTimeout = null;
    usernameInput.addEventListener("input", () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const raw = usernameInput.value.trim();
        // basic validation: 3-64 chars, alphanumeric + _- allowed
        const USERNAME_RE = /^[\w\-]{3,64}$/;
        if (!raw) {
          // clear stored username
          setCookie("ec_username", "", -1);
        } else if (USERNAME_RE.test(raw)) {
          const prev = getCookie("ec_username") || "";
          setCookie("ec_username", raw, 365);
          // move leaderboard entry if previously had a different username stored
          if (prev && prev !== raw) {
            const board = getCookieJSON("ec_leaderboard") || {};
            const prevScore = board[prev];
            if (typeof prevScore !== "undefined") {
              board[raw] = Number(getCookie("cookiePoints")) || prevScore || 0;
              delete board[prev];
              setCookieJSON("ec_leaderboard", board, 365);
            } else {
              // just write current points under new name
              writePlayerToLeaderboard(raw, parseInt(getCookie("cookiePoints")) || 0);
            }
          } else {
            // ensure current points are saved under username
            writePlayerToLeaderboard(raw, parseInt(getCookie("cookiePoints")) || 0);
          }
        } else {
          // invalid username: leave cookie unchanged, optionally could show message
        }
        refreshDisplay();
      }, 350);
    });

    // also save on blur immediately
    usernameInput.addEventListener("blur", () => {
      clearTimeout(saveTimeout);
      const raw = usernameInput.value.trim();
      const USERNAME_RE = /^[\w\-]{3,64}$/;
      if (!raw) {
        setCookie("ec_username", "", -1);
      } else if (USERNAME_RE.test(raw)) {
        setCookie("ec_username", raw, 365);
        writePlayerToLeaderboard(raw, parseInt(getCookie("cookiePoints")) || 0);
      }
      refreshDisplay();
    });

    content.appendChild(usernameLabel);
    content.appendChild(usernameInput);
    content.appendChild(display);

    // initial refresh
    refreshDisplay();
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

      if (name === "leaderboard") {
        renderLeaderboardPanel(panel);
      }
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
            // remove player's entry from leaderboard if username exists
            const username = (getCookie("ec_username") || "").trim();
            if (username) {
              const board = getCookieJSON("ec_leaderboard") || {};
              delete board[username];
              setCookieJSON("ec_leaderboard", board, 365);
            }
        }
    });
  }

  initAdminFeature();
});