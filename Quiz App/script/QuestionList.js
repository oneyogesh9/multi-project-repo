import Question from "./Question.js";

const questions = [
  new Question(
    "What is JavaScript?",
    ["Database", "Programming Language", "Operating System", "Browser"],
    1,
  ),
  new Question(
    "Which keyword declares a variable?",
    ["var", "int", "string", "define"],
    0,
  ),
  new Question(
    "Which symbol is used for comments?",
    ["##", "<!-- -->", "//", "**"],
    2,
  ),
  new Question(
    "Which method converts JSON to object?",
    ["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.convert()"],
    1,
  ),
  new Question(
    "Who developed JavaScript?",
    ["Netscape", "Google", "Microsoft", "Oracle"],
    0,
  ),
  new Question(
    "DOM stands for?",
    [
      "Data Object Model",
      "Digital Object Method",
      "Desktop Object Model",
      "Document Object Model",
    ],
    3,
  ),
  new Question(
    "Which loop runs at least once?",
    ["for", "while", "do...while", "foreach"],
    2,
  ),
  new Question(
    "Which keyword exits a loop?",
    ["break", "stop", "exit", "end"],
    0,
  ),
  new Question(
    "Which operator checks value & type?",
    ["==", "=", "!=", "==="],
    3,
  ),
  new Question(
    "Which method adds element at end of array?",
    ["push()", "pop()", "shift()", "unshift()"],
    0,
  ),
];

export default questions;
