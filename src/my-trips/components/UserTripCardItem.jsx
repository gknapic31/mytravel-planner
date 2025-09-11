import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Heart, Share2 } from 'lucide-react';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer">
        
        {/* Image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img
            src={photoUrl ? photoUrl : '/placeholder.jpg'}
            alt={trip?.userSelection?.location?.label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-2xl font-bold text-white mb-2">{trip?.userSelection?.location?.label}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-cyan-300">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm">{trip?.userSelection.noOfDays} Days Trip</span>
            </div>
            <div className="flex items-center text-purple-300">
              <DollarSign size={16} className="mr-2" />
              <span className="text-sm">{trip?.userSelection?.budget} Budget</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
