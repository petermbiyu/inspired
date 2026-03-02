import { singletopic } from "./services/singleTopic.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const id = pathPart[pathPart.length - 1];

  const data = await singletopic(id);
  try {
    if (data && data.topic) {
      displaytopic(data.topic);
    } else {
      console.log(data?.message || "no topic returned");
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

const displaytopic = (topics) => {
  if (!topics) {
    console.log("No topic to display");
  }
  document.getElementById("id").value = topics._id;
  document.getElementById("topic").value = topics.topic;
  document.getElementById("description").value = topics.description;
};
