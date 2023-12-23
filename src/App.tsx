import { Sidebar } from "./components/Sidebar/Sidebar";

import "./App.css";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";

function App() {
  return (
    <div className=" w-screen h-screen">
      <MobileMenu>
        <MobileMenu.Nav>
          <MobileMenu.NavLink to="dashboard" text="Dashboard" />
          <MobileMenu.NavLink to="customers-list" text="Customer list" />
          <MobileMenu.NavLink to="settings" text="Settings" />
        </MobileMenu.Nav>
      </MobileMenu>
      <Sidebar>
        <Sidebar.Nav basis={"full"}>
          <Sidebar.NavLink to="dashboard" text="Dashboard" />
          <Sidebar.NavLink to="customers-list" text="Customer list" />
        </Sidebar.Nav>
        <Sidebar.Nav basis={"1/12"}>
          <Sidebar.NavLink to="settings" text="Settings" />
        </Sidebar.Nav>
      </Sidebar>
    </div>
  );
}

export default App;
