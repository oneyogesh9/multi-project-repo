export class Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;

  constructor(
    id: number,
    question: string,
    options: string[],
    correctIndex: number,
  ) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.correctIndex = correctIndex;
  }
}
