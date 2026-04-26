import { allAssessments } from "./services/allAssessment.js";

console.log("VIEW ASSESSMENT JS LOADED");
document.addEventListener("DOMContentLoaded", async () => {
  const assessmentsList = document.getElementById("assessment-cards");
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const classId = pathPart[pathPart.length - 1];
  console.log(classId);

  const data = await allAssessments(classId);

  try {
    if (data) {
      viewAssessments(data.assessment);
    } else {
      console.log(data?.message || "no assessment returned");
    }
  } catch (error) {
    console.error("Error: ", error.message);
    return null;
  }

  function viewAssessments(assessments = []) {
    if (assessments.length === 0) {
      assessmentsList.innerHTML = `<p class="text-xl font-semibold italic">No Assessment found <i class="fa-regular fa-face-frown-open text-red-500"></i></p>`;
      return;
    }

    const cards = assessments
      .map(
        (assessmentCard) =>
          `
          <div
              class="relative w-80 h-60 p-4 my-8 bg-slate-50 rounded-[5px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.25)] shadow-gray-500/50"
            >
                 
           <h2 class="text-[1.1rem] font-bold text-center mb-4 border-b-2 ">${assessmentCard.title.toUpperCase()}</h2>
         
              <div class="my-2 w-full text-[1rem] font-semibold">
               <div class="italic">Sub Strand: ${assessmentCard.subTopic}</div>
                <div class="italic">Created: ${new Date(assessmentCard.createdAt).toLocaleDateString()}</div>
                <div class="italic">Deadline: ${new Date(assessmentCard.createdAt).toLocaleDateString()}</div>
              </div>

              <div class="w-full flex mt-3 items-center justify-center text-center text-white font-semibold gap-3 ">
                <a href="/tutor/assessment/${assessmentCard.id}"  class="btn-create w-[40px] leading-[40px] h-[40px] rounded-full cursor-pointer transition-all duration-300 ease hover:text-white hover:bg-cyan-800 border-2 text-cyan-800 "><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
              </div>
              <button class="absolute bottom-4 text-red-800 right-4" data-assessment-id="${assessmentCard.id}" id="delete-class"><i class="fa-regular fa-circle-xmark"></i><button>
              <button class="absolute bottom-4 text-green-800 left-4" data-assessment-id="${assessmentCard.id}" id="edit-class"><i class="fa-regular fa-pen-to-square"></i><button>
            </div>
          `,
      )
      .join("");
    assessmentsList.innerHTML = cards;
  }
});
