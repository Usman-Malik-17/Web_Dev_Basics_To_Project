document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.querySelector("#question-container");
  const questionText = document.querySelector("#question-text");
  const choicesList = document.querySelector("#choices-list");
  const nextBtn = document.querySelector("#next-btn");
  const resultContainer = document.querySelector("#result-container");
  const score = document.querySelector("#score");
  const restartBtn = document.querySelector("#restart-btn");
  const startBtn = document.querySelector("#start-btn");

  let questionNo = 0;
  let quizScore = 0;
  let selectOption = "";

  const question = [
    {
      id: 1,
      text: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      id: 2,
      text: "Which planet is known as Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      text: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Auston",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  startBtn.addEventListener("click", () => {
    startQuiz();
  });

  questionContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      selectOption = e.target.innerText;
      nextBtn.classList.remove("hidden");
    }
  });

  nextBtn.addEventListener("click", () => {
    nextBtn.classList.add("hidden");
    validateAnswer();
    nextQuestion();
  });
  restartBtn.addEventListener("click", () => {
    resultContainer.classList.add("hidden");
    quizScore = 0;
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    questionNo = 1;
    nextQuestion();
  }

  function nextQuestion() {
    const elem = question.findIndex((e) => {
      if (e.id == questionNo) {
        return e;
      }
    });
    if (elem != -1) {
      const text = question[elem].text;
      const choices = question[elem].choices;
      renderQuestion(text, choices);
      questionNo++;
    } else {
      showResult();
    }
  }

  function renderQuestion(text, choices) {
    choicesList.innerHTML = "";
    questionText.innerHTML = `<div>${text}</div>`;

    choices.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = `${element}`;
      choicesList.appendChild(li);
    });
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    score.innerText = `${quizScore} out of ${question.length}`;
  }

  function validateAnswer() {
    const elem = question.findIndex((e) => {
      if (e.id == questionNo - 1) {
        return e;
      }
    });
    if (question[elem].answer === selectOption) {
      quizScore++;
    }
  }
});
