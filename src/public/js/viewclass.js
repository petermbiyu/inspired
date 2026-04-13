document.addEventListener("DOMContentLoaded", async () => {
  const classCard = document.getElementById("class-card");
  if (!classCard) return;
  try {
    const response = await fetch("/api/classes/tutor");
    const data = await response.json();
    if (data && data.success) {
      console.log(data);
      const cards = data.classes
        .map(
          (classData) => `
          <div
              class="relative w-80 h-60 p-4 my-8 bg-slate-50 rounded-[5px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.25)] shadow-gray-500/50"
            >
                 
              <h2 class="text-[1.2rem] font-semibold text-center">${classData.className.toUpperCase()}</h2>
         
              <div class="my-2 w-full text-[1rem]">
                <div class="italic">Level: ${classData.classLevel}</div>
                <div class="italic">Code: ${classData.classCode}</div>
                <div class="italic">Enrollment: ${classData.students.length}</div>
                <div class="italic">Date: ${new Date(classData.createdAt).toLocaleDateString()}</div>
              </div>

              <div class="w-full flex mt-3 items-center justify-center text-center text-white font-semibold gap-3 ">
                <a href="/academic/assessments/${classData._id}"  class="btn-create w-[40px] leading-[40px] h-[40px] rounded-full cursor-pointer transition-all duration-300 ease hover:text-white hover:bg-cyan-800 border-2 text-cyan-800 "><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
              </div>
              <button class="absolute top-4 text-red-800  right-4 id="delete-class"><i class="fa-regular fa-circle-xmark"></i><button>
              <button class="absolute top-4 text-green-800  right-12 id="edit-class"><i class="fa-regular fa-pen-to-square"></i><button>
            </div>
          `,
        )
        .join("");

      classCard.innerHTML = cards;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error: ", error.message);
  }
});
