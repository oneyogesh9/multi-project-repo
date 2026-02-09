export default class QuizApp {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];

    this.questionEl = document.getElementById("question");
    this.optionsEl = document.getElementById("options");
    this.nextBtn = document.getElementById("nextBtn");
    this.resultEl = document.getElementById("result");
    this.progressEl = document.getElementById("progress");

    this.nextBtn.addEventListener("click", () => this.handleNext());

    this.loadQuestion();
  }

  loadQuestion() {
    this.optionsEl.innerHTML = "";
    this.nextBtn.disabled = true;

    const q = this.questions[this.currentIndex];

    this.questionEl.innerText = q.text;
    this.progressEl.innerText = `Question ${this.currentIndex + 1} of ${this.questions.length}`;

    q.options.forEach((opt, index) => {
      this.optionsEl.appendChild(this.createOption(opt, index));
    });
  }

  createOption(text, index) {
    const div = document.createElement("div");
    div.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = index;
    radio.id = `option-${index}`;

    const label = document.createElement("label");
    label.htmlFor = radio.id;
    label.innerText = text;

    div.addEventListener("click", () => {
      radio.checked = true;
      this.nextBtn.disabled = false;
    });

    radio.addEventListener("change", () => {
      this.nextBtn.disabled = false;
    });

    div.append(radio, label);
    return div;
  }

  handleNext() {
    const selected = document.querySelector('input[name="answer"]:checked');
    const answer = Number(selected.value);

    this.userAnswers.push(answer);

    if (this.questions[this.currentIndex].isCorrect(answer)) {
      this.score++;
    }

    this.currentIndex++;
    this.currentIndex < this.questions.length
      ? this.loadQuestion()
      : this.showResult();
  }

  showResult() {
    this.questionEl.style.display = "none";
    this.optionsEl.style.display = "none";
    this.nextBtn.style.display = "none";
    this.progressEl.style.display = "none";

    this.resultEl.innerHTML = `
      <h2>Result</h2>
      <p>Score: ${this.score} / ${this.questions.length}</p>
      <hr>
      ${this.questions
        .map(
          (q, i) => `
        <p>
          <strong>Q${i + 1}:</strong> ${q.text}<br>
          Your Answer: ${q.options[this.userAnswers[i]]}<br>
          Correct Answer: ${q.options[q.correctIndex]}
        </p>
      `,
        )
        .join("")}
    `;
  }
}
