document.addEventListener("DOMContentLoaded", () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const classId = pathPart[pathPart.length - 1];

  const assessForm = document.getElementById("assess-form");

  assessForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log(classId);

    const title = document.getElementById("assess-name").value.trim();
    const subTopic = document.getElementById("assess-subtopic").value.trim();
    const publish = document.getElementById("assess-publish").checked;
    const expireAt = document.getElementById("assess-expire").value;
    const message = document.getElementById("message");
    const submit = document.getElementById("assess-submit");

    message.textContent = "";
    submit.disabled = true;

    if (!title || !subTopic) {
      message.textContent = "Missing Details";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
      return;
    }
    try {
      const response = await fetch("/api/assessment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subTopic,
          publish,
          expireAt,
          classId,
        }),
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
      console.error("Error:", error.message);
      message.textContent = "Something went wrong. Please try again later";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }
  });
});
