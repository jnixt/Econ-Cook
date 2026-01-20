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

// Client-side account management using localStorage + Web Crypto (PBKDF2)
// Stores users under localStorage key: "econcook_users"
// Each user record: { salt: string(base64), hash: string(base64) }

(() => {
  const STORAGE_KEY = 'econcook_users';
  const ITERATIONS = 150_000; // PBKDF2 iterations
  const KEY_LEN = 256; // bits

  // --- Helpers -------------------------------------------------------------
  const enc = new TextEncoder();

  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function getStoredUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error('Failed to read users from localStorage', e);
      return {};
    }
  }
  function saveUsers(obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }

  // PBKDF2 derive
  async function deriveKeyBase64(password, saltBase64) {
    const saltBuf = base64ToArrayBuffer(saltBase64);
    const pwKey = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    const derived = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBuf, iterations: ITERATIONS, hash: 'SHA-256' },
      pwKey,
      KEY_LEN
    );
    return arrayBufferToBase64(derived);
  }

  function makeSaltBase64() {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return arrayBufferToBase64(arr.buffer);
  }

  // --- Account logic -------------------------------------------------------
  async function createUser(username, password) {
    const users = getStoredUsers();
    if (users[username]) {
      throw new Error('Username already exists');
    }
    const salt = makeSaltBase64();
    const hash = await deriveKeyBase64(password, salt);
    users[username] = { salt, hash, created_at: new Date().toISOString() };
    saveUsers(users);
    return true;
  }

  async function verifyUser(username, password) {
    const users = getStoredUsers();
    const record = users[username];
    if (!record) return false;
    const hash = await deriveKeyBase64(password, record.salt);
    // timing-attack resilience not critical here (client side demo)
    return hash === record.hash;
  }

  // --- UI ---------------------------------------------------------------
  const modal = document.getElementById('authModal');
  const modalTitle = document.getElementById('modalTitle');
  const switchLogin = document.getElementById('switchLogin');
  const switchCreate = document.getElementById('switchCreate');
  const authForm = document.getElementById('authForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');
  const messageDiv = document.getElementById('authMessage');
  const appContent = document.getElementById('app-content');
  const greeting = document.getElementById('greeting');
  const logoutBtn = document.getElementById('logoutBtn');

  let mode = 'login'; // or 'create'
  let currentUser = null;

  function setMode(newMode) {
    mode = newMode;
    if (mode === 'login') {
      modalTitle.textContent = 'Login';
      submitBtn.textContent = 'Log in';
      switchLogin.classList.add('active');
      switchCreate.classList.remove('active');
      passwordInput.placeholder = '';
    } else {
      modalTitle.textContent = 'Create Account';
      submitBtn.textContent = 'Create';
      switchLogin.classList.remove('active');
      switchCreate.classList.add('active');
      passwordInput.placeholder = '';
    }
    messageDiv.textContent = '';
  }

  switchLogin.addEventListener('click', () => setMode('login'));
  switchCreate.addEventListener('click', () => setMode('create'));

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageDiv.style.color = '#b33';
    messageDiv.textContent = '';

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      messageDiv.textContent = 'Please enter both username and password.';
      return;
    }

    submitBtn.disabled = true;
    try {
      if (mode === 'create') {
        // basic username validation
        if (!/^[A-Za-z0-9_\-]{3,30}$/.test(username)) {
          throw new Error('Username must be 3–30 chars: letters, numbers, - or _');
        }
        await createUser(username, password);
        messageDiv.style.color = '#1a7';
        messageDiv.textContent = 'Account created successfully — you are now logged in.';
        onLoginSuccess(username);
      } else {
        const ok = await verifyUser(username, password);
        if (!ok) {
          messageDiv.textContent = 'Invalid username or password.';
        } else {
          messageDiv.style.color = '#1a7';
          messageDiv.textContent = 'Login successful.';
          onLoginSuccess(username);
        }
      }
    } catch (err) {
      console.error(err);
      messageDiv.textContent = err.message || String(err);
    } finally {
      submitBtn.disabled = false;
    }
  });

  function onLoginSuccess(username) {
    currentUser = username;
    hideModal();
    showAppForUser(username);
  }

  function hideModal() {
    if (modal) modal.style.display = 'none';
  }

  function showModal() {
    if (modal) modal.style.display = 'flex';
  }

  function showAppForUser(username) {
    greeting.textContent = `Hello, ${username}!`;
    appContent.classList.remove('hidden');
  }

  logoutBtn.addEventListener('click', () => {
    currentUser = null;
    appContent.classList.add('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
    setMode('login');
    messageDiv.textContent = '';
    showModal();
  });

  // On load: show modal. If someone is already "logged in" in this demo, you'd need a persisted session.
  // For this simple demo we'll always prompt on page load.
  setMode('login');
  showModal();

  // Expose small debug API on window (optional)
  window.EconCookAuth = {
    listUsers: () => getStoredUsers(),
    clearUsers: () => { localStorage.removeItem(STORAGE_KEY); },
  };
})();