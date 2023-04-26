const gallery = document.querySelector('.gallery');

// Récupération des travaux depuis l'API
async function getTheWorks() {
  const getWorks = await fetch("http://localhost:5678/api/works");
  works = await getWorks.json();

  //appel de la fonction createWorks pour afficher les travaux
  createWorks();
}

getTheWorks();

//Affichage des travaux sur la page d'accueil
function createWorks() {
  for (let i = 0; i < works.length; i++) {
    // creation d'une constante pour placer l'image et son titre
    const newWork = document.createElement('figure');
    //creation d'une constante pour les balises images
    const newWorkImg = document.createElement('img');
    // attribution de la source grâce a l'imageUrl du tableau works
    newWorkImg.src = works[i].imageUrl;
    //création d'une constante pour les balises figcaption (titre)
    const newWorkText = document.createElement('figcaption');
    //attribution du texte grâce au title du tableau works
    newWorkText.innerHTML = works[i].title;
    //attribution d'un categoryId aux balises newWork pour pouvoir les filtrer
    newWork.setAttribute('categoryId', works[i].categoryId);

    // rattachement au div parent pour afficher les éléments sur la page
    gallery.appendChild(newWork);
    newWork.appendChild(newWorkImg);
    newWork.appendChild(newWorkText);

  }
  
  //création d'une constante pour stocker les éléments créer à partir du tableau works
  const worksElements = document.querySelectorAll(".gallery figure"); 

  // Récupération des boutons de filtres
const tousBtn = document.querySelector("#tous");
const objetsBtn = document.querySelector("#objets");
const appartementsBtn = document.querySelector("#appartements");
const hotelsRestaurantsBtn = document.querySelector("#hotelsRestaurants");

// Ajout d'écouteurs d'événements pour chaque bouton de filtre
tousBtn.addEventListener("click", function() {
  //on parcourt les éléments du tableau worksElements (elements du tableau works)
  for (let i = 0; i < worksElements.length; i++) {
    worksElements[i].style.display = "block";
  }
});

objetsBtn.addEventListener("click", function() {
  //creation d'une constante pour définir les éléments du tableau works selon la categoryId qui correspond aux objets
  const objets = works.filter(work => work.categoryId === 1);
  // on parcourt le tableau worksElements
  for (let i = 0; i < worksElements.length; i++) {
    //on donne la condition "si l'élément parcouru dans le tableau works est un élément présent de la constante objets"
    if (objets.includes(works[i])) {
      //si true, on affiche le worksElements parcouru (balise figure avec l'image et son title) grâce au display block
      worksElements[i].style.display = "block";
    } else {
      //sinon, on le cache grâce au display none
      worksElements[i].style.display = "none";
    }
  }
});

appartementsBtn.addEventListener("click", function() {
  //creation d'une constante pour définir les éléments du tableau works selon la categoryId qui correspond aux appartements
  const appartements = works.filter(work => work.categoryId === 2);
  // on parcourt le tableau worksElements
  for (let i = 0; i < worksElements.length; i++) {
    //on donne la condition "si l'élément parcouru dans le tableau works est un élément présent de la constante appartements"
    if (appartements.includes(works[i])) {
      //si true, on affiche le worksElements parcouru (balise figure avec l'image et son title) grâce au display block
      worksElements[i].style.display = "block";
    } else {
      //sinon, on le cache grâce au display none
      worksElements[i].style.display = "none";
    }
  }
});

hotelsRestaurantsBtn.addEventListener("click", function() {
  //creation d'une constante pour définir les éléments du tableau works selon la categoryId qui correspond aux Hôtels Restaurants
  const hotelsRestaurants = works.filter(work => work.categoryId === 3);
  // on parcourt le tableau worksElements
  for (let i = 0; i < worksElements.length; i++) {
    //on donne la condition "si l'élément parcouru dans le tableau works est un élément présent de la constante Hôtels Restaurants"
    if (hotelsRestaurants.includes(works[i])) {
      //si true, on affiche le worksElements parcouru (balise figure avec l'image et son title) grâce au display block
      worksElements[i].style.display = "block";
    } else {
      //sinon, on le cache grâce au display none
      worksElements[i].style.display = "none";
    }
  }
});

}











