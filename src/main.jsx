import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/z42/",
    element: <App />,
    children: [
      {
        path: "/z42/",
        element: <HomeScreen />,
      },
      {
        path: "/z42/about",
        element: <AboutScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
