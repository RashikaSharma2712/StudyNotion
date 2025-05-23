import React from 'react'

//  span ki jagah yaha span tag ka prop  bana rahe hai
const HighlightText = ({text}) => {
  return (
    
    <span className='font-bold text-richblue-100'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText