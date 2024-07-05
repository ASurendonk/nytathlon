import React from "react";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { ThemeSelectionProvider } from "./context/themeContext";

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeSelectionProvider>
        <App />
      </ThemeSelectionProvider>
    </React.StrictMode>,
  );
}
