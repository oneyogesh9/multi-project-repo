import { questions } from "./QuestionList.js";

let currentIndex: number = parseInt(
  localStorage.getItem("currentIndex") || "0",
);
let answers: number[] = JSON.parse(localStorage.getItem("answers") || "[]");
let timer: number;
const totalTime = 20;

const questionEl = document.getElementById("question") as HTMLElement;
const optionsEl = document.getElementById("options") as HTMLElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement;
const counterEl = document.getElementById("counter") as HTMLElement;
const circle = document.getElementById("circle") as HTMLElement;
const timeText = document.getElementById("time") as HTMLElement;
const resultEl = document.getElementById("result") as HTMLElement;
const quizContainer = document.getElementById("quiz-container") as HTMLElement;
const headerCounter = document.getElementById("counter") as HTMLElement;
const timerCounter = document.getElementById("timer-wrapper") as HTMLDivElement;

function loadQuestion() {
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  counterEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  optionsEl.innerHTML = "";
  nextBtn.disabled = answers[currentIndex] === undefined;

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    input.type = "radio";
    input.name = "option";
    input.value = i.toString();

    if (answers[currentIndex] === i) {
      input.checked = true;
    }

    input.addEventListener("change", () => {
      answers[currentIndex] = i;
      localStorage.setItem("answers", JSON.stringify(answers));
      nextBtn.disabled = false;
    });

    span.textContent = opt;

    label.appendChild(input);
    label.appendChild(span);
    optionsEl.appendChild(label);
  });

  startTimer();
  saveState();
}

function startTimer() {
  let timeLeft = totalTime;
  timeText.textContent = timeLeft.toString();

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    timeText.textContent = timeLeft.toString();

    const progress = (timeLeft / totalTime) * 360;

    let color = "#6200ea";
    if (timeLeft <= 5) {
      color = "#d32f2f";
    }

    circle.style.background = `conic-gradient(${color} ${progress}deg, #e0e0e0 ${progress}deg)`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      goNext();
    }
  }, 1000);
}

function goNext() {
  currentIndex++;
  saveState();
  loadQuestion();
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    saveState();
    loadQuestion();
  }
}

function showResult() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  resultEl.classList.remove("hidden");
  timerCounter.style.display = "none";
  headerCounter.style.display = "none";

  let score = 0;
  let html = `<h3>Result</h3>`;
  html += `<p>Total Questions: ${questions.length}</p>`;

  questions.forEach((q, i) => {
    const userAnswer = answers[i];
    const correct = userAnswer === q.correctIndex;
    if (correct) score++;

    html += `
      <div>
        <p><strong>${i + 1}. ${q.question}</strong></p>
        <p>Your Answer: ${q.options[userAnswer] || "Not Answered"}</p>
        <p>Correct Answer: ${q.options[q.correctIndex]}</p>
        <p style="color:${correct ? "green" : "red"}">
          ${correct ? "Correct ✔" : "Wrong ✘"}
        </p>
      </div>
      <hr/>
    `;
  });

  html += `<h4>Score: ${score}/${questions.length}</h4>`;
  resultEl.innerHTML = html;

  localStorage.clear();
}

function saveState() {
  localStorage.setItem("currentIndex", currentIndex.toString());
}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

loadQuestion();
