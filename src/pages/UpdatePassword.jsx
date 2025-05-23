
import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";import { BiArrowBack } from 'react-icons/bi';
import { resetPassword } from '../services/operations/authAPI';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location= useLocation();

    const [formData , setFormData]= useState({
        password :'',
        confirmPassword :'',
    })
    const [showPassword , setShowPassword] =useState(false);
    const [showConfirmPassword , setShowConfirmPassword] =useState(false);
    const {loading} = useSelector((state) => state.auth);

    const [password , confirmPassword] = formData;
    const handleOnChange = (e) =>{
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault ();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token )); // this function calls backend

    }
  return (
    <div className='text-yellow
    '>
        {
            loading ? (
                <div>
                    Loading........
                </div>
            ):(

                <div>
                    <h1> Choose new Password </h1>
                    <p>
                        Almost done . Enter your new password and you'r all set!!!
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>
                                New Password<sup>*</sup>
                            </p>
                            <input>
                            required
                            type = {showPassword ? "text" : "password"}
                            name='password'
                            value ={password}
                            onChange ={handleOnChange}
                            placeholder= 'Password'
                            </input>
                            <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword?
                                    <FaEyeSlash fontSize={24} />
                                    :
                                    <FaRegEye fontSize={24} />
                                }
                            </span>
                        </label>



                        <label>
                            <p>
                                Confirm  New Password<sup>*</sup>
                            </p>
                            <input>
                            required
                            type = {showConfirmPassword ? "text" : "password"}
                            name='Confirm password'
                            value ={confirmPassword}
                            onChange ={handleOnChange}
                            placeholder ='confirmPassword'
                            </input>
                            <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showPassword?
                                    <FaEyeSlash fontSize={24} />
                                    :
                                    <FaRegEye fontSize={24} />
                                }
                            </span>
                        </label>
                        <button type = 'submit'>
                            Reset Password
                        </button>
                    </form>
                     <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
                 </div>
            )
        }
      
    </div>
  )
}

export default UpdatePassword
