const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const exitButton = document.getElementById('exit-btn');
const questionContainerElement = document.getElementById('question-container');
const startPageElement = document.getElementById('start-page');
const endPageElement = document.getElementById('end-page');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('feedback');
const questionNumberElement = document.getElementById('question-number');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const finalFeedbackElement = document.getElementById('final-feedback');

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartGame);
exitButton.addEventListener('click', exitGame);

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    startPageElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    feedbackElement.innerText = '';
    updateStatus();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateStatus();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    feedbackElement.innerText = '';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        feedbackElement.innerText = 'Correct Answer!';
        score++;
    } else {
        feedbackElement.innerText = 'Wrong Answer!';
    }
    updateStatus();
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        finishQuiz();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateStatus() {
    questionNumberElement.innerText = `Question: ${currentQuestionIndex + 1}`;
    scoreElement.innerText = `Score: ${score}/5`;
}

function finishQuiz() {
    questionContainerElement.classList.add('hide');
    endPageElement.classList.remove('hide');
    finalScoreElement.innerText = `Your final score is: ${score}/5`;

    let finalMessage = '';
    if (score === 5) {
        finalMessage = 'Congratulations!!!\n You aced the quiz';
    } else if (score >= 3) {
        finalMessage = 'Good job!!!\nYou did well';
    } else {
        finalMessage = 'Better luck next time!!!\nKeep practicing';
    }
    finalFeedbackElement.innerText = finalMessage;
}

function restartGame() {
    endPageElement.classList.add('hide');
    startPageElement.classList.remove('hide');
}

function exitGame() {
    window.close();
}

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Jupiter', correct: false },
            { text: 'Venus', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Saturn', correct: false },
        ]
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        answers: [
            { text: 'Charles Dickens', correct: false},
            { text: 'William Shakespeare', correct: true},
            { text: 'Mark Twain', correct: false},
            { text: 'J.K. Rowling', correct: false},
        ]
    },

    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false},
            { text: 'Indian Ocean', correct: false},
            { text: 'Pacific Ocean', correct: true},
            { text: 'Arctic Ocean', correct: false},
        ]
    },

    {
        question: 'Which element is represented by the symbol "O" in the periodic table?',
        answers: [
            { text: 'Oxygen', correct: true},
            { text: 'Gold', correct: false},
            { text: 'Iron', correct: false},
            { text: 'Helium', correct: false},
        ]
    }
];
