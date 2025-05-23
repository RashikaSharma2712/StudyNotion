import React from "react"

import Footer from "../components/common/footer"
import ContactDetails from "../components/ContactPage/contactDetails"
import ContactForm from "../components/ContactPage/ContactForm"


const Contact = () => {
  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-richblack-800 py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-50 via-yellow-200 to-yellow-50 text-transparent bg-clip-text">
            Get in Touch
          </h1>
          <p className="text-richblack-200 text-lg">We'd love to hear from you! Fill out the form and our team will get back to you soon.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto mt-12 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <div className="rounded-xl bg-richblack-800 p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
            <ContactForm />
          </div>
        </div>
      </div>
    
      <Footer />
    </div>
  )
}

export default Contact