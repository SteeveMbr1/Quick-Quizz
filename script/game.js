const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const questionCounterText = document.querySelector('#questionCounter');
const progressBar = document.querySelector('#progressBar > div');
const scoreTxt = document.querySelector('#score');

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('questions.json')
    .then(res => {
        return res.json()
    })
    .then(qs => {
        questions = qs;
        startGame();
    });


checkAnswer = (answer) => {
    if (!acceptingAnswers) return;

    console.log(currentQuestion);
    acceptingAnswers = false;
    let answer_class = "incorrect";
    if (answer.target.innerText === currentQuestion.answer) {
        answer_class = "correct";
        scoreTxt.innerHTML = score += CORRECT_BONUS;
    }
    answer.target.parentElement.classList.add(answer_class);
    setTimeout(() => {
        answer.target.parentElement.classList.remove(answer_class);
        getNewQuestion();
    }, 1000);
}

getNewQuestion = () => {

    if (!availableQuestions.length || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostResentScore', score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBar.style.width = (questionCounter / MAX_QUESTIONS * 100) + '%';
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach((choice, i) => {
        choice.innerText = currentQuestion.choices[i];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

choices.forEach(choice => {
    choice.addEventListener('click', checkAnswer)
})