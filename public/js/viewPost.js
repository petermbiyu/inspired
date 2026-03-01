import { allpost } from "./services/allPost.js";

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("tbody");
  const message = document.getElementById("message");

  try {
    const data = await allpost();
    tbody.innerHTML = "";

    if (!data || !data.posts || data.posts.length === 0) {
      message.textContent = "No posts found.";
      return;
    }

    data.posts.forEach((post, index) => {
      tbody.innerHTML += `
      <tr>
        <td>${index + 1}.</td>
        <td>${post.title}</td>
        <td> <a class="text-green-600 "  href = "/admin/edit/${post.slug}">Edit</a></td>
        <td>
          <button class="text-red-600 cursor-pointer" onclick="deletePost('${post._id}')">
            Delete
          </button>
        </td>
      </tr>
`;
    });
  } catch (error) {
    console.log(error.message);
    message.textContent = "Something went wrong. Please try again later";
  }
});
