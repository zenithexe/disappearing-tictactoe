# Disappearing Tic-Tac-Toe
### The game of Strategy and Memory
Disappearing Tic-Tac-Toe is a twist on the classic Tic-Tac-Toe game, where tiles disappear after a set period, adding a layer of strategy and challenge. [Play Now!](https://disappearing-tictactoe.vercel.app/)

<img src="https://github.com/user-attachments/assets/798d43eb-8da8-4d58-bb56-83ee6bcea6f1" width="250" height="250"/>


### **Rules :**
1. Traditional Tic-Tac-Toe Rules
2. After the 8th Move, the oldest move on the board starts to disappear one-by-one with every move.
3. Whoever makes the winning line or doesn't run out of time wins.

----
It's a real-time multiplayer tic-tac-toe game, built using `React.js`, `Node.js` and `Websockets`. 

### Features
- Classic Tic-Tac-Toe mechanics with disappearing tiles.
- Player vs. Player mode.
- Realtime multiplayer
- Minimalistic and interactive UI.

## Installation

1. Clone the Repository : 
```
git clone https://github.com/zenithexe/disappearing-tictactoe.git
cd disappearing-tictactoe
```
2. Install Backend :
```
cd /server
npm i
```
3. Install Frontend `From Root Folder` :
```
cd /client 
npm i
```
4. Setup `.env`
- Inside `/client` folder
```
VITE_API_URL="http://localhost:8000"
```
- Inside `/server` folder
```
SERVER_PORT=8000
```
5. Run the Frontend and Backend Servers
 ```
npm run dev
```

----
**Deployment :** The front-end is hosted on `vercel`, whereas the WebSocket server is hosted on `glitch.com`.

