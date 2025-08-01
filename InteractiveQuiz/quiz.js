const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hyper Tool Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Manager"],
    answer: "Document Object Model"
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: "Float"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let userAnswers = new Array(questions.length).fill(null); // Must match number of questions

function startQuiz() {
  document.getElementById("overlay").style.display = "none";
  document.querySelector(".container").classList.add("active");
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const quizForm = document.getElementById("quizForm");
  const q = questions[currentQuestion];

  quizForm.innerHTML = `
    <div class="question">
      <h3>Q${currentQuestion + 1}: ${q.question}</h3>
      <div class="options">
        ${q.options.map((opt) => `
          <label>
            <input type="radio" name="option" value="${opt}" ${userAnswers[currentQuestion] === opt ? 'checked' : ''}>
            ${opt}
          </label>`).join("")}
      </div>
    </div>
  `;

  // Show/hide navigation buttons
  const prevBtn = document.querySelector(".nav-buttons button:nth-child(1)");
  const nextBtn = document.querySelector(".nav-buttons button:nth-child(2)");

  if (currentQuestion === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline-block";
  }

  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }
}


function nextQuestion() {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = selected.value;
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timerInterval);
  saveAnswer();

  score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  document.getElementById("result").textContent = `You scored ${score} out of ${questions.length}!`;

  // Show correct/incorrect
  document.getElementById("quizForm").innerHTML = questions.map((q, i) => {
    return `
      <div class="question">
        <h3>Q${i + 1}: ${q.question}</h3>
        <div class="options">
          ${q.options.map(opt => `
            <label style="background-color: ${opt === q.answer ? '#c8e6c9' : userAnswers[i] === opt ? '#ffcdd2' : '#f5f5f5'};">
              <input type="radio" disabled ${userAnswers[i] === opt ? 'checked' : ''}>
              ${opt}
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function restartQuiz() {
  location.reload();
}
