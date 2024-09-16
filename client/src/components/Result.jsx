import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Button } from "./ui/button";
import { Trophy } from "lucide-react";

function Result() {
  const { socket, winner, matchStatus, message } = useAppContext();

  return (
    <>
    {message && <div className="mt-4 font font-medium text-red-400">{message}</div>}
      {winner && (
        <div className="mt-2 flex flex-col justify-center items-center p-4 bg-white border rounded-lg shadow-md">
          <div className="flex justify-between items-center gap-2">
            <Trophy />
            <h1 className="font-bold font-mono text-2xl">
              {socket?.id == winner ? "You win" : "You Lose"}
            </h1>
          </div>
        </div>
      )}
      {matchStatus == "DRAW" && (
        <div className="mt-4 flex flex-col justify-center items-center p-4 bg-white border rounded-lg shadow-md">
          <div className="flex justify-between items-center gap-2">
            <Trophy />
            <h1 className="font-bold font-mono text-2xl">It's a Draw</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
