document.addEventListener("DOMContentLoaded", () => {
  window.deletePost = async (id) => {
    const message = document.getElementById("message");
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/post/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        message.textContent = "Post delete Successfully";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        message.textContent = "failed to delete post";
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
      console.log("Error: ", error.message);
    }
  };
});
