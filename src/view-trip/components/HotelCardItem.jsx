import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign } from 'lucide-react';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: hotel?.hotelName };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel?.hotelAddress}
      target="_blank"
    >
      <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transform hover:scale-105 hover:shadow-2xl transition-all duration-500">
        <div className="relative h-48 overflow-hidden">
          <img
            src={photoUrl ? photoUrl : '/placeholder.jpg'}
            alt={hotel.hotelName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
            <Star size={12} className="text-yellow-400 fill-current mr-1" />
            <span className="text-white text-xs">{hotel?.rating}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2">{hotel?.hotelName}</h3>
          <div className="flex items-start text-gray-300 text-sm mb-2">
            <MapPin size={12} className="mr-1 mt-0.5 flex-shrink-0" />
            <span>{hotel?.hotelAddress}</span>
          </div>
          <div className="flex items-center text-green-400 font-semibold">
            <DollarSign size={14} className="mr-1" />
            <span className="text-sm">{hotel?.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
