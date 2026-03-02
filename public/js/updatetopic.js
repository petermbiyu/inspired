document.addEventListener("DOMContentLoaded", () => {
  const formData = document.getElementById("update-data");

  formData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pathPart = window.location.pathname.split("/").filter(Boolean);
    const id = pathPart[pathPart.length - 1];

    const topic = document.getElementById("topic").value.trim();
    const description = document.getElementById("description").value.trim();
    const submit = document.getElementById("submit");
    const message = document.getElementById("message");

    if (!topic || !description) {
      console.log(id, topic, description);
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
      let url = "/api/admin/update";

      if (!id) {
        message.textContent = "invalid link. Id is required";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
      }

      url += `/${encodeURIComponent(id)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, topic, description }),
      });

      const data = await response.json();

      if (data && data.success) {
        message.textContent = "Topic updated successfully";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          window.location.href = "/admin/topics";
        }, 2500);
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
  });
});
