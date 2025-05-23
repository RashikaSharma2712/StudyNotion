import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../Asset/Image/Know_your_progress.png"
import compare_with_others from "../../../Asset/Image/Compare_with_others.png"
import plan_your_lessons from "../../../Asset/Image/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"
 

const LearningLanguageSection =() => {
    return ( 
        <div className='mt-[150px] mb-32 '>
            <div className='flex flex-col gap-5 items-center'>
                <div className='text-4xl font-semibold  text-center'>
                    Your Swiss Knife for
                    <HighlightText text = {"learning any language"}/>
                                    </div>
            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multiple language easy . with 20+ languages realistic voice-over,
                progess tracking  , custom schedule and more.

            </div>
            <div className='flex flex-row items-center justify-center mt-5 '>
                <img 
                src={know_your_progress}
                alt="KnowYourProgressImage"
                className='object-contain  -mr-32'
                />
                 <img 
                src={compare_with_others}
                alt="CompareWithOthersImage"
                className='object-contain'
                />
                 <img 
                src={plan_your_lessons}
                alt="PlanWithLessonImage"
                className='object-contain -ml-40'
                />
                </div>
                <div className='w-fit'>
                    <CTAButton  active={true} linkto ={"/signup"}>
                    <div  >
                        Learn More
                    </div>

                    </CTAButton>
                </div>

            </div>

        </div>
    )
}
export default LearningLanguageSection