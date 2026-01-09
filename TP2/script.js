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

//Partie 1 et 2
console.log("Partie 1 et 2");
console.log("Taille : ", taille);

let min = notes[0];
let max = notes[0];
//correspond à l'indice 0 sinon il sera décalé de 1
let index = -1;

for (let i = 0; i < notes.length; i++) {
  if (notes[i] < min) {
    min = notes[i];
    //enregistre l'indice du plus petit nombre
    index = i;
  }
  if (notes[i] > max) {
    max = notes[i];
  }
}
console.log("plus petit : ", min);
console.log("plus grand : ", max);
console.log(notes);
//Affiche le minimum et son indice
console.log("Minimum : ", min, " indice : ", index);

//Partie 3
console.log(" ");
console.log("Partie 3");

//temp prend la valeur de l'indice 0 de notes
let temp = notes[0];
//notes[0] prend la valeur de min
notes[0] = min;
//emplacement du min prend la valeur de temp qui est égal à note[0]
notes[index] = temp;

console.log(notes);

//Partie 4 et 5
console.log(" ");
console.log("Partie 4 et 5");

console.log("Tableau pas trié :", notes);

let compteur = 0;

/* Parcours chaque position du tableau pour y placer la plus petite valeur restante le -1 est ici 
car une fois tout les éléments du tableau trié sauf 1 le dernier est forcément à la bonne place */
for (let i = 0; i < notes.length - 1; i++) {
  // On dit que i est le plus petit nombre
  let indexMin = i;

  // On cherche s'il existe une valeur plus petite dans le reste du tableau
  for (let j = i + 1; j < notes.length; j++) {
    if (notes[j] < notes[indexMin]) {
      // Si on trouve plus petit on mémorise son nouvel index
      indexMin = j;
    }
  }

  //Échange les valeurs si le minimum trouvé n'est pas déjà à la bonne place
  if (indexMin !== i) {
    let varTemp = notes[i];
    notes[i] = notes[indexMin];
    notes[indexMin] = varTemp;
  }
  //Le Bonus 1 et 2
  console.log("étape ", compteur, ":", notes);
  compteur++;
}

console.log("Tableau trié :", notes);
