import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global-styles.css";
import Home from "./templates/Home/Index";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);
