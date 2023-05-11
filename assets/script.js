//AS A coding boot camp student
//I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
//SO THAT I can gauge my progress compared to my peers
//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score
//made changes to js not html, my fault lol
//adding a variable for the timer

var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;
//adding a variable for the buttons
var start = document.querySelector("#start");
//making a variable for the intro startt button so that the challenge begins
var quizIntro = document.querySelector("#challenge-begins"); //all changed to quizIntro
//calling the end load element variable
var questionsEl = document.querySelector(".all-question");
//identifying the element locations and variables
let questionEl = document.querySelector("#question");
var correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;
//making a final score variable
var finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");
//making a Highscore variable as well
var highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];
//marking the answer class button
var ansBtn = document.querySelectorAll("button.answer-btn");
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");
var ans1Btn = document.querySelector("#answer-1");
var ans2Btn = document.querySelector("#answer-2");
var ans3Btn = document.querySelector("#answer-3");
var ans4Btn = document.querySelector("#answer-4");

//Make the questions
// Instructer said that we have to dio a minimum of 5 questions
var questions = [
  {
    question: "Where do we put JavaScript code in an HTML document?",
    answers: [
      "<js>",
      "<scripting>",
      "<script>",
      "<javascript>",
      "<type.scripter>",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "How do you display 'Hello World' in a pop-up alert box using JavaScript?",
    answers: [
      "alertBox('Hello World');",
      "msg('Hello World');",
      "msgBox('Hello World');",
      "alert('Hello World');",
      "box ('Hello world');",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "How do you write an 'if' statement in JavaScript to execute code only if 'i' is equal to 5?",
    answers: [
      "if i == 5 then",
      "if i = 5 then",
      "if (i == 5)",
      "if i = 5",
      "if i != 5",
    ],
    correctAnswer: 3,
  },
  {
    question: "How do you start a 'for' loop in JavaScript?",
    answers: [
      "for (i <= 5; i++)",
      "for (i = 0; i <= 5)",
      "for i = 1 to 5",
      "for (i = 0; i <= 5; i++)",
      "for (i = 0; i <= 5; i+++)",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "How do you write an 'if' statement in JavaScript to execute code only if 'i' is NOT equal to 5?",
    answers: ["if(i<>5)", "if i=!5 then", "if(i!=5)", "if i <>5", "if i <~>5"],
    correctAnswer: 2,
  },
];

function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = `Time:${secondsLeft}s`;

    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      score.textContent = secondsLeft;
    }
  }, 1000);
}

function startQuiz() {
  quizIntro.style.display = "none";
  questionsEl.style.display = "block";
  questionCount = 0;

  setTime();
  setQuestion(questionCount);
}

function setQuestion(id) {
  if (id < questions.length) {
    questionEl.textContent = questions[id].question;
    ans1Btn.textContent = questions[id].answers[0];
    ans2Btn.textContent = questions[id].answers[1];
    ans3Btn.textContent = questions[id].answers[2];
    ans4Btn.textContent = questions[id].answers[3];
    ans5Btn.textContent = questions[id].answers[4];

    ans6Btn.textContent = questions[id].answers[5];
  }
}

function checkAnswer(event) {
  event.preventDefault();

  correctWrong.style.display = "block";
  let p = document.createElement("p");
  correctWrong.appendChild(p);

  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  if (questions[questionCount].correctAnswer === parseInt(event.target.value)) {
    p.textContent = "Correct!";
  } else if (
    questions[questionCount].correctAnswer !== parseInt(event.target.value)
  ) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
  }

  if (questionCount < questions.length) {
    questionCount++;
  }
  setQuestion(questionCount);
}
function addScore(event) {
  event.preventDefault();

  finalEl.style.display = "none";
  highscoresEl.style.display = "block";

  let init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: secondsLeft });

  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (let i = 0; i < scoreList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }

  storeScores();
  displayScores();
}

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}

function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
}

start.addEventListener("click", startQuiz);

ansBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
  highscoresEl.style.display = "none";
  quizIntro.style.display = "block";
  secondsLeft = 75;
  time.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);

viewScrBtn.addEventListener("click", function () {
  if (highscoresEl.style.display === "none") {
    highscoresEl.style.display = "block";
  } else if (highscoresEl.style.display === "block") {
    highscoresEl.style.display = "none";
  } else {
    return alert("Take Quiz. Be the highest score.");
  }
});
