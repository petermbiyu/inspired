document.addEventListener("DOMContentLoaded", () => {
  const addClass = document.getElementById("add-class");

  addClass.addEventListener("submit", async (e) => {
    e.preventDefault();

    const className = document.getElementById("class-name").value.trim();
    const classLevel = document.getElementById("class-level").value.trim();
    const submit = document.getElementById("submit");
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
      const response = await fetch("/api/classes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, classLevel }),
      });

      const data = await response.json();

      if (data && data.success) {
        message.textContent = "Class Added Successful";
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
