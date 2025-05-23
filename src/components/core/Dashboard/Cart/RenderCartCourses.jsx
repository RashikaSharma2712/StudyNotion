import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiStarSFill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import ReactStars from 'react-stars';

export const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-1 flex-col">
            {
                cart.map((course, index) => (
                    <div key={index} className="flex flex-col gap-6 border-b border-richblack-700 py-6">
                        <div className="flex flex-col gap-6 sm:flex-row">
                            <img 
                                src={course?.thumbnail}
                                alt={course?.courseName}
                                className="h-[148px] w-[220px] rounded-lg object-cover"
                            />
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col gap-1">
                                    <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                                    <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-100">4.8</span>
                                        <ReactStars
                                            count={5}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<RiStarSFill />}
                                            fullIcon={<RiStarSFill />}
                                        />
                                        <span className="text-richblack-400">
                                            {course?.ratingAndReview?.length} Ratings
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => dispatch(removeFromCart(course._id))}
                                        className="flex items-center gap-2 rounded-lg bg-richblack-700 px-4 py-2 text-sm font-medium text-richblack-100 transition-all duration-200 hover:bg-richblack-600 hover:text-white"
                                    >
                                        <RiDeleteBin5Line className="text-lg" />
                                        <span>Remove</span>
                                    </button>
                                    <p className="text-2xl font-semibold text-yellow-50">
                                        ₹{course?.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
