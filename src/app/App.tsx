import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
      <BottomNav />
    </>
  );
}