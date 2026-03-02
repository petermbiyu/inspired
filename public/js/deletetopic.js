document.addEventListener("DOMContentLoaded", () => {});

document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return;
  const message = document.getElementById("message");
  const id = e.target.dataset.id;

  const confirmdelete = confirm("Are you sure you want to delete topic?");
  if (!confirmdelete) return;

  try {
    const response = await fetch(
      `/api/admin/delete/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();

    if (data && data.success) {
      message.textContent = data.message;
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
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
});
