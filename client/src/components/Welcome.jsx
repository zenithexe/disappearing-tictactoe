import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";

function StartPlayingDialog({ isDialogOpen, setIsDialogOpen }) {
  const { socket, setRoomId, setClientPlayer } = useAppContext();
  const [error, setError] = useState({
    error: false,
    message: "No Error.",
  });

  useEffect(() => {
    setError({
      error: false,
      message: "No Error.",
    });
  }, [isDialogOpen]);

  function handleCreateRoom(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const playerName = formData.get("playerName");
    const duration = formData.get("duration");

    if (!playerName || !duration) {
      setError({
        error: true,
        message: "Missing Field.",
      });
      return;
    }

    setClientPlayer({
      name: playerName,
      tag: "pX",
    });
    socket.emit("create-room", playerName, duration);
    setIsDialogOpen(false);
  }

  function handleJoinRoom(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roomId = formData.get("roomId");
    const playerName = formData.get("playerName");

    if (!playerName || !roomId) {
      setError({
        error: true,
        message: "Missing Field.",
      });
      return;
    }

    setRoomId(roomId);
    setClientPlayer({
      name: playerName,
      tag: "pO",
    });
    socket.emit("join-room", roomId, playerName);
    setIsDialogOpen(false);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-8">Start Playing</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-start">
          <DialogHeader>
            <DialogTitle>Start Game</DialogTitle>
            <DialogDescription>Join or Create a Room</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="join">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="join">Join Room</TabsTrigger>
              <TabsTrigger value="create">Create Room</TabsTrigger>
            </TabsList>
            <TabsContent value="join">
              <form
                className="space-y-4 flex flex-col justify-between"
                onSubmit={handleJoinRoom}
              >
                <div className=" space-y-4">
                  <div>
                    <Label htmlFor="roomId">Room Id</Label>
                    <Input
                      name="roomId"
                      id="roomId"
                      placeholder="Enter room code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerName">Your Name</Label>
                    <Input
                      name="playerName"
                      id="playerName"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                {error.error && (
                  <p className=" font-mono text-red-500"> {error.message}</p>
                )}
                <Button type="submit">Join Room</Button>
              </form>
            </TabsContent>
            <TabsContent value="create">
              <form
                className="space-y-4 flex flex-col justify-between"
                onSubmit={handleCreateRoom}
              >
                <div>
                  <Label htmlFor="playerName">Your Name</Label>
                  <Input
                    name="playerName"
                    id="playerName"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Game Duration</Label>
                  <Select name="duration" defaultValue="5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select game duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minutes</SelectItem>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {error.error && (
                  <p className=" font-mono text-red-500"> {error.message}</p>
                )}
                <Button type="submit">Create Room</Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Welcome() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <div className="p-10 rounded-xl border text-center shadow">
        <p className="font-mono font-semibold text-lg">Welcome to</p>
        <h1 className="font-bold text-3xl">Disappearing Tic-Tac-Toe</h1>
        <p className="mt-3 text-sm">
          A regular tic-tac-toe game, except after the 8th Move the oldest move
          disappears.
          <br />
          Whoever score three tiles in a line, wins! Good Luck :)
        </p>
        <div className="mt-10">
          <StartPlayingDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    </>
  );
}

export default Welcome;
