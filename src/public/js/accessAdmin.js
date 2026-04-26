document.addEventListener("DOMContentLoaded", () => {
  const accessAdmin = document.getElementById("access-admin");
  if (accessAdmin) {
    accessAdmin.addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const isAdmin = localStorage.getItem("userRole");
      const message = document.getElementById("message");

      message.textContent = "";

      if (!isLoggedIn) {
        message.textContent = "Not authorised. Please Login";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
          window.location.href = "/";
        }, 3000);
      } else if (isAdmin !== "admin") {
        message.textContent = "Not authorised";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
          window.location.href = "/";
        }, 3000);
      } else {
        window.location.href = "/admin";
      }
    });
  }
});
