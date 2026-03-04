import { singlepost } from "./services/singlePost.js";

document.addEventListener("DOMContentLoaded", async () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const slug = pathParts[pathParts.length - 1] || null;

  try {
    const data = await singlepost(slug);
    if (data && data.post) {
      displayPost(data.post);
      spinner.classList.add("hidden");
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
});

const displayPost = (post) => {
  const blog = document.getElementById("blog-post");
  blog.innerHTML = "";

  if (!post) {
    blog.innerHTML = `<p class="text-center font-bold text-2xl italic">No blogs found</p>`;
    return;
  }

  blog.innerHTML += `
    <div class="bg-white w-full max-w-300 shadow-xl mx-auto" >
        <h1 class="font-bold text-2xl md:text-4xl text-center py-2">
          ${post.title}
        </h1>
        <img
          src="/images/${post.image}"
          alt="academic"
          class="w-full px-16 py-8 w-max-200 aspect-16/9"
        />
        <div class="p-4">
          <h3 class="font-semibold text-[0.9rem]">${new Date(post.updatedAt).toLocaleDateString()}</span>
          </h3>
          <div class="blog-content">${post.body}
          </div>
        </div>
      </div>
    `;
};
