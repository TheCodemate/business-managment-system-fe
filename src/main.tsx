import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./context/Provider.tsx";

import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes.tsx";
import { Login } from "./routes/Login.tsx";

import "./index.css";
import { Dashboard } from "./routes/Dashboard.tsx";
import { CustomersList } from "./routes/CustomersList.tsx";
import { Settings } from "./routes/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/customers-list",
            element: <CustomersList />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
