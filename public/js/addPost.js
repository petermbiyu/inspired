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
    const snippet = document.getElementById("snippet").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const slug = document.getElementById("slug").value.trim();
    const description = document.getElementById("description").value.trim();
    const image = document.getElementById("image").files[0];
    const message = document.getElementById("message");
    const submit = document.getElementById("submit");

    if (!title || !body || !slug || !snippet || !description || !image) {
      message.textContent = "All fields are required";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
      return;
    }

    message.textContent = "Uploading...";
    formData.append("title", title);
    formData.append("body", body);
    formData.append("snippet", snippet);
    formData.append("topic", topic);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("image", image);

    submit.disabled = true;
    message.style.display = "block";
    message.textContent = "Uploading...";
    message.style.display = "block";
    message.classList.add("animate");
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);

    try {
      const response = await fetch("/api/admin/post", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("data: ", data.message);

      if (data.success) {
        message.textContent = "Upload successful";
        message.style.display = "block";

        setTimeout(() => {
          window.location.href = "/admin/posts";
        }, 2500);
      } else {
        message.style.display = "block";
        message.textContent = data.message;
        message.classList.add("animate");
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
        submit.disabled = false;
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      message.textContent = "Network Error";
      message.style.display = "block";
      message.classList.add("animate");
      setTimeout(() => {
        message.style.display = "none";
      }, 3100);
      submit.disabled = false;
    }
  });
});
