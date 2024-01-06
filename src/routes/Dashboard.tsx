import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const { state } = useLocation();

  return <h1>Dashboard</h1>;
};
