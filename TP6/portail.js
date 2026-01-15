const form = document.querySelector("form");
const div = document.querySelector("div");
const canva = document.querySelector("canvas");

const formulaire = document.querySelector("#form");
const pseudo = document.querySelector("#name");
const backEnd = document.querySelector("#back");

const cheminImg = "assets/";
const extension = ".png";

let checked = null;

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
      checked = i;

      const allSkins = div.querySelectorAll("canvas");
      allSkins.forEach((skins) => skins.classList.remove("selected"));

      canva.classList.add("selected");
    });

    div.appendChild(canva);
  };
}

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  const nickname = pseudo.value.trim();
  const back = backEnd.value.trim();

  if (nickname === "" || back === "" || checked == null) {
    console.log("❌ Champs manquants");
    return;
  }

  localStorage.setItem("pseudo", nickname);
  localStorage.setItem("backEnd", back);

  console.log("Pseudo : ", nickname);
  console.log("Lien backend: ", back);
  console.log("Skin : ", checked);
});
