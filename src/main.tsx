import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalProvider } from "./modules/global_provider/global_provider.tsx";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes.tsx";
import { Login } from "./routes/Login.tsx";
import { Dashboard } from "./routes/Dashboard.tsx";
import { Customers } from "./routes/Customers/Customers.tsx";
import { Settings } from "./routes/Settings.tsx";
import { Register } from "./routes/Register.tsx";
import { ResetPassword } from "./routes/ResetPassword.tsx";
import { ResetPasswordRequest } from "./routes/ResetPasswordRequest.tsx";

import App from "./App.tsx";
import { Products } from "./routes/Products.tsx";
import { ProductDetails } from "./routes/ProductDetails.tsx";
import { Order } from "./routes/Order.tsx";
import { RequestsRoute } from "./routes/RequestsRoute.tsx";
import { SupportTeamRequests } from "./routes/SupportTeamRequests.tsx/SupportTeamRequests.tsx";

import "./index.css";

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
          // {
          //   path: "/customers",
          //   element: <Customers />,
          // },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          // {
          //   path: "/products/:id",
          //   element: <ProductDetails />,
          // },
          // {
          //   path: "/order",
          //   element: <Order />,
          // },
          {
            path: "/requests",
            element: <RequestsRoute />,
          },
          {
            path: "/support-team-requests",
            element: <SupportTeamRequests />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Customers />,
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
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
