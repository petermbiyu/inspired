document.addEventListener("DOMContentLoaded", () => {
  const startAssess = document.getElementById("start-assessment");
  startAssess.addEventListener("click", () => {
    const pathPart = window.location.pathname.split("/").filter(Boolean);
    const assessId = pathPart[pathPart.length - 1];
    window.location.href = `/learner/submission/assess/${assessId}`;
  });
});
