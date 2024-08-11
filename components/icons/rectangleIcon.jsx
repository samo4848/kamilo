import * as React from "react";
import { Path, Svg } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path fill="#000" d="M0 0h28v28H0z" />
  </Svg>
);
export default SvgComponent;
