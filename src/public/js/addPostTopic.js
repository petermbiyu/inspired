import { allTopics } from "./services/allTopics.js";
document.addEventListener("DOMContentLoaded", async () => {
  const selectTopic = document.getElementById("topic");

  const data = await allTopics();

  let topics = [];
  if (data && data.success) {
    topics = data.topics;
  }

  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic.id;
    option.innerText = `${topic.topic}`;

    selectTopic.appendChild(option);
  });
});
