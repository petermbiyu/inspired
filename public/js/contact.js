document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstname = document.getElementById("first-name").value.trim();
    const lastname = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const textMessage = document.getElementById("message-body").value.trim();
    const message = document.getElementById("message");
    const submit = document.getElementById("submit");

    if (!firstname || !lastname || !email || !textMessage) {
      message.textContent = "Please fill all fields";
      return;
    }
    submit.disabled = true;
    message.textContent = "Sending...";

    try {
      const response = await fetch("/api/message/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, textMessage }),
      });
      const data = await response.json();

      if (data.success) {
        message.textContent = "Message sent successfully";
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        message.textContent = data.message;
        submit.disabled = false;
      }
    } catch (error) {
      console.error(error.message);
      message.textContent = "Something went wrong";
      submit.disabled = false;
    }
  });
});
