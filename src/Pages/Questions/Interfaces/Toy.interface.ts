import Dolls from "../../../images/Toy/Dolls.jpg";
import Education from "../../../images/Toy/Education.jpg";
import Figures from "../../../images/Toy/Figures.jpg";
import Digital from "../../../images/Toy/Digital.jpg";
import Fidget from "../../../images/Toy/Fidget.jpg";
import Lego from "../../../images/Toy/Lego.jpg";
export interface I_TOY_IMAGES {
  [key: string]: string;
  Dolls: string;
  Education: string;
  Figures: string;
  Digital: string;
  Fidget: string;
  Lego: string;
}

export const TOY_IMAGES: I_TOY_IMAGES = {
  Dolls: Dolls,
  Education: Education,
  Figures: Figures,
  Digital: Digital,
  Fidget: Fidget,
  Lego: Lego,
};
