import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiConnector } from '../services/apiconnector'
import { courseEndpoints } from '../services/apis'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import VideoDetails from '../components/core/ViewCourse/VideoDetails'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import { ConfirmationModal } from '../components/common/ConfirmationModal'
import { setEntireCourseData, setCourseSectionData, setTotalNoOfLectures } from "../slices/viewCourseSlice"
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../utils/constants'
import { addToCart } from '../slices/cartSlice'
import { buyCourse } from '../services/operations/paymentAPI'

const ViewCourse = () => {
  const [courseViewData, setCourseViewData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { courseId, sectionId, subSectionId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // Test: Log the current Redux state
  const viewCourseState = useSelector((state) => state.viewCourse)
  console.log("ViewCourse - Current viewCourse state:", viewCourseState)

  const handleBuyCourse = () => {
    if (!user) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to buy this course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
      return
    }

    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }

    // Directly initiate payment for this course
    if (courseId) {
      dispatch(buyCourse([courseId], token, user, dispatch, navigate))
    }
  }

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true)
      try {
        const response = await apiConnector(
          "POST",
          courseEndpoints.COURSE_DETAILS_API,
          { courseId },
          {
            Authorization: `Bearer ${token}`,
          }
        )
        console.log("Course Details API Response:", response)
        console.log("Course Details Data:", response.data.data)
        console.log("Course Details Object:", response.data.data?.courseDetails)
        console.log("Course Content:", response.data.data?.courseDetails?.courseContent)
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        
        const courseData = response.data.data.courseDetails
        setCourseViewData(courseData)
        dispatch(setEntireCourseData(courseData))
        
        // Test: Log the state after dispatching
        console.log("After dispatching setEntireCourseData")
        
        // Set course section data and total lectures
        if (courseData?.courseContent) {
          console.log("Setting course section data:", courseData.courseContent)
          dispatch(setCourseSectionData(courseData.courseContent))
          
          // Test: Log the state after dispatching course section data
          console.log("After dispatching setCourseSectionData")
          
          // Calculate total number of lectures
          const totalLectures = courseData.courseContent.reduce((total, section) => {
            return total + (section.subSection?.length || 0)
          }, 0)
          console.log("Total lectures calculated:", totalLectures)
          dispatch(setTotalNoOfLectures(totalLectures))
          
          // If we're on the basic course route and there are sections, redirect to first section
          if (!sectionId && !subSectionId && courseData.courseContent.length > 0) {
            const firstSection = courseData.courseContent[0]
            if (firstSection.subSection && firstSection.subSection.length > 0) {
              const firstSubSection = firstSection.subSection[0]
              navigate(`/view-course/${courseId}/section/${firstSection._id}/sub-section/${firstSubSection._id}`)
            }
          }
        } else {
          console.warn("No courseContent found in response")
        }
      } catch (error) {
        console.log("Course Details API Error:", error)
        setConfirmationModal({
          text1: "Could not load course",
          text2: error.message,
          btn1Text: "Retry",
          btn2Text: "Cancel",
          btn1Handler: () => getCourseDetails(),
          btn2Handler: () => setConfirmationModal(null),
        })
      }
      setLoading(false)
    }

    if (courseId) {
      getCourseDetails()
    }
  }, [courseId, token, dispatch, sectionId, subSectionId, navigate])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!courseViewData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <p className="text-2xl text-richblack-5">Course not found</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <VideoDetails />
            <CourseDetailsCard
              course={courseViewData}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default ViewCourse
