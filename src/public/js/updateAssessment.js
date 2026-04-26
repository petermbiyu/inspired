document.addEventListener("DOMContentLoaded", () => {
  const updateAssess = document.getElementById("update-assess-form");
  const message = document.getElementById("message");

  updateAssess.addEventListener("submit", async (e) => {
    e.preventDefault();
    const assessId = document.getElementById("update-id").value.trim();
    const title = document.getElementById("update-name").value.trim();
    const subTopic = document.getElementById("update-subtopic").value.trim();
    const publish = document.getElementById("update-publish").checked;
    const expireAt = document.getElementById("update-expire").value.trim();
    const submit = document.getElementById("update-submit");

    message.textContent = "";
    submit.disabled = true;

    if (!assessId || !title || !subTopic) {
      message.textContent = "All fields are required";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }

    try {
      let url = "/api/assessment/update";
      if (assessId) {
        url += `/${encodeURIComponent(assessId)}`;
      }
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subTopic, publish, expireAt }),
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
      message.textContent =
        error.message || "something went wrong. Please try again later";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }
  });
});
