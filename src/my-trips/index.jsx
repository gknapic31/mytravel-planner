import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import { Plus } from 'lucide-react';

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigation('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach(doc => {
      setUserTrips(prevVal => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12  mt-20">
          <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            My Trips
          </h1>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          {userTrips?.length > 0
            ? userTrips.map((trip, index) => <UserTripCardItem trip={trip} key={index} />)
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-56 w-full bg-slate-200 animate-pulse rounded-3xl"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default MyTrips;
