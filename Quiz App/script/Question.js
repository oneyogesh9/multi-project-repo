export default class Question {
  constructor(text, options, correctIndex) {
    this.text = text;
    this.options = options;
    this.correctIndex = correctIndex;
  }

  isCorrect(answerIndex) {
    return answerIndex === this.correctIndex;
  }
}
