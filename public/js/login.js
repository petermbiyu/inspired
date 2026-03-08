const formdata = document.getElementById("loginForm");

formdata.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const submit = document.getElementById("submit");
  const message = document.getElementById("message");

  message.textContent = "";
  message.style.display = "none";

  if (!email || !password) {
    message.textContent = "Please fill all fields!";
    message.style.display = "block";
    message.classList.add("animate");
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
    return;
  }
  if (password.length < 6) {
    message.textContent = "Password cannot be less than 6!";
    message.style.display = "block";
    message.classList.add("animate");
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
    return;
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
      const profileName = data.user.name.split(" ")[0];
      window.localStorage.setItem("userName", profileName);
      window.localStorage.setItem("isLoggedIn", "true");

      message.textContent = `Welcome Back ${profileName}`;
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        window.location.href = "/";
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
    console.error("Error: ", error.message);
    message.textContent = "Something went wrong. Please try again later!";
    message.style.display = "block";
    message.classList.add("animate");
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
    submit.disabled = false;
  }
});
