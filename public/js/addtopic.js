document.addEventListener("DOMContentLoaded", () => {
  const addTopic = document.getElementById("topic-data");

  addTopic.addEventListener("submit", async (e) => {
    e.preventDefault();

    const topic = document.getElementById("topic").value.trim();
    const description = document.getElementById("description").value.trim();
    const submit = document.getElementById("submit");
    const message = document.getElementById("message");

    if (!topic || !description) {
      message.textContent = "All fields are required";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      return;
    }
    submit.disabled = true;

    try {
      const response = await fetch("/api/admin/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, description }),
      });

      const data = await response.json();
      if (data.success) {
        message.textContent = "Topic Added Successfully";
        message.style.display = "block";
        setTimeout(() => {
          window.location.href = "/admin/topics";
        }, 3000);
      } else {
        message.textContent = data.message;
        message.style.display = "block";
      }
    } catch (error) {
      message.textContent = error.message;
      message.style.display = "block";
    }
  });
});
