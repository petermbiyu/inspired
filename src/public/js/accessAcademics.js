document.addEventListener("DOMContentLoaded", () => {
  const academics = document.getElementById("access-academic");

  academics.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const message = document.getElementById("message");

    message.textContent = "";

    if (!isLoggedIn) {
      message.textContent = "Not authorised. Please login";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
        window.location.href = "/login";
      }, 3000);
    } else {
      window.location.href = "/academic";
    }
  });
});
