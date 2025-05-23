
import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-[360px] lg:w-[30%] h-[300px] cursor-pointer rounded-xl transition-all duration-300 transform hover:-translate-y-2
        ${isActive ? "bg-white shadow-[0_8px_20px_rgba(255,255,255,0.3)]" : "bg-richblack-800 hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"}`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Content */}
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-4">
        <div className={`text-[20px] font-bold ${isActive ? "text-richblack-900" : "text-richblack-25"}`}>
          {cardData?.heading}
        </div>
        <div className="text-richblack-400 text-[15px] leading-[1.5]">
          {cardData?.description}
        </div>
      </div>

      {/* Bottom Content */}
      <div
        className={`flex justify-between items-center px-6 py-3 font-medium text-[15px] 
        ${isActive ? "text-blue-500" : "text-richblack-300"}`}
      >
        {/* Level */}
        <div className="flex items-center gap-2">
          <HiUsers size={20} />
          <p>{cardData?.level}</p>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-2">
          <ImTree size={18} />
          <p>{cardData?.lessionNumber} Lesson{cardData?.lessionNumber > 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
