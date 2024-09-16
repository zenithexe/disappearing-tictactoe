import React from "react";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { Circle, X } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function NavBar() {
  return (
    <>
      <div className="fixed flex items-center justify-center px-4 h-[50px] top-0 bg-white dark:bg-gray-900 w-full drop-shadow-xs">
        <div className="w-full py-2 flex justify-between items-center max-w-[700px] border-b-2 dark:border-gray-700">
          <div className="flex gap-[4px] ">
            <div className="h-8 w-8 flex justify-center items-center rounded-lg text-2xl font-bold font-mono text-white  bg-gray-900 dark:text-gray-900 dark:bg-white ">
              X
            </div>
            <div className="h-8 w-8 flex justify-center items-center rounded-lg text-2xl font-bold font-mono text-white  bg-gray-900 dark:text-gray-900 dark:bg-white">
              O
            </div>
          </div>
          <a
            href="https://github.com/zenithexe/ultimate-tictactoe"
            target="_blank"
          >
            <GitHubLogoIcon className="w-6 h-6 cursor-pointer" />
          </a>
          {/* <ThemeSwitch/> */}
        </div>
      </div>
    </>
  );
}

export default NavBar;
