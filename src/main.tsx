import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "./context/Provider.tsx";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes.tsx";
import { Login } from "./routes/Login.tsx";
import { Dashboard } from "./routes/Dashboard.tsx";
import { CustomersList } from "./routes/CustomersList.tsx";
import { Settings } from "./routes/Settings.tsx";
import { Register } from "./routes/Register.tsx";
import { ResetPassword } from "./routes/ResetPassword.tsx";
import { ResetPasswordRequest } from "./routes/ResetPasswordRequest.tsx";

import "./index.css";
import App from "./App.tsx";

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
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password-request/",
    element: <ResetPasswordRequest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
