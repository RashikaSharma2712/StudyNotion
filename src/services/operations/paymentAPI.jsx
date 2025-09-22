import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { studentEndpoints } from "../apis"
import axios from "axios"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Razorpay SDK loader
async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function buyCourse(courses, token, user, dispatch, navigate) {
  return async () => {
    const toastId = toast.loading("Initializing payment...")

    try {
      if (!token) {
        toast.error("Please login to continue")
        navigate("/login")
        return
      }
      dispatch(setPaymentLoading(true))

      // Load Razorpay SDK
      const razorpayLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
      if (!razorpayLoaded) {
        toast.error("Failed to load payment SDK. Please try again.")
        return
      }

      // Create order from backend
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYMENT_API,
        { courses },
        { Authorization: `Bearer ${token}` }
      )

      if (!orderResponse?.data?.success) {
        throw new Error(orderResponse?.data?.message || "Could not initiate order")
      }

      const { id: orderId, amount, currency } = orderResponse.data.data

      // Get Razorpay public key from backend
      const keyResp = await axios.get("http://localhost:4000/api/v1/payment/razorpay-key")
      const razorpayKey = keyResp?.data?.key
      if (!razorpayKey) {
        toast.error("Missing Razorpay key from server")
        return
      }
      const isTestKey = String(razorpayKey).startsWith("rzp_test_")
      console.log("Razorpay key mode:", isTestKey ? "TEST" : "LIVE", razorpayKey)
      if (isTestKey) {
        toast.success("Razorpay Test key detected")
      } else {
        toast.error("Razorpay Live key detected. Use test key for demo")
      }

      // Razorpay checkout options
      const options = {
        key: razorpayKey,
        currency,
        amount: `${amount}`,
        order_id: orderId,
        name: "StudyNotion",
        description: "Course Purchase",
        prefill: {
          name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
          email: user?.email || "",
          contact: user?.contactNumber || user?.additionalDetails?.contactNumber || "9999999999",
        },
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verificationResponse = await apiConnector(
              "POST",
              COURSE_VERIFY_API,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courses,
              },
              { Authorization: `Bearer ${token}` }
            )

            if (!verificationResponse?.data?.success) {
              toast.error("Payment verification failed")
              return
            }

            // Optional: Send success email
            try {
              await apiConnector(
                "POST",
                SEND_PAYMENT_SUCCESS_EMAIL_API,
                {
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  amount,
                },
                { Authorization: `Bearer ${token}` }
              )
            } catch (_) {}

            toast.success("Payment successful. You are enrolled!")
            dispatch(resetCart())
            navigate("/dashboard/enrolled-courses")
          } catch (err) {
            console.error("Verification error:", err)
            toast.error("Something went wrong after payment")
          }
        },
      }

      // ✅ Dev Mode shortcut (no Razorpay popup)
      if (process.env.REACT_APP_PAYMENT_DEV_MODE === "true") {
        try {
          const verificationResponse = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            { devPayment: true, courses },
            { Authorization: `Bearer ${token}` }
          )
          if (!verificationResponse?.data?.success) {
            toast.error("Dev payment verification failed")
            return
          }
          toast.success("Payment successful. You are enrolled!")
          dispatch(resetCart())
          navigate("/dashboard/enrolled-courses")
          return
        } catch (err) {
          console.error(err)
          toast.error("Dev payment failed")
          return
        }
      }

      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()

      // Handle payment failures
      paymentObject.on("payment.failed", function (response) {
        const err = response?.error || {}
        console.error("Razorpay payment failed:", err)
        toast.error(err?.description || err?.reason || "Payment failed. Please try again.")
      })
    } catch (error) {
      console.error("Payment init error:", error)
      toast.error(error?.message || "Unable to process payment")
    } finally {
      dispatch(setPaymentLoading(false))
      toast.dismiss(toastId)
    }
  }
}
