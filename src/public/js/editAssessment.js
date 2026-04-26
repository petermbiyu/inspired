document.addEventListener("DOMContentLoaded", () => {
  const updateform = document.getElementById("update-assess");
  document.addEventListener("click", async (e) => {
    const editBtn = e.target.closest("#edit-class");
    if (editBtn) {
      const assessId = editBtn.dataset.assessmentId;
      console.log(assessId);
      await handleUpdateBtn(assessId);

      if (updateform) {
        updateform.classList.remove("hidden");
      }
    }
  });

  async function handleUpdateBtn(assessId) {
    const id = document.getElementById("update-id");
    const assessName = document.getElementById("update-name");
    const assessSubtitle = document.getElementById("update-subtopic");
    const assessPublish = document.getElementById("update-publish");
    const assessExpire = document.getElementById("update-expire");

    try {
      let url = "/api/assessment/single";
      if (assessId) {
        url += `/${encodeURIComponent(assessId)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.success) {
        id.value = data.assessment.id;
        assessName.value = data.assessment.title;
        assessSubtitle.value = data.assessment.subTopic;
        if (data.assessment.publish === true) {
          assessPublish.checked = true;
        } else if (data.assessment.publish === false) {
          assessPublish.checked = false;
        }
        if (data.assessment.expireAt) {
          const date = new Date(data.assessment.expireAt);
          // Format: YYYY-MM-DDThh:mm
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          assessExpire.value = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});
