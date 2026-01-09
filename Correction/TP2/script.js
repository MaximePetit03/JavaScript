//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note générée au tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

/* ============================================================
   Partie 1 – Étude des valeurs
   ============================================================ */

console.log("===== PARTIE 1 : ÉTUDE DES VALEURS =====");

// Affichage du tableau et de sa taille
console.log("Tableau initial :", notes);
console.log("Taille du tableau :", notes.length);

// Recherche du minimum et du maximum
let minimum = notes[0];
let maximum = notes[0];

for (let i = 1; i < notes.length; i++) {
  if (notes[i] < minimum) {
    minimum = notes[i];
  }
  if (notes[i] > maximum) {
    maximum = notes[i];
  }
}

// Affichage des résultats
console.log("Plus petite valeur :", minimum);
console.log("Plus grande valeur :", maximum);

/* ============================================================
   Partie 2 – Première étape du tri
   ============================================================ */

console.log("===== PARTIE 2 : RECHERCHE DU MINIMUM =====");

// Déclaration de l'indice de la valeur minimale
let indiceMin = 0;

// Recherche de l'indice de la valeur minimale
for (let i = 1; i < notes.length; i++) {
  // Si la note courante est inférieure à la note à l'indiceMin
  if (notes[i] < notes[indiceMin]) {
    // Mettre à jour l'indiceMin
    indiceMin = i;
  }
}
// Affichage des résultats
console.log("Valeur minimale :", notes[indiceMin]);
console.log("Indice de la valeur minimale :", indiceMin);

/* ============================================================
   Partie 3 – Échange de valeurs
   ============================================================ */

console.log("===== PARTIE 3 : PREMIER ÉCHANGE =====");

// Échange de la valeur minimale avec la valeur à l'indice 0

// Déclaration d'une variable temporaire pour l'échange
let temp = notes[0];
// Affectation des valeurs pour l'échange
notes[0] = notes[indiceMin];
notes[indiceMin] = temp;

console.log("Tableau après échange avec l'indice 0 :", notes);

/* ============================================================
   Partie 4 – Tri par sélection complet
   ============================================================ */

console.log("===== PARTIE 4 : TRI PAR SÉLECTION (CROISSANT) =====");

// Déclaration des compteurs de comparaisons et d'échanges
let comparaisons = 0;
let echanges = 0;

// Copie du tableau avant tri pour l'affichage final
// On pourrait afficher le tableau original directement, mais c'est plus clair de l'afficher a côté du tableau trié, et donc après les affichages intermédiaires qui se font pendant le tri.
let tableauAvantTri = [];
for (let i = 0; i < notes.length; i++) {
  tableauAvantTri.push(notes[i]);
}

// Tri par sélection (boucle principale)
for (let i = 0; i < notes.length - 1; i++) {
  // Recherche de l'indice de la valeur minimale dans la sous-partie non triée
  let indiceMin = i;

  // Boucle de recherche du minimum
  for (let j = i + 1; j < notes.length; j++) {
    // Incrémentation du compteur de comparaisons
    comparaisons++;
    if (notes[j] < notes[indiceMin]) {
      indiceMin = j;
    }
  }

  // Échange de la valeur minimale trouvée avec la valeur à l'indice i
  if (indiceMin !== i) {
    // Echange des valeurs
    let temp = notes[i];
    notes[i] = notes[indiceMin];
    notes[indiceMin] = temp;
    // Incrémentation du compteur d'échanges
    echanges++;

    // BONUS : affichage après chaque échange
    console.log("Après échange à l'indice", i, ":", notes);
  }
}

/* ============================================================
   Partie 5 – Affichage du résultat
   ============================================================ */

console.log("===== PARTIE 5 : RÉSULTAT =====");
console.log("Tableau avant tri :", tableauAvantTri);
console.log("Tableau trié par ordre croissant :", notes);

/* ============================================================
   BONUS – Statistiques
   ============================================================ */

console.log("===== BONUS : STATISTIQUES =====");
console.log("Nombre de comparaisons :", comparaisons);
console.log("Nombre d'échanges :", echanges);

/* ============================================================
   BONUS – Tri par ordre décroissant
   (copier-coller modifié du tri par sélection)
   ============================================================ */

console.log("===== BONUS : TRI PAR ORDRE DÉCROISSANT =====");

// Réinitialisation des compteurs de comparaisons et d'échanges
comparaisons = 0;
echanges = 0;

// Copie du tableau trié croissant
let notesDecroissant = [];
for (let i = 0; i < notes.length; i++) {
  notesDecroissant.push(notes[i]);
}

for (let i = 0; i < notesDecroissant.length - 1; i++) {
  let indiceMax = i;

  for (let j = i + 1; j < notesDecroissant.length; j++) {
    if (notesDecroissant[j] > notesDecroissant[indiceMax]) {
      indiceMax = j;
    }
    // Incrémentation du compteur de comparaisons
    comparaisons++;
  }

  if (indiceMax !== i) {
    // Échange des valeurs
    let temp = notesDecroissant[i];
    notesDecroissant[i] = notesDecroissant[indiceMax];
    notesDecroissant[indiceMax] = temp;
    // Incrémentation du compteur d'échanges
    echanges++;

    // BONUS : affichage après chaque échange
    console.log("Après échange à l'indice", i, ":", notesDecroissant);
  }
}

console.log("Nombre de comparaisons (décroissant) :", comparaisons);
console.log("Nombre d'échanges (décroissant) :", echanges);

console.log("Tableau trié par ordre décroissant :", notesDecroissant);
