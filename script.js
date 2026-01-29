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

  function typingAnim(element, newText, duration) {
    const oldText = element.textContent;
    const backspaceCount = oldText.length;
    const typeCount = newText.length;
    const totalSteps = backspaceCount + typeCount;

    if (totalSteps === 0) return;

    const stepDuration = duration / totalSteps;

    let i = backspaceCount;

    function backspace() {
      if (i > 0) {
        element.textContent = oldText.substring(0, i - 1);
        i--;
        setTimeout(backspace, stepDuration);
      } else {
        element.textContent = "";
        i = 0;
        setTimeout(type, stepDuration);
      }
    }

    function type() {
      if (i < typeCount) {
        element.textContent = newText.substring(0, i + 1);
        i++;
        setTimeout(type, stepDuration);
      }
    }

    backspace();
  }

  function formatPoints(points) {
    let finalPoints = points;
    if (points >= 1000 && points < 1000000) {
      finalPoints = (points / 1000).toFixed(1) + "K"
    } else if (points >= 1e3 && points < 1e6) {
      finalPoints = (points / 1e3).toFixed(1) + "M"
    } else if (points >= 1e6 && points < 1e9) {
      finalPoints = (points / 1e6).toFixed(1) + "B"
    } else if (points >= 1e9 && points < 1e12) {
      finalPoints = (points / 1e9).toFixed(1) + "T"
    } else if (points >= 1e12 && points < 1e15) {
      finalPoints = (points / 1e12).toFixed(1) + "Qa"
    } else if (points >= 1e15 && points < 1e18) {
      finalPoints = (points / 1e18).toFixed(1) + "Qi"
    } else if (points >= 1e21 && points < 1e24) {
      finalPoints = (points / 1e21).toFixed(1) + "Sx"
    } else if (points >= 1e24 && points < 1e27) {
      finalPoints = (points / 1e24).toFixed(1) + "Sp"
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

  async function getUpgrades() {
    try {
      const response = await fetch("./stuffs/upgrades.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching upgrades:", error);
      return null;
    }
  }

  let purchasedUpgrades = JSON.parse(localStorage.getItem('purchasedUpgrades')) || {};
  let pointsPerClick = 1;

  function applyUpgrade(category, level, levelData) {
    const giantCookie = document.getElementById("giantCookie");
    if (category === "Features") {
        if (level === "Base") {
            if (!document.querySelector(".giantCookieEyes")) {
                const eyes = document.createElement("div");
                eyes.className = "giantCookieEyes";
                eyes.innerHTML = `<div id="left-eye"></div><div id="right-eye"></div>`;
                giantCookie.appendChild(eyes);
            }
            if (!document.getElementById("giantCookieMouth")) {
                const mouth = document.createElement("div");
                mouth.id = "giantCookieMouth";
                giantCookie.appendChild(mouth);
            }
        } else if (level === "Extra") {
            document.querySelectorAll('.cookie-chip-upgrade').forEach(e => e.remove());
            const chipsAmount = getRandomInt(10, 20);
            for (let j = 0; j < chipsAmount; j++) {
                const chip = document.createElement("div");
                chip.className = "cookie-chip cookie-chip-upgrade";
                const chipsWidth = getRandomInt(9, 31);
                chip.style.width = chipsWidth + "px";
                chip.style.height = chipsWidth + "px";
                const cookieRadius = giantCookie.offsetWidth / 2;
                const chipRadius = chipsWidth / 2;
                const maxDistance = cookieRadius - chipRadius;
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.sqrt(Math.random()) * maxDistance;
                const x = cookieRadius + distance * Math.cos(angle) - chipRadius;
                const y = cookieRadius + distance * Math.sin(angle) - chipRadius;
                chip.style.left = x + "px";
                chip.style.top = y + "px";
                giantCookie.appendChild(chip);
            }
        } else if (level === "God") {
            const hair = document.getElementById("giantCookieHair");
            hair.innerHTML = `<svg width="75" height="100">
              <path d="M 50 90 C 45 70, 40 50, 45 35 C 50 20, 75 25, 70 45 C 65 60, 45 55, 52 40"
                  stroke="rgba(0, 0, 0, 0.8)" stroke-width="6" fill="none"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`;
        }
    } else if (category === "Autoclicker") {
        if (window.autoclickerUpgradeInterval) {
            clearInterval(window.autoclickerUpgradeInterval);
        }

        if (levelData.Speed > 0) {
            window.autoclickerUpgradeInterval = setInterval(() => {
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
            }, 1000 / levelData.Speed);
        }
    } else if (category === "Strength") {
        pointsPerClick = levelData.Points;
    }
  }

  async function purchaseUpgrade(category, level, price) {
    price = Number(price);
    if (cookiePoints >= price) {
        cookiePoints -= price;
        localStorage.setItem("cookiePoints", cookiePoints);
        pointsCounter.innerHTML =
            '<i class="fa-solid fa-hand-pointer icon"></i> ' + formatPoints(cookiePoints);

        const upgrades = await getUpgrades();
        const categoryLevels = Object.keys(upgrades[category].Levels);
        const levelIndex = categoryLevels.indexOf(level);

        purchasedUpgrades[category] = levelIndex;

        localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));

        const storePanelContent = document.getElementById('storeBtn-panel-content');
        if (storePanelContent) {
            populateStorePanel(storePanelContent);
        }

        applyUpgrade(category, level, upgrades[category].Levels[level]);
    } else {
        alert("Not enough points!");
    }
  }

  async function populateStorePanel(panelContent) {
    const upgrades = await getUpgrades();
    if (upgrades) {
        let content = '<h3 style="text-align:center; margin-bottom: 6px;">Store</h3>';
        const cookieIcon = await fetch('./stuffs/svgs/realistic-cookie.svg').then(res => res.text());

        for (const category in upgrades) {
            const categoryUpgrades = upgrades[category];
            const categoryLevels = Object.keys(categoryUpgrades.Levels);
            const totalLevels = categoryLevels.length;

            if (purchasedUpgrades[category] === undefined) {
                purchasedUpgrades[category] = -1;
            }

            const currentLevelIndex = purchasedUpgrades[category];
            const nextLevelIndex = currentLevelIndex + 1;

            const iconSvg = await fetch(categoryUpgrades.Icon).then(res => res.text());

            if (nextLevelIndex < totalLevels) {
                const nextLevelName = categoryLevels[nextLevelIndex];
                const nextLevelData = categoryUpgrades.Levels[nextLevelName];
                const canAfford = cookiePoints >= nextLevelData.Price;
                const priceColorClass = canAfford ? 'affordable' : 'unaffordable';
                let itemClass = canAfford ? '' : 'insufficient';
                if(nextLevelData.Points){
                  itemClass += ' click-upgrade';
                }

                content += `
                    <button class="upgrade-item ${itemClass}" data-category="${category}" data-level="${nextLevelName}" data-price="${nextLevelData.Price}" title="${categoryUpgrades.Description}">
                        <div class="upgrade-icon">${iconSvg}</div>
                        <div class="upgrade-details">
                            <strong>${nextLevelName}</strong>
                            <div class="price-container">
                              <span class="cookie-icon">${cookieIcon}</span>
                              <span class="price-value ${priceColorClass}">${formatPoints(nextLevelData.Price)}</span>
                            </div>
                        </div>
                        <div class="upgrade-level-indicator" style="transform: scaleY(1.2); font-size: 2rem;">${nextLevelIndex}</div>
                    </button>
                `;
            } else {
                 content += `
                    <div class="upgrade-item" title="${categoryUpgrades.Description}">
                        <div class="upgrade-icon">${iconSvg}</div>
                        <div class="upgrade-details">
                            <p>Max level reached!</p>
                        </div>
                        <div class="upgrade-level-indicator" style="transform: scaleY(1.2); font-size: 2rem;">${nextLevelIndex}</div>
                    </div>
                `;
            }
        }
        panelContent.innerHTML = content;

        panelContent.querySelectorAll('.upgrade-item[data-price]').forEach(button => {
            button.addEventListener('click', (e) => {
                const ds = e.currentTarget.dataset;
                purchaseUpgrade(ds.category, ds.level, ds.price)
            });
        });
    }
}

  async function applyInitialUpgrades() {
    const upgrades = await getUpgrades();
    if (!upgrades) return;
    for (const category in purchasedUpgrades) {
        const levelIndex = purchasedUpgrades[category];
        if (levelIndex > -1) {
            const categoryLevels = Object.keys(upgrades[category].Levels);
            for(let i = 0; i <= levelIndex; i++){
                const levelName = categoryLevels[i];
                applyUpgrade(category, levelName, upgrades[category].Levels[levelName]);
            }
        }
    }
  }

  applyInitialUpgrades();

/*   function updateRecipeUnlockStates() {
    let unlockedCount = 0;
    recipeContainers.forEach((container, index) => {
      const threshold = getRecipeUnlockThreshold(index);
      const isUnlocked = cookiePoints >= threshold;

      if (isUnlocked) {
        container.classList.add("unlocked");
        unlockedCount++;
      } else {
        container.classList.remove("unlocked");
        container.setAttribute("data-unlock-threshold", threshold);
      }
    });

    localStorage.setItem("unlockedRecipes", unlockedCount);
  }

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("pageScrolled", JSON.stringify([window.scrollX, window.scrollY]));
  }) */

  const pagePosition = JSON.parse(localStorage.getItem("pageScrolled"));

  if (pagePosition) {
    window.scrollTo({
      left: parseInt(pagePosition[0], 10),
      top: parseInt(pagePosition[1], 10),
      behavior: 'instant'
    });
  }

  const searchInput = document.getElementById("searchInput");
  const resepContainers = document.querySelectorAll(".resep-container");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().replace(/ /g, "-");;

    resepContainers.forEach((container) => {
      const resepId = container.id.toLowerCase();
      if (resepId.includes(searchTerm)) {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
    });
  });

  const cookieBackground = document.getElementById("cookie-bg")
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
  const pointsCounter = document.querySelector("#pointsDisplay");
  const giantCookie = document.getElementById("giantCookie");

  function getRecipeUnlockThreshold(index) {
    return Math.round(10 * Math.E ** index);
  }

  const recipeContainers = document.querySelectorAll(".resep-container.pageCre");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("resep-container-hidden");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  recipeContainers.forEach((container) => {
    container.classList.add("resep-container-hidden");
    observer.observe(container);
  });
  /* updateRecipeUnlockStates(); */

  if (giantCookie) {
    if (cookiePoints < 0) cookiePoints = 0;

    pointsCounter.innerHTML =
      '<i class="fa-solid fa-hand-pointer icon"></i> ' + formatPoints(cookiePoints);

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

      /* updateRecipeUnlockStates(); */

      const color = ["#f4dbd6", "#f0c6c6", "#f5bde6", "#c6a0f6", "#ed8796", "#ee99a0", "#f5a97f", "#eed49f", "#a6da95", "#8bd5ca", "#91d7e3", "#7dc4e4", "#8aadf4", "#b7bdf8", "#cad3f5", "#b8c0e0"]

      const existingPlusedPoints = document.querySelectorAll('.plused-points');
      if (existingPlusedPoints.length < 67) {
        const plusedPoints = document.createElement("div");
        plusedPoints.className = "plused-points";
        plusedPoints.innerText = "+" + pointsPerClick;
        plusedPoints.style.color = `${color[getRandomInt(0, 15)]} `
        plusedPoints.style.left = `${e.clientX + window.scrollX}px`;
        plusedPoints.style.top = `${e.clientY + window.scrollY}px`;
        document.body.appendChild(plusedPoints);
        setTimeout(() => plusedPoints.remove(), 1000);
      }
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

      let panelId;
      if (butt.classList.contains('nameBtn') && butt.dataset.index) {
        panelId = `nameBtn - ${butt.dataset.index} -panel`;
      } else {
        panelId = butt.id + "-panel";
      }

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

      if (butt.id === "storeBtn") {
        populateStorePanel(content);
      }

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

        const centerX = window.scrollX + buttonRect.left + buttonRect.width / 2 - panelRect.width / 2;
        panel.style.left = `${centerX}px`;

        const buttonCenterX = window.scrollX + buttonRect.left + buttonRect.width / 2;
        const panelCenterX = centerX + panelRect.width / 2;
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
  const adminPwdPanel = document.querySelector("#adminPwdPanel");

  function closeAdminPanel() {
    const adminPanel = document.getElementById("adminBtn-panel");
    if (adminPanel) {
      adminPanel.remove();
    }
    pwdBackdrop.style.visibility = "hidden";
  }

  function handlePasswordEntry(e) {
    if (e.key === "Enter") {
      if (pwdInput.value === "280112") {
        localStorage.setItem("unlockedAP", "true");
        pwdBackdrop.style.visibility = "hidden";
        adminPwdPanel.style.visibility = "hidden";
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

      panel.addEventListener("click", (e) => e.stopPropagation());

      const content = document.createElement("div");
      content.id = "adminBtn-panel-content";
      panel.appendChild(content);
      document.body.appendChild(panel);

      content.innerHTML = `
  <h3 style = "text-align:center; margin-bottom: 6px;" > Admino Panelo.</h3>
        <button id="resetter" class="gC-btn"><i class="fa-recycle fa-solid icon"></i></button>
        <button id="pointser" class="gC-btn">
          <i class="fa-solid fa-dollar-sign icon"></i><input id="typerist" type="number" placeholder="How many u want brah?" style="border: none; padding: 2px;">
        </button>
`;


      const resetBtn = panel.querySelector("#resetter")
      resetBtn.addEventListener("click", () => {
        cookiePoints = 0;
        localStorage.setItem("cookiePoints", 0);
        pointsCounter.innerHTML = `<i class="fa-solid fa-hand-pointer icon"></i> 0`;
        /* updateRecipeUnlockStates() */
      });

      const input = panel.querySelector("#typerist");
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          cookiePoints = parseInt(input.value) || 0;
          localStorage.setItem("cookiePoints", cookiePoints);
          pointsCounter.innerHTML = `<i class="fa-solid fa-hand-pointer icon" ></i> ${formatPoints(cookiePoints)} `;
          input.value = "";
          /* updateRecipeUnlockStates() */
        }
      });

    } else {
      pwdBackdrop.style.visibility = "visible";
      adminPwdPanel.style.visibility = "visible";
      pwdInput.focus();

      pwdInput.removeEventListener("keydown", handlePasswordEntry);
      pwdInput.addEventListener("keydown", handlePasswordEntry);
    }
  });

  pwdBackdrop.addEventListener("click", (e) => {
    if (e.target === pwdBackdrop) {
      closeAdminPanel();
      adminPwdPanel.style.visibility = "hidden";
      pwdInput.value = "";
      pwdInput.removeEventListener("keydown", handlePasswordEntry);
    }
  });

  document.querySelectorAll(".pageCre").forEach((butt) => {
    butt.addEventListener("click", (e) => {
      /* if (!butt.classList.contains("unlocked")) {
        return;
      } */

      const buttonRect = butt.getBoundingClientRect();
      const buttonX = buttonRect.left + buttonRect.width / 2;
      const buttonY = buttonRect.top + buttonRect.height / 2;

      const page = document.createElement("div");
      page.id = butt.id + "-page";
      page.className = "page";
      page.style.setProperty("--origin-x", buttonX + "px");
      page.style.setProperty("--origin-y", buttonY + "px");

      const buttonColor = window.getComputedStyle(butt).backgroundColor;
      page.style.setProperty("--expand-color", buttonColor);

      const content = document.createElement("div");
      content.id = page.id + "-content";
      content.className = "page-content";
      const img = butt.querySelector("img");
      const title = butt.querySelector("h3");
      const ingredients = butt.querySelector(".ingredients");

      if (img) {
        content.appendChild(img.cloneNode(true));
      }
      if (title) {
        content.appendChild(title.cloneNode(true));
      }
      if (ingredients) {
        content.appendChild(ingredients.cloneNode(true));
      }
      page.appendChild(content);

      const closer = document.createElement("div");
      closer.id = page.id + "-closer";
      closer.className = "page-closer";
      closer.innerHTML = `<i class="fa-solid fa-x icon" style = "color: #f38ba8;"></i> `
      closer.style.position = "absolute";
      closer.style.cursor = "pointer";
      closer.style.top = "3%";
      closer.style.right = "8%";
      page.appendChild(closer)

      document.body.appendChild(page);

      setTimeout(() => {
        page.classList.add("expand");
      }, 10);

      const closePageFunc = () => {
        page.classList.remove("expand");
        setTimeout(() => page.remove(), 400);
      };

      page.addEventListener("click", (clickEvent) => {
        if (clickEvent.target === page || clickEvent.target.closest(".page-closer")) {
          closePageFunc();
        }
      });
    });
  });

  const creditsLanguager = document.getElementById("credits-language");
  const languageToggle = creditsLanguager.querySelector(".language-toggle");
  const toggleSlider = creditsLanguager.querySelector(".toggle-slider");

  toggleSlider.addEventListener("click", () => {
    const isID = languageToggle.dataset.language === "ID";
    languageToggle.dataset.language = isID ? "EN" : "ID";
    toggleSlider.classList.toggle("active");
  });

  document.querySelectorAll(".nameBtn").forEach((butt) => {
    const ID_messages = [
      //Jeffris
      "Pengguna Arch-Hyprland OS yang code website ini dari nol (sampai beberapa kali) menggunakan HTML, CSS, dan JS (tentunya). Sambil belajar cara menggunakan Git dan Github, orang ini speedrun nge-coding sampai hasilnya jadi sebagus ini. Iya, iya, website ini masih memiliki beberapa bug dan fitur-fitur yang kurang, karena deadlinenya hanya dua minggu... Apapun itu, enjoy websitenya! Oh, dan yang terakhir - dia akan 'mog' kalian (100% ga ditulis jeffris)",
      //Ryan
      "Seorang pengangguran yang tidak bisa melakukan apa-apa ini entah bagaimana mendapatkan pekerjaan untuk membantu dalam membuat website ini. Tanpa Beliau, akan ada beberpa fitur yang tidak bisa diakses sampai sekarang, dan Shwcehneiger™ mungkin tidak sempat membuat page yang dibuat khusus untuk credit anggota (iya, saya yang buat page ini)",
      //Steven
      "Resep-resep di website ini dicari & diketik oleh saya. Saya juga merupakan salah satu anggota yang membantu memasak cookie.",
      //Simon
      "Juara 3 di lomba CALC Design 2025 😎. Video diedit oleh saya, asisten virtual dibuat oleh saya, cookienya pun dibuat saya. Kayaknya yang kerja cuma saya ya 😡",
      //Marvel
      "Meskipun rapornya menunjukkan nilai yang tidak selalu mencolok—namun bahkan yang terendah pun tetap berada di atas KKM—ia adalah sosok yang tidak layak dianggap sepele. Angka-angka itu gagal menjangkau wilayah tempat ia benar-benar berkuasa: seni rupa, fotografi, dan ranah kreatif serupa, di mana kreativitasnya bergerak tenang namun mendalam, melampaui batas penilaian formal. Dalam keheningan yang ia pelihara, tersimpan delusi keagungan yang anggun—keyakinan bahwa dunia berjalan dengan hukum yang hanya dipahami oleh mereka yang cukup sabar mengamatinya. Ia menyerap realitas melalui cerita dan simbol, menonton lebih dari lima puluh anime setiap musim seolah sedang mempelajari arsip tak tertulis tentang manusia dan takdir. Maka berterima kasihlah kepadanya, karena dari balik bayangan itulah lahir desain karakter virtual perempuan di website ini, sebuah jejak halus dari pengaruh yang jarang disadari, namun nyata. (designer dan cameramen)",
      //Angeline
      "Berterima kasihlah kepada saya, karena foto-foto kalian akan jelek kalau tanpa HP saya hehehe. Oh ya, saya juga berperan sebagai cameramen yang merekam dan memfoto hampir semua scene-scene penting dalam progres grup ini. Saya juga membantu dalam masak cookienya, jadi jangan bilang gak enak >:(",
      //Beverlyn
      "Aku bukan orang yang melakukan semuanya—dan justru karena itu, sekitar delapan puluh persen proses pembuatan cookies berjalan di tanganku. Angka yang terdengar sederhana, hampir tidak pantas dibanggakan, namun cukup untuk memastikan sisanya tidak salah arah. Aku menakar bahan di atas timbangan dengan patuh pada angka di buku resep, setia pada hal-hal kecil yang sering dianggap berlebihan oleh mereka yang suka “kira-kira”. Tanpa banyak bicara dan tanpa perlu tampil, aku membiarkan adonan membuktikan kemampuannya sendiri. Pada akhirnya, cookies jadi, dapur tetap rapi, dan semua orang kenyang—sebuah keberhasilan bersama yang kebetulan sangat bergantung pada ketelitian yang katanya biasa saja.",
      //Pangestu
      "Ia pendek, sebuah kelebihan fungsional yang membuat keberadaannya selalu efisien. Gerak-geraknya biasa saja dan tidak mencolok, mutu langka yang menyelamatkannya dari kerepotan tampil. Pada foto kali ini ia tampak sangat tinggi—sebuah prestasi visual yang sepenuhnya lahir dari keputusan orang lain yang mengambil gambar dari bawah. Tentang dirinya, banyak hal tidak diketahui, dan itu justru bukti keberhasilan menjaga privasi secara konsisten. Ketika yang lain duduk, ia berdiri di sudut, memberi kontribusi nyata dengan sekadar tetap berada di posisi yang tepat. Ia sangat membantu dalam menakar bahan di atas timbangan sesuai angka di buku resep, mencuci piring tanpa meninggalkan jejak, dan yang paling konsisten dari semuanya: ia tidak pernah terlambat—karena ketepatan waktu, seperti kebersihan dan takaran, adalah bentuk disiplin yang tidak perlu diumumkan."
    ];
    const EN_messages = [
      //Jeffris
      "An Arch-Hyprland OS User who coded the website from zero (many times) using HTML, CSS, and JS (ofcourse). While also learning how to use Git and Github, this person speedran the coding till the result became as good as this. Yes, yes, this website still has some bugs and missing features, because the deadline is only two weeks... Despite that, enjoy the website! Oh and lastly, he will 'mog' you (100% not written by jeffris).",
      //Ryan
      "This unemployed, helpless man somehow found work helping build this website. Without him, some features would be inaccessible, and Shwcehneiger™ might not have had the chance to create a dedicated member credits page (yes, I created this page).",
      //Steven
      "I found the recipies and I am one of the members who contributed in cooking cookies.",
      //Simon
      "3rd place in the CALC Design 2025 competition 😎. The video was edited by me, the virtual assistant was created by me, and the cookies were made by me. I think I was the only one doing the work, huh 😡",
      //Marvel
      "Although his report card shows grades that aren't always impressive—even the lowest are still above the Minimum Completion Minimum (KKM)—he is a figure not to be underestimated. Those numbers fail to capture the realm where he truly excels: fine art, photography, and similar creative fields, where his creativity moves quietly yet profoundly, transcending the boundaries of formal assessment. Within the silence he maintains lies a graceful delusion of grandeur—a belief that the world operates by laws understood only by those patient enough to observe it. He absorbs reality through stories and symbols, watching over fifty anime each season as if studying an unwritten archive of humanity and destiny. Thank him, then, for it was from behind his shadow that the design of the virtual female character on this website was born, a subtle trace of an influence rarely noticed, yet real. (designer and cameraman)",
      //Angeline
      "Thank me, because your photos would be terrible without my phone, hehehe. Oh yeah, I also acted as a cameraman, recording and photographing almost all the important scenes in this group's progress. I also helped bake the cookies, so don't say they weren't delicious >:(",
      //Beverlyn
      "I'm not the one who does everything—and that's precisely why I handle about eighty percent of the cookie-making process. It's a simple-sounding number, hardly worth bragging about, but it's enough to ensure the rest doesn't go astray. I measure the ingredients on the scale faithfully following the recipe book's numbers, faithful to the little things that those who like to 'guess' often overlook. Without saying much and without showing off, I let the dough prove itself. In the end, the cookies are done, the kitchen is tidy, and everyone are well fed—a shared success that, incidentally, relies heavily on that same meticulousness that I call common sense.",
      //Pangestu
      "He is short, a functional advantage that makes his presence always efficient. His movements are casual and unobtrusive, a rare quality that saves him from the hassle of being visible. In this photo, he appears very tall—a visual feat that stems entirely from the decision of someone else to shoot from below. Much about him remains unknown, and that is precisely the proof of his success in consistently maintaining privacy. While others sit, he stands in the corner, giving a real contribution by simply remaining in the correct position. He is a great help in measuring ingredients on the scale according to the recipe book, and, just as importantly, in washing the dishes—a silent heroic act that ensures the world can be used again without drama."
    ];
    butt.addEventListener("click", (e) => {
      const index = parseInt(butt.dataset.index);
      const isID = languageToggle.dataset.language === "ID";
      const message = isID ? ID_messages[index] : EN_messages[index];

      setTimeout(() => {
        const panelId = `nameBtn - ${index} -panel`;
        const panelContent = document.getElementById(`${panelId}-content`);
        if (panelContent) {
          panelContent.innerHTML = `<p style = "white-space: pre-wrap;"> ${message}</p> `;
        }
      }, 0);
    })
  })
  const ingredsLanguager = document.getElementById("ingreds-language");
  const ingredsLanguageToggle = ingredsLanguager.querySelector(".language-toggle");
  const ingredsToggleSlider = ingredsLanguager.querySelector(".toggle-slider");

  ingredsToggleSlider.addEventListener("click", () => {
    const isID = ingredsLanguageToggle.dataset.language === "ID";
    ingredsLanguageToggle.dataset.language = isID ? "EN" : "ID";
    ingredsToggleSlider.classList.toggle("active");

    const ingredients = document.querySelectorAll(".ingredients li");
    ingredients.forEach(ingredient => {
      const newText = isID ? ingredient.dataset.en : ingredient.dataset.id;
      if (newText && ingredient.textContent !== newText) {
        typingAnim(ingredient, newText, 670);
      }
    });
  });
});


//asisten di samping kiri giant cookie
let assistantChoice = null;
try {
  assistantChoice = localStorage.getItem('assistant_choice') || null;
} catch (e) {
  assistantChoice = null;
}
// expose globally for quick access from devtools or other scripts
window.assistantChoice = assistantChoice;

// keep the variable up to date if user changes choice later
window.addEventListener('assistantChoiceChanged', (ev) => {
  assistantChoice = ev && ev.detail ? ev.detail : localStorage.getItem('assistant_choice') || null;
  window.assistantChoice = assistantChoice;
});
// Assistant avatar: show chosen assistant picture to the left of the giant cookie
(function initAssistantAvatar() {
  if (!giantCookie) return;

  const AVATAR_ID = 'assistant-avatar';
  const FEMALE_SRC = 'stuffs/intro/cewek_normal.png';
  const MALE_SRC = 'stuffs/intro/cowok_normal.png';
  const AVATAR_W = 100; // px
  const AVATAR_H = 100; // px
  let avatarEl = document.getElementById(AVATAR_ID);

  function createAvatarIfNeeded() {
    if (avatarEl) return avatarEl;
    avatarEl = document.createElement('img');
    avatarEl.id = AVATAR_ID;
    avatarEl.alt = 'Assistant';
    avatarEl.style.cssText = [
      `position:fixed`,                      // fixed to viewport so it follows the cookie
      `width:${AVATAR_W}px`,
      `height:${AVATAR_H}px`,
      `object-fit:cover`,
      `border-radius:12px`,
      `box-shadow:0 10px 30px rgba(0,0,0,0.45)`,
      `transition:opacity 220ms ease, transform 220ms ease`,
      `opacity:0`,
      `pointer-events:auto`,
      `z-index:99998`
    ].join(';');
    document.body.appendChild(avatarEl);
    return avatarEl;
  }

  function getChoice() {
    // prefer runtime variable, fallback to localStorage
    return (window.assistantChoice || localStorage.getItem('assistant_choice') || null);
  }

  function updateAvatarSrcAndVisibility() {
    const choice = getChoice();
    if (!choice) {
      if (avatarEl) {
        avatarEl.style.opacity = '0';
        // keep in DOM but invisible
      }
      return;
    }
    createAvatarIfNeeded();
    avatarEl.src = (choice === 'male') ? MALE_SRC : FEMALE_SRC;
    avatarEl.style.opacity = '1';
  }

  function positionAvatar() {
    if (!avatarEl || avatarEl.style.opacity === '0') return;
    const rect = giantCookie.getBoundingClientRect();
    // position to the left of the giant cookie, centered vertically
    const left = Math.round(rect.left - AVATAR_W - 12); // 12px gap
    const top = Math.round(rect.top + rect.height / 2 - AVATAR_H / 2);
    // clamp inside viewport
    const clampedLeft = Math.max(8, left);
    const clampedTop = Math.max(8, Math.min(window.innerHeight - AVATAR_H - 8, top));
    avatarEl.style.left = clampedLeft + 'px';
    avatarEl.style.top = clampedTop + 'px';
  }

  // Create avatar only if there is already a choice
  if (getChoice()) {
    createAvatarIfNeeded();
  }

  // Initial render & position
  updateAvatarSrcAndVisibility();
  positionAvatar();

  // Keep avatar positioned on resize/scroll (debounce lightweight)
  let rAF = null;
  function schedulePosition() {
    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      positionAvatar();
      rAF = null;
    });
  }
  window.addEventListener('resize', schedulePosition);
  window.addEventListener('scroll', schedulePosition);

  // Update when assistant choice changes at runtime
  window.addEventListener('assistantChoiceChanged', (ev) => {
    updateAvatarSrcAndVisibility();
    // small timeout so image can load and size settle before positioning
    setTimeout(positionAvatar, 50);
  });

  // If other code may set window.assistantChoice after load without dispatching event,
  // you can poll once (optional). Here we add a short listener on storage changes so
  // if another tab changes localStorage we react too:
  window.addEventListener('storage', (e) => {
    if (e.key === 'assistant_choice') {
      updateAvatarSrcAndVisibility();
      positionAvatar();
    }
  });
})();
