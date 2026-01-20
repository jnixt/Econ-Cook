document.addEventListener("DOMContentLoaded", function () {
  const cookie = document.getElementsByClassName("cookie");
  if (cookie) {

  }

  const giantCookie = document.getElementById("giantCookie");

  if (giantCookie) {
    let cookiePoints = parseInt(localStorage.getItem("cookiePoints")) || 0;
    if (cookiePoints < 0) cookiePoints = 0;
    const pointsCounter = document.getElementById("storeBtn");
    pointsCounter.innerHTML = "<i class=\"fa-solid fa-hand-pointer icon\"></i> " + cookiePoints;
    let pointsPerClick = 1;

    giantCookie.addEventListener("click", (e) => {
      if ((Math.random() * (1000 - 1)) === 67) {
        giantCookie.style.background = "linear-gradient(67deg, red, orange, yellow, green, blue, pink, magenta)"
      }
      console.log(Math.random() * (1000 - 1))
      cookiePoints += pointsPerClick;
      giantCookie.style.transform = "translateX(calc(-50% - 40px)) scale(0.95) rotate(360deg)";
      pointsCounter.innerHTML = "<i class=\"fa-solid fa-hand-pointer icon\"></i> " + cookiePoints;
      localStorage.setItem("cookiePoints", cookiePoints);
      const plusedPoints = document.createElement("div");
      plusedPoints.className = "plused-points";
      plusedPoints.innerText = "+" + pointsPerClick;
      plusedPoints.style.left = `${e.clientX + window.scrollX}px`;
      plusedPoints.style.top = `${e.clientY + window.scrollY}px`;
      console.log(e.clientX, e.clientY);
      document.body.appendChild(plusedPoints);
      setTimeout(() => plusedPoints.remove(), 1000);
    });
  }

  let docDimensions = document.body.getBoundingClientRect()

  const extraStuffz = document.getElementById("bottom");
  extraStuffz.style.top = `${docDimensions.bottom}px`

  if (extraStuffz) {
    const adminButton = extraStuffz.querySelector("#adminBtn");
  }

  document.querySelectorAll(".gC-btn").forEach((butt) => {
    butt.addEventListener("click", (e) => {
      e.stopPropagation();

      const panelId = butt.id + "-panel";
      const existingPanel = document.getElementById(panelId);

      const allPanels = document.querySelectorAll(".panel");
      allPanels.forEach(p => p.remove());

      if (existingPanel) return;

      const panel = document.createElement("div");
      panel.className = "panel";
      panel.id = panelId;
      panel.style.display = "block";
      panel.innerHTML = `Lorem ipsum dolar sit amet, kawai simi adipisicing elit. Quisquam, quod.`;

      document.body.appendChild(panel);

      const buttonRect = butt.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const margin = 17;

      const hasSpaceAbove = buttonRect.top - panelRect.height - margin > 0;
      if (hasSpaceAbove) {
        panel.style.top = `${buttonRect.top - panelRect.height - margin}px`;
        panel.classList.remove('pointer-bottom');
        panel.classList.add('pointer-top');
      } else {
        panel.style.top = `${buttonRect.bottom + margin}px`;
        panel.classList.remove('pointer-top');
        panel.classList.add('pointer-bottom');
      }

      const centerX = (buttonRect.left + (buttonRect.width / 2)) - (panelRect.width / 2);
      panel.style.left = `${centerX}px`;

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const panelLeftX = window.scrollX + centerX;
      const panelCenterX = panelLeftX + panelRect.width / 2;
      const pointerOffsetX = buttonCenterX - panelCenterX;
      panel.style.setProperty('--pointer-offset', `${pointerOffsetX}px`);

      panel.style.visibility = "visible";

      panel.addEventListener("click", (e) => e.stopPropagation());
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".panel").forEach((panel) => {
      panel.remove();
    });
  });
});
