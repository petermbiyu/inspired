import { allpost } from "./services/allPost.js";
document.addEventListener("DOMContentLoaded", async () => {
  //   get topic
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");

  //   title
  const title = document.getElementById("blog-title");
  title.innerHTML = "";

  const capitalize = (word) => {
    if (!word) return "All posts";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  title.textContent = capitalize(topic);

  try {
    const data = await allpost(topic);
    if (data && data.posts) {
      displayPosts(data.posts);
    } else {
      console.log(data.posts);
    }
  } catch (error) {
    console.error(error.message);
  }
});

const displayPosts = (posts) => {
  const blogs = document.getElementById("snippet");
  blogs.innerHTML = "";

  if (!posts || posts.length === 0) {
    blogs.innerHTML = `<p class="text-center font-bold text-2xl italic">No blogs found</p>`;
    return;
  }
  posts.forEach((post) => {
    blogs.innerHTML += `
    <div class="bg-white w-full max-w-250 shadow-xl mx-auto mb-4">
          <img
            src="/images/${post.image}"
            alt="academic"
            class="w-full aspect-16/9"
          />
          <div class="p-4">
            <h3 class="font-semibold text-[1rem]">${post.topic}</h3>
            <h2 class="font-bold text-2xl py-2">
              ${post.title}
            </h2>
            <p class="text-[1.1rem]">
              ${post.snippet}
            </p>
          </div>
          <div
            class="px-4 pb-4 hover:text-blue-700 transition-all duration-300 text-[1rem] text-shadow-xl"
          >
            <a href="./article/${post.slug}"
              >Read more
              <i class="fa-solid fa-circle-chevron-right text-[1rem]"></i
            ></a>
          </div>
        </div>
    `;
  });
};
