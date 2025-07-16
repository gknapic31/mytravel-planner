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


function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogin = () => {
    // Hardcoded user data
    const mockUser = {
      name: "Test User",
      email: "test.user@example.com",
      picture: "https://via.placeholder.com/150",
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setOpenDialog(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 nav-bg-color'>
      <a href='/'>
        <img src='/logo1.svg' alt='Logo' />
      </a>
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt='User avatar' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={handleLogout}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className='font-bold text-lg mt-7'>Sign In</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={handleLogin}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className='h-7 w-7' />
                Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Header;
