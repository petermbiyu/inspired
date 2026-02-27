import { allTopics } from "./services/allTopics.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await allTopics();

    if (!data || !data.topics || data.topics.length === 0) {
      console.log("No post to show");
      return;
    }
    const ul = document.getElementById("navtopic");
    ul.innerHTML = "";

    data.topics.forEach((tdata) => {
      const li = document.createElement("li");
      li.classList.add("navlink");
      const link = document.createElement("a");
      link.href = `/blogs?topic=${tdata.topic}`.toLowerCase();
      link.textContent = tdata.topic;
      link.classList.add("link");
      li.appendChild(link);
      ul.appendChild(li);
    });
  } catch (error) {
    console.log("error loading topics: ", error.message);
  }
});
