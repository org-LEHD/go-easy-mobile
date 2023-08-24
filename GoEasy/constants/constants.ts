import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const WIDTH = width;
export const HEIGHT = height;
export const CARD_HEIGHT = height * 0.15;
export const CARD_WIDTH = width * 0.85;
export const SPACING = width * 0.05;
export const FLEX_HEIGHT = HEIGHT >= 900;
