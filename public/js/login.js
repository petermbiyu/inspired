const formdata = document.getElementById("login");

formdata.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const submit = document.getElementById("submit");
  const message = document.getElementById("message");

  if (!email || !password) {
    message.textContent = "Please fill all fields!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
  }
  if (password.length < 6) {
    message.textContent = "Password cannot be less than 6!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
  }

  submit.disabled = true;
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      message.textContent = "Welcome Back!";
      message.style.backgroundColor = "green";
      message.style.color = "white";
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } else {
      message.textContent = data.message;
      message.style.backgroundColor = "red";
      message.style.color = "white";
      submit.disabled = false;
    }
  } catch (error) {
    console.error("Error: ", error.message);
    message.textContent = "Something went wrong. Please try again later!";
    message.style.backgroundColor = "red";
    message.style.color = "white";
    submit.disabled = false;
  }
});
