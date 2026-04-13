document.addEventListener("DOMContentLoaded", () => {
  const updateForm = document.getElementById("update-data");

  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id-No").value.trim();
    const title = document.getElementById("title").value.trim();
    const body = tinymce.get("bodyEditor").getContent().trim();
    const snippet = tinymce.get("snippetEditor").getContent().trim();
    const image = document.getElementById("image").files[0];
    const slug = document.getElementById("slug").value.trim();
    const description = document.getElementById("description").value.trim();
    const submit = document.getElementById("submit");
    const message = document.getElementById("message");

    submit.disabled = true;
    message.textContent = "updating...";

    if (!title || !body || !snippet || !slug || !description) {
      message.textContent = "All fields are required";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
      return;
    }

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title);
    formData.append("body", body);
    formData.append("snippet", snippet);
    formData.append("slug", slug);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/admin/update", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data && data.success) {
        message.textContent = "Post updated successfully";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          window.location.href = "/admin/posts";
        }, 2500);
        submit.disabled = false;
      } else {
        message.textContent = data.message || "update failed";
        message.style.display = "block";
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
        submit.disabled = false;
      }
    } catch (error) {
      console.error("Error: ", error.message);
      message.textContent = "something went wrong.";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      submit.disabled = false;
    }
  });
});
