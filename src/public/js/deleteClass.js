document.addEventListener("DOMContentLoaded", () => {
  const deleteClass = document.getElementById("delete-class");
  const message = document.getElementById("message");

  document.addEventListener("click", async (e) => {
    const delBtn = e.target.closest("#delete-class");

    if (delBtn) {
      const classId = delBtn.dataset.classId;
      const classCode = prompt("Please enter class-code");
      if (!classCode) return;
      await handleClassDelete(classId, classCode);
    }
  });

  async function handleClassDelete(classId, classCode) {
    try {
      let url = "/api/classes/delete";
      if (classId) {
        url += `/${encodeURIComponent(classId)}`;
      }
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode }),
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
      message.textContent = error.message || "Something went wrong";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    }
  }
});
