import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/paymentAPI'

export const RenderTotalAmount = () => {
    const {total, cart} = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        if (!courses.length) return;
        dispatch(buyCourse(courses, token, user, dispatch, navigate))
    }

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-richblack-700 bg-richblack-800 p-6">
            <p className="text-xl font-medium text-richblack-5">Total:</p>
            <p className="text-3xl font-semibold text-yellow-50">₹ {total}</p>
            <button 
                onClick={handleBuyCourse}
                className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-center text-base font-medium text-richblack-900 transition-all duration-200 hover:bg-yellow-100"
            >
                Buy Now
            </button>
        </div>
    );
}
