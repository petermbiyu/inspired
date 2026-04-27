import { assessmentQuestion } from "./services/assessmentQuestions.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const assessId = pathPart[pathPart.length - 1];

  const data = await assessmentQuestion(assessId);

  if (data) {
    displayAssessment(data.assessment);
  } else {
    console.log("Failed to retrieve assessments");
  }
});

function displayAssessment(assessment) {
  const assessTitle = document.getElementById("assessment-title");
  const assessQuestions = document.getElementById("assessment-questions");

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (!assessment) {
    console.log("No assessment to display");
    return;
  }
  assessTitle.textContent = assessment.title.toUpperCase();
  assessTitle.classList.add("border-b-2", "border-cyan-400", "mx-4");
  assessQuestions.innerHTML = "";
  if (!assessment.question.length) {
    assessQuestions.innerHTML = "<p>No questions added yet</p>";
    return;
  }

  assessment.question.forEach((quest, index) => {
    const container = document.createElement("tr", "w-full");
    container.classList.add("question-box");
    container.dataset.index = `${index}`;
    const questContainer = document.createElement("td");
    questContainer.classList.add("w-[90%]");

    const editContainer = document.createElement("td");
    editContainer.classList.add("w-[10%]", "align-top");

    const del = document.createElement("button");
    del.classList.add("del", "mx-1");
    del.dataset.questId = quest.id;
    const iconDel = document.createElement("i");
    iconDel.classList.add(
      "fa-regular",
      "fa-circle-xmark",
      "text-red-600",
      "cursor-pointer",
    );
    del.appendChild(iconDel);

    const edit = document.createElement("button");
    edit.classList.add("edit", "mx-1");
    edit.dataset.questType = quest.type;
    edit.dataset.questId = quest.id;
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

    const questions = document.createElement("tr");
    questions.classList.add("quest", "pt-2", "pb-3", "w-full");

    const answers = document.createElement("tr");
    answers.classList.add("p-2", "pb-3", "ml-4");

    const question = document.createElement("th");
    question.classList.add("font-semibold", "question");
    const questIndex = document.createElement("td");
    questIndex.classList.add("pr-2", "align-top");
    questIndex.innerHTML = `${index + 1}. `;
    const questText = document.createElement("td");
    questText.classList.add("text-left");
    questText.innerHTML = `${capitalize(quest.questionText)}`;

    question.appendChild(questIndex);
    question.appendChild(questText);

    questions.appendChild(question);
    container.appendChild(questions);
    container.appendChild(editContainer);

    if (quest.type === "quiz") {
      quest.option.forEach((option) => {
        const choices = document.createElement("tr");
        choices.classList.add("pl-4", "italic");

        const ansData = document.createElement("td");
        ansData.classList.add("pl-6");

        const optRadio = document.createElement("td");
        optRadio.classList.add("align-top", "pt-1");
        const opt = document.createElement("input");
        opt.type = "radio";
        opt.name = `question_${index}`;

        const optLabel = document.createElement("td");
        optLabel.classList.add("pl-4");
        const label = document.createElement("label");
        label.textContent = capitalize(option);

        optRadio.appendChild(opt);
        optLabel.appendChild(label);

        ansData.appendChild(optRadio);
        ansData.appendChild(optLabel);
        choices.appendChild(ansData);
        answers.appendChild(choices);
      });
    }
    if (quest.type === "short") {
      const answer = document.createElement("tr");
      const mainAnswer = document.createElement("td");
      mainAnswer.classList.add("pl-6");
      mainAnswer.innerHTML = `<b><span class="text-sm">Main Ans:</span></b><br> <span class="italic">${capitalize(quest.correctAnswer)}</span>`;
      answer.appendChild(mainAnswer);
      answers.appendChild(answer);

      const opts = document.createElement("tr");
      const optAnswers = document.createElement("td");
      optAnswers.classList.add("pl-6");
      optAnswers.innerHTML =
        "<span class='font-semibold text-sm'>Other Ans:</span>";
      quest.option.forEach((option) => {
        const choices = document.createElement("tr");
        choices.classList.add("pl-4", "italic");

        const opt = document.createElement("td");
        opt.innerHTML = capitalize(option);

        choices.appendChild(opt);

        optAnswers.appendChild(choices);
        opts.appendChild(optAnswers);
      });
      answers.appendChild(opts);
    }
    if (quest.type === "long") {
      const wordCount = document.createElement("tr");
      const countData = document.createElement("td");
      countData.classList.add("pl-6");
      countData.innerHTML = `<span>Word count:</span> <b>${quest.wordCount}</b>`;

      wordCount.appendChild(countData);
      answers.appendChild(wordCount);
    }
    questions.appendChild(question);
    questContainer.appendChild(questions);
    questContainer.appendChild(answers);
    container.appendChild(questContainer);
    container.appendChild(editContainer);
    assessQuestions.appendChild(container);
  });
}
