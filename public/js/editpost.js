import { singlepost } from "./services/singlePost.js";
const tinymce = window.tinymce;

console.log("Editpost loaded");
console.log("tinymce object:", tinymce);

document.addEventListener("DOMContentLoaded", async () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const slug = pathPart[pathPart.length - 1] || null;
  console.log("Initializing TinyMCE...");

  try {
    const data = await singlepost(slug);
    if (data && data.post) {
      displayPost(data.post);
    } else {
      console.log(data?.message || "no post returned");
    }
  } catch (error) {
    console.log("error message:", error.message);
  }
});

const displayPost = (post) => {
  const form = document.getElementById("update-data");
  if (!post) {
    console.log("no post to display");
  }

  document.getElementById("id-No").value = post._id || "";
  document.getElementById("title").value = post.title || "";
  // tinymce.get("bodyEditor").setContent(post.body || "");
  // tinymce.get("snippetEditor").setContent(post.snippet || "");
  document.getElementById("slug").value = post.slug || "";
  document.getElementById("description").value = post.description || "";
  document.getElementById("topic").value = post.topic || "";

  // Function to set editor content when ready
  const setEditorContent = () => {
    const bodyEditor = tinymce.get("bodyEditor");
    const snippetEditor = tinymce.get("snippetEditor");

    if (
      bodyEditor &&
      bodyEditor.initialized &&
      snippetEditor &&
      snippetEditor.initialized
    ) {
      bodyEditor.setContent(post.body || "");
      snippetEditor.setContent(post.snippet || "");
      console.log("Editor content set successfully");
    } else {
      // If editors aren't ready, wait a bit and try again
      setTimeout(setEditorContent, 100);
    }
  };

  // Start trying to set editor content
  setEditorContent();

  const imagepreview = document.createElement("div");
  imagepreview.className = "w-[100px] h-[100px] mb-4";
  imagepreview.innerHTML = `<img src='/images/${post.image}' class="w-full h-full">`;
  console.log(post.image);

  form.insertBefore(
    imagepreview,
    form.querySelector("#bodyEditor").parentElement,
  );
};
