import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList, AI_PROMPT } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Heart } from "lucide-react";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelers, setSelectedTravelers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimateElements(true), 200);
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays || formData.noOfDays < 1) {
      toast("Please fill all details correctly");
      return;
    }

    if (formData.noOfDays > 10) {
      toast("Maximum number of days is 10");
      return;
    }

    setLoading(true);
    toast('Please wait... We are working on it...');
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
    localStorage.reload();
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: { Authorization: `Bearer ${tokenInfo?.access_token}`, Accept: 'Application/json' }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 mt-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            One Step Closer to Your Ideal Getaway
          </h1>
          <div className="flex justify-center space-x-2 mb-6">
            <MapPin className="text-cyan-400 animate-bounce" size={28} />
            <Heart className="text-pink-400 animate-pulse" size={28} />
          </div>
          <p className="text-xl text-gray-300">
            All we need are a few details — the rest is a custom-made adventure.
          </p>
        </div>

        <div className="space-y-10">
          <div className={`transform transition-all duration-700 ${animateElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <label className="block text-white text-xl font-semibold mb-4">
              Pick your next destination
            </label>
            <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          />
          </div>

          <div className={`transform transition-all duration-700 delay-100 ${animateElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <label className="block text-white text-xl font-semibold mb-4">
              How long will your adventure last?
            </label>
            <Input
              placeholder="Ex. 2"
              type="number"
              max="10"
              min="1"
              value={formData?.noOfDays || ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= 10) handleInputChange("noOfDays", value);
              }}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>

          <div className={`transform transition-all duration-700 delay-200 ${animateElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <label className="block text-white text-xl font-semibold mb-6">
              What's your travel budget?
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { handleInputChange("budget", item.title); setSelectedBudget(item.title); }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedBudget === item.title
                      ? 'border-cyan-400 bg-white/20 backdrop-blur-sm'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm hover:border-white/40'
                  }`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                  {selectedBudget === item.title && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={`transform transition-all duration-700 delay-300 ${animateElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <label className="block text-white text-xl font-semibold mb-6">
              Who's coming with you?
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {SelectTravelesList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { handleInputChange("traveler", item.people); setSelectedTravelers(item.people); }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedTravelers === item.people
                      ? 'border-cyan-400 bg-white/20 backdrop-blur-sm'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm hover:border-white/40'
                  }`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                  {selectedTravelers === item.people && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              onClick={OnGenerateTrip}
              disabled={loading}
              className="group px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xl font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-300"
            >
              {loading
                ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin mx-auto" />
                : <span className="flex items-center justify-center">
                    Generate Trip
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={24} />
                  </span>
              }
            </Button>
          </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
    </div>
  );
}
export default CreateTrip;