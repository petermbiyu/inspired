document.addEventListener("DOMContentLoaded", () => {
  const addQuiz = document.getElementById("add-quiz-form");
  const addShort = document.getElementById("add-short-form");
  const addLong = document.getElementById("add-long-form");

  addQuiz.addEventListener("submit", async (e) => {
    e.preventDefault();

    const questionText = document.getElementById("add-multiple-question");

    const options = [
      document.getElementById("quiz-answer-1"),
      document.getElementById("quiz-answer-2"),
      document.getElementById("quiz-answer-3"),
      document.getElementById("quiz-answer-4"),
    ];

    const radios = document.getElementsByName("answer");
    let correctAnswer = "";

    radios.forEach((radio, index) => {
      if (radio.checked) {
        correctAnswer = options[index];
      }
    });
    const payload = {
      type: "quiz",
      questionText,
      options,
      correctAnswer,
    };
    await sendQuestion(payload);
  });

  addShort.addEventListener("submit", async (e) => {
    e.preventDefault();

    const questionText = document.getElementById("add-short-question");

    const answers = [
      document.getElementById("short-answer-1"),
      document.getElementById("short-answer-2"),
      document.getElementById("short-answer-3"),
      document.getElementById("short-answer-4"),
    ];
    const payload = {
      type: "short",
      questionText,
      correctAnswer: answers,
    };
    await sendQuestion(payload);
  });

  addLong.addEventListener("submit", async (e) => {
    e.preventDefault();

    const questionText = document.getElementById("add-long-question");
    const wordCount = document.getElementById("word-count").value;
  });
});
