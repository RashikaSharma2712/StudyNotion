import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      if (!imageFile) {
        toast.error("Please select an image first")
        return
      }
      
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData))
        .then(() => {
          setLoading(false)
          setImageFile(null)
          setPreviewSource(null)
        })
        .catch((error) => {
          console.log("ERROR MESSAGE - ", error.message)
          setLoading(false)
        })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-lg bg-richblack-700 py-2.5 px-7 text-sm font-medium text-richblack-100 transition-all duration-200 hover:bg-richblack-600 hover:text-white"
              >
                Select
              </button>
              <button
                onClick={handleFileUpload}
                disabled={loading || !imageFile}
                className="cursor-pointer rounded-lg bg-yellow-50 py-2.5 px-7 text-sm font-medium text-richblack-900 transition-all duration-200 hover:bg-yellow-25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Upload"}
                {!loading && <FiUpload className="ml-2 inline-block text-lg" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}