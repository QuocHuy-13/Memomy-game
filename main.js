let cards =
    ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
    "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let matchCard = [] ;
let openCards = [] ;
const decks = document.getElementById('card-deck');
let modalShow = document.querySelector('#modal-show');
let timer = document.querySelector('.timer');
let moves = document.querySelector('.moves');
let second = 0; minute = 0; hour = 0 ;
let counter ;
let movesIncrement = 0 ;
console.log(moves);
function Shuffle(items) {
    let currentIndex = items.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = items[currentIndex];
        items[currentIndex] = items[randomIndex];
        items[randomIndex] = temporaryValue;
    }
    return items
}

function startGame() {
    cards = Shuffle(cards);
    console.log(cards[0])
    for (let item of cards) {
        decks.innerHTML +=
            `<li class="card" >
                <i class="${item}"></i>
            </li>`
    }
    second = 0 ;
    minute = 0 ;
    hour = 0 ;
    timer.innerHTML = "0 mins 0 secs" ;
    clearInterval(counter);
}

function clicked() {
    if(this.getAttribute('class') == 'card'){
        displayCard(this);
    }
}

function displayCard(itemCard) {
    itemCard.setAttribute('class', 'card open show')
    addToOpenCard(itemCard);
}

function addToOpenCard(CardItemOpen) {
    openCards.push(CardItemOpen);
    if(openCards.length === 2) {
        counterMoves();
        if(checkMatch()){
            cardMatch();
        }
        else {
            cardNotMatch();
        }
    }
}

function checkMatch() {
    if(openCards[0].querySelector('i').getAttribute("class") == openCards[1].querySelector('i').getAttribute("class")){
        return true ;
    }else {
        return false ;
    } 
}

function cardMatch() {
    openCards[0].setAttribute('class', "card match");
    openCards[1].setAttribute('class', 'card match');
    matchCard.push(openCards[0]);
    matchCard.push(openCards[1]);
    openCards = [] ;
    endGame();
}

function cardNotMatch() {
    setTimeout(() => {
        openCards[0].setAttribute('class', 'card unmatch');
        openCards[1].setAttribute('class', 'card unmatch');
    },500)
    setTimeout(() => {
        openCards[0].setAttribute('class', 'card');
        openCards[1].setAttribute('class', 'card');
        openCards = [];
    },1000);
}

function endGame() {
    if(matchCard.length === cards.length) {
        clearInterval(counter);
        finalTimer = timer.innerHTML;
        modalShow.classList.add('show-modal')
        document.getElementById('number-moves').innerHTML = movesIncrement ;
        document.getElementById('time-game').innerHTML = finalTimer ;
    }
}

function playAgain() {
    modalShow.classList.remove('show-modal');
    restartGame();
}

function restartGame() {
    location.reload();
}

function counterTimer() {
    counter = setInterval(() => {
        timer.innerHTML = `${minute} min ${second} secs`;
        second++ ;
        if(second == 60) {
            minute+= 1;
            second = 0 ;
        }
        if(minute == 60) {
            hour+= 1 ;
            minute = 0 ;
        }
    },1000)
}

function counterMoves() {
    movesIncrement++ ;
    moves.innerHTML = movesIncrement;
    if(movesIncrement == 1) {
        counterTimer();
    }
}

startGame();

let ListCard = document.querySelectorAll('li');
for(let i = 0; i < ListCard.length; i++ ){
    let card = ListCard[i] ;
    card.addEventListener('click', clicked)
}

