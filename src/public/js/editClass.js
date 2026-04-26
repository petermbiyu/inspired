document.addEventListener("DOMContentLoaded", async () => {
  const updateClass = document.getElementById("update-form");

  document.addEventListener("click", async (e) => {
    const editBtn = e.target.closest("#edit-class");
    if (editBtn) {
      console.log("edit btn clicked");
      const classId = editBtn.dataset.classId;
      await handleUpdateClass(classId);

      if (updateClass) {
        updateClass.classList.remove("hidden");
      }
    }
  });

  async function handleUpdateClass(classId) {
    const id = classId;
    const idClass = document.getElementById("class-id");
    const className = document.getElementById("update-class-name");
    const classLevel = document.getElementById("update-class-level");

    try {
      let url = "/api/classes/single";
      if (id) {
        url += `/${encodeURIComponent(id)}`;
      }
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.success) {
        idClass.value = data.classData.id;
        className.value = data.classData.className;
        classLevel.value = data.classData.classLevel;
        console.log(data.classData.className);
      } else {
        console.log("data.message");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});
