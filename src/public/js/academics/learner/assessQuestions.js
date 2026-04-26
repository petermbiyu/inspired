import { assessmentQuestion } from "../../services/assessmentQuestions.js";
document.addEventListener("DOMContentLoaded", async () => {
  const assessSub = document.getElementById("assessmentQuestion");
  const message = document.getElementById("message");
  const assessTitle = document.getElementById("assess-title");
  const startBtn = document.getElementById("start-btn");
  const saveBtn = document.getElementById("save-btn");
  const sendBtn = document.getElementById("send-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const nextBtn = document.getElementById("next-btn");
  const skipBtn = document.getElementById("skip-btn");
  const submitBtn = document.getElementById("submit-btn");
  const restartBtn = document.getElementById("restart-btn");

  message.textContent = "";
  // hold answers
  let answers = {};

  // create elements & set the initial values
  const questionElement = document.createElement("div");
  questionElement.classList.add(
    "font-semibold",
    "text-[1rem]",
    "md:text-[1.3rem]",
  );
  const answerElement = document.createElement("div");
  answerElement.classList.add("w-full", "flex", "flex-col", "gap-2");
  answerElement.id = "answerContainer";
  let currentQuestion;
  let currentQuestionIndex = 0;
  let score = 0;
  let assessment;
  let attempt = 0;
  let questions = [];

  //   retrieve assessments
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const assessId = pathPart[pathPart.length - 1];

  const data = await assessmentQuestion(assessId);
  if (data && data.success) {
    assessment = data.assessment;
    questions = assessment.question;
  } else {
    console.log("failed to retrieve assessment questions");
    return;
  }
  assessTitle.textContent = assessment.title;

  startBtn.addEventListener("click", startQuiz);
  function startQuiz() {
    const userConfirmed = confirm("Do you want to start the assessment");

    assessSub.innerHTML = "";
    answers = {};
    currentQuestionIndex = 0;
    score = 0;
    attempt = 0;
    showQuestion();
  }

  function showQuestion() {
    questionElement.innerHTML = "";
    answerElement.innerHTML = "";
    saveBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    nextBtn.disabled = true;
    skipBtn.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    if (questions.length === 0) {
      console.log("Assessment not available");
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      startBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
      skipBtn.classList.remove("hidden");
      restartBtn.classList.remove("hidden");
      submitBtn.classList.remove("hidden");
    }

    currentQuestion = questions[currentQuestionIndex];
    let questionText = currentQuestion.questionText;
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${questionText}`;
    questionElement.id = "questionElement";
    questionElement.dataset.id = currentQuestion.id;

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
    if (currentQuestion.type === "short" || currentQuestion.type === "long") {
      const answerArea = document.createElement("textarea");
      answerArea.classList.add(
        "my-6",
        "pl-2",
        "w-full",
        "field-sizing-content",
        "border-b-2",
        "focus:outline-none",
        "border-cyan-600",
      );
      answerArea.id = "subAnswer";
      answerArea.placeholder = "Type here...";
      answerElement.appendChild(answerArea);
    }
    assessSub.appendChild(questionElement);
    assessSub.appendChild(answerElement);
  }

  saveBtn.addEventListener("click", () => {
    const questionInfo = document.getElementById("questionElement");
    if (!questionInfo) {
      console.log("answer element not found");
      return;
    }
    let questionId = questionInfo.dataset.id;
    let answerText;

    if (currentQuestion.type === "quiz") {
      let selectedRadio = document.querySelector(
        `input[name='question_${currentQuestion.id}']:checked`,
      );

      if (!selectedRadio) {
        alert("Please select an answer");
        return;
      }
      answerText = selectedRadio.value;
    }

    if (currentQuestion.type === "short" || currentQuestion.type === "long") {
      const answer = document.getElementById("subAnswer");
      answerText = answer.value.trim();
      if (answerText === "") {
        alert("Please add an answer");
      }
    }
    answers = { ...answers, [questionId]: answerText };

    attempt++;
    console.log("answer saved: ", { [questionId]: answerText });
    console.log("all answers: ", answers);
    saveBtn.disabled = true;
    nextBtn.disabled = false;
    submitBtn.disabled = false;
  });

  nextBtn.addEventListener("click", nextQuestion);
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      saveBtn.disabled = false;
      nextBtn.disabled = true;
      submitBtn.disabled = true;
      showQuestion();
    }
  }
  submitBtn.addEventListener("click", () => {
    questionElement.innerHTML = "";
    answerElement.innerHTML = "";
    startBtn.classList.add("hidden");
    saveBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    skipBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    sendBtn.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");

    const container = document.createElement("div");
    const hmessage = document.createElement("h2");
    hmessage.classList.add("font-semibold", "text-[1.2rem");
    const mcontainer = document.createElement("ol");
    mcontainer.classList.add("list-decimal", "ml-6");
    const pmessage1 = document.createElement("li");
    const pmessage2 = document.createElement("li");
    const pattempt = document.createElement("li");

    hmessage.textContent = "Assessment Completed";
    pmessage1.textContent =
      "Than you for working on the assessment. Your submission has been recieved and you will be notified on your score once the analysis is completed";
    pattempt.innerHTML = `You have attempted <b>${attempt}</b> out of <b>${questions.length}</b> questions`;
    pmessage2.textContent =
      "Note that the score is based on the tutors discretion and will reflect their submission";

    container.appendChild(hmessage);
    container.appendChild(mcontainer);
    mcontainer.appendChild(pmessage1);
    mcontainer.appendChild(pmessage2);
    mcontainer.appendChild(pattempt);

    assessSub.appendChild(container);
  });

  restartBtn.addEventListener("click", () => {
    const userConfrim = confirm(
      "Are you sure you want to restart the assessment? All your progress will be lost",
    );
    if (userConfrim) {
      assessSub.innerHTML = "";
      answers = {};
      currentQuestionIndex = 0;
      score = 0;
      attempt = 0;
      window.location.href = `/learner/submission/assess/${assessId}`;
    }
  });

  cancelBtn.addEventListener("click", () => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel the assessment?",
    );
    if (confirmCancel) {
      assessSub.innerHTML = "";
      answers = {};
      currentQuestionIndex = 0;
      score = 0;
      attempt = 0;
      window.location.href = `/learner/assessment/${assessId}`;
    }
  });
  skipBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      const skipConfirm = confirm(
        "Are you sure you want to skip this question?",
      );
      if (!skipConfirm) return;
      currentQuestionIndex++;
      const answer = document.getElementById("subAnswer");
      if (!answer) {
        console.log("answer element not found");
        return;
      }
      let answerText = "skipped";
      let questionId = answer.dataset.id;

      answers = { ...answers, [questionId]: answerText };
      answer.value = "";
      console.log("answer saved: ", { [questionId]: answerText });
      console.log("all answers: ", answers);

      showQuestion();
    }
  });

  sendBtn.addEventListener("click", async () => {
    const sendConfirm = confirm(
      "Are you sure you want to submit the assessment",
    );
    if (!sendConfirm) return;

    if (!answers || answers.length === 0) {
      console.log("answer object issues");
      return;
    }
    if (!assessId) {
      console.log("questions ref missing");
      return;
    }
    try {
      const response = await fetch("/api/submission/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessId, answers, score }),
      });

      const data = await response.json();
      if (data && data.success) {
        message.textContent = data.message || "Submission successful";
        message.style.display = "block";
        message.classList.add("animate");
        sendBtn.disabled = true;
        setTimeout(() => {
          window.location.href = `/learner/assessment/${assessId}`;
        }, 3000);
      } else {
        message.textContent = data.message;
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
          window.location.href = `/learner/assessment/${assessId}`;
        }, 3000);
      }
    } catch (error) {
      message.textContent =
        error.message || "Something went wrong. Please try again later";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    }
  });
});
