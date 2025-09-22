import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  
  const viewCourseState = useSelector((state) => state.viewCourse)
  console.log("VideoDetails - viewCourse state:", viewCourseState)
  
  const { courseSectionData = [], courseEntireData = null, completedLectures = [] } =
    viewCourseState || {}

  console.log("VideoDetails - courseSectionData:", courseSectionData)
  console.log("VideoDetails - courseEntireData:", courseEntireData)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        if (!courseSectionData?.length || !courseEntireData) return
  
        if (!courseId || !sectionId || !subSectionId) {
          navigate(`/dashboard/enrolled-courses`)
          return
        }
  
        const section = courseSectionData.find(
          (sec) => sec._id === sectionId
        )
  
        if (!section || !section.subSection?.length) {
          console.warn("Section or subsection not found.")
          return
        }
  
        const subSection = section.subSection.find(
          (sub) => sub._id === subSectionId
        )
  
        if (!subSection) {
          console.warn("Subsection not found.")
          return
        }
  
        setVideoData(subSection)
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      } catch (err) {
        console.error("Error in loading video data:", err)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])
  

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    if (!courseSectionData?.length) return false
    
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return false

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return false

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    if (!courseSectionData?.length) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx + 1
        ]?._id
      if (nextSubSectionId) {
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
        )
      }
    } else {
      const nextSection = courseSectionData[currentSectionIndx + 1]
      if (nextSection?.subSection?.length) {
        const nextSectionId = nextSection._id
        const nextSubSectionId = nextSection.subSection[0]._id
        navigate(
          `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
        )
      }
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    if (!courseSectionData?.length) return false

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return false

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return false

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    if (!courseSectionData?.length) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx - 1
        ]?._id
      if (prevSubSectionId) {
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
        )
      }
    } else {
      const prevSection = courseSectionData[currentSectionIndx - 1]
      if (prevSection?.subSection?.length) {
        const prevSectionId = prevSection._id
        const prevSubSectionLength = prevSection.subSection.length
        const prevSubSectionId = prevSection.subSection[
          prevSubSectionLength - 1
        ]._id
        navigate(
          `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
        )
      }
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {!courseSectionData?.length ? (
        <div className="flex h-96 items-center justify-center">
          <p className="text-richblack-400">Loading video content...</p>
        </div>
      ) : !videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
// video