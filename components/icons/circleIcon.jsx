import * as React from "react";
import { Rect, Svg } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Rect width={30} height={30} fill="#000" rx={15} />
  </Svg>
);
export default SvgComponent;
