import React from 'react'
import ReactStars from 'react-stars'

const RatingStars = ({ Review_Count, Star_Size = 20 }) => {
  return (
    <div className="flex">
      <ReactStars
        count={5}
        size={Star_Size}
        value={Review_Count}
        edit={false}
        activeColor="#ffd700"
        emptyIcon={<i className="far fa-star"></i>}
        fullIcon={<i className="fa fa-star"></i>}
      />
    </div>
  )
}

export default RatingStars

