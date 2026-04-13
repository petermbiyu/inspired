export const assessmentQuestion = async (assessId = null) => {
  let url = "/api/assessment/preview";
  url += `/${encodeURIComponent(assessId)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.success) {
      return data;
    } else {
      console.log(data.messsage);
      return null;
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
};
