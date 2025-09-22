import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"

const { CATALOGPAGEDATA_API } = catalogData

export const getCatalogaPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    })
    console.log("CATALOGPAGEDATA_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Category Page Details")
    }
    result = response?.data
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}
