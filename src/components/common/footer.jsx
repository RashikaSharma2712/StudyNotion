
import React from 'react'
import { Link } from 'react-router-dom'
import { FooterLink2 as FooterLink } from '../../data/Footer-Link'
import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
import logo from '../../Asset/Logo/Logo-Full-Light.png'

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row lg:w-[42%] border-richblack-700">
          <div className="lg:w-[50%] flex flex-col gap-3 lg:border-r lg:border-richblack-700">
            <img src={logo} alt="" width={160} height={32} loading="lazy" />
            <h1 className="text-richblack-50 font-semibold text-[16px]">
              Empowering every student
            </h1>
            <p className="font-medium text-[14px] text-richblack-300">
              Transform your life with education
            </p>
            <div className="flex gap-3 mt-3">
              <FaFacebookF />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 lg:pl-7">
            <h1 className="text-richblack-50 font-semibold text-[16px]">
              Company
            </h1>
            <div className="flex flex-col gap-2 font-medium text-[14px]">
              <Link to="/about">About</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/affiliates">Affiliates</Link>
            </div>
            <div className="flex gap-3 mt-3">
              <FaFacebookF />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-[100%] lg:w-[58%] lg:justify-between flex-row justify-between mt-8 lg:mt-0">
          {FooterLink.map((ele, i) => {
            return (
              <div key={i} className="flex flex-col gap-3 lg:w-[33%]">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 font-medium text-[14px]">
                  {ele.links.map((link, index) => (
                    <Link
                      to={link.link}
                      key={index}
                      className="hover:text-richblack-50 transition-all duration-200"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-center text-richblack-400 py-8 border-t border-t-richblack-700">
        <p className="font-medium text-[14px]">
          Made with ❤️ Code and help from StudyNotion Team
        </p>
      </div>
    </div>
  )
}

export default Footer