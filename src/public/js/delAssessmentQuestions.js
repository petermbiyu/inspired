document.addEventListener("DOMContentLoaded", () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const assessId = pathPart[pathPart.length - 1];
  const questionsBox = document.querySelectorAll(".question-box");
  const message = document.getElementById("message");

  console.log("Del JS");

  document.addEventListener("click", async (e) => {
    const delBtn = e.target.closest(".del");
  });

  questionsBox.forEach((question) => {
    const delBtn = question.querySelector(".del");
    console.log("question selected");
    if (!delBtn) return;
    delBtn.addEventListener("click", async () => {
      const alert = confirm("Are you sure you want to delete this question");
      if (!alert) return;
      const index = question.dataset.index;
      try {
        let url = "/api/assessment/question";
        url += `/${encodeURIComponent(assessId)}`;

        const response = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ index }),
        });

        const data = await response.json();

        if (data && data.success) {
          message.textContent = data.message;
          message.style.display = "block";
          message.classList.add("animate");
          setTimeout(() => {
            message.style.display = "none";
            question.remove();
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
        console.log("Error: ", error.message);
      }
    });
  });
});
