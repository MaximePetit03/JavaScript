const form = document.querySelector("form");
const div = document.querySelector("div");
const canva = document.querySelector("canvas");
const allInputs = document.querySelectorAll("input");
const formulaire = document.querySelector("#form");
const nickname = document.querySelector("#name");
const backEnd = document.querySelector("#back");

const cheminImg = "assets/";
const extension = ".png";

let skinPath = null;

for (let i = 0; i < 30; i++) {
  const img = new Image();
  img.src = `${cheminImg}${i}${extension}`;

  img.onload = () => {
    const canva = document.createElement("canvas");
    canva.width = 64;
    canva.height = 64;
    let ctx = canva.getContext("2d");

    //Position dans l'image(les 4 premiers) Position sur le canva (les 4 derniers)
    ctx.drawImage(img, 0, 128, 64, 64, 0, 0, 64, 64);

    canva.addEventListener("click", function () {
      skinPath = `${cheminImg}${i}${extension}`;

      const allSkins = div.querySelectorAll("canvas");
      allSkins.forEach(function (skins) {
        skins.classList.remove("selected");
      });

      canva.classList.add("selected");
    });

    div.appendChild(canva);
  };
}

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  const pseudo = nickname.value.trim();
  const serveurUrl = backEnd.value.trim();

  if (nickname === "" || serveurUrl === "" || skinPath == null) {
    allInputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("faux");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        input.classList.remove("faux");
      }
    });
    console.log("❌ Champs manquants");
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
    return;
  }

  localStorage.setItem("pseudo", pseudo);
  localStorage.setItem("backEnd", serveurUrl);
  localStorage.setItem("click", skinPath);

  console.log(localStorage);
});
