import React from 'react'
import ContactUsForm from "../../../components/ContactPage/ContactUsForm"

const ContactFormSection = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-richblack-5">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-50 mb-2">Get In Touch</h1>
        <p className="text-lg text-richblack-200">
          We'd love to hear from you! Fill out the form and our team will get back to you soon.
        </p>
      </div>

      {/* Form */}
      <div className="bg-richblack-800 shadow-lg rounded-xl p-8 md:p-12 w-full max-w-3xl mx-auto">
        <ContactUsForm />
      </div>
      
    </div>
  )
}

export default ContactFormSection
