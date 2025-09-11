import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
        <h2 className='text-3xl font-bold text-white mb-8 flex items-center'>
           <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Hotel Recommendations</span>
           <div className="ml-4 w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
        </h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5'>
            {trip?.tripData?.hotels?.map((hotel,index)=>(
                <HotelCardItem hotel={hotel} />
            ))}
        </div>
    
    </div>
  )
}

export default Hotels