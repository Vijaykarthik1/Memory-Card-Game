const cards = document.querySelectorAll(".memory-card")
let hasFlippedCard = false;
let lockBoard = false
let firstCard, secondCard;


function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
        // console.log({hasFlippedCard,firstCard})
    }
    //second click
    secondCard = this;
    // console.log({hasFlippedCard,secondCard})
    checkformatch()

}

function checkformatch() {
    //do cards match ?
    // console.log(firstCard.dataset.framework);
    // console.log(secondCard.dataset.framework);
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards()
    // if(firstCard.dataset.framework === secondCard.dataset.framework){
    //     //if its a match
    //     disableCards()
    // }else{
    //   unflipCards()
    // }
    // console.log("function was executed")
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    //not a match
    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        lockBoard=false;
        resetBoard();
    }, 800);

}

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null]
}


(function shuffle(){
    cards.forEach((card)=>{
        let random = Math.floor( Math.random()*12) ;
        card.style.order = random;
     })
})();

cards.forEach((card) => {
    card.addEventListener("click", flipCard)
})