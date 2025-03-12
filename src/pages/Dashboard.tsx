import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - FootieGate";
  }, []);

  return <div>Dashboard user</div>;
}

export default Dashboard;
