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
      const tr = document.createElement("tr");
      const tNo = document.createElement("td");
      const tTitle = document.createElement("td");
      const tedit = document.createElement("td");
      const tdelete = document.createElement("td");
      const elink = document.createElement("a");
      const dlink = document.createElement("a");

      tNo.innerHTML = `${index + 1}.`;
      tTitle.innerHTML = post.title;
      elink.href = "/admin/edit";
      elink.textContent = "Edit";
      elink.classList.add("edit");
      tedit.appendChild(elink);
      tdelete.appendChild(dlink);
      dlink.href = "/";
      dlink.textContent = "Delete";
      dlink.classList.add("delete");

      tr.appendChild(tNo);
      tr.appendChild(tTitle);
      tr.appendChild(tedit);
      tr.appendChild(tdelete);

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error.message);
    message.textContent = "Something went wrong. Please try again later";
  }
});
