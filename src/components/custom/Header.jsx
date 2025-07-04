import React from "react";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 nav-bg-color">
      <a href="/">
        <img src="/logo1.svg" />
      </a>
      <div>
        <Button className="btn-white">Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
