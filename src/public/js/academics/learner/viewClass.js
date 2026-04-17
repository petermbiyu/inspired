document.addEventListener("DOMContentLoaded", async () => {
  const learnerCard = document.getElementById("learner-card");
  console.log("learner card loaded");

  if (!learnerCard) return;
  try {
    const response = await fetch("/api/classes/learner", {
      credentials: "include",
    });
    const data = await response.json();
    if (data && data.success) {
      console.log(data);
      const cards = data.classes
        .map(
          (classData) => `
          <div
              class="relative w-60 h-max p-4 my-8 bg-slate-50 rounded-[5px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.25)] shadow-gray-500/50"
            >
                 
              <h2 class="text-[1.2rem] font-semibold text-center">${classData.className.toUpperCase()}</h2>
         
              <div class="my-2 w-full text-[1rem] flex justify-between items-center">
                <div class="font-semibold italic">Level: ${classData.classLevel}</div>
                <div><a href="/learner/assessments/${classData.id}"  class="btn-create cursor-pointer transition-all duration-300 ease hover:text-white hover:bg-cyan-800 p-1 rounded-full text-cyan-800 "><i class="fa-solid fa-angles-right"></i></a></div>
                
              </div>
            </div>
          `,
        )
        .join("");

      learnerCard.innerHTML = cards;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error: ", error.message);
  }
});
