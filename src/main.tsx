import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoadingBarContainer } from "react-top-loading-bar";
import { HowItWorksProvider } from "./context/HowItWorksContext.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
const rootElement = document.getElementById("root");


createRoot(rootElement!).render(
  <StrictMode>
    <Provider store={store}>
      <LoadingBarContainer>
        <HowItWorksProvider>
          <App />
        </HowItWorksProvider>
      </LoadingBarContainer>
    </Provider>
  </StrictMode>
);
