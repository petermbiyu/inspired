document.addEventListener("DOMContentLoaded", () => {
  // access classes
  const role = window.localStorage.getItem("userRole");
  const classes = document.getElementById("access-classes");

  if (!classes) {
    console.warn("Element with id 'access-classes' not found");
    return;
  }

  if (!role) {
    console.warn("User role not found");
    return;
  }
  if (role === "tutor") {
    classes.addEventListener("click", () => {
      window.location.href = "/tutor/classes";
    });
  } else if (role === "learner") {
    classes.addEventListener("click", () => {
      window.location.href = "/learner/classes";
    });
  }
});
