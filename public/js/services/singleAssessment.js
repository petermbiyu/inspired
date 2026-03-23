export const singleAssessment = async (classId = null) => {
  try {
    let url = "/api/assessment/class";
    if (classId) {
      url += `/${encodeURIComponent(classId)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (data && data.success) {
      return data;
    } else {
      throw new Error("Error retrieving assessment");
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
};
