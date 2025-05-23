import { useState, useEffect } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { login } from "../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password, rememberMe } = formData

  // Load saved credentials if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail")
    const savedPassword = localStorage.getItem("rememberedPassword")
    if (savedEmail && savedPassword) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      }))
    }
  }, [])

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // Validate email
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    // Handle remember me
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email)
      localStorage.setItem("rememberedPassword", password)
    } else {
      localStorage.removeItem("rememberedEmail")
      localStorage.removeItem("rememberedPassword")
    }

    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <div className="mt-2 flex items-center justify-between">
          <label className="flex items-center gap-2 text-richblack-200">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleOnChange}
              className="h-4 w-4 rounded border-richblack-500 bg-richblack-700 text-yellow-50 focus:ring-0"
            />
            <span className="text-sm">Remember me</span>
          </label>
          <Link to="/forgot-password">
            <p className="text-xs text-blue-100 hover:text-blue-50 transition-all duration-200">
              Forgot Password
            </p>
          </Link>
        </div>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm