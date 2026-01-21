document.addEventListener("DOMContentLoaded", function () {
  // Funcs Section
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function typingAnim(text, speed, elementId) {
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        document.getElementById(elementId).innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
  }

  function formatPoints(points) {
    let finalPoints = points;
    if (points >= 1000 && points < 1000000) {
      finalPoints = (points / 1000).toFixed(1) + "K"
    } else if (points >= 1000000 && points < 1000000000) {
      finalPoints = (points / 1000000).toFixed(1) + "M"
    } else if (points >= 1000000000 && points < 1000000000000) {
      finalPoints = (points / 1000000000).toFixed(1) + "B"
    } else if (points >= 1000000000000 && points < 1000000000000000) {
      finalPoints = (points / 1000000000000).toFixed(1) + "T"
    } else if (points >= 1000000000000000 && points < 1000000000000000000) {
      finalPoints = (points / 1000000000000000).toFixed(1) + "Qa"
    } else if (points >= 1000000000000000000 && points < 1000000000000000000000) {
      finalPoints = (points / 1000000000000000000).toFixed(1) + "Qi"
    } else if (points >= 1000000000000000000000 && points < 1000000000000000000000000) {
      finalPoints = (points / 1000000000000000000000).toFixed(1) + "Sx"
    } else if (points >= 1000000000000000000000000 && points < 1e27) {
      finalPoints = (points / 1000000000000000000000000).toFixed(1) + "Sp"
    } else if (points >= 1e27 && points < 1e30) {
      finalPoints = (points / 1e27).toFixed(1) + "Oc"
    } else if (points >= 1e30 && points < 1e33) {
      finalPoints = (points / 1e30).toFixed(1) + "No"
    } else if (points >= 1e33 && points < 1e36) {
      finalPoints = (points / 1e33).toFixed(1) + "De"
    } else if (points >= 1e36 && points < 1e39) {
      finalPoints = (points / 1e36).toFixed(1) + "UDe"
    } else if (points >= 1e39 && points < 1e42) {
      finalPoints = (points / 1e39).toFixed(1) + "DDe"
    } else if (points >= 1e42 && points < 1e45) {
      finalPoints = (points / 1e42).toFixed(1) + "TDe"
    } else if (points >= 1e45 && points < 1e48) {
      finalPoints = (points / 1e45).toFixed(1) + "QdDe"
    } else if (points >= 1e48 && points < 1e51) {
      finalPoints = (points / 1e48).toFixed(1) + "QnDe"
    } else if (points >= 1e51 && points < 1e54) {
      finalPoints = (points / 1e51).toFixed(1) + "SxDe"
    } else if (points >= 1e54 && points < 1e57) {
      finalPoints = (points / 1e54).toFixed(1) + "SpDe"
    } else if (points >= 1e57 && points < 1e60) {
      finalPoints = (points / 1e57).toFixed(1) + "OcDe"
    } else if (points >= 1e60 && points < 1e63) {
      finalPoints = (points / 1e60).toFixed(1) + "NoDe"
    } else if (points >= 1e63 && points < 1e66) {
      finalPoints = (points / 1e63).toFixed(1) + "Vt"
    } else if (points >= 1e66 && points < 1e69) {
      finalPoints = (points / 1e66).toFixed(1) + "UVt"
    } else if (points >= 1e69 && points < 1e72) {
      finalPoints = (points / 1e69).toFixed(1) + "DVt"
    } else if (points >= 1e72 && points < 1e75) {
      finalPoints = (points / 1e72).toFixed(1) + "TVt"
    } else if (points >= 1e75 && points < 1e78) {
      finalPoints = (points / 1e75).toFixed(1) + "QdVt"
    } else if (points >= 1e78 && points < 1e81) {
      finalPoints = (points / 1e78).toFixed(1) + "QnVt"
    } else if (points >= 1e81 && points < 1e84) {
      finalPoints = (points / 1e81).toFixed(1) + "SxVt"
    } else if (points >= 1e84 && points < 1e87) {
      finalPoints = (points / 1e84).toFixed(1) + "SpVt"
    } else if (points >= 1e87 && points < 1e90) {
      finalPoints = (points / 1e87).toFixed(1) + "OcVt"
    } else if (points >= 1e90 && points < 1e93) {
      finalPoints = (points / 1e90).toFixed(1) + "NoVt"
    } else if (points >= 1e93 && points < 1e96) {
      finalPoints = (points / 1e93).toFixed(1) + "Tg"
    } else if (points >= 1e96 && points < 1e99) {
      finalPoints = (points / 1e96).toFixed(1) + "qg"
    } else if (points >= 1e99) {
      finalPoints = points.toExponential(1)
    }
    return finalPoints;
  }

  const loginPanel = document.querySelector("#login")
  let hasLogged = localStorage.getItem("loggedIn") === true;

  if (!hasLogged) {
    loginPanel.style.visibility = "visible";
    loginPanel.style.zIndex = "999";
  }

  const cookieBackground = document.getElementById("cookie-bg");
  if (cookieBackground) {
    const cookies = [];
    const cookieAmount = getRandomInt(35, 67);
    const screenWidth = window.innerWidth;
    let screenHeight = cookieBackground.offsetHeight;
    window.addEventListener('resize', () => {
      screenHeight = cookieBackground.offsetHeight;
    });

    for (let i = 0; i < cookieAmount; i++) {
      const cookieWidth = getRandomInt(38, 220);
      const chipsAmount = getRandomInt(3, 10);
      const element = document.createElement("div");
      element.className = "cookie";
      element.style.width = cookieWidth + "px";
      element.style.height = cookieWidth + "px";
      cookieBackground.appendChild(element);

      for (let j = 0; j < chipsAmount; j++) {
        const chip = document.createElement("div");
        chip.className = "cookie-chip";

        const chipsWidth = getRandomInt(9, 31);
        chip.style.width = chipsWidth + "px";
        chip.style.height = chipsWidth + "px";

        const cookieRadius = cookieWidth / 2;
        const chipRadius = chipsWidth / 2;
        const maxDistance = cookieRadius - chipRadius;

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.sqrt(Math.random()) * maxDistance;

        const x = cookieRadius + distance * Math.cos(angle) - chipRadius;
        const y = cookieRadius + distance * Math.sin(angle) - chipRadius;

        chip.style.left = x + "px";
        chip.style.top = y + "px";

        element.appendChild(chip);
      }

      cookies.push({
        element: element,
        x: Math.random() * screenWidth,
        y: Math.random() * screenHeight,
        vx: getRandomFloat(-0.5, 0.5),
        vy: getRandomFloat(-0.5, 0.5),
        rotation: Math.random() * 360,
        rotationSpeed: getRandomFloat(-0.2, 0.2),
        size: cookieWidth,
      });
    }

    function animateCookies() {
      for (const cookie of cookies) {
        cookie.x += cookie.vx;
        cookie.y += cookie.vy;
        cookie.rotation += cookie.rotationSpeed;

        if (cookie.x > screenWidth + cookie.size) {
          cookie.x = -cookie.size;
        } else if (cookie.x < -cookie.size) {
          cookie.x = screenWidth + cookie.size;
        }

        if (cookie.y > screenHeight + cookie.size) {
          cookie.y = -cookie.size;
        } else if (cookie.y < -cookie.size) {
          cookie.y = screenHeight + cookie.size;
        }

        cookie.element.style.left = cookie.x + 'px';
        cookie.element.style.top = cookie.y + 'px';
        cookie.element.style.transform = `rotate(${cookie.rotation}deg)`;
      }

      requestAnimationFrame(animateCookies);
    }

    animateCookies();
  }

  let cookiePoints = Number(localStorage.getItem("cookiePoints")) || 0;
  const pointsCounter = document.getElementById("storeBtn");
  const giantCookie = document.getElementById("giantCookie");

  if (giantCookie) {
    if (cookiePoints < 0) cookiePoints = 0;

    pointsCounter.innerHTML =
      '<i class="fa-solid fa-hand-pointer icon"></i> ' + formatPoints(cookiePoints);
    let pointsPerClick = 1;

    giantCookie.addEventListener("click", (e) => {
      if (e.isTrusted && autoClickerInterval) {
        const autoclickerBtn = document.querySelector("#autoclicker");
        toggleAutoClicker(autoclickerBtn);
        return;
      }

      if (!e.isTrusted) {
        e.stopPropagation();
      }
      if (getRandomInt(1, 1000) === 1) {
        giantCookie.classList.add("rainbow-effect");
      }
      cookiePoints += pointsPerClick;
      let finalPoints = formatPoints(cookiePoints);
      pointsCounter.innerHTML =
        '<i class="fa-solid fa-hand-pointer icon"></i> ' + finalPoints;
      localStorage.setItem("cookiePoints", cookiePoints);

      const color = ["#f4dbd6", "#f0c6c6", "#f5bde6", "#c6a0f6", "#ed8796", "#ee99a0", "#f5a97f", "#eed49f", "#a6da95", "#8bd5ca", "#91d7e3", "#7dc4e4", "#8aadf4", "#b7bdf8", "#cad3f5", "#b8c0e0"]

      const plusedPoints = document.createElement("div");
      plusedPoints.className = "plused-points";
      plusedPoints.innerText = "+" + pointsPerClick;
      plusedPoints.style.color = `${color[getRandomInt(0, 16)]}`
      console.log(color[getRandomInt(0, 16)])
      plusedPoints.style.left = `${e.clientX + window.scrollX}px`;
      plusedPoints.style.top = `${e.clientY + window.scrollY}px`;
      document.body.appendChild(plusedPoints);
      setTimeout(() => plusedPoints.remove(), 1000);
      setTimeout(() => giantCookie.classList.remove("rainbow-effect"), 8000);
    });
  }

  let autoClickerInterval = null;
  function toggleAutoClicker(button) {
    if (autoClickerInterval) {
      clearInterval(autoClickerInterval);
      autoClickerInterval = null;
      if (button) {
        button.classList.remove("active");
      }
    } else {
      autoClickerInterval = setInterval(() => {
        const rect = giantCookie.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y,
        });
        giantCookie.dispatchEvent(clickEvent);
      }, 100);
      if (button) {
        button.classList.add("active");
      }
    }
  }


  document.querySelectorAll(".panCre").forEach((butt) => {
    butt.addEventListener("click", (e) => {
      e.stopPropagation();

      const panelId = butt.id + "-panel";
      const existingPanel = document.getElementById(panelId);

      const buttonRect = butt.getBoundingClientRect();

      const allPanels = document.querySelectorAll(".panel");
      allPanels.forEach((p) => p.remove());

      if (existingPanel) return;

      const panel = document.createElement("div");
      panel.className = "panel";
      panel.id = panelId;
      panel.style.display = "block";

      const pointer = document.createElement("div");
      pointer.className = "panel-pointer";
      pointer.id = panelId + "-pointer";
      panel.appendChild(pointer);

      const content = document.createElement("div");
      content.className = "panel-content"
      content.id = panelId + "-content";
      panel.appendChild(content)

      document.body.appendChild(panel);

      setTimeout(() => {
        const panelRect = panel.getBoundingClientRect();
        const margin = 17;

        const hasSpaceAbove = buttonRect.top - panelRect.height - margin > 0;
        if (hasSpaceAbove) {
          panel.style.top = `${window.scrollY + buttonRect.top - panelRect.height - margin}px`;
          panel.classList.remove("pointer-bottom");
          panel.classList.add("pointer-top");
        } else {
          panel.style.top = `${window.scrollY + buttonRect.bottom + margin}px`;
          panel.classList.remove("pointer-top");
          panel.classList.add("pointer-bottom");
        }

        const centerX = buttonRect.left + window.scrollX + buttonRect.width / 2 - panelRect.width / 2;
        panel.style.left = `${centerX}px`;

        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const panelLeftX = window.scrollX + centerX;
        const panelCenterX = panelLeftX + panelRect.width / 2;
        const pointerOffsetX = buttonCenterX - panelCenterX;
        panel.style.setProperty("--pointer-offset", `${pointerOffsetX}px`);

        panel.style.visibility = "visible";
      }, 0);

      panel.addEventListener("click", (e) => e.stopPropagation());
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".panCre") && !e.target.closest(".panel") && !e.target.closest("#adminBtn")) {
      document.querySelectorAll(".panel").forEach((panel) => {
        panel.remove();
      });
    }
  });

  const adminBtn = document.getElementById("adminBtn");
  const pwdBackdrop = document.querySelector("#backdrop");
  const pwdInput = document.querySelector("#passwdInput");

  function handlePasswordEntry(e) {
    if (e.key === "Enter") {
      if (pwdInput.value === "280112") {
        localStorage.setItem("unlockedAP", "true");
        pwdBackdrop.style.display = "none";
        pwdInput.value = "";
        alert("Access Granted! Click Admin again.");
        pwdInput.removeEventListener("keydown", handlePasswordEntry);
      } else {
        alert("Incorrect Password");
        pwdInput.value = "";
      }
    }
  }

  adminBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let accessAP = localStorage.getItem("unlockedAP") === "true";

    if (accessAP) {
      if (document.getElementById("adminBtn-panel")) return;

      const panel = document.createElement("div");
      panel.className = "panel";
      panel.id = "adminBtn-panel";
      panel.style.display = "block";
      panel.style.visibility = "visible";

      panel.style.position = "fixed";
      panel.style.top = "30%";
      panel.style.left = "50%";
      panel.style.transform = "translateX(-50%)";

      const content = document.createElement("div");
      content.id = "adminBtn-panel-content";
      panel.appendChild(content);
      document.body.appendChild(panel);

      content.innerHTML = `
        <h3 style="text-align:center; margin-bottom: 6px;">Admino Panelo.</h3>
        <button id="autoclicker" class="gC-btn"><i class="fa-hand-pointer fa-solid icon"></i></button>
        <button id="resetter" class="gC-btn"><i class="fa-recycle fa-solid icon"></i></button>
        <button id="pointser" class="gC-btn">
          <i class="fa-solid fa-dollar-sign icon"></i><input id="typerist" type="number" placeholder="How many u want brah?">
        </button>
      `;

      const autoBtn = panel.querySelector("#autoclicker");
      if (autoClickerInterval) autoBtn.classList.add("active");
      autoBtn.addEventListener("click", () => toggleAutoClicker(autoBtn));

      const resetBtn = panel.querySelector("#resetter")
      resetBtn.addEventListener("click", () => {
        cookiePoints = 0;
        localStorage.setItem("cookiePoints", 0);
        pointsCounter.innerHTML = `<i class="fa-solid fa-hand-pointer icon"></i> 0`;
      });

      const input = panel.querySelector("#typerist");
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          cookiePoints = parseInt(input.value) || 0;
          localStorage.setItem("cookiePoints", cookiePoints);
          pointsCounter.innerHTML = `<i class="fa-solid fa-hand-pointer icon"></i> ${formatPoints(cookiePoints)}`;
          input.value = "";
        }
      });

    } else {
      pwdBackdrop.style.display = "flex";
      pwdInput.focus();

      pwdInput.removeEventListener("keydown", handlePasswordEntry);
      pwdInput.addEventListener("keydown", handlePasswordEntry);
    }
  });


  const leaderboardBtn = document.getElementById("leaderboardBtn")
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener("click", () => {
      const content = document.getElementById("leaderboardBtn-panel-content")
      content.innerHTML = `<h3 style="text-align:center;">Leading Boardo</h3>
      `
    })
  }
});

/* (function () {
  const COOKIE_NAME = "ec_leaderboard";
  const COOKIE_DAYS = 365;
  const USERNAME_COOKIE = "ec_username";
  const MAX_SAVED = 50;
  const SHOW_TOP = 10;
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
})(); */