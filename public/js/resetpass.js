const form = document.getElementById("resetform");
const otpInput = document.querySelectorAll(".otp-input");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

otpInput.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    if (!/^[0-9]$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value && index < otpInput.length - 1) {
      otpInput[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      otpInput[index - 1].focus();
    }
  });
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData) {
      for (
        let i = 0;
        i < pasteData.length && index + i < otpInput.length;
        i++
      ) {
        otpInput[index + i].value = pasteData[i];
      }
    }
    const cursorPosition = index + pasteData.length;
    if (cursorPosition < otpInput.length) {
      otpInput[cursorPosition].focus();
    } else {
      otpInput[otpInput.length - 1].focus();
    }
  });
});
