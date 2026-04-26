document.addEventListener("DOMContentLoaded", () => {
  const message = document.getElementById("message");
  document.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest("#delete-class");
    if (deleteBtn) {
      const assessId = deleteBtn.dataset.assessmentId;
      const confirmed = confirm("Do you want to delete the assessment");
      if (!confirmed) return;
      if (!assessId) return;
      await handleDeleteAssessment(assessId);
    }
  });

  async function handleDeleteAssessment(assessId) {
    try {
      message.textContent = "";
      let url = "/api/assessment/delete";
      url += `/${encodeURIComponent(assessId)}`;

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
