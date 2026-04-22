import Appliances from "../../../images/HomeEssentials/Appliances.jpg";
import Bedding from "../../../images/HomeEssentials/Bedding.jpg";
import Cleaning_Supplies from "../../../images/HomeEssentials/Cleaning_Supplies.jpg";
import Home_Decor from "../../../images/HomeEssentials/Home_Decor.jpg";
import Kitchenware from "../../../images/HomeEssentials/Kitchenware.jpg";
import Storage_Organization from "../../../images/HomeEssentials/Storage_Organization.jpg";

export interface I_HOME_ESSENTIALS_IMAGES {
  [key: string]: string;
  Appliances: string;
  Bedding: string;
  "Cleaning Supplies": string;
  "Home Decor": string;
  Kitchenware: string;
  "Storage Organization": string;
}

export const HOME_ESSENTIALS_IMAGES: I_HOME_ESSENTIALS_IMAGES = {
  Appliances: Appliances,
  Bedding: Bedding,
  "Cleaning Supplies": Cleaning_Supplies,
  "Home Decor": Home_Decor,
  Kitchenware: Kitchenware,
  "Storage Organization": Storage_Organization,
};
