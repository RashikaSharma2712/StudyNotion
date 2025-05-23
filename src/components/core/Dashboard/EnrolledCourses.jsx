import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar'

export const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch (error) {
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Enrolled Courses</h1>
            
            {!enrolledCourses ? (
                <div className="flex h-[200px] items-center justify-center">
                    <div className="text-xl text-richblack-100">Loading...</div>
                </div>
            ) : !enrolledCourses.length ? (
                <div className="flex h-[200px] items-center justify-center">
                    <p className="text-xl text-richblack-100">You have not enrolled in any Course yet</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="grid grid-cols-3 gap-4 rounded-lg bg-richblack-800 p-4 text-richblack-5">
                        <p className="text-lg font-medium">Course Name</p>
                        <p className="text-lg font-medium">Duration</p>
                        <p className="text-lg font-medium">Progress</p>
                    </div>

                    {/* Course Cards */}
                    <div className="flex flex-col gap-6">
                        {enrolledCourses.map((course, index) => (
                            <div key={index} className="flex flex-col gap-6 rounded-lg border border-richblack-700 bg-richblack-800 p-6">
                                <div className="flex flex-col gap-6 sm:flex-row">
                                    <img 
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-[148px] w-[220px] rounded-lg object-cover"
                                    />
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-lg font-medium text-richblack-5">{course.courseName}</p>
                                            <p className="text-sm text-richblack-300 line-clamp-2">{course.courseDescription}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 text-richblack-300">
                                                <span className="text-lg">⏱️</span>
                                                <span>{course?.totalDuration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-richblack-300">Progress: {course.processPercentage || 0}%</p>
                                        <p className="text-sm text-richblack-300">{course.processPercentage || 0}% Complete</p>
                                    </div>
                                    <ProgressBar
                                        completed={course.processPercentage || 0}
                                        height="8px"
                                        isLabelVisible={false}
                                        bgColor="#E2C044"
                                        baseBgColor="#2C333F"
                                        borderRadius="4px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
