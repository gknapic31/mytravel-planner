import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { Calendar, DollarSign, Users } from 'lucide-react';

function InfoSection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
      <div className="relative h-[340px] w-full overflow-hidden rounded-xl mt-20">
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          alt={trip?.userSelection?.location?.label}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            {trip?.userSelection?.location?.label}
          </h1>

          <div className="flex space-x-4 sm:space-x-6">
            <div className="flex items-center text-cyan-300 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar size={16} className="mr-2" />
              <span>{trip?.userSelection?.noOfDays} Day{trip?.userSelection?.noOfDays > 1 ? 's' : ''}</span>
            </div>

            <div className="flex items-center text-yellow-300 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <DollarSign size={16} className="mr-2" />
              <span>{trip?.userSelection?.budget} Budget</span>
            </div>

            <div className="flex items-center text-pink-300 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users size={16} className="mr-2" />
              <span>{trip?.userSelection?.traveler} Person{trip?.userSelection?.traveler > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InfoSection
