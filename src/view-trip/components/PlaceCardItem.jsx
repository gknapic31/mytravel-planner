import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] = useState();
  
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: place.placeName }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex gap-4 items-start hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
        
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt={place.placeName}
          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
        />

        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-1">{place.placeName}</h4>
          <p className="text-gray-300 text-sm mb-2">{place.placeDetails}</p>
          <div className="flex gap-4 text-sm text-gray-200">
            <div className="flex items-center gap-1">
              🕙 <span>{place.timeToTravel}</span>
            </div>
            <div className="flex items-center gap-1">
              🎟️ <span>{place.ticketPricing}</span>
            </div>
          </div>
          {/* <Button size="sm" className="mt-2"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem;
