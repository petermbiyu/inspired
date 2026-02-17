const formdata = document.getElementById("signup");

formdata.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("user-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmpass = document.getElementById("confirm-password").value.trim();
  const message = document.getElementById("message");

  const submit = document.getElementById("submit");

  if (!name || !email || !password || !confirmpass) {
    message.textContent = "Please fill all fields!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
    return;
  }
  if (password.length < 6) {
    message.textContent = "Password must be at least 6 character!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
    return;
  }
  if (password !== confirmpass) {
    message.textContent = "Passwords do not match!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
    return;
  }
  // submit.disabled = true;
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmpass }),
    });

    const data = await response.json();
    console.log("response: ", data);

    if (data.success) {
      submit.textContent = "Submitting...";
      message.textContent = "signup success! Redirecting...";
      message.style.backgroundColor = "green";
      message.style.color = "white";
      formdata.reset();
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      message.textContent = "Error: " + data.message;
      message.style.backgroundColor = "red";
      message.style.color = "white";
      submit.disabled = false;
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
    console.error("Error: ", error);
    submit.disabled = false;
    submit.textContent = "Signup";
  }
});
