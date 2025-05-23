import React from 'react'
import IconBtn from './IconBtn'

export const ConfirmationModal = ({modalData}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-richblack-900 bg-opacity-60 backdrop-blur-sm animate-fade-in">
      <div className="w-11/12 max-w-[500px] rounded-xl border border-richblack-700 bg-richblack-800 p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-scale-in">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold text-richblack-5">
              {modalData.text1}
            </p>
            <p className="text-richblack-200 text-base leading-7">
              {modalData.text2}
            </p>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            <button
              onClick={modalData?.btn2Handler}
              className="cursor-pointer rounded-lg bg-richblack-700 px-7 py-2.5 text-sm font-medium text-richblack-100 transition-all duration-200 hover:bg-richblack-600 hover:text-white"
            >
              {modalData?.btn2Text}
            </button>
            <button
              onClick={modalData?.btn1Handler}
              className="cursor-pointer rounded-lg bg-yellow-50 px-7 py-2.5 text-sm font-medium text-richblack-900 transition-all duration-200 hover:bg-yellow-25 hover:scale-105"
            >
              {modalData?.btn1Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
