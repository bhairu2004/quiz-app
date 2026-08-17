let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


/* =========================
   GET HTML ELEMENTS
========================= */
const quizData = [
    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: "CSS"
    },

    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        answer: "const"
    },

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which method adds an element to the end of an array?",
        options: [
            "pop()",
            "shift()",
            "push()",
            "unshift()"
        ],
        answer: "push()"
    },

    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: [
            "#",
            "//",
            "/* */",
            "<!-- -->"
        ],
        answer: "//"
    }
];

const questionElement =
  document.getElementById("question");

const optionsElement =
  document.getElementById("options");

const questionNumberElement =
  document.getElementById("questionNumber");

const totalQuestionsElement =
  document.getElementById("totalQuestions");

const progressBar =
  document.getElementById("progressBar");

const nextButton =
  document.getElementById("nextButton");

const selectionMessage =
  document.getElementById("selectionMessage");

const scoreDisplay =
  document.getElementById("scoreDisplay");

const quizContainer =
  document.getElementById("quizContainer");

const resultContainer =
  document.getElementById("resultContainer");

const finalScore =
  document.getElementById("finalScore");

const resultMessage =
  document.getElementById("resultMessage");

const restartButton =
  document.getElementById("restartButton");


/* =========================
   TOTAL QUESTIONS
========================= */

totalQuestionsElement.textContent =
  quizData.length;


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

  const currentQuiz =
    quizData[currentQuestion];


  selectedAnswer = null;

  nextButton.disabled = true;

  nextButton.textContent =
    currentQuestion === quizData.length - 1
      ? "Submit Quiz"
      : "Next";


  selectionMessage.textContent =
    "Select an answer to continue";


  questionNumberElement.textContent =
    currentQuestion + 1;


  questionElement.textContent =
    currentQuiz.question;


  scoreDisplay.textContent =
    `Score: ${score}`;


  /* Progress */

  const progress =
    ((currentQuestion + 1) / quizData.length) * 100;

  progressBar.style.width =
    `${progress}%`;


  /* Clear previous options */

  optionsElement.innerHTML = "";


  /* Create options */

  currentQuiz.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

      button.className =
        "option";

      button.textContent =
        option;

      button.addEventListener(
        "click",
        () => selectAnswer(
          button,
          option
        )
      );

      optionsElement.appendChild(
        button
      );

    }
  );
}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(
  button,
  answer
) {

  selectedAnswer = answer;


  /* Remove previous selection */

  const allOptions =
    document.querySelectorAll(".option");

  allOptions.forEach(option => {

    option.classList.remove(
      "selected"
    );

  });


  /* Select clicked option */

  button.classList.add(
    "selected"
  );


  nextButton.disabled =
    false;


  selectionMessage.textContent =
    "Answer selected";
}


/* =========================
   NEXT / SUBMIT
========================= */

nextButton.addEventListener(
  "click",
  () => {

    if (selectedAnswer === null) {
      return;
    }


    const currentQuiz =
      quizData[currentQuestion];


    /* Check answer */

    if (
      selectedAnswer ===
      currentQuiz.answer
    ) {

      score++;

    }


    /*
      If this is the last question,
      show result.
    */

    if (
      currentQuestion ===
      quizData.length - 1
    ) {

      showResult();

      return;
    }


    /* Go to next question */

    currentQuestion++;

    loadQuestion();

  }
);


/* =========================
   SHOW RESULT
========================= */

function showResult() {

  quizContainer.style.display =
    "none";

  resultContainer.style.display =
    "flex";


  finalScore.textContent =
    score;


  const percentage =
    (score / quizData.length) * 100;


  if (percentage === 100) {

    resultMessage.textContent =
      "Perfect score! You know your stuff.";

  }

  else if (percentage >= 80) {

    resultMessage.textContent =
      "Excellent work! Almost perfect.";

  }

  else if (percentage >= 60) {

    resultMessage.textContent =
      "Good job! A little more practice will help.";

  }

  else if (percentage >= 40) {

    resultMessage.textContent =
      "Nice attempt! Keep practicing.";

  }

  else {

    resultMessage.textContent =
      "Keep learning and give it another try.";

  }

}


/* =========================
   RESTART QUIZ
========================= */

restartButton.addEventListener(
  "click",
  () => {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;


    resultContainer.style.display =
      "none";

    quizContainer.style.display =
      "flex";


    loadQuestion();

  }
);


/* =========================
   START QUIZ
========================= */

loadQuestion();