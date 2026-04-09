import { MinisRouter } from "@shopify/shop-minis-react";
import { Route, Routes } from "react-router";
import Homepage from "./Pages/Home/Homepage";
import Template from "./Template/Template";
import Mainpage from "./Pages/Main/Mainpage";
import Account from "./Pages/Account/Account";

export function App() {
  return (
    <div>
      <MinisRouter viewTransitions>
        <Routes>
          {/* Route Thường */}
          <Route path="/" element={<Homepage />} />

          {/* Route có template ở đây */}
          <Route element={<Template />}>
            <Route path="/main" element={<Mainpage />} />
            <Route path="/account" element={<Account></Account>} />
          </Route>
        </Routes>
      </MinisRouter>{" "}
    </div>
  );
}
