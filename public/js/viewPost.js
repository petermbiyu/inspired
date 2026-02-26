import { allpost } from "./services/allPost.js";

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("tbody");
  const message = document.getElementById("message");

  try {
    const data = await allpost();
    tbody.innerHTML = "";

    if (!data || !data.allPost || data.allPost.length === 0) {
      message.textContent = "No posts found.";
      return;
    }

    data.allPost.forEach((tdata, index) => {
      const tr = document.createElement("tr");
      const tNo = document.createElement("td");
      const tTitle = document.createElement("td");
      const tedit = document.createElement("td");
      const tdelete = document.createElement("td");
      const elink = document.createElement("a");
      const dlink = document.createElement("a");

      tNo.innerHTML = `${index + 1}.`;
      tTitle.innerHTML = tdata.title;
      elink.href = "/admin/edit";
      elink.innerHTML = "Edit";
      elink.classList.add("edit");
      tedit.appendChild(elink);
      tdelete.appendChild(dlink);
      dlink.href = "/";
      dlink.innerHTML = "Delete";
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
