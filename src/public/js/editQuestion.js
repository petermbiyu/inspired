document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("update-quiz");
  const shortForm = document.getElementById("update-short");
  const longForm = document.getElementById("update-long");
  document.addEventListener("click", async (e) => {
    const editBtn = e.target.closest(".edit");
    if (editBtn) {
      const questId = editBtn.dataset.questId;
      const type = editBtn.dataset.questType;
      if (type === "quiz") {
        await handleUpdateQuestion(type, questId);
        quizForm.classList.remove("hidden");
        shortForm.classList.add("hidden");
        longForm.classList.add("hidden");
      }
      if (type === "short") {
        await handleUpdateQuestion(type, questId);
        quizForm.classList.add("hidden");
        shortForm.classList.remove("hidden");
        longForm.classList.add("hidden");
      }
      if (type === "long") {
        await handleUpdateQuestion(type, questId);
        quizForm.classList.add("hidden");
        shortForm.classList.add("hidden");
        longForm.classList.remove("hidden");
      }
    }
  });

  async function handleUpdateQuestion(type, questId) {
    let questionQuiz;
    if (type === "quiz") {
      const questData = await handleQustionData(questId);
      document.getElementById("update-multi-id").value = questData.id;
      questionQuiz = document.getElementById("update-multiple-question").value =
        questData.questionText;
      const answer1 = (document.getElementById("update-quiz-answer-1").value =
        questData.option[0]);
      const answer2 = (document.getElementById("update-quiz-answer-2").value =
        questData.option[1]);
      const answer3 = (document.getElementById("update-quiz-answer-3").value =
        questData.option[2]);
      const answer4 = (document.getElementById("update-quiz-answer-4").value =
        questData.option[3]);
      // radio
      const options = [
        document.getElementById("update-radio-1"),
        document.getElementById("update-radio-2"),
        document.getElementById("update-radio-3"),
        document.getElementById("update-radio-4"),
      ];
      const ansIndex = questData.correctAnswer;
      if (ansIndex !== undefined && options[ansIndex]) {
        options[ansIndex].checked = true;
      }
    }
    if (type === "short") {
      const questData = await handleQustionData(questId);
      document.getElementById("update-short-id").value = questData.id;
      questionQuiz = document.getElementById("update-short-question").value =
        questData.questionText;
      const correctAnswer = (document.getElementById("update-correct").value =
        questData.correctAnswer);
      // options
      const option1 = (document.getElementById("update-option-1").value =
        questData.option[0]);
      const option2 = (document.getElementById("update-option-2").value =
        questData.option[1]);
      const option3 = (document.getElementById("update-option-3").value =
        questData.option[2]);
    }
    if (type === "long") {
      const questData = await handleQustionData(questId);
      document.getElementById("update-long-id").value = questData.id;
      questionQuiz = document.getElementById("update-long-question").value =
        questData.questionText;
      const Count = (document.getElementById("update-word-count").value =
        questData.wordCount);
    }
  }

  async function handleQustionData(questId) {
    try {
      let url = "/api/question/view";
      if (questId) {
        url += `/${encodeURIComponent(questId)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.success) {
        return data.question;
      } else {
        console.log(data.message);
        return null;
      }
    } catch (error) {
      console.log("something went wrong. failed to retrieve question");
      return null;
    }
  }
});
