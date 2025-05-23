import React, { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from "../HomePage/courseCard";

const tabsName = ["Free", "New To Coding", "Most Popular", "Skills Paths", "Career Paths"];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        if (result.length > 0 && result[0].courses.length > 0) {
            setCourses(result[0].courses);
            setCurrentCard(result[0].courses[0].heading);
        }
    }

    return (
        <div>
            <div className='text-4xl font-semibold text-center'>
                Unlock the <HighlightText text={"Power of Code"} />
            </div>
            <p className='text-center text-richblack-300 text-medium mt-3'>
                Learn to build anything you can imagine
            </p>

            {/* ✅ Fixed Tabs Section */}
            <div className='mt-5 flex flex-wrap justify-center gap-2 rounded-full bg-richblack-800 mb-5 px-2 py-2 w-fit mx-auto border border-richblack-100'>
                {tabsName.map((element, index) => (
                    <div
                        key={index}
                        className={`text-[14px] px-4 py-2 rounded-full cursor-pointer transition-all duration-200
                            ${currentTab === element
                                ? "bg-richblack-900 text-richblack-5 font-medium"
                                : "text-richblack-200"}
                            hover:bg-richblack-900 hover:text-richblack-5`}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>

            <div className='flex flex-wrap justify-center gap-8 mt-[50px] px-4'>
                {courses.map((element, index) => (
                    <CourseCard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                ))}
            </div>
        </div>
    );
}

export default ExploreMore;
