import { MinisRouter } from "@shopify/shop-minis-react";
import { Route, Routes } from "react-router";
import Homepage from "./Pages/Home/Homepage";
import Mainpage from "./Pages/Main/Mainpage";
import Account from "./Pages/Account/Account";
import Beauty from "./Pages/Questions/Beauty/Beauty";
import BeautyResult from "./Pages/Questions/Beauty/BeautyResult/BeautyResult";
import Electronic from "./Pages/Questions/Electronic/Electronic";
import ElectronicResult from "./Pages/Questions/Electronic/ElectronicResult/ElectronicResult";
import Accessory from "./Pages/Questions/Accessory/Accessory";
import AccessoryResult from "./Pages/Questions/Accessory/AccessoryResult/AccessoryResult";
import Clothing from "./Pages/Questions/Clothing/Clothing";
import ClothingResult from "./Pages/Questions/Clothing/ClothingResult/ClothingResult";
import HomeEssentials from "./Pages/Questions/HomeEssentials/HomeEssentials";
import HomeEssentialsResult from "./Pages/Questions/HomeEssentials/HomeEssentialsResult/HomeEssentialsResult";

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
          <Route path="/electronic/result" element={<ElectronicResult />} />

          {/* Accessory path  */}
          <Route path="/questions/accessories" element={<Accessory />} />
          <Route path="/accessory/result" element={<AccessoryResult />} />

          {/* Clothing path  */}
          <Route path="/questions/clothing" element={<Clothing />} />
          <Route path="/clothing/result" element={<ClothingResult />} />

          {/* HomeEssentials path  */}
          <Route
            path="/questions/home-essentials"
            element={<HomeEssentials />}
          />
          <Route
            path="/home-essentials/result"
            element={<HomeEssentialsResult />}
          />
        </Routes>
      </MinisRouter>
    </div>
  );
}
