document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("question-form");
  const message = document.getElementById("message");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      handleForm(form, message);
    });
  });

  async function handleForm(form, message) {
    const type = form.dataset.type;
    let payload = { type };
    // add multiple questions
    if (type === "quiz") {
      const questionText = document.getElementById(
        "add-multiple-question",
      ).value;
      const options = [
        document.getElementById("quiz-answer-1").value,
        document.getElementById("quiz-answer-2").value,
        document.getElementById("quiz-answer-3").value,
        document.getElementById("quiz-answer-4").value,
      ];
      const selected = document.querySelector("input[name='radio']:checked");
      const answer = selected ? selected.value : null;

      if (!questionText || options.some((opt) => !opt) || !answer) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText, options, answer };
    }
    // add short question
    if (type === "short") {
      const questionText = document.getElementById("add-short-question").value;
      const answer = document.getElementById("short-answer-1").value;

      if (!questionText || !answer) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText, answer };
    }

    if (type === "long") {
      const questionText = document.getElementById("add-long-question").value;
      if (!questionText) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText };
    }
  }
});
