export class Question {
    constructor(id, question, options, correctIndex) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.correctIndex = correctIndex;
    }
}
