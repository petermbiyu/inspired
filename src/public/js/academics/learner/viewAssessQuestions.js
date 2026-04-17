import { assessmentQuestion } from "../../services/assessmentQuestions.js";
document.addEventListener("DOMContentLoaded", async () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const assessId = pathPart[pathPart.length - 1];

  const data = await assessmentQuestion(assessId);

  if (data && data.success) {
    assessmentPreview(data.assessment);
  } else {
    console.log("failed to retrieve assessment questions");
  }
});

function assessmentPreview(assessment) {
  const assesstitle = document.getElementById("assessment-title");
  const assessQuiz = document.getElementById("assessment-questions");

  assessQuiz.innerHTML = "";

  assesstitle.textContent = assessment.title;
  if (!assessment || assessment.question.length === 0) {
    assessQuiz.innerHTML = "<p>No questions added yet</p>";
    return;
  }

  assessment.question.forEach((quest, index) => {
    const container = document.createElement("div");
    container.classList.add(
      "question-box",
      "flex",
      "flex-row",
      "justify-between",
      "items-start",
    );
    container.dataset.index = `${index}`;
    const questions = document.createElement("div");
    questions.classList.add("mb-2");
    const question = document.createElement("div");
    question.textContent = `${index + 1}. ${quest.questionText}`;
    question.classList.add("font-semibold");
    questions.appendChild(question);
    container.appendChild(questions);

    assessQuiz.appendChild(container);
  });
}

// if (quest.type === "quiz") {
//       quest.option.forEach((option, optIndex) => {
//         const choices = document.createElement("div");
//         choices.classList.add("ml-4");
//         const opt = document.createElement("input");
//         opt.classList.add("mr-2");
//         opt.type = "radio";
//         opt.name = `question_${quest.id}`;
//         opt.value = option;
//         opt.id = `q${index}_opt${optIndex}`;

//         const label = document.createElement("label");
//         label.classList.add("italic");
//         label.htmlFor = `q${index}_opt${optIndex}`;
//         label.textContent = option;

//         choices.appendChild(opt);
//         choices.appendChild(label);

//         questions.appendChild(choices);
//       });
//     }
