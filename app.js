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
let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<javascript>",
        choice2: "<js>",
        choice3: "<script>",
        choice4: "<scripting>",
        answer: 3
    },
    {
        question: "How do you write \"Hello World\" in an alert box?",
        choice1: "msg(\"Hello World\");",
        choice2: "alert(\"Hello World\");",
        choice3: "msgBox(\"Hello World\");",
        choice4: "alertBox(\"Hello World\");",
        answer: 2
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choice1: "if (i == 5)",
        choice2: "if i = 5 then",
        choice3: "if i == 5 then",
        choice4: "if i = 5",
        answer: 1
    },
    {
        question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        choice1: "if (i != 5)",
        choice2: "if (i <> 5)",
        choice3: "if i =! 5 then",
        choice4: "if i <> 5",
        answer: 1
    },
    {
        question: "How does a FOR loop start?",
        choice1: "for (i = 0; i <= 5; i++)",
        choice2: "for (i <= 5; i++)",
        choice3: "for i = 1 to 5",
        choice4: "for (i = 0; i <= 5)",
        answer: 1
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choice1: "var colors = \"red\", \"green\", \"blue\"",
        choice2: "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
        choice3: "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
        choice4: "var colors = [\"red\", \"green\", \"blue\"]",
        answer: 4
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        choice1: "round(7.25)",
        choice2: "rnd(7.25)",
        choice3: "Math.round(7.25)",
        choice4: "Math.rnd(7.25)",
        answer: 3
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        choice1: "top(x, y)",
        choice2: "Math.max(x, y)",
        choice3: "ceil(x, y)",
        choice4: "Math.ceil(x, y)",
        answer: 2
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onchange",
        choice2: "onclick",
        choice3: "onmouseover",
        choice4: "onmouseclick",
        answer: 2
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choice1: "-",
        choice2: "x",
        choice3: "=",
        choice4: "*",
        answer: 3
    }
];
// console.log(questions)

const correctAnswer = 100 / questions.length;
// console.log(correctAnswer)
const maxQuestion = questions.length;

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
startQuiz()
