import { classes } from "./services/allClass.js";
document.addEventListener("DOMContentLoaded", async () => {
  const message = document.getElementById("message");
  const loggedIn = document.getElementById("user-name");

  const totalClasses = document.getElementById("total-classes");
  const totalAssessment = document.getElementById("total-assessments");
  const totalEnrollment = document.getElementById("total-learners");

  const userName = window.localStorage.getItem("userName");
  if (loggedIn) {
    loggedIn.textContent = userName;
  }

  const data = await classes();
  if (data && data.success) {
    console.log("dashboard success:", data.dashboard);
    totalClasses.textContent = data.dashboard.totalClasses;
    totalAssessment.textContent = data.dashboard.totalAssessment;
    totalEnrollment.textContent = data.dashboard.totalStudents;
  } else {
    console.log("error: ", data.message);
    message.textContent = data.message;
    message.style.display = "block";
    message.classList.add("animate");
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  }
});
