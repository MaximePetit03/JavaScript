//Partie 1 et 2
// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les élèves
let nbrEleves = [];
let nameEleves = [
  "Alice",
  "Gustave",
  "Jean",
  "Paul",
  "Louis",
  "Antony",
  "Enzo",
  "Lucas",
  "Mathieu",
  "Léonie",
];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

let count = 0;

//Index de la moyenne la plus petite
let indexMin = 0;
let indexMax = 0;

//Moyenne la plus petite et la plus grande
let min = 21;
let max = 0;

// Itérer autant de fois qu'on a d'élèves aléatoires à générer
for (let i = 0; i < taille; i++) {
  let eleve = {
    name: "",
    noteFrançais: 0,
    noteMaths: 0,
    noteHistoire: 0,
  };

  // Générer un élève aléatoire parmis une liste d'élèves
  const index = Math.floor(Math.random() * nameEleves.length);
  eleve.name = nameEleves[index];

  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  eleve.noteMaths = Math.floor(Math.random() * (note_maximum + 1));
  eleve.noteFrançais = Math.floor(Math.random() * (note_maximum + 1));
  eleve.noteHistoire = Math.floor(Math.random() * (note_maximum + 1));
  eleve.moyenne =
    (eleve.noteFrançais + eleve.noteMaths + eleve.noteHistoire) / 3;

  nbrEleves.push(eleve);
  count++;
  console.log(eleve.name, " - ", eleve.moyenne);

  //Si le minimum est plus grand que la moyenne à l'indice i alors il prend sa valeur et son indice
  if (nbrEleves[i].moyenne < min) {
    min = nbrEleves[i].moyenne;
    indexMin = i;
  }
  //Pareil qu'au dessus
  if (nbrEleves[i].moyenne > max) {
    max = nbrEleves[i].moyenne;
    indexMax = i;
  }
}

/*Partie 2
les 2 conditions se trouvent dans la boucle de la Partie 1 */
console.log(" ");
console.log("Partie 2");

//Affiche le nombre d'élève
console.log("Nombre d'élève : ", count);

//Affiche la moyenne la plus petite et la moyenne la plus grande
console.log("Moyenne la plus petite : ", nbrEleves[indexMin].moyenne);
console.log("Moyenne la plus grande : ", nbrEleves[indexMax].moyenne);

//Partie 3
console.log(" ");
console.log("Partie 3");

//Affiche l'indice de la moyenne la plus grande et celui de la moyenne la plus petit
console.log("indice du + petit: ", indexMin);
console.log("indice du + grand : ", indexMax);

//Affiche l'élève avec la plus petite moyenne
console.log(
  "L'élève avec la plus petite moyenne est",
  nbrEleves[indexMin].name,
  "avec une moyenne de ",
  nbrEleves[indexMin].moyenne
);

//Partie 4
let temp = nbrEleves[0];

nbrEleves[0] = nbrEleves[indexMin];

nbrEleves[indexMin] = temp;

console.log(
  "L'élève échangé est : ",
  nbrEleves[indexMin].name,
  nbrEleves[indexMin].moyenne
);

//Partie 5
console.log(" ");
console.log("Partie 5");

count = 0;
let varTemp = 0;
let echanges = 0;

let tableauAvantTri = [];
for (let i = 0; i < nbrEleves.length; i++) {
  tableauAvantTri.push(nbrEleves[i]);
}

for (let i = 0; i < nbrEleves.length - 1; i++) {
  // On dit que i est le plus petit nombre
  indexMin = i;

  // On cherche s'il existe une valeur plus petite dans le reste du tableau
  for (let j = i + 1; j < nbrEleves.length; j++) {
    count++;
    if (nbrEleves[j].moyenne < nbrEleves[indexMin].moyenne) {
      // Si on trouve plus petit on mémorise son nouvel index
      indexMin = j;
    }
  }

  //On met indexMin à la bonne place si il ne l'est pas déjà avec ce que j'ai fait à la partie 3
  varTemp = nbrEleves[i];
  nbrEleves[i] = nbrEleves[indexMin];
  nbrEleves[indexMin] = varTemp;

  echanges++;
}

console.log("Avant tri :");

for (let i = 0; i < tableauAvantTri.length; i++) {
  console.log(tableauAvantTri[i].name, " - ", tableauAvantTri[i].moyenne);
}

console.log("============ Après tri ==============");

for (let i = 0; i < nbrEleves.length; i++) {
  console.log(nbrEleves[i].name, " - ", nbrEleves[i].moyenne);
}

console.log(" ");
console.log("Comparaisons :", count);
console.log("échanges :", echanges);
