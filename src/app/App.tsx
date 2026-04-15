import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
        <Toaster />
    </AppProvider>
    
  );
}