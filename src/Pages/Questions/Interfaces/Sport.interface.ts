import Football from "../../../images/Sport/Football.jpg";
import Basketball from "../../../images/Sport/Basketball.jpg";
import Tennis from "../../../images/Sport/Tennis.jpg";
import Swimming from "../../../images/Sport/Swimming.jpg";
import Running from "../../../images/Sport/Running.jpg";
import Pickleball from "../../../images/Sport/Pickleball.jpg";
export interface I_SPORT_IMAGES {
  [key: string]: string;
  Football: string;
  Basketball: string;
  Tennis: string;
  Swimming: string;
  Running: string;
  Pickleball: string;
}

export const SPORT_IMAGES: I_SPORT_IMAGES = {
  Football: Football,
  Basketball: Basketball,
  Tennis: Tennis,
  Swimming: Swimming,
  Running: Running,
  Pickleball: Pickleball,
};
