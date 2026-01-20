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

  const giantCookie = document.getElementById("giantCookie");

  if (giantCookie) {
    let cookiePoints = parseInt(localStorage.getItem("cookiePoints")) || 0;
    if (cookiePoints < 0) cookiePoints = 0;
    const pointsCounter = document.getElementById("storeBtn");
    pointsCounter.innerHTML =
      '<i class="fa-solid fa-hand-pointer icon"></i> ' + cookiePoints;
    let pointsPerClick = 1;

    giantCookie.addEventListener("click", (e) => {
      if (getRandomInt(1, 100) === 1) {
        giantCookie.classList.add("rainbow-effect");
      }
      cookiePoints += pointsPerClick;
      pointsCounter.innerHTML =
        '<i class="fa-solid fa-hand-pointer icon"></i> ' + cookiePoints;
      localStorage.setItem("cookiePoints", cookiePoints);
      const plusedPoints = document.createElement("div");
      plusedPoints.className = "plused-points";
      plusedPoints.innerText = "+" + pointsPerClick;
      plusedPoints.style.left = `${e.clientX + window.scrollX}px`;
      plusedPoints.style.top = `${e.clientY + window.scrollY}px`;
      console.log(e.clientX, e.clientY);
      document.body.appendChild(plusedPoints);
      setTimeout(() => plusedPoints.remove(), 1000);
      setTimeout(() => giantCookie.classList.remove("rainbow-effect"), 67000);
    });
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
      content.classname = "panel-content"
      content.id = panelId + "-content";
      panel.appendChild(content)

      document.body.appendChild(panel);

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

      const centerX =
        buttonRect.left + window.scrollX + buttonRect.width / 2 - panelRect.width / 2;
      panel.style.left = `${centerX}px`;

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const panelLeftX = window.scrollX + centerX;
      const panelCenterX = panelLeftX + panelRect.width / 2;
      const pointerOffsetX = buttonCenterX - panelCenterX;
      panel.style.setProperty("--pointer-offset", `${pointerOffsetX}px`);

      panel.style.visibility = "visible";

      panel.addEventListener("click", (e) => e.stopPropagation());
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".panel").forEach((panel) => {
      panel.remove();
    });
  });

  const adminBtn = document.getElementById("adminBtn")
  adminBtn.addEventListener("click", () => {
    const adminContent = document.getElementById("adminBtn-panel-content")
    adminContent.innerHTML = `
      <h3 style="text-decoration:underline wavy; margin-bottom: 4px;">Admino Panelo.</h3>
      <button id="autoclicker" class="gC-btn"><i class="fa-hand-pointer fa-solid"></i></button>
      <button id="resetter" class="gC-btn"><i class="fa-recycle fa-solid"></i></button>
    `
  })
});

// Robust client auth for Econ-Cook
// - Better error messages (shows server message, HTTP status, or network error)
// - Accepts several token field names returned by server
// - Logs full responses to console for easier debugging
// Set API_BASE if your backend runs on another origin, e.g. "http://localhost:5000"
(() => {
  const API_BASE = ""; // <-- set to backend origin if needed
  const TOKEN_KEY = "econcook_token";

  function log(...args) { console.log("[EconCookAuth]", ...args); }
  function errlog(...args) { console.error("[EconCookAuth]", ...args); }

  function saveToken(token) { localStorage.setItem(TOKEN_KEY, token); }
  function loadToken() { return localStorage.getItem(TOKEN_KEY); }
  function clearToken() { localStorage.removeItem(TOKEN_KEY); }

  async function apiPost(path, body) {
    try {
      const res = await fetch(API_BASE + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "omit",
      });

      let text;
      try {
        text = await res.text();
      } catch (tErr) {
        text = "";
      }

      // Try to parse JSON, but preserve raw text for debugging
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        data = { __raw: text };
      }

      log("apiPost", path, "status=", res.status, "body=", data);
      return { ok: res.ok, status: res.status, data, statusText: res.statusText };
    } catch (networkErr) {
      errlog("apiPost network error:", networkErr);
      return { ok: false, status: 0, data: { error: "network_error", details: String(networkErr) } };
    }
  }

  function $(id) { return document.getElementById(id); }

  // Try to create modal/app if missing (keeps integration simple)
  function injectUIIfMissing() {
    if (!$("authModal")) {
      document.body.insertAdjacentHTML("beforeend", `
        <div id="authModal" class="modal" style="display:flex;position:fixed;inset:0;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);z-index:9999;">
          <div class="modal-content" style="width:360px;background:#fff;padding:18px;border-radius:10px;">
            <h2 id="modalTitle">Login</h2>
            <div class="mode-switch">
              <button id="switchLogin" class="active">Login</button>
              <button id="switchCreate">Create Account</button>
            </div>
            <form id="authForm">
              <label for="username">Username</label>
              <input id="username" name="username" required>
              <label for="password">Password</label>
              <input id="password" name="password" type="password" required>
              <div class="actions"><button type="submit" id="submitBtn">Log in</button></div>
            </form>
            <div id="authMessage" class="message" style="margin-top:8px;color:#b33;"></div>
          </div>
        </div>
      `);
      log("Injected auth modal into DOM.");
    }

    if (!$("app-content")) {
      document.body.insertAdjacentHTML("beforeend", `
        <section id="app-content" class="hidden" style="display:none;margin-top:18px;padding:16px;background:#fff;border-radius:10px;">
          <h2 id="greeting">Hello!</h2>
          <p>You are logged in.</p>
          <button id="logoutBtn">Log out</button>
        </section>
      `);
      log("Injected app-content into DOM.");
    }
  }

  async function initAuth() {
    injectUIIfMissing();

    const modal = $("authModal");
    const modalTitle = $("modalTitle");
    const switchLogin = $("switchLogin");
    const switchCreate = $("switchCreate");
    const authForm = $("authForm");
    const usernameInput = $("username");
    const passwordInput = $("password");
    const submitBtn = $("submitBtn");
    const messageDiv = $("authMessage");
    const appContent = $("app-content");
    const greeting = $("greeting");
    const logoutBtn = $("logoutBtn");

    if (!authForm || !modal || !usernameInput || !passwordInput || !submitBtn || !messageDiv || !appContent || !greeting || !logoutBtn) {
      errlog("Auth UI initialization failed: missing elements");
      return;
    }

    let mode = "login";
    function setMessage(text, color = "#b33") {
      messageDiv.style.color = color;
      messageDiv.textContent = text;
    }

    function setMode(m) {
      mode = m;
      modalTitle.textContent = (m === "login") ? "Login" : "Create Account";
      submitBtn.textContent = (m === "login") ? "Log in" : "Create";
      if (switchLogin) switchLogin.classList.toggle("active", m === "login");
      if (switchCreate) switchCreate.classList.toggle("active", m === "create");
      setMessage("");
    }

    if (switchLogin) switchLogin.addEventListener("click", () => setMode("login"));
    if (switchCreate) switchCreate.addEventListener("click", () => setMode("create"));

    function extractToken(respData) {
      if (!respData) return null;
      return respData.access_token || respData.token || respData.accessToken || respData.access || null;
    }

    async function handleRegister(username, password) {
      const resp = await apiPost("/api/register", { username, password });
      if (!resp.ok) {
        const serverMsg = resp.data && (resp.data.error || resp.data.message || resp.data.__raw);
        // Special case 409 -> username exists
        if (resp.status === 409) throw new Error(serverMsg || "Username already exists.");
        throw new Error(serverMsg || `Server error (${resp.status || "network"})`);
      }
      const token = extractToken(resp.data);
      if (!token) throw new Error("Server didn't return an access token. See console for response.");
      saveToken(token);
      return resp.data.username || username;
    }

    async function handleLogin(username, password) {
      const resp = await apiPost("/api/login", { username, password });
      if (!resp.ok) {
        const serverMsg = resp.data && (resp.data.error || resp.data.message || resp.data.__raw);
        throw new Error(serverMsg || `Invalid credentials or server error (${resp.status || "network"})`);
      }
      const token = extractToken(resp.data);
      if (!token) throw new Error("Server didn't return an access token. See console for response.");
      saveToken(token);
      return resp.data.username || username;
    }

    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      if (!username || !password) {
        setMessage("Enter both username and password.");
        return;
      }
      submitBtn.disabled = true;
      setMessage(""); // clear
      try {
        let resultUsername;
        if (mode === "create") {
          if (!/^[A-Za-z0-9_\-]{3,30}$/.test(username)) throw new Error("Username must be 3–30 chars: letters, numbers, - or _");
          resultUsername = await handleRegister(username, password);
          setMessage("Account created. Logged in.", "#1a7");
        } else {
          resultUsername = await handleLogin(username, password);
          setMessage("Login successful.", "#1a7");
        }
        onLoginSuccess(resultUsername);
      } catch (err) {
        // Show clear, actionable message
        const show = (err && err.message) ? err.message : "An unknown error occurred. See console.";
        setMessage(show);
        errlog("Auth submit error:", err);
      } finally {
        submitBtn.disabled = false;
      }
    });

    function onLoginSuccess(username) {
      greeting.textContent = `Hello, ${username}!`;
      appContent.classList.remove("hidden");
      appContent.style.display = "";
      modal.style.display = "none";
      usernameInput.value = "";
      passwordInput.value = "";
    }

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearToken();
      appContent.classList.add("hidden");
      appContent.style.display = "none";
      setMode("login");
      modal.style.display = "flex";
      usernameInput.focus();
    });

    // Try resume session
    const token = loadToken();
    if (token) {
      try {
        const res = await fetch(API_BASE + "/api/profile", {
          method: "GET",
          headers: { "Authorization": "Bearer " + token }
        });
        let bodyText = await res.text().catch(() => "");
        let data = {};
        try { data = bodyText ? JSON.parse(bodyText) : {}; } catch { data = { __raw: bodyText }; }
        log("/api/profile", "status=", res.status, "body=", data);
        if (res.ok && data.username) {
          onLoginSuccess(data.username);
          return;
        } else {
          // expired/invalid token -> clear and show login
          clearToken();
        }
      } catch (networkErr) {
        errlog("Profile fetch failed:", networkErr);
        // keep token cleared to let user re-login
        clearToken();
      }
    }

    // show modal if no active session
    modal.style.display = "flex";
    usernameInput.focus();
    setMode("login");
  }

  // initialize when DOM is ready
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", initAuth);
  } else {
    initAuth();
  }

  // Helpful debug tips — exposed on window
  window.EconCookAuthDebug = {
    API_BASE: () => API_BASE,
    currentToken: () => loadToken(),
    clearToken: () => clearToken(),
  };
})();