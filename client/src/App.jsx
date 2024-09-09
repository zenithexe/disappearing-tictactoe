import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from "socket.io-client";

function App() {
  const [count, setCount] = useState(0)

  const socket = io("http://localhost:8000");

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("This Client is connected.");
    });
  },[]);

  return (
    <>
      <p>Hello</p>
    </>
  )
}

export default App
