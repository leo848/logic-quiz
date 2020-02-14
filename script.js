'use strict';

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
});
function startGame (){
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	shuffledQuestions.forEach((obj) => {
		shuffle(obj.answers);
	});
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove('hide');
	setNextQuestion();
}
function setNextQuestion (){
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion (question){
	questionElement.innerHTML = question.question;
	question.answers.forEach((answer) => {
		const button = document.createElement('button');
		button.innerHTML = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answerButtonsElement.appendChild(button);
	});
}
function resetState (){
	clearStatusClass(document.body);
	nextButton.classList.add('hide');
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}
function selectAnswer (e){
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatusClass(document.body, correct);
	Array.from(answerButtonsElement.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	} else {
		startButton.innerHTML = 'Restart';
		startButton.classList.remove('hide');
	}
}
function setStatusClass (element, correct){
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}
function clearStatusClass (element){
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

function shuffle (array){
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[
			array[i],
			array[j],
		] = [
			array[j],
			array[i],
		];
	}
}

const questions = [
	{
		question : 'Bei welchem Input wird<br> <mono>-a ^ b</mono> <true>true</true> ausgeben?',
		answers  : [
			{ text: 'true, false', correct: false },
			{ text: 'false, true', correct: true },
			{ text: 'true, true', correct: false },
			{ text: 'false, false', correct: false },
		],
	},
	{
		question : 'Was ist der Output von <br><mono>a ^ b</mono> beim Input von (true, false)',
		answers  : [
			{ text: 'true', correct: false },
			{ text: 'false', correct: true },
		],
	},
	{
		question : 'Was ist der Output von <br><mono>a v b</mono> beim Input von (true, false)',
		answers  : [
			{ text: 'true', correct: true },
			{ text: 'false', correct: false },
		],
	},
	{
		question : 'Was ist der Output von <br><mono>-a</mono> beim Input von (false)',
		answers  : [
			{ text: 'true', correct: true },
			{ text: 'false', correct: false },
		],
	},
	{
		question : 'Wie heißt der Schaltterm? ',
		answers  : [
			{ text: 'a v b', correct: true },
			{ text: 'false', correct: false },
		],
	},
];
