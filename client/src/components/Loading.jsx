import React from "react";

function Loading() {
  return (
    <>
      <div className="flex justify-center items-center space-x-3 py-2 px-3 rounded-md bg-gray-200 shadow-sm">
        <div className="w-15">
          <div className="flex space-x-2 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="font-medium">Waiting for Player (1/2)</div>
      </div>
    </>
  );
}

export default Loading;
