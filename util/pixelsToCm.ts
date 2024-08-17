import { PixelRatio } from "react-native";

const pixelsToCm = (pixels: number) => {
  const dpi = PixelRatio.get(); // Get the device's DPI
  const inches = pixels / dpi; // Convert pixels to inches
  const cm = Math.round(inches * 2.54) / 100; // Convert inches to centimeters
  return cm;
};
export { pixelsToCm };
