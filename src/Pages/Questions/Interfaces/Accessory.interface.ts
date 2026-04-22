import handbag from "../../../images/Accessory/handbag.jpg";
import hair_clip from "../../../images/Accessory/hair_clip.jpg";
import necklace from "../../../images/Accessory/necklace.jpg";
import ring from "../../../images/Accessory/ring.jpg";
import bracelet from "../../../images/Accessory/bracelet.jpg";
import earrings from "../../../images/Accessory/earrings.jpg";

export interface I_ACCESSORY_IMAGES {
  [key: string]: string;
  Handbag: string;
  "Hair Clip": string;
  Necklace: string;
  Ring: string;
  Bracelet: string;
  Earrings: string;
}

export const ACCESSORY_IMAGES: I_ACCESSORY_IMAGES = {
  Handbag: handbag,
  "Hair Clip": hair_clip,
  Necklace: necklace,
  Ring: ring,
  Bracelet: bracelet,
  Earrings: earrings,
};
