import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { endpoints } from "../../services/apis"

const { CONTACT_US_API } = endpoints

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      const response = await apiConnector("POST", CONTACT_US_API, data)
      
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      toast.success("Message sent successfully!")
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "+91",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form className="flex flex-col gap-7 text-richblack-5" onSubmit={handleSubmit(submitContactForm)}>
      <h2 className="text-2xl font-bold text-richblack-5 mb-2">Send us a Message</h2>
      <p className="text-richblack-200 mb-6">We'll get back to you as soon as possible.</p>
      
      {/* First & Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-sm font-medium text-richblack-5">First Name</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="form-style focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-pink-200 text-sm">Please enter your first name.</span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-sm font-medium text-richblack-5">Last Name</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="form-style focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className="text-pink-200 text-sm">Please enter your last name.</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-richblack-5">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="form-style focus:outline-none focus:ring-2 focus:ring-yellow-50"
          {...register("email", { 
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && (
          <span className="text-pink-200 text-sm">
            {errors.email.type === "required" 
              ? "Please enter your email address"
              : errors.email.message}
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-sm font-medium text-richblack-5">Phone Number</label>

        <div className="flex gap-5">
          {/* Country Code */}
          <div className="flex w-[81px] flex-col gap-2">
            <select
              className="form-style px-1 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          {/* Number */}
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="number"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter your Phone Number." },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="text-pink-200 text-sm">{errors.phoneNo.message}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-richblack-5">Message</label>
        <textarea
          id="message"
          rows="7"
          placeholder="Enter your message here"
          className="form-style resize-none focus:outline-none focus:ring-2 focus:ring-yellow-50"
          {...register("message", { 
            required: true,
            minLength: { value: 10, message: "Message must be at least 10 characters long" }
          })}
        />
        {errors.message && (
          <span className="text-pink-200 text-sm">
            {errors.message.type === "required" 
              ? "Please enter your message"
              : errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${!loading && "transition-all duration-200 hover:scale-95 hover:shadow-none hover:bg-yellow-100"} 
        disabled:bg-richblack-500 sm:text-[16px]`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-richblack-900 border-t-transparent"></div>
            <span>Sending...</span>
          </div>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  )
}

export default ContactUsForm
