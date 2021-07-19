var quizQuestions = document.querySelector("#questions");
var quizAnswers = document.querySelector("#answers");
var button = document.querySelector("#button");
var homepageInstruction = document.querySelector('#instruction');
var headerEl = document.querySelector('#header');

//create element
var form;
var divBlock;

//variables for question array
var currentQuestion
//index of question array
var currentQuestionIndex;

//questions in array
var jsQuizQuestions;



function startQuizButton(){
    questionList();
    button.remove();
    homepageInstruction.remove();
    headerEl.remove();
    currentQuestion = jsQuizQuestions;
    currentQuestionIndex = 0;
    startQuiz();
}

function startQuiz(){
    showQuestion(currentQuestion[currentQuestionIndex])
}

function showQuestion(question){
    divBlock = document.createElement('div');
    quizQuestions.appendChild(divBlock);
    divBlock.innerText = question.question;
    divBlock.setAttribute('id','divBlock');
    getCurrenQuestion = document.querySelector('#divBlock');


    var letterAnswers = [question.answers.a, question.answers.b, question.answers.c, question.answers.d];
    var letter = ["A","B","C","D"];
    var labelContainerID = ["label1","label2","label3","label4"];

    form = document.createElement('form');
    form.setAttribute('id','form')

    for(var i = 0; i < letterAnswers.length; i++){
        var label = document.createElement('label');
        label.setAttribute('type', 'label');
        label.setAttribute('id', labelContainerID[i])

        var radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('id', letter[i]);
        radio.setAttribute('name', 'radioButton');
        radio.setAttribute('value', letterAnswers[i]);
        var text = document.createElement('label');
        text.htmlFor = letter[i];
        text.innerText = letterAnswers[i];
        label.appendChild(radio);
        label.appendChild(text);
        form.appendChild(label);
        
        radio.addEventListener('click', checkAnswer);
    }
    quizAnswers.appendChild(form);
    
    
        
}

function checkAnswer(event){
    var event = event.target.value;
    removeForm = document.querySelector('#form');
    if(event == jsQuizQuestions[currentQuestionIndex].correctAnswer){
        console.log('correct');
        removeForm.remove();
        getCurrenQuestion.remove();

        currentQuestionIndex = 1;
        startQuiz();

    }else{
        console.log('incorrect');
    }
}

function questionList(){
    jsQuizQuestions = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            answers: {
                a: '<script>',
                b: '<js>',
                c: '<scripting>',
                d: '<javascript>',
            },
            correctAnswer: "<script>"
        },
        {
            question: "Where is the correct place to insert a JavaScript?",
            answers: {
              a: "Both the <head> section and the <body> section are correct",
              b: "The <head> section",
              c: "The <body> section",
              d: "None of the above"
            },
            correctAnswer: "The <body> section"
        }
    ];
}




button.addEventListener('click', startQuizButton);

