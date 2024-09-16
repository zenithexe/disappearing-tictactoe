import React from "react";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";

function NavBar() {
  return (
    <>
      <div className="fixed flex items-center justify-center px-4 h-[50px] top-0 bg-white w-full drop-shadow-xs">
        <div className="w-full flex justify-between items-center max-w-[700px]">
          <div className="flex gap-[2px]">
            <div className="h-8 w-8 flex justify-center items-center rounded-lg text-white border-gray-300 bg-gray-900 font-bold">
              X
            </div>
            <div className="h-8 w-8 flex justify-center items-center rounded-lg text-white border-gray-300 bg-gray-900 font-bold">
              O
            </div>
          </div>
          <Switch />
        </div>
      </div>
    </>
  );
}

export default NavBar;
