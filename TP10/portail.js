document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const div = document.querySelector(".skin");
  const allInputs = document.querySelectorAll("input");
  const dashboard = document.querySelector("#dash");

  const cheminImg = "assets/";
  const extension = ".png";
  let skinPath = null;

  // Création des 30 skins
  for (let i = 0; i < 30; i++) {
    const img = new Image();
    img.src = `${cheminImg}${i}${extension}`;

    img.onload = () => {
      const canva = document.createElement("canvas");
      canva.width = 64;
      canva.height = 64;
      const ctx = canva.getContext("2d");

      ctx.drawImage(img, 0, 128, 64, 64, 0, 0, 64, 64);

      canva.addEventListener("click", function () {
        skinPath = `${cheminImg}${i}${extension}`;

        div
          .querySelectorAll("canvas")
          .forEach((c) => c.classList.remove("selected"));
        canva.classList.add("selected");
      });

      div.appendChild(canva);
    };
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const pseudo = document.querySelector("#name").value.trim();
    const serveurUrl = document.querySelector("#back").value.trim();

    if (!pseudo || !serveurUrl || !skinPath) {
      allInputs.forEach((input) => {
        if (!input.value.trim()) input.classList.add("faux");
        else input.classList.remove("faux");
      });
      console.log("❌ Champs manquants");
      return;
    }

    localStorage.setItem("name", pseudo);
    localStorage.setItem("serveurUrl", serveurUrl);
    localStorage.setItem("spritePath", skinPath);

    window.location.href = "game.html";
  });

  dashboard.addEventListener("submit", (evenement) => {
    evenement.preventDefault();

    window.location.href = "dashboard.html";
  });
});
