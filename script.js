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
  const pointsCounter = document.querySelector("#pointsDisplay");
  const giantCookie = document.getElementById("giantCookie");

  function getRecipeUnlockThreshold(index) {
    return Math.round(10 * Math.E ** index);
  }

  const recipeContainers = document.querySelectorAll(".resep-container.pageCre");

  function updateRecipeUnlockStates() {
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

  updateRecipeUnlockStates();

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

      updateRecipeUnlockStates();

      const color = ["#f4dbd6", "#f0c6c6", "#f5bde6", "#c6a0f6", "#ed8796", "#ee99a0", "#f5a97f", "#eed49f", "#a6da95", "#8bd5ca", "#91d7e3", "#7dc4e4", "#8aadf4", "#b7bdf8", "#cad3f5", "#b8c0e0"]

      const plusedPoints = document.createElement("div");
      plusedPoints.className = "plused-points";
      plusedPoints.innerText = "+" + pointsPerClick;
      plusedPoints.style.color = `${color[getRandomInt(0, 16)]}`
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

      let panelId;
      if (butt.classList.contains('nameBtn') && butt.dataset.index) {
        panelId = `nameBtn-${butt.dataset.index}-panel`;
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
        updateRecipeUnlockStates()
      });

      const input = panel.querySelector("#typerist");
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          cookiePoints = parseInt(input.value) || 0;
          localStorage.setItem("cookiePoints", cookiePoints);
          pointsCounter.innerHTML = `<i class="fa-solid fa-hand-pointer icon"></i> ${formatPoints(cookiePoints)}`;
          input.value = "";
          updateRecipeUnlockStates()
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
      if (!butt.classList.contains("unlocked")) {
        return;
      }

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
      page.appendChild(content);

      const closer = document.createElement("div");
      closer.id = page.id + "-closer";
      closer.className = "page-closer";
      closer.innerHTML = `<i class="fa-solid fa-x icon" style="color: #f38ba8;"></i>`
      closer.style.position = "absolute";
      closer.style.cursor = "pointer";
      closer.style.top = "3%";
      closer.style.right = "3%";
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
    const isIN = languageToggle.dataset.language === "IN";
    languageToggle.dataset.language = isIN ? "EN" : "IN";
    toggleSlider.classList.toggle("active");
  });

  document.querySelectorAll(".nameBtn").forEach((butt) => {
    const IN_messages = [
      //Jeffris
      "Pengguna Arch-Hyprland OS yang code website ini dari nol (sampai beberapa kali) menggunakan HTML, CSS, dan JS (tentunya). Sambil belajar cara menggunakan Git dan Github, orang ini speedrun nge-coding sampai hasilnya jadi sebagus ini. Iya, iya, website ini masih memiliki beberapa bug dan fitur-fitur yang kurang, karena deadlinenya hanya dua minggu... Apapun itu, enjoy websitenya!",
      //Ryan
      "Seorang pengangguran yang tidak bisa melakukan apa-apa ini entah bagaimana mendapatkan pekerjaan untuk membantu dalam membuat website ini. Tanpa Beliau, akan ada beberpa fitur yang tidak bisa diakses sampai sekarang, dan Shwcehneiger™ mungkin tidak sempat membuat page yang dibuat khusus untuk credit anggota (iya, saya yang buat page ini)",
      //Steven
      "Corrupti culpa error porro unde minus voluptas rem placeat odio, vitae expedita labore? Quaerat minima fuga ab, blanditiis, voluptatum vero quam recusandae tempore, earum molestias unde natus exercitationem! Qui similique aut necessitatibus beatae a officia corrupti blanditiis illum doloremque officiis fuga adipisci totam nam, vel facilis provident quae quisquam repellendus tempora eveniet quas! Molestiae nam, pariatur, tempore enim aliquid dolorem maxime, iure dicta placeat suscipit veritatis nihil.",
      //Simon
      "Nihil pariatur, provident inventore hic aperiam repellat nulla suscipit est laboriosam atque quis explicabo assumenda sunt corporis? Beatae ratione natus consectetur eius rerum, labore maxime quaerat ex nisi laudantium id iste, deleniti atque architecto quisquam quibusdam. Veniam dolores provident, dolore inventore, illo officiis placeat, optio quo neque ratione fugit. Officiis, labore architecto. Dolores harum totam quisquam! Provident maxime odit dolorem aut qui nisi laudantium blanditiis placeat! Libero!",
      //Marvel
      "Meskipun rapornya menunjukkan nilai yang tidak selalu mencolok—namun bahkan yang terendah pun tetap berada di atas KKM—ia adalah sosok yang tidak layak dianggap sepele. Angka-angka itu gagal menjangkau wilayah tempat ia benar-benar berkuasa: seni rupa, fotografi, dan ranah kreatif serupa, di mana kreativitasnya bergerak tenang namun mendalam, melampaui batas penilaian formal. Dalam keheningan yang ia pelihara, tersimpan delusi keagungan yang anggun—keyakinan bahwa dunia berjalan dengan hukum yang hanya dipahami oleh mereka yang cukup sabar mengamatinya. Ia menyerap realitas melalui cerita dan simbol, menonton lebih dari lima puluh anime setiap musim seolah sedang mempelajari arsip tak tertulis tentang manusia dan takdir. Maka berterima kasihlah kepadanya, karena dari balik bayangan itulah lahir desain karakter virtual perempuan di website ini, sebuah jejak halus dari pengaruh yang jarang disadari, namun nyata. (designer dan cameramen)",
      //Angeline
      "Berterima kasihlah kepada saya, karena foto-foto kalian akan jelek kalau tanpa HP saya hehehe. Oh ya, saya juga berperan sebagai cameramen yang merekam dan memfoto hampir semua scene-scene penting dalam progres grup ini. Saya juga membantu dalam masak cookienya, jadi jangan bilang gak enak >:(",
      //Beverlyn
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, incidunt reiciendis? Reprehenderit facilis voluptatibus mollitia expedita ab qui ratione rerum iste consequatur, dicta, enim nostrum nobis exercitationem architecto incidunt autem. Suscipit non nisi, consectetur quisquam tempora quam quae, unde aspernatur voluptas vel dicta eos pariatur aperiam recusandae sit debitis minima beatae atque. Iusto a, exercitationem voluptatibus voluptate libero aspernatur quo magnam dicta qui iure labore ipsa error?",
      //Pangestu
      "Ia pendek, sebuah kelebihan fungsional yang membuat keberadaannya selalu efisien. Gerak-geriknya biasa saja dan tidak mencolok, mutu langka yang menyelamatkannya dari kerepotan tampil. Pada foto kali ini ia tampak sangat tinggi—sebuah prestasi visual yang sepenuhnya lahir dari keputusan orang lain yang mengambil gambar dari bawah. Tentang dirinya, banyak hal tidak diketahui, dan itu justru bukti keberhasilan menjaga privasi secara konsisten. Ketika yang lain duduk, ia berdiri di sudut, memberi kontribusi nyata dengan sekadar tetap berada di posisi yang tepat. Ia sangat membantu dalam menakar bahan di atas timbangan sesuai angka di buku resep, dan tak kalah penting, mencuci piring—sebuah tindakan heroik sunyi yang memastikan dunia bisa kembali digunakan tanpa drama."
    ];
    const EN_messages = [
      //Jeffris
      "An Arch-Hyprland OS User who coded the website from zero (many times) using HTML, CSS, and JS (ofcourse). While also learning how to use Git and Github, this person speedran the coding till the result became as good as this. Yes, yes, this website still has some bugs and missing features, because the deadline is only two weeks... Despite that, enjoy the website!",
      //Ryan
      "This unemployed, helpless man somehow found work helping build this website. Without him, some features would be inaccessible, and Shwcehneiger™ might not have had the chance to create a dedicated member credits page (yes, I created this page).",
      //Steven
      "Corrupti culpa error porro unde minus voluptas rem placeat odio, vitae expedita labore? Quaerat minima fuga ab, blanditiis, voluptatum vero quam recusandae tempore, earum molestias unde natus exercitationem! Qui similique aut necessitatibus beatae a officia corrupti blanditiis illum doloremque officiis fuga adipisci totam nam, vel facilis provident quae quisquam repellendus tempora eveniet quas! Molestiae nam, pariatur, tempore enim aliquid dolorem maxime, iure dicta placeat suscipit veritatis nihil.",
      //Simon
      "Nihil pariatur, provident inventore hic aperiam repellat nulla suscipit est laboriosam atque quis explicabo assumenda sunt corporis? Beatae ratione natus consectetur eius rerum, labore maxime quaerat ex nisi laudantium id iste, deleniti atque architecto quisquam quibusdam. Veniam dolores provident, dolore inventore, illo officiis placeat, optio quo neque ratione fugit. Officiis, labore architecto. Dolores harum totam quisquam! Provident maxime odit dolorem aut qui nisi laudantium blanditiis placeat! Libero!",
      //Marvel
      "Although his report card shows grades that aren't always impressive—even the lowest are still above the Minimum Completion Minimum (KKM)—he is a figure not to be underestimated. Those numbers fail to capture the realm where he truly excels: fine art, photography, and similar creative fields, where his creativity moves quietly yet profoundly, transcending the boundaries of formal assessment. Within the silence he maintains lies a graceful delusion of grandeur—a belief that the world operates by laws understood only by those patient enough to observe it. He absorbs reality through stories and symbols, watching over fifty anime each season as if studying an unwritten archive of humanity and destiny. Thank him, then, for it was from behind his shadow that the design of the virtual female character on this website was born, a subtle trace of an influence rarely noticed, yet real. (designer and cameraman)",
      //Angeline
      "Thank me, because your photos would be terrible without my phone, hehehe. Oh yeah, I also acted as a cameraman, recording and photographing almost all the important scenes in this group's progress. I also helped bake the cookies, so don't say they weren't delicious >:(",
      //Beverlyn
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, incidunt reiciendis? Reprehenderit facilis voluptatibus mollitia expedita ab qui ratione rerum iste consequatur, dicta, enim nostrum nobis exercitationem architecto incidunt autem. Suscipit non nisi, consectetur quisquam tempora quam quae, unde aspernatur voluptas vel dicta eos pariatur aperiam recusandae sit debitis minima beatae atque. Iusto a, exercitationem voluptatibus voluptate libero aspernatur quo magnam dicta qui iure labore ipsa error?",
      //Pangestu
      "He is short, a functional advantage that makes his presence always efficient. His movements are casual and unobtrusive, a rare quality that saves him from the hassle of being visible. In this photo, he appears very tall—a visual feat that stems entirely from the decision of someone else to shoot from below. Much about him remains unknown, and that is precisely the proof of his success in consistently maintaining privacy. While others sit, he stands in the corner, making a real contribution by simply remaining in the correct position. He is a great help in measuring ingredients on the scale according to the recipe book, and, just as importantly, in washing the dishes—a silent heroic act that ensures the world can be used again without drama."
    ];
    butt.addEventListener("click", (e) => {
      const index = parseInt(butt.dataset.index);
      const isIN = languageToggle.dataset.language === "IN";
      const message = isIN ? IN_messages[index] : EN_messages[index];
      setTimeout(() => {
        const panelId = butt.id ? `${butt.id}-panel` : `nameBtn-${index}-panel`;
        const panelContent = document.getElementById(`${panelId}-content`);
        if (panelContent) {
          panelContent.innerHTML = `<p style="white-space: pre-wrap;">${message}</p>`;
        }
      }, 0);
    })
  })
});
