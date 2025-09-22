import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { ratingsEndpoints } from "../apis"

const { REVIEWS_DETAILS_API } = ratingsEndpoints

export const getAllReviews = async () => {
  try {
    const response = await apiConnector("GET", REVIEWS_DETAILS_API)
    if (!response?.data?.success) {
      throw new Error("Could not fetch reviews")
    }
    return response?.data?.data || []
  } catch (error) {
    console.log("GET REVIEWS API ERROR............", error)
    toast.error("Unable to load reviews")
    return []
  }
}


