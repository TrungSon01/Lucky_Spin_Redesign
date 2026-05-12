import Whey from "../../../images/Food/Whey.jpg";
import Milk from "../../../images/Food/Milk.jpg";
import Coffee from "../../../images/Food/Coffee.jpg";
import Tea from "../../../images/Food/Tea.jpg";
import Juice from "../../../images/Food/Juice.jpg";
import Snacking from "../../../images/Food/Snacking.jpg";
export interface I_FOODDRINK_IMAGES {
  [key: string]: string;
  Whey: string;
  Tea: string;
  Coffee: string;
  Milk: string;
  Snacking: string;
  Juice: string;
}

export const FOODDRINK_IMAGES: I_FOODDRINK_IMAGES = {
  Whey: Whey,
  Tea: Tea,
  Coffee: Coffee,
  Milk: Milk,
  Snacking: Snacking,
  Juice: Juice,
};
