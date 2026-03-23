import { singleAssessment } from "./services/singleAssessment.js";

console.log("VIEW ASSESSMENT JS LOADED");
document.addEventListener("DOMContentLoaded", async () => {
  const title = document.getElementById("assessment-title");
  const assessmentCard = document.getElementById("assessment-list");
  console.log(assessmentCard);
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const classId = pathPart[pathPart.length - 1];
  console.log(classId);

  const data = await singleAssessment(classId);

  try {
    if (data) {
      displayAssessment(data.assessment);
    } else {
      console.log(data?.message || "no assessment returned");
    }
  } catch (error) {
    console.error("Error: ", error.message);
    return null;
  }

  function displayAssessment(assessment) {
    if (!assessment) {
      console.log("Error accessing assessment");
      return;
    }
    title.textContent = assessment.title;
    assessmentCard.innerHTML = "";
    if (!assessment.questions.length) {
      assessmentCard.innerHTML = "<p>No questions added yet</p>";
      return;
    }

    assessment.questions.forEach((question, index) => {
      const container = document.createElement("div");
      const questions = document.createElement("p");
      questions.textContent = `${index + 1}. ${question.questionText}`;
      console.log(question);
      container.appendChild(questions);

      if (question.type === "quiz") {
        question.options.forEach((option, qindex) => {
          const choices = document.createElement("div");

          const opt = document.createElement("input");
          opt.type = "radio";
          opt.name = `question_${qindex}`;

          const label = document.createElement("label");
          label.textContent = option;

          choices.appendChild(opt);
          choices.appendChild(label);

          container.appendChild(choices);
        });
      }
      if (question.type === "short") {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("border-2", "p-2");

        container.appendChild(input);
      }
      if (question.type === "long") {
        const textarea = document.createElement("textarea");
        textarea.classList.add("border-2", "p-2");

        container.appendChild(textarea);
      }
      assessmentCard.appendChild(container);
    });
  }
});
