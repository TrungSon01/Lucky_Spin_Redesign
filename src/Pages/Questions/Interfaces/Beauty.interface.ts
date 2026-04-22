import Foundation from "../../../images/Beauty/Foundation.jpg";
import Lipstick from "../../../images/Beauty/Lipstick.jpg";
import Mascara from "../../../images/Beauty/Mascara.jpg";
import Perfume from "../../../images/Beauty/Perfume.jpg";
import Skincare from "../../../images/Beauty/Skincare.jpg";
import Sunscreen from "../../../images/Beauty/Sunscreen.jpg";

export interface I_OPTION_BEAUTY_IMAGES {
  [key: string]: string;
  Foundation: string;
  Lipstick: string;
  Mascara: string;
  Perfume: string;
  Skincare: string;
  Sunscreen: string;
}

export const BEAUTY_IMAGE: I_OPTION_BEAUTY_IMAGES = {
  Foundation: Foundation,
  Lipstick: Lipstick,
  Mascara: Mascara,
  Perfume: Perfume,
  Skincare: Skincare,
  Sunscreen: Sunscreen,
};
