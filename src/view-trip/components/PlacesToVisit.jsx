import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div  className='max-w-7xl mx-auto px-6 py-12'>
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">Places to Visit</span>
            <div className="ml-4 w-12 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
          </h2>
        <div className="space-y-10 relative"> 
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500"></div>

            {trip.tripData?.itinerary.map((item,index)=>(
                <div className="relative flex items-start space-x-6" >
                    <h2 className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 ${
                      index % 2 === 0
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>{item.day}</h2>
                    
                    <div className="flex-1">
                      <div className='"bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300'>
                        {item.plan.map((place,index)=>(
                                <div className='mb-6 last:mb-0'>
                                    <h2 className='font-medium text-sm text-orange-400'>{place.time}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                        ))}
                        </div>

                    </div>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit