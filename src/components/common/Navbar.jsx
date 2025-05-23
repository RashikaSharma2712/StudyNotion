import logo from "../../Asset/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from "../../data/Navbar-Link";
import { useSelector } from 'react-redux';
import { FaCartArrowDown } from "react-icons/fa";
import ProfileDropdown from "../Auth/ProfileDropdown";

import { IoIosArrowDropdownCircle } from "react-icons/io";

const subLinks = [
  {
    title: 'Python',
    link: "/catalog/Python"
  },
  {
    title: 'Web Development',
    link: "/catalog/web-development"
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/" className='hover:scale-105 transition-all duration-200'>
          <img src={logo} width={160} height={42} loading='lazy' alt="logoImage" />
        </Link>

        {/* NavLinks */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className='relative flex items-center gap-2 group'>
                    <p className='flex items-center gap-2 text-richblack-25 hover:text-yellow-5 transition-all duration-200'>
                      {link.title}
                      <IoIosArrowDropdownCircle className='text-richblack-25 group-hover:text-yellow-5 transition-all duration-200' />
                    </p>
                    <div className='invisible absolute left-0 top-full mt-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] shadow-[0_0_10px_rgba(0,0,0,0.2)] z-50'>
                      {subLinks.map((sublink, idx) => (
                        <Link to={sublink.link} key={idx} className='hover:text-richblack-900 hover:bg-richblack-50 p-2 rounded-md transition-all duration-200 hover:translate-x-2 hover:shadow-sm'>
                          {sublink.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  link?.path && (
                    <Link to={link.path}>
                      <p className={`${matchRoute(link.path) ? "text-yellow-5" : "text-richblack-25"} hover:text-yellow-5 transition-all duration-200 hover:scale-105`}>
                        {link.title}
                      </p>
                    </Link>
                  )
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className='flex gap-x-4 items-center'>
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className='relative text-white text-lg hover:text-yellow-5 transition-all duration-200 hover:scale-110'>
              <FaCartArrowDown />
              {totalItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-yellow-5 text-black text-xs font-bold px-1 rounded-full animate-pulse'>
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {(!token || !user) && (
            <Link to="/login">
              <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700 hover:text-yellow-5 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]'>
                Log In
              </button>
            </Link>
          )}

          {(!token || !user) && (
            <Link to="/signup">
              <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-700 hover:text-yellow-5 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]'>
                Sign Up
              </button>
            </Link>
          )}

          {token && user && <ProfileDropdown/>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
