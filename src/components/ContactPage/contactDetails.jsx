import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-6 lg:p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
      <h2 className="text-2xl font-bold text-richblack-5 mb-4">Contact Information</h2>
      <p className="text-richblack-200 mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
      
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-2 p-4 rounded-lg bg-richblack-700 hover:bg-richblack-600 transition-all duration-200"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-50 text-richblack-900">
                <Icon size={20} />
              </div>
              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>
            <p className="text-richblack-200 pl-9">{ele?.description}</p>
            <p className="text-yellow-50 pl-9 font-medium">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails