import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./pages/AppLayout";
import ErrorLayout from "./pages/ErrorLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import BestestFetch from "./components/BestestFetch";
import BetterFetch from "./components/BetterFetch";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bestestfetch",
        element: <BestestFetch />,
      },
      {
        path: "/betterfetch",
        element: <BetterFetch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
