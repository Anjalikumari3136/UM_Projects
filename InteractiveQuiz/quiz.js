const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Transfer Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["background-color", "color", "font-color", "text-color"],
    answer: "color"
  },
  {
    question: "What does JS stand for?",
    options: ["JavaServer", "JavaScript", "JustScript", "JScript"],
    answer: "JavaScript"
  },
  {
    question: "Which tag is used to link JavaScript file in HTML?",
    options: ["<js>", "<link>", "<script>", "<style>"],
    answer: "<script>"
  },
  {
    question: "Which of the following is not a valid CSS unit?",
    options: ["px", "em", "cm", "ptt"],
    answer: "ptt"
  }
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

function startQuiz() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("quiz-container").classList.add("active");
  document.getElementById("timer").style.display = "block";
  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const quizForm = document.getElementById("quizForm");
  quizForm.innerHTML = '';

  const q = quizData[currentQuestionIndex];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const questionTitle = document.createElement("h3");
  questionTitle.innerText = `${currentQuestionIndex + 1}. ${q.question}`;
  questionDiv.appendChild(questionTitle);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  q.options.forEach(option => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "radio";
    input.name = `question${currentQuestionIndex}`;
    input.value = option;

    const selected = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selected && selected.value === option) {
      input.checked = true;
    }

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    optionsDiv.appendChild(label);
  });

  questionDiv.appendChild(optionsDiv);
  quizForm.appendChild(questionDiv);
}

function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.innerText = "Time's up!";
      submitQuiz();
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timerInterval);

  let score = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").innerText =
    `You scored ${score} out of ${quizData.length} questions correctly.`;

  document.querySelectorAll("input[type=radio]").forEach(input => {
    input.disabled = true;
  });
}

function restartQuiz() {
  clearInterval(timerInterval);
  timeLeft = 60;
  currentQuestionIndex = 0;
  document.getElementById("result").innerText = '';
  document.querySelectorAll("input[type=radio]").forEach(input => input.disabled = false);
  renderQuestion();
  startTimer();
}
