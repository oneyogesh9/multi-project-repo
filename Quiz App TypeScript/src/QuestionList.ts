import { Question } from "./Question.js";

export const questions: Question[] = [
  new Question(
    1,
    "What is TypeScript?",
    ["Library", "Language", "Framework", "Database"],
    1,
  ),
  new Question(
    2,
    "TypeScript is a superset of?",
    ["Java", "C#", "JavaScript", "Python"],
    2,
  ),
  new Question(
    3,
    "Which company developed TypeScript?",
    ["Google", "Facebook", "Microsoft", "Amazon"],
    2,
  ),
  new Question(
    4,
    "What is the file extension for TypeScript?",
    [".js", ".ts", ".java", ".py"],
    1,
  ),
  new Question(
    5,
    "Which command compiles a TypeScript file?",
    ["node file.ts", "ts-node file.ts", "tsc file.ts", "npm start"],
    2,
  ),
  new Question(
    6,
    "Which feature helps catch errors at compile time?",
    [
      "Dynamic typing",
      "Static typing",
      "Runtime binding",
      "Garbage collection",
    ],
    1,
  ),
  new Question(
    7,
    "Which type represents the absence of any value?",
    ["null", "undefined", "void", "never"],
    2,
  ),
  new Question(
    8,
    "Which keyword is used to define an interface?",
    ["class", "type", "interface", "struct"],
    2,
  ),
  new Question(
    9,
    "Which type allows multiple types in one variable?",
    ["any", "union", "enum", "tuple"],
    1,
  ),
  new Question(
    10,
    "Which configuration file is used in TypeScript projects?",
    ["package.json", "tsconfig.json", "config.ts", "ts.json"],
    1,
  ),
];
