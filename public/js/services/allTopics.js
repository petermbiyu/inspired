export const allTopics = async () => {
  const response = await fetch("/api/admin/topics");

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  } else {
    return data;
  }
};
