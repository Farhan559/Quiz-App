const question = document.getElementById('question');
const choices =Array.from(document.getElementsByClassName('choice-text'));

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



    let questions = [
 {

        question : "<Inside which HTML element do we put the Javascript>",
        choice1 : "<script>" ,
        choice2 : "<Javascript>" ,
        choice3 : "<JS>" ,
        choice4 : "<Scripting>" ,
        answer : 1
        
},
{
        question : "What is the correct syntax for refreshing to an external script called 'xx.js'?",

        choice1 : "<Script href='xx.js'>",
        choice2 : "<Script name = 'xx.js'>",
        choice3: "<Script src='xx.js'>",
        choice4:"<Script file='xx.js'>",
        answer:3

},
{
    question:"How do you write 'Hello World' in an alert box?",
    choice1:"msgBox('Hello World');",
    choice2:"alertBox('Hello World');",
    choice3:"msg('Hello World');",
    choice4:"alert('Hello World');",
    answer:4
}
    

    ];
// CONSTRANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

    startGame= ()=>
    {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        // console.log(availableQuestions);

        getNewQuestion();
   
    };
    
    getNewQuestion = ()=>
    {
        if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
        {
            localStorage.setItem("mostRecentScore",score);
            // go to the end of the file
            return window.location.assign('./end.html');
        }



        questionCounter++;
        progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
        
        // Update the ProgressBar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%` ;



      const questionIndex =  Math.floor(Math.random()*availableQuestions.length);
     currentQuestion = availableQuestions[questionIndex];
     question.innerText = currentQuestion.question;
    
    
    choices.forEach(choice => {
        const number = choice.dataset ['number'];
        choice.innerText = currentQuestion['choice' + number];


    });
    availableQuestions.splice(questionIndex,1);
    // console.log(availableQuestions);
    acceptAnswers = true; 
    
    
    };

    choices.forEach(choice =>{ 

        choice.addEventListener("click", e =>{
            // console.log(e.target);
            if(!acceptAnswers) return;
            acceptAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

                if(classApply == 'correct'){
                    increamentScore(CORRECT_BONUS);
                }

            selectedChoice.parentElement.classList.add(classApply) ;
            
            setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classApply);
                getNewQuestion();


            },1000);   
            

        });
    });
        increamentScore = num =>{
            score += num;
            scoreText.innerText = score;
        }

    





    startGame();
    