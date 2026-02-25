import { createElement } from "react";

document.addEventListener("DOMContentLoaded", () => {
  const editPost = document.getElementById("edit-post");

  editPost.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/getData");
      const data = await response.json();

      if (data.success) {
        const tr = createElement("tr");
      }
    } catch (error) {}
  });
});
