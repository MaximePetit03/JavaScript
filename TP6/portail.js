const form = document.querySelector("form");
const button = document.querySelector("button");
const div = document.querySelector(".div");
const canva = document.querySelector("canvas");

const cheminImg = "assets/";
const extension = ".png";

for (let i = 0; i < 30; i++) {
  const img = new Image();
  img.src = `${cheminImg}${i}${extension}`;

  img.onload = () => {
    const canva = document.createElement("canvas");
    canva.width = 64;
    canva.height = 64;
    let ctx = canva.getContext("2d");

    //           Position dans l'image|Position sur le canva
    ctx.drawImage(img, 0, 128, 64, 64, 0, 0, 64, 64);

    div.appendChild(canva);
  };
}
