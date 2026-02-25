document.addEventListener("DOMContentLoaded", () => {
  const postData = document.getElementById("post-data");

  if (!postData) {
    console.log("form element not found");
    return;
  }

  postData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const title = document.getElementById("title").value.trim();
    const body = editorInstance.getData().trim();
    const slug = document.getElementById("slug").value.trim();
    const description = document.getElementById("description").value.trim();
    const image = document.getElementById("image").files[0];
    const message = document.getElementById("message");
    const submit = document.getElementById("submit");

    if (!title || !body || !slug || !description || !image) {
      message.textContent = "Missing Fields";
      return;
    }

    message.textContent = "Uploading...";
    formData.append("title", title);
    formData.append("body", body);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("image", image);

    submit.disabled = true;
    message.textContent = "Uploading...";

    try {
      const response = await fetch("/api/admin/post", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        ((message.textContent = "Upload successful"),
          setTimeout(() => {
            window.location.href = "/admin/posts";
          }, 2000));
      } else {
        message.textContent = data.message;
        submit.disabled = false;
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      message.textContent = "Network Error";
      submit.disabled = false;
    }
  });
});
