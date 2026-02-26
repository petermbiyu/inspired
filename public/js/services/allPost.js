export const allpost = async () => {
  const response = await fetch("/api/admin/post");

  const data = await response.json();

  if (data.success) {
    return data;
  } else {
    throw new error(data.message);
  }
};
