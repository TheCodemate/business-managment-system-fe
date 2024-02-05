import { Outlet } from "react-router-dom";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";

import "./App.css";

const Layout = () => {
  return (
    <div className="flex flex-col w-full h-full sm:flex-row">
      <MobileMenu>
        <MobileMenu.Nav>
          <MobileMenu.NavLink to="" text="Dashboard" />
          <MobileMenu.NavLink to="customers" text="Customers" />
          <MobileMenu.NavLink to="products" text="Products" />
          <MobileMenu.NavLink to="settings" text="Settings" />
        </MobileMenu.Nav>
      </MobileMenu>
      <Sidebar>
        <Sidebar.Nav basis={"full"}>
          <Sidebar.NavLink to="" text="Dashboard" />
          <Sidebar.NavLink to="customers" text="Customers" />
          <Sidebar.NavLink to="products" text="Products" />
          <Sidebar.NavLink to="order" text="Shopping Cart" />
        </Sidebar.Nav>
        <Sidebar.Nav basis={"2/12"}>
          <Sidebar.NavLink to="settings" text="Settings" />
        </Sidebar.Nav>
      </Sidebar>
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="relative w-screen h-screen">
      <Layout />
    </div>
  );
}

export default App;
