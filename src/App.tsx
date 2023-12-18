import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";

import "./App.css";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen sm:flex-row">
      <Sidebar>
        <Sidebar.Nav grow={"2"}>
          <Sidebar.MenuItem
            text="Dashboard"
            icon={
              <DashboardIcon sx={{ color: "#6225AF", width: 36, height: 36 }} />
            }
          />
          <Sidebar.MenuItem
            text="Customer list"
            icon={
              <GroupsIcon sx={{ color: "#6225AF", width: 36, height: 36 }} />
            }
          />
        </Sidebar.Nav>

        <Sidebar.Nav grow={"1"}>
          <Sidebar.MenuItem
            text="Settings"
            icon={
              <SettingsIcon sx={{ color: "#6225AF", width: 36, height: 36 }} />
            }
          />
        </Sidebar.Nav>
      </Sidebar>
      <Outlet />
    </div>
  );
}

export default App;
