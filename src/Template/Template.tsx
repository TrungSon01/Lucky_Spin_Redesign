import { Outlet } from "react-router";
import Tabbar from "../Components/Tabbar/Tabbar";

export default function Template() {
  return (
    <Tabbar>
      <Outlet />
    </Tabbar>
  );
}
