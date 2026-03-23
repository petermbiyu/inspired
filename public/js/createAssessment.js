document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("class-card");
  const message = document.getElementById("message");

  cardsContainer.addEventListener("click", async (e) => {
    const target = e.target.closest("button");
    const classId = target.dataset.classId;
    const assessmentTitle = target.dataset.assessmentTitle;
    const assessmentId = localStorage.getItem(`assessment_${classId}`);

    if (!classId) return;

    // create

    if (target.classList.contains("btn-create")) {
      if (!assessmentId) {
        createAssessment(classId, assessmentTitle);
      } else {
        message.textContent = "Assessment already exists!";
        message.style.display = "block";
        setTimeout(() => {
          message.style.display = "none";
          window.location.href = `/academic/assessment/${classId}`;
        }, 3000);
      }
    }
    // view
    if (target.classList.contains("btn-view")) {
      window.location.href = `/assessment/view?classId=${classId}`;
    }
    // edit
    if (target.classList.contains("btn-edit")) {
      window.location.href = `/assessment/edit?classId=${classId}`;
    }
    // publish
    if (target.classList.contains("btn-publish")) {
      togglePublish(target, classId);
    }
  });

  const createAssessment = async (classId, assessmentTitle) => {
    const title = assessmentTitle;
    if (!title) return;

    try {
      const res = await fetch("/api/assessment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, title }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(`assessment_${classId}`, data.data._id);
        message.textContent = "Assessment created successfully";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
          window.location.href = `/academic/assessment/${classId}`;
        }, 3000);
      } else {
        message.textContent = "Error Creating Assessment";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
      }
    } catch (error) {
      message.textContent = error.message;
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    }
  };
});
