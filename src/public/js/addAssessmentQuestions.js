document.addEventListener("DOMContentLoaded", async () => {
  const forms = document.querySelectorAll(".question-form");
  const message = document.getElementById("message");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      handleForm(form, message);
    });
  });

  async function handleForm(form, message) {
    let type = form.dataset.type;
    let submit = "";
    let payload = { type };
    // add multiple questions
    if (type === "quiz") {
      submit = document.getElementById("quiz-submit");
      const questionText = form.querySelector("#add-multiple-question").value;
      const options = [
        form.querySelector("#quiz-answer-1").value,
        form.querySelector("#quiz-answer-2").value,
        form.querySelector("#quiz-answer-3").value,
        form.querySelector("#quiz-answer-4").value,
      ];
      const selected = form.querySelector("input[name='answer']:checked");
      const answer = selected ? selected.value : null;

      if (!questionText || options.some((opt) => !opt) || !answer) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText, options, answer };
    }
    // add short question
    if (type === "short") {
      submit = document.getElementById("short-submit");
      const questionText = form.querySelector("#add-short-question").value;
      const answer = form.querySelector("#short-answer-1").value;
      const option1 = form.querySelector("#short-answer-2").value;
      const option2 = form.querySelector("#short-answer-3").value;
      const option3 = form.querySelector("#short-answer-4").value;
      const options = [option1, option2, option3];

      if (!questionText || !answer) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText, options, answer };
    }

    if (type === "long") {
      submit = document.getElementById("long-submit");
      const questionText = form.querySelector("#add-long-question").value;
      const wordCount = form.querySelector("#word-count").value;
      if (!questionText || !wordCount) {
        message.textContent = "All quiz fields are required";
        return;
      }

      payload = { ...payload, questionText, wordCount };
    }

    try {
      const pathpart = window.location.pathname.split("/").filter(Boolean);
      const assessmentId = pathpart[pathpart.length - 1];
      submit.disabled = true;
      let url = "/api/assessment/add";
      if (url) {
        url += `/${encodeURIComponent(assessmentId)}`;
      }

      const response = await fetch(url, {
        method: "POST",
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
