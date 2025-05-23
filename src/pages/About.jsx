
import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../Asset/Image/aboutus1.webp"
import BannerImage2 from "../Asset/Image/aboutus2.webp"
import BannerImage3 from "../Asset/Image/aboutus3.webp"
import Quote from "../components/core/AboutPage.jsx/Quote"
import FoundingStory from "../Asset/Image/FoundingStory.png"
import StatsComponent from "../components/core/AboutPage.jsx/stats"
import { LearningGrid } from '../components/core/AboutPage.jsx/LearningGrid'
import ContactFormSection from '../components/core/AboutPage.jsx/ContactFormSection'
import Footer from "../components/common/footer"

const About = () => {
  return (
    <div className='mx-auto mt-24 w-full px-4 text-white'>
      
      {/* Container with max-width */}
      <div className='max-w-screen-xl mx-auto'>

        {/* Section 1 */}
<section className='space-y-16 mb-24'>
  <header className='text-center max-w-3xl mx-auto'>
    <h1 className='text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text'>
      Driving innovation in online Education for a <HighlightText text="Brighter Future" />
    </h1>
    <p className='mt-6 text-lg text-richblack-300'>
      StudyNotion is at the forefront of online learning innovation. We offer world-class courses, leverage futuristic technology, and nurture a strong learner community for a brighter tomorrow.
    </p>
  </header>

  <div className='flex flex-wrap justify-center gap-8'>
    <div className="group relative w-[280px] hover:scale-105 transition-transform duration-300">
      <img src={BannerImage1} alt="about1" className="rounded-2xl shadow-lg" />
      <div className="absolute inset-0 rounded-2xl group-hover:shadow-[0_0_25px_#9333ea] transition duration-300"></div>
    </div>

    <div className="group relative w-[280px] hover:scale-105 transition-transform duration-300">
      <img src={BannerImage2} alt="about2" className="rounded-2xl shadow-lg" />
      <div className="absolute inset-0 rounded-2xl group-hover:shadow-[0_0_25px_#f97316] transition duration-300"></div>
    </div>

    <div className="group relative w-[280px] hover:scale-105 transition-transform duration-300">
      <img src={BannerImage3} alt="about3" className="rounded-2xl shadow-lg" />
      <div className="absolute inset-0 rounded-2xl group-hover:shadow-[0_0_25px_#10b981] transition duration-300"></div>
    </div>
  </div>
</section>




        {/* Section 2 - Quote */}
        <section className='my-16'>
          <Quote />
        </section>

        {/* Section 3 - Founding Story */}
        
          {/* Section 3 - Founding Story */}
<section className='my-24 flex flex-col gap-20'>

{/* Founding Story */}
<div className='flex flex-col lg:flex-row items-center gap-12'>
  {/* Left Text Section */}
  <div className='flex-1 space-y-6'>
    <h2 className='text-4xl font-bold text-white leading-snug relative'>
      Our Founding Story
      <span className='block w-16 h-1 bg-yellow-400 mt-2 rounded-full'></span>
    </h2>

    <p className='text-richblack-300 text-lg'>
      Our e-learning platform was born from a shared dream — a dream to revolutionize education by making it accessible, flexible, and empowering. 
      Built by passionate educators, developers, and lifelong learners, StudyNotion breaks barriers with technology.
    </p>

    <p className='text-richblack-300 text-lg'>
      We believed knowledge shouldn't be limited by location or classroom walls. Through StudyNotion, we connect learners globally with a vibrant, tech-driven learning experience.
    </p>
  </div>

  {/* Right Image */}
  <div className='flex-1'>
    <img src={FoundingStory} alt='Founding Story' className='w-full rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition duration-300' />
  </div>
</div>

{/* Vision & Mission Cards */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

  <div className='bg-richblack-800 p-6 rounded-2xl shadow-lg hover:shadow-yellow-400/30 transition-shadow duration-300'>
    <h3 className='text-2xl font-semibold text-yellow-200 mb-3'>Our Vision</h3>
    <p className='text-richblack-300 text-lg'>
      We aim to transform how people learn by building an engaging, inclusive platform powered by modern tech — where curiosity leads, and innovation follows.
    </p>
  </div>

  <div className='bg-richblack-800 p-6 rounded-2xl shadow-lg hover:shadow-caribbeangreen-200/30 transition-shadow duration-300'>
    <h3 className='text-2xl font-semibold text-caribbeangreen-100 mb-3'>Our Mission</h3>
    <p className='text-richblack-300 text-lg'>
      Beyond just teaching, our mission is to nurture a global community of learners — through real-time collaboration, live classes, and opportunities to grow together.
    </p>
  </div>

</div>
</section>

        {/* Section 4 - Stats */}
        <section className='my-20'>
          <StatsComponent />
        </section>

        {/* Section 5 - Learning Grid */}
        <section className='my-20'>
          <div className='flex justify-center'>
            <LearningGrid />
          </div>
        </section>

        {/* Section 6 - Contact Form */}
        <section className='my-20'>
          <ContactFormSection />
        </section>

      </div>

      {/* Section 7 - Footer (Full width) */}
      <Footer />
    </div>
  )
}

export default About
