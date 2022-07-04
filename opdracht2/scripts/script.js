// de kaarten met de vissen - bovenaan 
const theStapel = document.querySelector('.kaarten ul');
const theCards = theStapel.querySelectorAll('.kaarten ul li');

// de counter onderaan
const theCounter = document.querySelector('.zwemmen h1 span');

// de lege lijst onderaan
const theList = document.querySelector('.zwemmen ul');


/*****************/
/*     SWIPEN    */
/*****************/
// kaarten
theCards.forEach( card => {	
	// het kunnen swipen naar links en rechts
	let cardHammer = new Hammer(card);
	cardHammer.on("swipeleft", (e) => {
		let card = e.target;
		trashCard(card);
	});
	cardHammer.on("swiperight", (e) => {
		let card = e.target;
		likeCard(card);
	});
});


/******************/
/* LINKER en RECHTER PIJLEN */
/******************/

document.addEventListener("keydown", handleKeypresses);

function handleKeypresses(e) {
	
	switch (e.code) {
		case "ArrowLeft":
			if(getBovensteCard()) {
				trashCard(getBovensteCard());
			}
			break;
		case "ArrowRight":
			if(getBovensteCard()) {
				likeCard(getBovensteCard());
			}
			break;
	}
}

function getBovensteCard() {
	let swippebleCards, bovensteCard;
	swippebleCards = theStapel.querySelectorAll("li:not(.trash):not(.like)");
	bovensteCard = swippebleCards[swippebleCards.length - 1];
	return bovensteCard;
}


/*********************/
/* EVENTS AFHANDELEN */
/*********************/

function trashCard(card) { 
	card.classList.add("trash");
};
	
function likeCard(card) {
	card.classList.add("like");
	

	let cardClone = card.cloneNode(true);
	
	
	let trashButton = document.createElement("button");
	trashButton.textContent = "";

	trashButton.addEventListener("click", trashFavo);

	cardClone.appendChild(trashButton);
	
	theList.appendChild(cardClone);
	
	
	
	// counter ophogen
	let huidigeWaarde = parseInt(theCounter.textContent);
	let nieuweWaarde = huidigeWaarde + 1;
	theCounter.textContent = nieuweWaarde;
};


function trashFavo(e) {
	let theButton = e.target;
	let theFavoCard = theButton.closest("li");
	theFavoCard.remove();
	
	
	
	// counter verlagen
	let huidigeWaarde = parseInt(theCounter.textContent);
	let nieuweWaarde = huidigeWaarde - 1;
	theCounter.textContent = nieuweWaarde;
}