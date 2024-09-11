import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Button } from "./ui/button";
import { Trophy } from "lucide-react";

function Result() {
  const { socket, winner } = useAppContext();

  return (
    <>
      {winner && (
        <div className="mt-4 flex flex-col justify-center items-center p-4 bg-white border rounded-lg shadow-md">
            <div className="flex justify-between items-center gap-2">
                <Trophy/>
              <h1 className="font-bold font-mono text-2xl">{socket?.id== winner ? "You win": "You Lose"}</h1>
            </div>
        </div>
      )}
    </>
  );
}

export default Result;
