import { Outlet } from "react-router-dom";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";

import "./App.css";

const Layout = () => {
  return (
    <div className=" flex flex-col w-full h-full sm:flex-row mt-24 sm:mt-0">
      <MobileMenu>
        <MobileMenu.Nav>
          <MobileMenu.NavLink to="" text="Dashboard" />
          <MobileMenu.NavLink to="customers-list" text="Customer list" />
          <MobileMenu.NavLink to="settings" text="Settings" />
        </MobileMenu.Nav>
      </MobileMenu>
      <Sidebar>
        <Sidebar.Nav basis={"full"}>
          <Sidebar.NavLink to="" text="Dashboard" />
          <Sidebar.NavLink to="customers-list" text="Customer list" />
          <Sidebar.NavLink
            to="reset-password/$2b$10$GX.kQI58sIURXTze1UziD.SSDx3y0NgnCHelx2KUuxbdBAJGN1Sv2"
            text="Customer list"
          />
        </Sidebar.Nav>
        <Sidebar.Nav basis={"1/12"}>
          <Sidebar.NavLink to="settings" text="Settings" />
        </Sidebar.Nav>
      </Sidebar>
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className=" w-screen h-screen">
      <Layout />
    </div>
  );
}

export default App;
