import { MinisRouter } from "@shopify/shop-minis-react";
import { Route, Routes } from "react-router";
import Homepage from "./Pages/Home/Homepage";
import Mainpage from "./Pages/Main/Mainpage";
import Account from "./Pages/Account/Account";
import Beauty from "./Pages/Questions/Beauty/Beauty";

export function App() {
  return (
    <div>
      <MinisRouter viewTransitions>
        <Routes>
          {/* Route Thường */}
          <Route path="/" element={<Homepage />} />

          {/* Route có template ở đây */}
          <Route path="/main" element={<Mainpage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/questions/beauty" element={<Beauty />} />
        </Routes>
      </MinisRouter>{" "}
    </div>
  );
}
