export const allpost = async (topic = null) => {
  let url = "/api/admin/post";

  if (topic) {
    url += `?topic=${encodeURIComponent(topic)}`;
  }
  const response = await fetch(url);

  const data = await response.json();

  if (data.success) {
    return data;
  } else {
    // throw new Error(data.message);
    console.log(data.message); // optional logging
    return { success: false, posts: [] };
  }
};
