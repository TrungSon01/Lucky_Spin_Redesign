import Laptop from "../../../images/Electronic/Laptop.jpg";
import Smartphone from "../../../images/Electronic/Smartphone.jpg";
import Tablet from "../../../images/Electronic/Tablet.jpg";
import Smartwatch from "../../../images/Electronic/Smartwatch.jpg";
import Headphones from "../../../images/Electronic/Headphone.jpg";
import Camera from "../../../images/Electronic/Camera.jpg";

export interface I_ELECTRONIC_IMAGES {
  [key: string]: string;
  Laptop: string;
  Smartphone: string;
  Tablet: string;
  Smartwatch: string;
  Headphones: string;
  Camera: string;
}

export const ELECTRONIC_IMAGES: I_ELECTRONIC_IMAGES = {
  Laptop: Laptop,
  Smartphone: Smartphone,
  Tablet: Tablet,
  Smartwatch: Smartwatch,
  Headphones: Headphones,
  Camera: Camera,
};
