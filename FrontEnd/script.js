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
    const newWork = document.createElement('figure');
    const newWorkImg = document.createElement('img');
    newWorkImg.src = works[i].imageUrl;
    const newWorkText = document.createElement('figcaption');
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
  //creation d'une constante pour filtrer les travaux de type "objet"
  const objets = works.filter(work => work.categoryId === 1);
  // on parcourt le tableau worksElements
  for (let i = 0; i < worksElements.length; i++) {
    //condition "si l'élément parcouru dans le tableau works est un élément présent dans la constante objets"
    if (objets.includes(works[i])) {
      //si true, on affiche le worksElements parcouru
      worksElements[i].style.display = "block";
    } else {
      //sinon, on le cache
      worksElements[i].style.display = "none";
    }
  }
});

appartementsBtn.addEventListener("click", function() {
  const appartements = works.filter(work => work.categoryId === 2);
  for (let i = 0; i < worksElements.length; i++) {
    if (appartements.includes(works[i])) {
      worksElements[i].style.display = "block";
    } else {
      worksElements[i].style.display = "none";
    }
  }
});

hotelsRestaurantsBtn.addEventListener("click", function() {
  const hotelsRestaurants = works.filter(work => work.categoryId === 3);
  for (let i = 0; i < worksElements.length; i++) {
    if (hotelsRestaurants.includes(works[i])) {
      worksElements[i].style.display = "block";
    } else {
      worksElements[i].style.display = "none";
    }
  }
});

}


// récupération du token dans le local Storage
const userToken = localStorage.getItem('token');

if (userToken) {
  const loginButton = document.querySelector("#loginButton");
  loginButton.innerHTML = "<a href='./login.html'>logout</a>";

  const h1Header = document.querySelector("header h1");
  h1Header.style.marginTop = "38px";
  const nav = document.querySelector("nav");
  nav.style.marginTop ="38px"

  const modeEditionBandeau = document.querySelector(".mode-edition");
  modeEditionBandeau.style.display = "flex";

  loginButton.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  // ajout des boutons modifier et positionnement "Mes Projets"
  document.querySelector("#introduction i").style.display = "block";
  document.querySelector("#portfolio i").style.display = "block";
  document.querySelector(".portfolio-title").style.marginLeft = "115px";


  //MODALE

  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modalContent");
  const modalTitle = document.querySelector(".modalTitle")
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.getElementById("closeModalButton");


  openModalButton.addEventListener('click', function() {
    openModal();
  })

  closeModalButton.addEventListener('click', function(e) {
      closeModal();
  })

  modal.addEventListener('click', function(e) {
    if (e.target !== modal) {
      return
    } else if (e.target !== modalContent) {
      closeModal();
    }
  }) 

  const modalGallery = document.querySelector(".modalGallery");
  
  let imagesImported = false;

  function createModalGallery () {
    for (let i = 0; i < works.length; i++) {
    const newWork = document.createElement('figure');
    newWork.setAttribute('data-id', works[i].id);
    const newWorkImg = document.createElement('img');
    newWorkImg.src = works[i].imageUrl;
    const newWorkText = document.createElement('figcaption');
    newWorkText.innerHTML = "editer";
    const newDustBin = document.createElement('div')
    newDustBin.classList = "dustbin"
    newDustBin.innerHTML = "<i class='fa-solid fa-trash-can'></i>"

    modalGallery.appendChild(newWork);
    newWork.appendChild(newWorkImg);
    newWork.appendChild(newWorkText);
    newWork.appendChild(newDustBin)
    
    imagesImported = true;

    
    
    newDustBin.addEventListener('click', function() {
      const workId = newWork.getAttribute('data-id');
      deleteWork(workId, newWork);
    })
    }
  }

  
  const openModal = async function () {
    modal.style.display = "flex"
    if (!imagesImported) {
      getTheWorks()
      createModalGallery()
      
      
      const boutonAjoutPhoto = document.getElementById("ajoutPhoto")
      boutonAjoutPhoto.addEventListener('click', function() {
        const modal2 = document.getElementById("modal2")
        modal.style.display = "none"
        modal2.style.display = "flex"
      })
    }
  }
  
  async function deleteWork(workId, newWork) {
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, { method: 'DELETE' });
      if (response.ok) {
        works[i].remove();
      } 
    }
  

  const closeModal = function () {
    modal.style.display = "none"
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e)
    }
  })
  

}


  



