import { allAssessments } from "../../services/allAssessment.js";
document.addEventListener("DOMContentLoaded", async () => {
  const pathPart = window.location.pathname.split("/").filter(Boolean);
  const classId = pathPart[pathPart.length - 1];
  const data = await allAssessments(classId);

  if (data && data.success) {
    viewAssessments(data.assessment);
  } else {
    console.log(data?.message || "no assessment returned");
  }
});

function viewAssessments(assessments = []) {
  const assessList = document.getElementById("learner-assessment-cards");
  if (assessments.length === 0) {
    assessList.innerHTML = `<p class="text-xl font-semibold italic">No Assessment found <i class="fa-regular fa-face-frown-open text-red-500"></i></p>`;
    return;
  }

  const cards = assessments
    .map(
      (assessmentCard) =>
        `
          <div
              class="relative w-80 max-h p-4 my-8 bg-slate-50 rounded-[5px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.25)] shadow-gray-500/50"
            >
                 
           <h2 class="text-[1.1rem] font-bold text-center mb-4 border-b-2 ">${assessmentCard.title.toUpperCase()}</h2>
         
              <div class="my-2 w-full text-[1rem] font-semibold">
               <div class="italic">${assessmentCard.subTopic}</div>
                <div class="italic flex flex-row justify-between items-center">
                  <div>Due on: ${new Date(assessmentCard.expireAt).toLocaleDateString()}</div>
                  <div><a href="/learner/assessment/${assessmentCard.id}"  class="btn-create w-[40px] max-h p-1 rounded-full cursor-pointer transition-all duration-300 ease hover:text-white hover:bg-cyan-800 border-2 text-cyan-800 "><i class="fa-solid fa-angles-right"></i></a></div></div>
              </div>
            </div>
          `,
    )
    .join("");
  assessList.innerHTML = cards;
}
