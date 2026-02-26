import { allTopics } from "./services/allTopics.js";

document.addEventListener("DOMContentLoaded", async () => {
  const data = await allTopics();

  if (!data || !data.topics || data.topics.length === "0") {
    console.log("No post to show");
    return;
  }

  try {
    const data = await allTopics();
    tbody.innerHTML = "";

    if (!data || !data.topics || data.topics.length === 0) {
      message.textContent = "No topcs found.";
      return;
    }

    data.topics.forEach((tdata, index) => {
      const tr = document.createElement("tr");
      const tNo = document.createElement("td");
      const tTitle = document.createElement("td");
      const tedit = document.createElement("td");
      const tdelete = document.createElement("td");
      const elink = document.createElement("a");
      const dlink = document.createElement("a");

      tNo.innerHTML = `${index + 1}.`;
      tTitle.innerHTML = tdata.topic;
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
