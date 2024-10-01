const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct= selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'London', correct: false},
            { text: 'Berlin', correct: false},
            { text: 'Madrid', correct: false},
            { text: 'Paris', correct: true},
        ]
    },

    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Jupiter', correct: false},
            { text: 'Venus', correct: false},
            { text: 'Mars', correct: true},
            { text: 'Saturn', correct: false},
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
]