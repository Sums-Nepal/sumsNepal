import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoadingBarContainer } from "react-top-loading-bar";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { Provider } from "react-redux";
import { HowItWorksProvider } from "./context/HowItWorksContext.tsx";
import { store } from "./app/store.ts";

const rootElement = document.getElementById("root");

createRoot(rootElement!).render(
  <StrictMode>
    <Provider store={store}>
      <LoadingBarContainer>
        <ThemeProvider>
          <HowItWorksProvider>
            <App />
          </HowItWorksProvider>
        </ThemeProvider>
      </LoadingBarContainer>
    </Provider>
  </StrictMode>
);
