
const rulesModal = document.querySelector('.rules');

const rules = document.querySelector('.rulesBtn');

const closeRules = document.querySelector('.closeRules');

const choiceBtn = document.querySelectorAll('.choiceBtn');

const hex = document.querySelector('.game');

const gameArena = document.querySelector('.gameArena');

const winner = document.querySelector('.winner');

const winnerText = document.querySelector('.winnerText');

const arenaCards = document.querySelectorAll('.card');

const playAgain = document.querySelector('.playAgain');

const score = document.querySelector('#result');


const options = [
	{ name: 'scissors' ,
		 beats:['lizard', 'paper'],
			url : 'https://i.ibb.co/6Xwt6MX/icon-scissors.png'},
	
	{ name:'spock',
		 beats:['scissors' , 'rock'],
			url: 'https://i.ibb.co/wYggTvB/icon-spock.png'},
	
	{ name:'paper',
		 beats:['spock' , 'rock'],
			url: 'https://i.ibb.co/PF2qKfJ/icon-paper.png'},
	
	{ name:'lizard',
		 beats:['spock' , 'paper'],
			url: 'https://i.ibb.co/jWBR5PH/icon-lizard.png' },	
	
	{ name:'rock',
		 beats:['lizard' , 'scissors'] , 
			url: 'https://i.ibb.co/cFKXvpT/icon-rock.png' }
] ;






rules.addEventListener('click' , () => {
	

	rulesModal.classList.add('rulesShow');
	rules.classList.add('rulesBtnHide');
	event.preventDefault();
	
});


closeRules.addEventListener('click' , () => {
	
	rulesModal.classList.toggle('rulesShow');
	rules.classList.toggle('rulesBtnHide');
	
});



//game logic

choiceBtn.forEach(button => {
	button.addEventListener('click', () =>{
		const playerChosen = button.dataset.element ;
		console.log(playerChosen);
		const playerChoice = options.find(playerChoice => playerChoice.name === playerChosen);
		console.log(playerChoice.url);
		choose(playerChoice)
		
	})
});

// choose from data-element , search in arrar[options]

function houseChoice() {
	const rand = Math.floor(Math.random() * options.length) ;
	return options[rand] ;
}
	

function choose(playerChoice){
	const HouseChoice  = houseChoice() ;
	displayGameArena([playerChoice, HouseChoice]);
		displayWinner([playerChoice, HouseChoice]);
	console.log([playerChoice, HouseChoice]);
}


function isWinner(results){
	
return results[0].beats.includes(results[1].name);

}


let k = 0;
function displayWinner(results) {
	setTimeout(() =>{
		
		const userWins = isWinner(results);
		const houseWins = isWinner(results.reverse());
		
		if(userWins){
			winnerText.innerText= "YOU WIN";
			arenaCards[0].classList.toggle('won')
			k++ ;
			score.innerHTML = k;

		}else if(houseWins){
			winnerText.innerText= "YOU LOSE";
			arenaCards[1].classList.toggle('won')
			k-- ;
			score.innerHTML = k;
		} else {winnerText.innerText= "DRAW";}
		
		winner.classList.toggle('hidden');
		gameArena.classList.toggle('gameArenaShow');
		
	},1000);
	
		
}



function displayGameArena(results) {
	console.log(results[0]);
	
	arenaCards.forEach((gameArena , idx) =>{
		setTimeout(() => {
			
			gameArena.innerHTML = `<div class="choice ${results[idx].name}">
			<img src=" ${results[idx].url} " alt="${results[idx].name}"/> 
			
			</div>` ;
			
		},idx * 1000);
	})
	
	hex.classList.toggle('hidden');
	gameArena.classList.toggle('hidden');
	
}

playAgain.addEventListener('click' , () => {
	

		gameArena.classList.toggle('hidden');
		hex.classList.toggle('hidden');
		
	arenaCards.forEach(gameArena => {
		gameArena.innerHTML= " ";
		gameArena.classList.remove('won');
		
	})	
	
	winnerText.innerText= " ";
	gameArena.classList.toggle('gameArenaShow');
	winner.classList.toggle('hidden');
});






