import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { FiInfo } from "react-icons/fi"; 
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialog(false);
      localStorage.reload();
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    localStorage.reload();
  };

  return (
    <nav className="fixed w-full z-20 top-0 left-0 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 transition-all duration-300">

      <a href='/'>
        <img src='/logo.png' alt='Logo' className="h-10 w-auto"/>
      </a>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <a href="/create-trip">
              <button className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                + Create Trip
              </button>
            </a>
            <a href="/my-trips">
              <button className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                My Trips
              </button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-10 w-10 rounded-full border-2 border-white/30 hover:scale-105 transition-transform"
                  alt="User avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <h2
                  className="cursor-pointer text-center text-red-500 font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <button
            onClick={() => setOpenDialog(true)}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <FiInfo size={20} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-100 text-sm">
            <p className="font-semibold">Autor: Gabrijela Knapić</p>
            <p className="text-gray-600 dark:text-gray-300">
              Završni rad: Razvoj web aplikacije za planiranje putovanja
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Naziv sveučilišta: Sveučilište Jurja Dobrile u Puli
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Naziv fakulteta: Fakultet informatike
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <b>Mentor:</b> prof. dr. sc. Tihomir Orehovački
            </p>
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

export default Header;
