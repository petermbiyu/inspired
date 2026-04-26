document.addEventListener("DOMContentLoaded", () => {
  const updateClass = document.getElementById("update-class");

  updateClass.addEventListener("submit", async (e) => {
    e.preventDefault();
    const classId = document.getElementById("class-id").value;
    const className = document.getElementById("update-class-name").value.trim();
    const classLevel = document
      .getElementById("update-class-level")
      .value.trim();
    const checkCode = document.getElementById("class-code").checked;
    const submit = document.getElementById("update-submit");
    const message = document.getElementById("message");

    submit.disabled = true;
    message.textContent = "";

    if (!className || !classLevel) {
      submit.disabled = false;
      message.textContent = "Missing details";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      return;
    }

    try {
      let url = "/api/classes/update";
      if (classId) {
        url += `/${encodeURIComponent(classId)}`;
      }
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, classLevel, checkCode }),
      });

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
        submit.disabled = false;
      }
    } catch (error) {
      message.textContent = error.message || "Something went wrong";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }
  });
});
