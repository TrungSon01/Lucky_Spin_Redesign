import Shirt from "../../../images/Clothing/Shirt.jpg";
import Dress from "../../../images/Clothing/Dress.jpg";
import Pant from "../../../images/Clothing/Pant.jpg";
import Short from "../../../images/Clothing/Short.jpg";
import Skirt from "../../../images/Clothing/Skirt.jpg";
import Pajama from "../../../images/Clothing/Pajama.jpg";

export interface I_CLOTHING_IMAGES {
  [key: string]: string;
  Shirt: string;
  Pant: string;
  Short: string;
  Pajama: string;
  Skirt: string;
  Dress: string;
}

export const CLOTHING_IMAGES: I_CLOTHING_IMAGES = {
  Shirt: Shirt,
  Pant: Pant,
  Short: Short,
  Pajama: Skirt,
  Skirt: Pajama,
  Dress: Dress,
};
