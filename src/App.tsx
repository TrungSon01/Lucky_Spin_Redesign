import { MinisRouter } from "@shopify/shop-minis-react";
import { Route, Routes } from "react-router";
import Homepage from "./Pages/Home/Homepage";
import Mainpage from "./Pages/Main/Mainpage";
import Account from "./Pages/Account/Account";
import Beauty from "./Pages/Questions/Beauty/Beauty";
import BeautyResult from "./Pages/Questions/Beauty/BeautyResult/BeautyResult";
import Electronic from "./Pages/Questions/Electronic/Electronic";
import Accessory from "./Pages/Questions/Accessory/Accessory";
import Clothing from "./Pages/Questions/Clothing/Clothing";
import HomeEssentials from "./Pages/Questions/HomeEssentials/HomeEssentials";

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

          {/* Beauty path  */}
          <Route path="/questions/beauty" element={<Beauty />} />
          <Route path="/beauty/result" element={<BeautyResult />} />

          {/* Electronic path  */}
          <Route path="/questions/electronics" element={<Electronic />} />

          {/* Accessory path  */}
          <Route path="/questions/accessories" element={<Accessory />} />

          <Route path="/questions/clothing" element={<Clothing />} />
          <Route
            path="/questions/home-essentials"
            element={<HomeEssentials />}
          />
        </Routes>
      </MinisRouter>
    </div>
  );
}
