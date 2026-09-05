import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";

function AppLayout() {
  return (
    <div className="app-layout">
      <Drawer />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;