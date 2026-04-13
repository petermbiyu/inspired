export const singlepost = async (slug = null) => {
  let url = "/api/admin/article";
  if (slug) {
    url += `/${encodeURIComponent(slug)}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.success) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
