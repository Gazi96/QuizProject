import './assets/scss/app.scss';

startApp();

function startApp(){
	const startTime = new Date().getTime();
	const stats = [0, 0, startTime];
	const url = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json';
	
	exitApp();
	again();
	fetchData(url, stats);
}

function fetchData(url, stats) {					
	fetch(url)
		.then(resp => resp.json())
		.then(resp => {
			createElements(resp, stats)
		});
}
	
function createElements(card, stats){
	const cardQuestion = document.getElementsByClassName("card__question")[0];
	const cardAnswers = document.getElementsByClassName("card__box-answers")[0];
																			
	const question = document.createElement("h1");
	question.classList = "card__headline sg-text-bit sg-text-bit sg-text-bit--light sg-header-primary--small";
	const answerFirst = document.createElement("h2");
	answerFirst.classList = "card__answer card__answer--first sg-header-primary sg-header-primary--xsmall sg-header-primary--light";
	const answerSecond = document.createElement("h2");
	answerSecond.classList = "card__answer card__answer--second sg-header-primary sg-header-primary--xsmall sg-header-primary--light";
		
	appendElements(card, cardQuestion, cardAnswers, question, answerFirst, answerSecond, stats);
}

function appendElements(card, cardQuestion, cardAnswer, question, answerFirst, answerSecond, stats){
	cardQuestion.textContent = "";
	cardAnswer.textContent = "";
																			
	cardQuestion.appendChild(question);
	cardAnswer.appendChild(answerFirst);
	cardAnswer.appendChild(answerSecond);

	inputData(card, question, answerFirst, answerSecond, stats);
}

function inputData(card, question, answerFirst, answerSecond, stats){
	const cardFirst = card[0];
	question.textContent = cardFirst.question;
	answerFirst.textContent = cardFirst.answers[0].answer;
	answerSecond.textContent = cardFirst.answers[1].answer;
	
	eventListener(card, cardFirst, stats);
}

function eventListener(card, cardFirst, stats){
	const allAnswers = document.getElementsByClassName("card__answer");
	for(let i = 0; i < allAnswers.length; i++){
    	allAnswers[i].addEventListener('click', function(){
			checkAnswer(i, cardFirst, card, allAnswers, stats);
			
		}, false)
	}
}

function checkAnswer(i, cardFirst, card, allAnswers, stats){	
	if(cardFirst.answers[i].correct == true){
		stats[0] += 1;
		card.splice(0,1);
	}
	else{
		stats[1] += 1;
		card.push(card.shift());
	}
	
	showAnswer(i, allAnswers, cardFirst);
	
	const time = setTimeout(function(){
		removeClass(allAnswers);
		checkAmountOfCards(card, stats);
	}, 3200);
}

function showAnswer(i, allAnswers, cardFirst){
	if(cardFirst.answers[0].correct == true){
		allAnswers[0].classList += " good-answer";
		allAnswers[1].classList += " wrong-answer";
	}
	else{
		allAnswers[1].classList += " good-answer";
		allAnswers[0].classList += " wrong-answer";
	}
}

function removeClass(allAnswers){
	for(let i = 0; i < allAnswers.length; i++){
		if(allAnswers[i].classList.contains("good-answer")){
			allAnswers[i].classList.remove("good-answer");
		}
		if(allAnswers[i].classList.contains("wrong-answer")){
			allAnswers[i].classList.remove("wrong-answer");
		}
	}
}

function checkAmountOfCards(card, stats){
	if(card.length != 0){
		createElements(card, stats);
	}	
	else{
		feedback(card, stats);
	}
}

function feedback(card, stats){
	const feedbackContainer = document.getElementsByClassName("feedback")[0];
	feedbackContainer.classList += " feedback-flex";
	
	const feedbackStats = document.getElementsByClassName("feedback__text");
	const howLong = (new Date().getTime() - stats[2]) / 1000;
	
	feedbackStats[0].textContent = "GOOD ANSWERS: " + stats[0];
	feedbackStats[1].textContent = "WRONG ANSWERS: " + stats[1];
	feedbackStats[2].textContent = "TIME: " +  howLong;
}

function again(){
	const againButton = document.getElementsByClassName("again")[0];
	const feedbackContainer = document.getElementsByClassName("feedback")[0];
	
	againButton.addEventListener("click", function(){
		feedbackContainer.classList.remove("feedback-flex");
		startApp();
	});
}

function exitApp(){
	const exitButton = document.getElementsByClassName("header__exit")[0];
	
	exitButton.addEventListener("click", () => {
		startApp();
	});
}
