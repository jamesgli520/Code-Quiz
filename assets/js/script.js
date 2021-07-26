//questions
var quizQuestions = document.querySelector("#questions");
//answers
var quizAnswers = document.querySelector("#answers");
//start quiz button
var button = document.querySelector("#button");
//homepage instruction
var homepageInstruction = document.querySelector('#instruction');
//coding quiz challenge title
var headerEl = document.querySelector('#header');
//timer
var timeEl = document.querySelector('#timer');
//input text
var initialInputEl = document.querySelector('#initialInput');
//show only score
var showTimeScoreEl = document.querySelector('#showTimeScore');
//div container for all button except start quiz button
var buttonContainer = document.querySelector('#buttons');



//time in seconds
var secondLeft = 30;

//count how many time the application start over
var count = 0;

//create element
var form;
var divBlock;

//variables for question array
var currentQuestion
//index of question array
var currentQuestionIndex;

//questions in array
var jsQuizQuestions;
var checkHowManyQuestion;



//view from highest to lowest score
var scoreStorage;




//start quiz button
button.addEventListener('click', startQuizButton);

function startQuizButton(){
    

    questionList();
    button.remove();
    homepageInstruction.remove();
    headerEl.remove();

    //assign questions to currentquestion 
    currentQuestion = jsQuizQuestions;
    checkHowManyQuestion = jsQuizQuestions.length;
    currentQuestionIndex = 0;

    
    showQuestion();
     //count down
     setTime();
}



function showQuestion(){
    timeEl.setAttribute('style', 'text-align: right');

    // if(secondLeft === 0){
    //     removeForm.remove();
    //     removeCurrentQuestion.remove();
    // }

    //create div element and append it to the div with id #questions
    divBlock = document.createElement('div');
    quizQuestions.appendChild(divBlock);
    if(currentQuestionIndex < jsQuizQuestions.length){
        //show question in the div with id #divBlock
        divBlock.innerText = jsQuizQuestions[currentQuestionIndex].question;
        divBlock.setAttribute('id','divBlock');

        //get element
        //for later removal of question
        

        //assign answers 
        var letterAnswers = [jsQuizQuestions[currentQuestionIndex].answers.a, 
                            jsQuizQuestions[currentQuestionIndex].answers.b, 
                            jsQuizQuestions[currentQuestionIndex].answers.c, 
                            jsQuizQuestions[currentQuestionIndex].answers.d];

        //assign id to radio element
        var id = ["A","B","C","D"];

        //assign id to label element
        var labelContainerID = ["label1","label2","label3","label4"];

        //create form element for radio and label
        form = document.createElement('form');
        form.setAttribute('id','form')

        //create label and radio element
        for(var i = 0; i < letterAnswers.length; i++){
            var label = document.createElement('label');
            label.setAttribute('type', 'label');
            label.setAttribute('id', labelContainerID[i]);

            var radio = document.createElement('input');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('id', id[i]);
            radio.setAttribute('name', 'radioButton');
            radio.setAttribute('value', letterAnswers[i]);
            var text = document.createElement('label');
            text.htmlFor = id[i];
            text.innerText = letterAnswers[i];
            label.appendChild(radio);
            label.appendChild(text);
            form.appendChild(label);
            
            //every time click check the answer
            radio.addEventListener('click', checkAnswer);
        }

        
    
        //append form to div with id #answers
        quizAnswers.appendChild(form);

       
    }else{
        enterInital();
    }
    
        
}

//check for each click on the answer on each question
function checkAnswer(event){
    
    //assign target value to event variable which is the value from each radio button click
    var correcAnswer = event.target.value; 
    correctLabel = document.createElement('label');
    correctLabel.setAttribute('type', 'label');
    correctLabel.setAttribute('id', 'correctLabel');
    var correctEl = document.querySelector('#checkCorrect');
    correctEl.appendChild(correctLabel);

    
    //when answered correct shows 'correct', otherwise shows wrong
    var removeCorrectLabel = document.querySelector('#correctLabel');
    
    //check the answers
    //if the answers match the correct answer
    //then move to next question
    if(correcAnswer === jsQuizQuestions[currentQuestionIndex].correctAnswer){
        correctLabel.innerText = "Correct";
        //setTimeout set time delay for one second
        setTimeout(function(){
            //variable remove questions and answers
        var removeCurrentQuestion = document.querySelector('#divBlock');
        var removeForm = document.querySelector('#form');
        removeForm.remove();
        removeCurrentQuestion.remove();

        
            
            //go to next question
            //chech the index of array
            if(currentQuestionIndex !== checkHowManyQuestion){
                currentQuestionIndex++;
                showQuestion();
                removeCorrectLabel.remove();
            }
        },1000);
        
        
            
    }else{
        correctLabel.innerText = "Wrong";
        secondLeft = secondLeft - 10;
        setTimeout(function(){
            removeCorrectLabel.remove();
        },1000);
        
    }  
}

//input initial, and display time/score
function enterInital(seconds){

    count++;

    //input field with a submit button
    var inputForm = document.createElement('form')
    inputForm.setAttribute('type', 'form');
    inputForm.setAttribute('id', 'form');
    inputInitial = document.createElement('input');
    inputInitial.setAttribute('type','text');
    inputInitial.setAttribute('id', 'input')
    var inputLabel = document.createElement('label');
    inputLabel.innerText = 'Enter Initial:';
    inputInitial.setAttribute('type','label');
    var submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('id', 'submit')
    submitButton.innerText = 'Submit';
    inputForm.appendChild(inputLabel);
    inputForm.appendChild(inputInitial);
    inputForm.appendChild(submitButton);
    initialInputEl.appendChild(inputForm);

    //label for showing score
    timeScoreLabel = document.createElement('label');
    timeScoreLabel.setAttribute('type', 'label');
    timeScoreLabel.setAttribute('id', 'timeScoreLabel');

    initialNScoreLabel = document.createElement('label');
    initialNScoreLabel.setAttribute('type', 'label');
    initialNScoreLabel.setAttribute('id', 'initialNScoreLabel');
    
    showTimeScoreEl.appendChild(timeScoreLabel);
    showTimeScoreEl.appendChild(initialNScoreLabel);
    
    var submitButton = document.querySelector('#submit');

    //store initial and score in local storage
    localStorage.setItem(count+': score', secondLeft);
    
    
    //print only score
    var getScore = localStorage.getItem(count+': score');
    timeScoreLabel.innerText = "Your Score is: "+getScore+"\n";

   

    
    //when click the submit button
    submitButton.addEventListener('click', function(){

        //if local storage is not empty
        /*var clear = 0;
            while(clear <= count){
                localStorage.removeItem(clear+': score');
                localStorage.removeItem(clear+': initial');
                clear++;
            }    
            count = 0;*/
        
        localStorage.setItem(count+': initial', inputInitial.value);
        var getinitial = localStorage.getItem(count+': initial');
        var highScore = document.querySelector('#timer');
        highScore.innerText = "All Done";

        var removeTimeScoreLabel = document.querySelector('#timeScoreLabel');
        removeTimeScoreLabel.remove();

        //check if timeout before finished the quiz
        //print initial and score
        if(seconds === 0 || seconds <= 0){
            //score is zero
            initialNScoreLabel.innerText = "Your Score is: "+ getinitial+"--"+seconds+"\n";
        }else{
            //score from local storage
            initialNScoreLabel.innerText = "Your Score is: "+ getinitial+"--"+getScore+"\n";
        }

        //align the countdown timer which is h2 tag
        timeEl.setAttribute('style', 'text-align: center');
        
        var removeInputForm = document.querySelector('#form');
        removeInputForm.remove();
        
        //go back button
        var backButton = document.createElement('button');
        backButton.setAttribute('type', 'button');
        backButton.setAttribute('id', 'backButton');
        backButton.innerText = 'Back';
        buttonContainer.appendChild(backButton);

        //clear button
        var clearButton = document.createElement('button');
        clearButton.setAttribute('type', 'button');
        clearButton.setAttribute('id', 'clearButton');
        clearButton.innerText = 'Clear';
        buttonContainer.appendChild(clearButton);

        // show all score button
        var viewHighestScoreButton = document.createElement('button');
        viewHighestScoreButton.setAttribute('type', 'button');
        viewHighestScoreButton.setAttribute('id', 'viewHighestScoreButton');
        viewHighestScoreButton.innerText = 'View Highest';
        buttonContainer.appendChild(viewHighestScoreButton);
        
        

        //back button 
        backButton.addEventListener('click', function(){

            currentQuestionIndex = 0;
            secondLeft = 30;
            backButton.remove();
            
            var initialNScoreLabel = document.querySelector('#initialNScoreLabel');
            initialNScoreLabel.remove();
            //remove clear button when backbutton is clicked and start over the quiz
            var removeClearButton = document.querySelector('#clearButton');
            removeClearButton.remove();

            var removeAllScoreButton = document.querySelector('#viewHighestScoreButton');
            removeAllScoreButton.remove();
            startQuizButton();
            
        });

        //clear button
        clearButton.addEventListener('click', function(){
            timeScoreLabel.style.display = 'none';
            initialNScoreLabel.style.display = 'none';
            var clear = 0;
            while(clear <= count){
                localStorage.removeItem(clear+': score');
                localStorage.removeItem(clear+': initial');
                clear++;
            }    
            count = 0;
        });

        
        //show highest score 
        viewHighestScoreButton.addEventListener('click', function(){
            var localStorageArrayScore = [];
            var localStorageArrayInitial = [];

            for(var i = 0; i <= count; i++){
                localStorageArrayScore[i] = localStorage.getItem(i+': score');
                localStorageArrayInitial[i] = localStorage.getItem(i+': initial');;
            }
            
            //get the highest number
            var highestScore =  Math.max(...localStorageArrayScore);  
            for(var i = 1; i < localStorageArrayScore.length; i++){
                //since the localStorageArrayScore is string, using paseInt to convert it to integer in order to compare it with highescore to get the initial input
                if(highestScore === parseInt(localStorageArrayScore[i]) ){
                    initialNScoreLabel.innerText = "Your Highest Score is: "+ localStorageArrayInitial[i]+"--"+highestScore+"\n";
                }
            }

        });
    });

    
}




function setTime(){

    var timerInterval = setInterval(function(){
        secondLeft --;
        timeEl.textContent = secondLeft+" "+"Time/Score";
        if(secondLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            var removeForm = document.querySelector('#form');
            var removeCurrentQuestion = document.querySelector('#divBlock');
            removeForm.remove();
            removeCurrentQuestion.remove();
            enterInital();
        }//when timeout. the score is zero
        else if(secondLeft < 0){
            clearInterval(timerInterval);
            secondLeft = 0;
            timeEl.textContent = secondLeft+" "+"Time/Score";
            var removeForm = document.querySelector('#form');
            var removeCurrentQuestion = document.querySelector('#divBlock');
            removeForm.remove();
            removeCurrentQuestion.remove();
            
            enterInital(secondLeft);
            
        }
        //when all the question anwered correctly
        else if(currentQuestionIndex === checkHowManyQuestion){
            clearInterval(timerInterval);
            secondLeft=secondLeft+1;
            timeEl.textContent = "All Done:"+" "+secondLeft;
            timeEl.setAttribute('style', "text-align:center");
            
        }
        
    },1000);
}





//list of question
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
        },
        {
            question: "How do you write 'Hello World' in an alert box?",
            answers: {
              a: "msgBox('Hello World')",
              b: "alert('Hello World')",
              c: "msg('Hello World)",
              d: "alertBox('Hello World)"
            },
            correctAnswer: "alert('Hello World')"
        }
    ];
}






