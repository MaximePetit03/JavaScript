//Afficher dans une console du nav
let count = 1;
console.log(count);
let numb = 2;
console.log(numb);

const user = { name: "Alice" };
console.log(user);
user.name = "bob";
console.log(user);

// Ajouter un élément à un tableau
let array = ["apple", "orange"];
console.log(array);
array.push("kiwi");
console.log(array);
array.unshift("lemon");
console.log(array);
console.log(" ");
console.log("Supprimer le dernier élément :");

// Supprimer le dernier élément
array.pop();
console.log(array);
console.log(" ");
console.log("Supprimer au le 1er élément :");

// Supprimer au le 1er élément
array.shift();
console.log(array);
console.log(" ");
console.log("Parcourir un tableau (itération): ");

//Itération
for (i = 0; i < array.length; i++) {
  console.log(array[i]);
}

console.log("=============");

array.forEach(function (fruit) {
  console.log(fruit);
});

console.log(" ");
console.log("Déclaration d'un objet : ");

// Déclaration d'un objet
let person = {
  name: "Aline",
  age: 20,
  isAdmin: false,
};

console.log(person);
console.log(person.name);
console.log(person.age);
console.log(person.isAdmin);
console.log(" ");
console.log("Supprimer une propriété : ");
delete person.isAdmin;
console.log(person);
