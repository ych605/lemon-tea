import { StrictMode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "./pages/MainPage.tsx";
import "./index.css";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </NextUIProvider>
  </StrictMode>
);

export default App;
