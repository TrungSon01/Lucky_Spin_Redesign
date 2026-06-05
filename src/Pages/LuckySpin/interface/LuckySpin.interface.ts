import Accessories from "../../../images/LuckySpin/Accessories.jpg";
import BabyClothing from "../../../images/LuckySpin/BabyClothing.jpg";
import Beauty from "../../../images/LuckySpin/Beauty.jpg";
import Electronic from "../../../images/LuckySpin/Electronic.jpg";
import Food from "../../../images/LuckySpin/Food.jpg";
import Jewelry from "../../../images/LuckySpin/Jewelry.jpg";
import ManClothing from "../../../images/LuckySpin/ManClothing.jpg";
import Random from "../../../images/LuckySpin/Random.jpg";
import Sport from "../../../images/LuckySpin/Sport.jpg";
import WomanClothing from "../../../images/LuckySpin/WomanClothing.jpg";
interface I_OPTION_LUCKYSPIN {
  id: number;
  label: string;
}
export interface I_QUESTION_LUCKYSPIN {
  question: string;
  options: I_OPTION_LUCKYSPIN[];
}

export interface I_OPTION_LUCKY_SPIN_IMAGES {
  [key: string]: string;
  Accessories: string;
  "Baby's Clothing": string;
  Beauty: string;
  Electronics: string;
  Food: string;
  Jewelry: string;
  "Men's Clothing": string;
  Random: string;
  Sports: string;
  "Women's Clothing": string;
}

export const LUCKY_SPIN_IMAGES: I_OPTION_LUCKY_SPIN_IMAGES = {
  Accessories: Accessories,
  "Baby's Clothing": BabyClothing,
  Beauty: Beauty,
  Electronics: Electronic,
  Food: Food,
  Jewelry: Jewelry,
  "Men's Clothing": ManClothing,
  Random: Random,
  Sports: Sport,
  "Women's Clothing": WomanClothing,
};
