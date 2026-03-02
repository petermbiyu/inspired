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
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}.</td>
          <td>${tdata.topic}</td>
          <td><a href="/admin/topic/${tdata._id}" class="text-green-600">Edit</a></td>
          <td><button class="delete-btn text-red-600 cursor-pointer" data-id="${tdata._id}">Delete</td>
        </tr>

`;
    });
  } catch (error) {
    console.log(error.message);
    message.textContent = "Something went wrong. Please try again later";
  }
});
