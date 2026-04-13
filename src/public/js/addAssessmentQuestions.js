document.addEventListener("DOMContentLoaded", async () => {
  const forms = document.querySelectorAll(".question-form");
  const message = document.getElementById("message");
  console.log("assessment loaded");

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
      const questionText = form.querySelector("#add-short-question").value;
      const answer = form.querySelector("#short-answer-1").value;

      if (!questionText || !answer) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText, answer };
    }

    if (type === "long") {
      const questionText = form.querySelector("#add-long-question").value;
      if (!questionText) {
        message.textContent = "All quiz fields are required";
        return;
      }
      payload = { ...payload, questionText };
    }

    try {
      const pathpart = window.location.pathname.split("/").filter(Boolean);
      const assessmentId = pathpart[pathpart.length - 1];
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
      }
    } catch (error) {
      message.textContent = error.message;
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    }
  }
});
