document.addEventListener("DOMContentLoaded", () => {
  const questionsBox = document.querySelectorAll(".question-box");
  const message = document.getElementById("message");

  document.addEventListener("click", async (e) => {
    const delBtn = e.target.closest(".del");
    if (delBtn) {
      const questId = delBtn.dataset.questId;
      await handleQuestDelete(questId, message);
    }
  });

  async function handleQuestDelete(questId, message) {
    const alert = confirm("Are you sure you want to delete this question");
    if (!alert) return;
    try {
      let url = "/api/question/delete";
      url += `/${encodeURIComponent(questId)}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data && data.success) {
        message.textContent = data.message;
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          window.location.reload();
          message.style.display = "none";
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
  }
});
