import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import NavBar from "./components/NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ThemeContextProvider>
      <NavBar/>
      <App />
    </ThemeContextProvider>
  </AppContextProvider>
);
