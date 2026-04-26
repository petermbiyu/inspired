document.addEventListener("DOMContentLoaded", () => {
  const academics = document.getElementById("access-academic");
  const navAcademics = document.getElementById("nav-academics");
  console.log("access-button academics loaded");
  // academics
  if (academics) {
    academics.addEventListener("click", () => {
      console.log("clicked");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userRole = localStorage.getItem("userRole");
      const message = document.getElementById("message");
      console.log(isLoggedIn, userRole);
      message.textContent = "";

      if (!isLoggedIn) {
        message.textContent = "Not authorised. Please login";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
          window.location.href = "/login";
        }, 3000);
      } else if (userRole === "learner") {
        window.location.href = "/academic/learner/academic";
      } else if (userRole === "tutor") {
        window.location.href = "/academic/tutor/academic";
      }
    });
  }
  // nav academics
  if (navAcademics) {
    navAcademics.addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userRole = localStorage.getItem("userRole");
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
      } else if (userRole === "tutor") {
        window.location.href = "/academic/tutor/academic";
      } else if (userRole === "learner") {
        window.location.href = "/academic/learner/academic";
      }
    });
  }
});
