import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="relative mx-auto w-full max-w-4xl px-6 py-12 rounded-2xl bg-gradient-to-r from-richblack-800 to-richblack-900 shadow-[0_0_40px_#1a1a2e]">
      <p className="text-center text-lg md:text-2xl font-semibold leading-relaxed text-white">
        We are passionate about revolutionizing the way we learn. Our innovative platform{" "}
        <HighlightText text="combines technology" />{" "}
        <span className="text-caribbeangreen-200 font-bold">
          expertise
        </span>
        , and community to create an{" "}
        <span className="text-yellow-100 font-bold italic">
          unparalleled educational experience
        </span>.
      </p>
    </div>
  )
}

export default Quote
