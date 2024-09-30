const startButton = document.getElementById('start-btn')

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')


}

function setNextQuestion(){

}

function selectAnswer() {

}