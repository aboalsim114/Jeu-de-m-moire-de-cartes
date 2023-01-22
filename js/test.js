// Création d'un tableau pour stocker les cartes retournées
let flippedCards = [];

// Sélection de toutes les cartes sur la page
const cards = document.querySelectorAll('.memory-card');

// Ajout d'un événement de clic à chaque carte
cards.forEach(card => {
    // Génération d'un nombre aléatoire 
    const randomNum = Math.floor(Math.random() * cards.length);
    card.innerHTML = `<span style="font-size : 30px" class="random-num">${randomNum}</span>`;
    card.querySelector('.random-num').style.display = "none";
    card.addEventListener('click', flipCard);
});

// Fonction pour retourner une carte
function flipCard() {

    // Vérification si la carte est déjà retournée ou si deux cartes sont déjà retournées

    if (this.classList.contains('flip') || flippedCards.length === 2) return;

    // Ajout de la classe "flip" à la carte
    this.classList.add('flip');
    this.querySelector('.random-num').style.display = "block";

    // Ajout de la carte au tableau des cartes retournées
    flippedCards.push(this);

    // Vérification si deux cartes sont retournées
    if (flippedCards.length === 2) {
        // Vérification si les cartes correspondent
        checkForMatch();
    }
}

// Fonction pour vérifier si les cartes correspondent
function checkForMatch() {
    // Récupération du contenu HTML de la balise span contenant le nombre aléatoire des deux cartes retournées
    const card1 = flippedCards[0].querySelector('.random-num').textContent;
    const card2 = flippedCards[1].querySelector('.random-num').textContent;

    // Vérification si les cartes correspondent
    if (card1 === card2) {
        // Si elles correspondent, on désactive les cartes en changeant leur couleur en vert
        flippedCards[0].style.backgroundColor = "#42ba96";
        flippedCards[1].style.backgroundColor = "#42ba96";
        disableCards();
    } else {
        // Si elles ne correspondent pas, on les remet en place après un délai de 1 seconde
        setTimeout(unflipCards, 1000);

    }
}

// Disable cards function
function disableCards() {
    flippedCards[0].removeEventListener('click', flipCard);
    flippedCards[1].removeEventListener('click', flipCard);
    flippedCards = [];
}

// Unflip cards function
function unflipCards() {
    flippedCards[0].classList.remove('flip');
    flippedCards[1].classList.remove('flip');
    flippedCards[0].querySelector('.random-num').style.display = "none";
    flippedCards[1].querySelector('.random-num').style.display = "none";
    flippedCards = [];
}