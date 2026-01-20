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
