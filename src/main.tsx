import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoadingBarContainer } from "react-top-loading-bar";
import { HowItWorksProvider } from "./context/HowItWorksContext.tsx";

const rootElement = document.getElementById("root");
createRoot(rootElement!).render(
  <StrictMode>
    <LoadingBarContainer>
      <HowItWorksProvider>
        <App />
      </HowItWorksProvider>
    </LoadingBarContainer>
  </StrictMode>
);
