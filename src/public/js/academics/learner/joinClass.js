document.addEventListener("DOMContentLoaded", () => {
  const joinClass = document.getElementById("join-class");

  joinClass.addEventListener("submit", async (e) => {
    e.preventDefault();

    const className = document.getElementById("class-name").value.trim();
    const classCode = document.getElementById("class-code").value.trim();
    const submit = document.getElementById("submit");
    const message = document.getElementById("message");

    submit.disabled = true;
    message.textContent = "";

    if (!className || !classCode) {
      submit.disabled = false;
      message.textContent = "Missing class details";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      return;
    }

    try {
      const response = await fetch("/api/classes/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, classCode }),
      });

      const data = await response.json();

      if (data && data.success) {
        message.textContent = `You joined class ${className} Successful`;
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
