const question = document.getElementById('question');
const choise = document.getElementsByClassName('choise-text');
const progressText = document.getElementById('progressText')
const progressBox = document.getElementById('progressBox')
const scoreValue = document.getElementById('score')
// console.log(choise)

let currentQuestion = {};
let answers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let questions = [];
console.log(questions.length)
setTimeout(() => {
    fetch('question.json')
.then(res => {
    return res.json()
})
.then(loadQuestions => {
    console.log(loadQuestions.length)
    questions = loadQuestions;
    startQuiz()
})
}, 1000);
const correctAnswer = 100 / 10;
console.log(correctAnswer)
const maxQuestion = 10;
console.log(maxQuestion)
const startQuiz = () => {
    availableQuestion = [...questions];
    // console.log(availableQuestion) 
    getQuestion()
    
}


const getQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter > maxQuestion) {
        localStorage.setItem('recentScore', score)
        return window.location.assign('result.html')
    }
    questionCounter !== maxQuestion ? questionCounter++ : questionCounter;
    progressText.innerText = ` ${questionCounter}/${maxQuestion}`;
    // console.log(questionCounter/maxQuestion * 100);
    progressBox.style.width = `${(questionCounter/maxQuestion * 100)}%`
    const questionIndex = Math.floor(Math.random() * availableQuestion.length)
    // console.log(questionIndex)
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    Array.from(choise).forEach(choice => {
        // console.log(chois)
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionIndex, 1)
    // console.log(availableQuestion)
    answers = true;  
    
}

Array.from(choise).forEach(choice => {
    choice.addEventListener('click', e => {
        // console.log(e.target)
        if (!answers) return;

        answers = false;
        const selectedChoise = e.target;
        const selectAnswer = selectedChoise.dataset['number']
        const classToApply = selectAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoise.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoise.parentElement.classList.remove(classToApply);
            getQuestion()
        }, 500);
        if (classToApply == 'correct') {
            updateScore(correctAnswer)
        }
        // console.log(classToApply)
    })
});

updateScore = (num) => {
    score += num;
    scoreValue.innerHTML = score.toFixed(0);
}

// let startTime = 60/20;
// console.log(startTime)
// let timeCal = startTime % 60;
// const time = document.getElementById('time');
// setInterval(countTime, 1000)
// function countTime() {
//     timeCal !== 0 ? timeCal-- : timeCal;
//     let second = Math.floor(timeCal % 60)
//     // console.log(second)
//     second = second < 10 ? '0' + second : second;
//     time.innerHTML = `00:${second}`;
     
// }
// countTime()



