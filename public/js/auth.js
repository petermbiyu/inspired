document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profile");
  const loginBtn = document.getElementById("access");
  const logoutBtn = document.getElementById("logout");

  const username = localStorage.getItem("userName");
  const loginStatus = localStorage.getItem("isLoggedIn") === "true";

  if (username && loginStatus) {
    if (profileName) profileName.textContent = username;
    if (logoutBtn) logoutBtn.style.display = "block";
    if (loginBtn) loginBtn.style.display = "none";
  } else {
    if (profileName) profileName.textContent = "";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "block";
  }

  // logout handler

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      const message = document.getElementById("message");
      message.textContent = "";
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        if (data && data.success) {
          window.localStorage.removeItem("userName");
          window.localStorage.removeItem("isLoggedIn");
          message.textContent = `Logged out successfully`;
          message.style.display = "block";
          message.classList.add("animate");
          setTimeout(() => {
            window.location.href = "/";
          }, 2500);
        } else {
          message.textContent = "Unable to logout";
          message.style.display = "block";
          message.classList.add("animate");
          setTimeout(() => {
            message.style.display = "none";
          }, 3000);
        }
      } catch (error) {
        console.error("Error: ", error.message);
        message.textContent = "Something went wrong. Please try again later!";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
      }
    });
  }
});
