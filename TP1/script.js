//Partie 1

//défini des variables const, let type int et un booléen
const classe = "B1";
let NumbStudent = 25;
let classOpen = true;
//affiche chacune des variables
console.log(classe);
console.log(NumbStudent);
console.log(classOpen);

//Partie 2
//défini un objet student contenant un nom en string et 2 notes int;
let student = {
  name: "Jean",
  noteMaths: 18,
  noteFr: 17,
};

//affiche sur la console le nom du student
console.log(student.name);
console.log(" ");
console.log("Partie 3");

//Partie 3

//défini 2 autres objets avec les mêmes propriétés que student
let student2 = {
  name: "Paul",
  noteMaths: 19,
  noteFr: 10,
};

let student3 = {
  name: "Louis",
  noteMaths: 15,
  noteFr: 2,
};
// Créer un tableau des 3 objets précedemment crées
let group = [student, student2, student3];

//Parcours le tableau group et affiche le nom de chaque objet
for (i = 0; i < group.length; i++) {
  console.log(group[i].name);
}
console.log(" ");
console.log("Partie 4");

//Partie 4

//calcul la moyenne des notes de maths et de français de chaque student
for (i = 0; i < group.length; i++) {
  moyenne = (group[i].noteFr + group[i].noteMaths) / 2;
  console.log(group[i].name);
  console.log(moyenne);
}
console.log(" ");
console.log("Partie 5");

//Partie 5

for (i = 0; i < group.length; i++) {
  moyenne = (group[i].noteFr + group[i].noteMaths) / 2;
  console.log(group[i].name);
  console.log(moyenne);
  //Si la moyenne supérieur ou égale à 10 alors student admis sinon il est refusé
  if (moyenne >= 10) {
    console.log("Admis");
  } else {
    console.log("Refusé");
  }
}
console.log(" ");
console.log("Partie 6");

//Partie 6
for (i = 0; i < group.length; i++) {
  moyenne = (group[i].noteFr + group[i].noteMaths) / 2;
  console.log(group[i].name);
  console.log(moyenne);
  //Donne une mention en fonction de la moyenne de chaque student du tableau group
  if (moyenne >= 16) {
    console.log("Très bien");
  } else if (moyenne >= 14) {
    console.log("Bien");
  } else if (moyenne >= 10) {
    console.log("Assez bien");
  } else if (moyenne >= 12) {
    console.log("Passable");
  } else {
    console.log("Insuffisant");
  }
}

//Partie 7
console.log(" ");
console.log("Partie 7");

let count = 0;
let j = 0;

//Compte le nombre d'élève admis
while (j < group.length) {
  moyenne = (group[j].noteFr + group[j].noteMaths) / 2;
  if (moyenne >= 10) {
    count++;
  }
  j++;
}
console.log(count);

//BONUS
console.log(" ");
console.log("BONUS");

let moyenne2 = 0;

//additionne chaque moyenne puis en dehors de la boucle affiche la moyenne de class (moyenne divisé par le nombre de note)
for (i = 0; i < group.length; i++) {
  moyenne2 += (group[i].noteFr + group[i].noteMaths) / 2;
}
console.log(moyenne2 / group.length);
