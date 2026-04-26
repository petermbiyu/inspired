document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".update-quest-form");
  const message = document.getElementById("message");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      handleUpdateQuestion(form, message);
    });
  });

  async function handleUpdateQuestion(form, message) {
    const type = form.dataset.type;
    let questId = "";
    let submit = "";
    let payload = { type };
    if (type === "quiz") {
      submit = document.getElementById("update-quiz-submit");
      questId = form.querySelector("#update-multi-id").value;
      const questionText = form.querySelector(
        "#update-multiple-question",
      ).value;
      const options = [
        form.querySelector("#update-quiz-answer-1").value,
        form.querySelector("#update-quiz-answer-2").value,
        form.querySelector("#update-quiz-answer-3").value,
        form.querySelector("#update-quiz-answer-4").value,
      ];
      const selected = form.querySelector(
        "input[name='update-answer']:checked",
      );
      const answer = selected ? selected.value : null;
      payload = { ...payload, questionText, options, answer };
    }
    if (type === "short") {
      submit = document.getElementById("update-short-submit");
      questId = form.querySelector("#update-short-id").value;
      const questionText = form.querySelector("#update-short-question").value;
      const answer = form.querySelector("#update-correct").value;
      const options = [
        form.querySelector("#update-option-1").value,
        form.querySelector("#update-option-2").value,
        form.querySelector("#update-option-3").value,
      ];
      payload = { ...payload, questionText, options, answer };
    }
    if (type === "long") {
      submit = document.getElementById("update-long-submit");
      questId = form.querySelector("#update-long-id").value;
      const questionText = form.querySelector("#update-long-question").value;
      const wordCount = form.querySelector("#update-word-count").value;
      payload = { ...payload, questionText, wordCount: parseInt(wordCount) };
    }

    try {
      let url = "/api/question/update";
      if (questId) {
        url += `/${encodeURIComponent(questId)}`;
      }
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data && data.success) {
        message.textContent = data.message;
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
          window.location.reload();
        }, 3000);
        submit.disabled = true;
      } else {
        message.textContent = data.message;
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
        submit.disabled = false;
      }
    } catch (error) {
      message.textContent = error.message;
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }
  }
});
