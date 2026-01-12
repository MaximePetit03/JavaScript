//Partie 1
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

function genererEleves() {
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
  }
  return nbrEleves;
}

//Partie 2
//Affiche le nombre d'élèves, les élèves et leur moyenne
function afficherEleves(nbrEleves) {
  let count = 0;
  console.log("Avant tri : ");
  for (let i = 0; i < nbrEleves.length; i++) {
    console.log(nbrEleves[i].name, "-", nbrEleves[i].moyenne);
    count++;
  }
  console.log("Nombre d'élèves : ", count);
}

//Partie 3
//Trouve la moyenne la plus basse et l'affiche
function trouverMoyenneMin(nbrEleves, indexDepart) {
  let min = 21;

  for (let i = 0; i < nbrEleves.length; i++) {
    if (nbrEleves[i].moyenne < min) {
      min = nbrEleves[i].moyenne;
      indexDepart = i;
    }
  }
  console.log("Moyenne la plus petite : ", nbrEleves[indexDepart].moyenne);

  return indexDepart;
}

//Partie 4
//Trouve la moyenne la plus haute et l'affiche
function trouverMoyenneMax(nbrEleves, indexDepart) {
  let max = 0;

  for (let i = 0; i < nbrEleves.length; i++) {
    if (nbrEleves[i].moyenne > max) {
      max = nbrEleves[i].moyenne;
      indexDepart = i;
    }
  }
  console.log("Moyenne la plus grande : ", nbrEleves[indexDepart].moyenne);

  return indexDepart;
}

//Affiche toutes les données des élèves
function afficherDonnees(tableau) {
  afficherEleves(tableau);
  trouverMoyenneMin(tableau, 0);
  trouverMoyenneMax(tableau, 0);
  triParSelection(tableau);
}

//Partie 5
//échange 2 élèves de place
function swap(nbrEleves, indexA, indexB) {
  let temp = nbrEleves[indexA];

  nbrEleves[indexA] = nbrEleves[indexB];

  nbrEleves[indexB] = temp;
}

//Partie 6

//tri les élèves par ordre croissant en fonction de leur moyenne
function triParSelection(nbrEleves) {
  let comparaisons = 0;
  let echanges = 0;

  console.log("\n Après tri :");

  for (let i = 0; i < nbrEleves.length; i++) {
    // On dit que i est le plus petit nombre
    let indexMin = i;

    // On cherche s'il existe une valeur plus petite dans le reste du tableau
    for (let j = i + 1; j < nbrEleves.length; j++) {
      if (nbrEleves[j].moyenne < nbrEleves[indexMin].moyenne) {
        // Si on trouve plus petit on mémorise son nouvel index
        indexMin = j;
      }
    }
    if (indexMin !== i) {
      swap(nbrEleves, i, indexMin);
      echanges++;
    }
    comparaisons++;
    console.log(nbrEleves[i].name, " - ", nbrEleves[i].moyenne);
  }
  console.log("Nombre de comparaisons : " + comparaisons);
  console.log("Nombre d'échanges : " + echanges);
}

tableau = genererEleves();
afficherDonnees(tableau);
