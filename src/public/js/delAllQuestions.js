document.addEventListener("DOMContentLoaded", () => {
  const delAll = document.getElementById("delAllAssess");
  const message = document.getElementById("message");

  delAll.addEventListener("click", async () => {
    const pathPart = window.location.pathname.split("/").filter(Boolean);
    const assessId = pathPart[pathPart.length - 1];
    if (assessId) {
      await handleALlQuestDelete(assessId, message);
    }
  });
  async function handleALlQuestDelete(assessId, message) {
    const confirmed = confirm(
      "Are you sure you want to delete all the questions in this assessment. This is not reversable",
    );
    if (!confirmed) return;
    try {
      let url = "/api/question/delete-all";
      if (assessId) {
        url += `/${encodeURIComponent(assessId)}`;
      }
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
      message.textContent = error.message;
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    }
  }
});
