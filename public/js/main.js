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
