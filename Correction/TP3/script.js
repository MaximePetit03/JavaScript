/* ============================================================
   PARTIE 1 – GÉNÉRATION DES ÉLÈVES
   ============================================================ */

console.log("===== PARTIE 1 : GÉNÉRATION DES ÉLÈVES =====");

// Taille aléatoire du tableau d'élèves
let tailleMin = 7;
let tailleMax = 10;
let taille =
  Math.floor(Math.random() * (tailleMax - tailleMin + 1)) + tailleMin;

// Tableau des prénoms possibles
let prenoms = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emma",
  "Fiona",
  "Hugo",
  "Isabelle",
  "Julien",
  "Lucas",
];

// Variable pour l'index du prénom sélectionné au hasard
let indexPrenom;

// Tableau des élèves
let eleves = [];

// Génération des élèves
for (let i = 0; i < taille; i++) {
  // Sélection aléatoire d'un prénom par index
  indexPrenom = Math.floor(Math.random() * prenoms.length);
  let eleve = {
    // Accès au prénom via l'index aléatoire
    prenom: prenoms[indexPrenom],
    noteFrancais: Math.floor(Math.random() * 21),
    noteMaths: Math.floor(Math.random() * 21),
    noteHistoire: Math.floor(Math.random() * 21),
  };

  // Calcul de la moyenne
  eleve.moyenne =
    (eleve.noteFrancais + eleve.noteMaths + eleve.noteHistoire) / 3;

  // Ajout de l'élève au tableau
  eleves.push(eleve);
}

// Affichage des élèves générés
console.log("Liste des élèves :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom + " : " + eleves[i].moyenne.toFixed(1));
}

/* ============================================================
   PARTIE 2 – ÉTUDE DES VALEURS
   ============================================================ */

console.log("===== PARTIE 2 : ÉTUDE DES VALEURS =====");

console.log("Nombre total d'élèves :", eleves.length);

let minMoyenne = eleves[0].moyenne;
let maxMoyenne = eleves[0].moyenne;

for (let i = 1; i < eleves.length; i++) {
  if (eleves[i].moyenne < minMoyenne) {
    minMoyenne = eleves[i].moyenne;
  }
  if (eleves[i].moyenne > maxMoyenne) {
    maxMoyenne = eleves[i].moyenne;
  }
}

console.log("Plus petite moyenne :", minMoyenne.toFixed(1));
console.log("Plus grande moyenne :", maxMoyenne.toFixed(1));

/* ============================================================
   PARTIE 3 – PREMIÈRE ÉTAPE DU TRI
   ============================================================ */

console.log("===== PARTIE 3 : RECHERCHE DU MINIMUM =====");

let indiceMin = 0;

for (let i = 1; i < eleves.length; i++) {
  if (eleves[i].moyenne < eleves[indiceMin].moyenne) {
    indiceMin = i;
  }
}

console.log(
  "Élève avec la plus petite moyenne :",
  eleves[indiceMin].prenom,
  "(" + eleves[indiceMin].moyenne.toFixed(1) + ")",
  "à l'indice",
  indiceMin
);

/* ============================================================
   PARTIE 4 – ÉCHANGE DE VALEURS
   ============================================================ */

console.log("===== PARTIE 4 : ÉCHANGE =====");

let temp = eleves[0];
eleves[0] = eleves[indiceMin];
eleves[indiceMin] = temp;

console.log("Tableau après échange :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom + " : " + eleves[i].moyenne.toFixed(1));
}

/* ============================================================
   PARTIE 5 – TRI PAR SÉLECTION COMPLET
   ============================================================ */

console.log("===== PARTIE 5 : TRI PAR SÉLECTION =====");

let comparaisons = 0;
let echanges = 0;

// Sauvegarde du tableau avant tri
let tableauAvantTri = [];
for (let i = 0; i < eleves.length; i++) {
  tableauAvantTri.push(eleves[i]);
}

for (let i = 0; i < eleves.length - 1; i++) {
  let indiceMin = i;

  for (let j = i + 1; j < eleves.length; j++) {
    comparaisons++;
    if (eleves[j].moyenne < eleves[indiceMin].moyenne) {
      indiceMin = j;
    }
  }

  if (indiceMin !== i) {
    let temp = eleves[i];
    eleves[i] = eleves[indiceMin];
    eleves[indiceMin] = temp;
    echanges++;
  }
}

/* ============================================================
   PARTIE 6 – AFFICHAGE DU RÉSULTAT
   ============================================================ */

console.log("===== PARTIE 6 : RÉSULTAT =====");

console.log("Tableau avant tri :");
for (let i = 0; i < tableauAvantTri.length; i++) {
  console.log(
    tableauAvantTri[i].prenom + " : " + tableauAvantTri[i].moyenne.toFixed(1)
  );
}

console.log("Tableau trié par moyenne croissante :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom + " : " + eleves[i].moyenne.toFixed(1));
}

console.log("Nombre de comparaisons :", comparaisons);
console.log("Nombre d'échanges :", echanges);

/* ============================================================
   BONUS – TRI PAR MATIÈRE (Maths)
   ============================================================ */

console.log("===== BONUS : TRI PAR NOTE DE MATHS =====");

let elevesMaths = [];
for (let i = 0; i < eleves.length; i++) {
  elevesMaths.push(eleves[i]);
}

for (let i = 0; i < elevesMaths.length - 1; i++) {
  let indiceMin = i;

  for (let j = i + 1; j < elevesMaths.length; j++) {
    if (elevesMaths[j].noteMaths < elevesMaths[indiceMin].noteMaths) {
      indiceMin = j;
    }
  }

  if (indiceMin !== i) {
    let temp = elevesMaths[i];
    elevesMaths[i] = elevesMaths[indiceMin];
    elevesMaths[indiceMin] = temp;
  }
}

console.log("Élèves triés par note de maths :");
for (let i = 0; i < elevesMaths.length; i++) {
  console.log(elevesMaths[i].prenom + " : " + elevesMaths[i].noteMaths);
}
