export const singletopic = async (id = null) => {
  try {
    let url = "/api/admin/topic";

    if (id) {
      url += `/${encodeURIComponent(id)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error("Error retrieving topic");
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
};
