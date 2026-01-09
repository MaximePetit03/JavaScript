// ===============================
// Partie 1 – Informations générales
// ===============================

// Déclaration des variables

console.log("Partie 1 – Informations générales");

const nomClasse = "2nde A";
let nombreEleves = 3;
let classeOuverte = true;

// Affichage des informations
console.log("Classe :", nomClasse);
console.log("Nombre d'élèves :", nombreEleves);
console.log("Classe ouverte :", classeOuverte);

// ===============================
// Partie 2 – Représenter un élève
// ===============================

console.log("Partie 2 – Représenter un élève");

// Déclaration d'un objet représentant un élève
let eleve1 = {
    prenom: "Alice",
    noteMaths: 14,
    noteFrancais: 12
};

// Affichage des informations de l'élève
console.log("Premier élève :", eleve1.prenom);

// ===============================
// Partie 3 – Tableau d’élèves
// ===============================

console.log("Partie 3 – Tableau d’élèves");

// Déclaration d'un tableau d'élèves comprenant le premier élève
let eleves = [
    eleve1,
    {
        prenom: "Bob",
        noteMaths: 9,
        noteFrancais: 11
    },
    {
        prenom: "Charlie",
        noteMaths: 16,
        noteFrancais: 15
    },
    {
        prenom: "Robert",
        noteMaths: 8,
        noteFrancais: 10
    }
];

// Affichage des prénoms des élèves
for (let i = 0; i < eleves.length; i++) {
    console.log("Élève :", eleves[i].prenom);
}

// ===============================
// Partie 4 – Calcul des moyennes
// ===============================

console.log("Partie 4 – Calcul des moyennes");

// Calcul et affichage des moyennes de chaque élève
for (let i = 0; i < eleves.length; i++) {
    // Calcul de la moyenne
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
    // Affichage de la moyenne
    console.log(eleves[i].prenom, "- Moyenne :", moyenne);
}

// ===============================
// Partie 5 – Résultat (if / else)
// ===============================

console.log("Partie 5 – Résultat (admis/refusé)");

// Détermination et affichage des résultats (admis/refusé)
for (let i = 0; i < eleves.length; i++) {
    // Calcul de la moyenne
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
    // Vérification du résultat, si la moyenne est >= 10
    if (moyenne >= 10) {
        // Élève admis
        console.log(eleves[i].prenom, "est admis");
    } else { // Sinon
        // Élève refusé
        console.log(eleves[i].prenom, "est refusé");
    }
}

// ===============================
// Partie 6 – Mention (switch)
// ===============================

console.log("Partie 6 – Mention (switch)");

// Attribution et affichage des mentions selon la moyenne
for (let i = 0; i < eleves.length; i++) {
    // Calcul de la moyenne de l'élève
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
    let mention;

    // Attribution de la mention selon la moyenne
    switch (true) {
        case moyenne >= 16:
            mention = "Très bien";
            break;
        case moyenne >= 14:
            mention = "Bien";
            break;
        case moyenne >= 12:
            mention = "Assez bien";
            break;
        case moyenne >= 10:
            mention = "Passable";
            break;
        default:
            mention = "Insuffisant";
    }
    // Affichage de la mention
    console.log(eleves[i].prenom, "- Mention :", mention);
}

// ===============================
// Partie 7 – Nombre d’admis (while)
// ===============================

console.log("Partie 7 – Nombre d’admis (while)");

// Déclaration des variables pour le comptage
let compteur = 0;
let admis = 0;

// Boucle pour compter le nombre d'élèves admis
while (compteur < eleves.length) {
    // Calcul de la moyenne
    let moyenne = (eleves[compteur].noteMaths + eleves[compteur].noteFrancais) / 2;

    // Si l'élève est admis
    if (moyenne >= 10) {
        // Incrémenter le compteur d'admis
        admis++;
    }
    // Incrémenter le compteur général pour passer à l'élève suivant
    compteur++;
}

// Affichage du nombre d'élèves admis
console.log("Nombre d'élèves admis :", admis);


// ===============================
// Bonus 1 – Calculer la moyenne générale de la classe
// ===============================

console.log("Bonus 1 – Calculer la moyenne générale de la classe");

// Déclaration de la variable pour la somme des moyennes
let sommeMoyennes = 0;

// Calcul de la somme des moyennes de tous les élèves
for (let i = 0; i < eleves.length; i++) {
    // Calcul de la moyenne de l'élève
    let moyenne = (eleves[i].noteMaths + eleves[i].noteFrancais) / 2;
    // Ajout de la moyenne à la somme générale
    sommeMoyennes += moyenne;
}

// Calcul et affichage de la moyenne générale de la classe
let moyenneClasse = sommeMoyennes / eleves.length;
console.log("Moyenne de la classe :", moyenneClasse);


// ===============================
// Bonus 2 – Ajouter un nouvel élève à la classe
// ===============================

console.log("Bonus 2 – Ajouter un nouvel élève à la classe");

// Déclaration du nouvel élève
let nouvelEleve = {
    prenom: "Diane",
    noteMaths: 13,
    noteFrancais: 14
};

// Ajout du nouvel élève au tableau des élèves et mise à jour du nombre d'élèves
eleves.push(nouvelEleve);
nombreEleves = eleves.length;

// Affichage des informations du nouvel élève et du nombre total d'élèves
console.log("Nouvel élève ajouté :", nouvelEleve.prenom);
console.log("Nombre total d'élèves :", nombreEleves);


// ===============================
// Bonus 3 – Ajouter un nouvel élève à la classe
// ===============================

console.log("Bonus 3 – Tous les élèves sont-ils admis ?");

let tousAdmis = true;
let index = 0;

while (index < eleves.length) {
    let moyenne = (eleves[index].noteMaths + eleves[index].noteFrancais) / 2;

    if (moyenne < 10) {
        tousAdmis = false;
    }

    index++;
}

// Vérification si tous les élèves sont admis
if (tousAdmis) {
    // Affichage du message de félicitations
    console.log("Tous les élèves sont admis ! Félicitations !");
} else {
    // Affichage du message d'encouragement
    console.log("Il y a des élèves refusés. Courage à eux !");
}
