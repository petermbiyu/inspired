import { assessmentQuestion } from "./services/assessmentQuestions.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const assessId = pathPart[pathPart.length - 1];

  const data = await assessmentQuestion(assessId);

  if (data) {
    displayAssessment(data.assessment);
  } else {
    throw new Error();
  }
});

function displayAssessment(assessment) {
  const assessTitle = document.getElementById("assessment-title");
  const assessQuestions = document.getElementById("assessment-questions");

  if (!assessment) {
    console.log("No assessment to display");
    return;
  }
  assessTitle.textContent = assessment.title.toUpperCase();
  assessTitle.classList.add("border-b-2", "border-cyan-400", "mx-4");
  assessQuestions.innerHTML = "";
  if (!assessment.questions.length) {
    assessQuestions.innerHTML = "<p>No questions added yet</p>";
    return;
  }

  assessment.questions.forEach((question, index) => {
    const container = document.createElement("div");
    container.classList.add(
      "question-box",
      "flex",
      "flex-row",
      "justify-between",
      "items-start",
    );
    container.dataset.index = `${index}`;

    const editContainer = document.createElement("div");
    editContainer.classList.add("w-[10%]", "flex", "justify-evenly");

    const del = document.createElement("button");
    del.classList.add("del");
    const iconDel = document.createElement("i");
    iconDel.classList.add(
      "fa-regular",
      "fa-circle-xmark",
      "text-red-600",
      "cursor-pointer",
    );
    del.appendChild(iconDel);

    const edit = document.createElement("button");
    edit.classList.add("edit");
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
    assessQuestions.appendChild(container);
  });
}
