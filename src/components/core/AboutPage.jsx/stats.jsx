import React from 'react'

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className="bg-richblack-800 py-12 mt-10">
      <div className="text-white w-11/12 max-w-maxContent mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 text-center">
          {
            Stats.map((data, index) => (
              <div key={index} className="min-w-[120px]">
                <h1 className="text-3xl md:text-4xl font-bold text-caribbeangreen-100 drop-shadow-md">
                  {data.count}
                </h1>
                <h2 className="text-base md:text-lg font-medium mt-2 text-richblack-100">
                  {data.label}
                </h2>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default StatsComponent
