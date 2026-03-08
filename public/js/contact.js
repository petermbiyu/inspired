document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const message = document.getElementById("message");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstname = document.getElementById("first-name").value.trim();
    const lastname = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const textMessage = document.getElementById("message-body").value.trim();

    const submit = document.getElementById("submit");

    message.textContent = "";

    if (!firstname || !lastname || !email || !textMessage) {
      message.textContent = "Please fill all fields";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);

      return;
    }
    submit.disabled = true;
    message.textContent = "Sending...";
    message.style.display = "block";
    message.classList.add("animate");
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);

    try {
      const response = await fetch("/api/message/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, textMessage }),
      });
      const data = await response.json();

      if (data.success) {
        message.textContent = "Message sent successfully";
        message.style.display = "block";
        message.classList.add("animate");

        setTimeout(() => {
          window.location.href = "/";
        }, 2800);
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
      console.error(error.message);
      message.textContent = "Something went wrong";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }
  });
});
