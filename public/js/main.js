document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Loaded");

  const message = document.getElementById("message");
  // loggin page
  const loginToggle = document.getElementById("login-toggle");
  const password = document.getElementById("password");

  if (loginToggle && password) {
    loginToggle.addEventListener("click", () => {
      if (password.type === "password") {
        password.type = "text";
        loginToggle.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
      } else {
        password.type = "password";
        loginToggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  }

  // signup page
  const signupToggle = document.getElementById("pass-sign-toggle");
  const confirmpassToggle = document.getElementById("confirm-pass-sign-toggle");
  const signupPass = document.getElementById("signup-password");
  const confirmPass = document.getElementById("confirm-password");

  if (signupToggle && signupPass) {
    signupToggle.addEventListener("click", () => {
      if (signupPass.type === "password") {
        signupPass.type = "text";
        signupToggle.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
      } else {
        signupPass.type = "password";
        signupToggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  }

  if (confirmpassToggle && confirmPass) {
    confirmpassToggle.addEventListener("click", () => {
      if (confirmPass.type === "password") {
        confirmPass.type = "text";
        confirmpassToggle.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
      } else {
        confirmPass.type = "password";
        confirmpassToggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  }

  // add ckass
  const toggleClass = document.getElementById("display-add-form");
  const toggleCross = document.getElementById("toggle-cross");
  const addClassForm = document.getElementById("add-form");

  console.log("toggleClass:", toggleClass);
  console.log("addClassForm:", addClassForm);

  if (toggleClass && addClassForm && toggleCross) {
    toggleClass.addEventListener("click", () => {
      addClassForm.classList.remove("hidden");

      toggleCross.addEventListener("click", () => {
        addClassForm.classList.add("hidden");
      });
    });
  }

  // select question format
  const formatBtn = document.getElementById("btn-question-format");
  const formatSelect = document.getElementById("question-format");
  const multiClose = document.getElementById("multiple-close");
  const shortClose = document.getElementById("short-close");
  const longClose = document.getElementById("long-close");

  const quizInput = document.getElementById("quiz-form");
  const shortInput = document.getElementById("short-form");
  const longInput = document.getElementById("long-form");

  // hide all
  quizInput.classList.add("hidden");
  shortInput.classList.add("hidden");
  longInput.classList.add("hidden");

  formatBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (formatSelect.value.trim() === "") {
      message.textContent = "Please select a question format";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      return;
    }
    if (formatSelect.value.trim() === "quiz") {
      quizInput.classList.remove("hidden");
      shortInput.classList.add("hidden");
      longInput.classList.add("hidden");
    }
    if (formatSelect.value.trim() === "short") {
      shortInput.classList.remove("hidden");
      quizInput.classList.add("hidden");
      longInput.classList.add("hidden");
    }
    if (formatSelect.value.trim() === "long") {
      longInput.classList.remove("hidden");
      quizInput.classList.add("hidden");
      shortInput.classList.add("hidden");
    }
  });
  multiClose.addEventListener("click", () => {
    quizInput.classList.add("hidden");
  });
  shortClose.addEventListener("click", () => {
    shortInput.classList.add("hidden");
  });
  longClose.addEventListener("click", () => {
    longInput.classList.add("hidden");
  });
});
