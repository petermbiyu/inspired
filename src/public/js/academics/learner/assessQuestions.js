import { assessmentQuestion } from "../../services/assessmentQuestions.js";
document.addEventListener("DOMContentLoaded", async () => {
  const assessSub = document.getElementById("assessmentQuestion");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  //   const skipBtn = document.getElementById("skip-btn");
  //   const restartBtn = document.getElementById("restart-btn");

  // create elements & set the initial values
  const questionElement = document.createElement("div");
  const answerElement = document.createElement("div");
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];

  //   retrieve assessments
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const assessId = pathPart[pathPart.length - 1];

  const data = await assessmentQuestion(assessId);
  if (data && data.success) {
    questions = data.assessment.question;
  } else {
    console.log("failed to retrieve assessment questions");
    return;
  }
  startBtn.addEventListener("click", startQuiz);
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    questionElement.innerHTML = "";
    answerElement.innerHTML = "";
    if (questions.length === 0) {
      console.log("Assessment not available");
      return;
    }
    let currentQuestion = questions[currentQuestionIndex];
    let questionText = currentQuestion.questionText;
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${questionText}`;

    if (currentQuestion.type === "quiz") {
      const options = currentQuestion.option;
      options.forEach((answer, answerIndex) => {
        const choices = document.createElement("div");
        choices.classList.add("ml-4");
        const opt = document.createElement("input");
        opt.classList.add("mr-2");
        opt.type = "radio";
        opt.name = `question_${currentQuestion.id}`;
        opt.value = answer;
        opt.id = `q${currentQuestionIndex}_opt${answerIndex}`;

        const label = document.createElement("label");
        label.classList.add("italic");
        label.htmlFor = `q${currentQuestionIndex}_opt${answerIndex}`;
        label.textContent = answer;

        choices.appendChild(opt);
        choices.appendChild(label);

        answerElement.appendChild(choices);
      });
    }
    if (currentQuestion.type === "short") {
    }
    if (currentQuestion.type === "long") {
    }
    assessSub.appendChild(questionElement);
    assessSub.appendChild(answerElement);

    nextBtn.addEventListener("click", nextQuestion);
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      alert("the end");
    }
  }
});
