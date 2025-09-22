import React, { useEffect, useState } from "react"
import { getAllReviews } from "../../../services/operations/ratingAPI"
import RatingStars from "../../common/RatingStars"

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    (async () => {
      const data = await getAllReviews()
      setReviews(data)
    })()
  }, [])

  if (!reviews?.length) {
    return null
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.slice(0, 6).map((rev) => (
        <div key={rev._id} className="rounded-lg bg-richblack-700 p-4">
          <div className="flex items-center gap-3">
            <img
              src={rev?.user?.image}
              alt={`${rev?.user?.firstName} ${rev?.user?.lastName}`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-richblack-5 text-sm font-semibold">
                {rev?.user?.firstName} {rev?.user?.lastName}
              </p>
              <p className="text-xs text-richblack-200">{rev?.course?.courseName}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <RatingStars Review_Count={rev?.rating || 0} Star_Size={18} />
            <span className="text-xs text-richblack-200">{rev?.rating?.toFixed?.(1) || rev?.rating}</span>
          </div>
          <p className="mt-2 text-sm text-richblack-25 line-clamp-4">{rev?.review}</p>
        </div>
      ))}
    </div>
  )
}


