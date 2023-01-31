// Création d'un tableau pour stocker les cartes retournées
let flippedCards = [];
const replayButton = document.getElementById('replay-button');
const nb_essaie = document.getElementById('nb_essaie');
// Sélection de toutes les cartes sur la page
const cards = document.querySelectorAll('.memory-card');
const levelId = document.getElementById("level");



// Créer un tableau avec tous les nombres aléatoires
const randomNums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

// Mélanger les nombres aléatoires
randomNums.sort(() => Math.random() - 0.5);

cards.forEach((card, index) => {
    // Génération d'un nombre aléatoire 
    card.innerHTML = `<span style="font-size : 30px" class="random-num">${randomNums[index]}</span>`;
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


let matches = 0;
let essaie = 10;

nb_essaie.innerHTML = "nombres d'essaie = " + essaie;

function checkEssaie() {
    if (essaie <= 0) {
        Swal.fire(
            'Fin de la partie',
            'Vous avez épuisé tous vos essais',
            'error'
        )
        cards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
        return;
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

        matches++;



        if (matches === 6) {
            console.log("vous avez gagné ");
            Swal.fire(
                'Bravo',
                'Vous avez gagné la partie',
                'success'
            )
            cards.forEach(card => {
                card.removeEventListener('click', flipCard);
            });
            replayButton.style.display = 'block';





        }
    } else {
        // Si elles ne correspondent pas, on les remet en place après un délai de 1 seconde
        setTimeout(unflipCards, 1000);

        essaie -= 1;
        nb_essaie.innerHTML = "nombres d'essaie = " + essaie;

        checkEssaie();
    }
}


replayButton.addEventListener('click', function() {
    window.location.reload();
});

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






let timer = 30; // durée du compteur en secondes
const timerDisplay = document.getElementById('timer-display');

// mettre à jour l'affichage du compteur à chaque seconde
const interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Temps restant : ${timer} secondes`;

    // arrêter le compteur lorsqu'il atteint 0

    if (timer <= 5) {
        timerDisplay.style.color = "#df4759";
    }

    if (timer === 0) {
        clearInterval(interval);
        Swal.fire(
            'Fin du temps',
            'Votre temps est écoulé',
            'error'
        )
        cards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
    }
}, 1000);