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
    title.textContent = assessment.title.toUpperCase();
    title.classList.add("border-b-2", "border-cyan-400", "mx-4");
    assessmentCard.innerHTML = "";
    if (!assessment.questions.length) {
      assessmentCard.innerHTML = "<p>No questions added yet</p>";
      return;
    }

    assessment.questions.forEach((question, index) => {
      const container = document.createElement("div");
      container.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "items-start",
      );

      const editContainer = document.createElement("div");
      editContainer.classList.add("w-[10%]", "flex", "justify-evenly");

      const del = document.createElement("button");
      const iconDel = document.createElement("i");
      iconDel.classList.add(
        "fa-regular",
        "fa-circle-xmark",
        "text-red-600",
        "cursor-pointer",
      );
      del.appendChild(iconDel);

      const edit = document.createElement("button");
      const iconEdit = document.createElement("i");
      iconEdit.classList.add(
        "fa-regular",
        "fa-pen-to-square",
        "text-green-600",
        "cursor-pointer",
      );
      edit.appendChild(iconEdit);

      editContainer.appendChild(edit);
      editContainer.appendChild(del);

      const questions = document.createElement("p");
      questions.classList.add("pt-2", "pb-3", "font-semibold");
      questions.textContent = `${index + 1}. ${question.questionText}`;
      console.log(question);
      container.appendChild(questions);
      container.appendChild(editContainer);

      if (question.type === "quiz") {
        question.options.forEach((option) => {
          const choices = document.createElement("div");
          choices.classList.add("pl-4", "italic");

          const opt = document.createElement("input");
          opt.type = "radio";
          opt.name = `question_${index}`;

          const label = document.createElement("label");
          label.textContent = option;
          label.classList.add("pl-4");

          choices.appendChild(opt);
          choices.appendChild(label);

          questions.appendChild(choices);
        });
      }
      // if (question.type === "short") {
      //   const input = document.createElement("input");
      //   input.type = "text";
      //   input.classList.add("border-2", "p-2");

      //   container.appendChild(input);
      // }
      // if (question.type === "long") {
      //   const textarea = document.createElement("textarea");
      //   textarea.classList.add("border-2", "p-2");

      //   container.appendChild(textarea);
      // }
      assessmentCard.appendChild(container);
    });
  }
});
