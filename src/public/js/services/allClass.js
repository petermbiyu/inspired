export const classes = async () => {
  const response = await fetch("/api/classes/tutor", {
    credentials: "include",
  });
  const data = await response.json();
  if (data && data.success) {
    return data;
  } else {
    console.log(data.message);
  }
};
