const formdata = document.getElementById("signup");

formdata.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("user-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpass = document.getElementById("confirm-password").value;

  if (!name || !email || !password || confirmpass) {
    alert("Please fill all fields");
    return;
  }
  if (password < 6) {
    alert("Password cannot must be at least 6 character");
  }

  try {
    const response = await fetch("/api/auth/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmpass }),
    });

    const data = await response.json();
    console.log("response: ", data);

    if (data.success) {
      alert("signup success!");
      window.location.href = "/login";
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {}
});
