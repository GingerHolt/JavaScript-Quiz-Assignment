// 10 JavaScript Quiz Questions and Answers
const quizData = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "all of the answer choices"],
    answer: "all of the answer choices",
  },
  {
    question: "What is the correct JavaScript syntax to write \"Hello World\"?",
    options: ["print(\"Hello World\")", "console.log(\"Hello World\")", "alert(\"Hello World\")", "document.write(\"Hello World\")"],
    answer: "console.log(\"Hello World\")",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: "<script>",
  },
  {
    question: "What is the correct way to create a function in JavaScript?",
    options: ["function myFunction()", "myFunction()", "function = myFunction()", "myFunction = function()"],
    answer: "function myFunction()",
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: [ "var colors = (\"red\", \"green\", \"blue\")", "var colors = [\"red\", \"green\", \"blue\"]", "var colors = {\"red\", \"green\", \"blue\"}", "var colors = <\"red\", \"green\", \"blue\">"],
    answer: "var colors = [\"red\", \"green\", \"blue\"]",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    options: ["<head>", "<body>", "<footer>", "<header>"],
    answer: "<body>",
  },
  {
    question: "In JavaScript, is it possible to use both double and single quotes to define a string?",
    options: [ "True", "False" ],
    answer: "True",
  },
  {
    question: "How do you call a function named \"myFunction\"?",
    options: ["myFunction()", "call myFunction()", "call function myFunction", "myFunction"],
    answer: "myFunction()",
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    options: [ "if i = 5 then", "if (i == 5)", "if i == 5 then", "if (i = 5)" ],
    answer: "if (i == 5)",
  },
  {
    question: "How does a WHILE loop start?",
    options: ["while (i <= 10)", "while i = 10", "while i <= 10 then", "while (i = 10)"],
    answer: "while (i <= 10)",
  },
];
// document.getElementById is used to access HTML elements
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

// Initialize quiz state variables
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Function to shuffle options array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display the current question and options
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  // use document.createElement to create HTML elements
  const questionElement = document.createElement("div");
  // use className to set the class for the question element
  questionElement.className = "question";
  // use innerHTML to set the question text for the question element
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

    // Shuffle options before displaying
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  // Create radio buttons for each option
  // Using a for loop to iterate through the shuffled options
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    // Create radio input element for each option
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    // Create text node for option text
    const optionText = document.createTextNode(shuffledOptions[i]);

    // Using appendChild to add radio and text to the label
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  // Clear previous question and options
  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

// Function to check the selected answer
function checkAnswer() {
  const selectedOption = document.querySelector("input[name=\"quiz\"]:checked");
  // Check if an option is selected
  if (selectedOption) {
    const answer = selectedOption.value;
    // Check if the answer is correct
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } 
    // If the answer is incorrect, store the question, selected answer, and correct answer
    else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    // Move to the next question
    currentQuestion++;
    selectedOption.checked = false;
    // Display the next question or the result if it was the last question
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } 
    // 
    else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();