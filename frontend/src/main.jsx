import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/AllPath";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/Context";
import "./index.css";
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <UserProvider>
    <RouterProvider router={router} />
    <Toaster />
  </UserProvider>
);
