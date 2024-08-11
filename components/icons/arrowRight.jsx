import * as React from "react";
import { Path, Svg } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m22.207 7.793-7-7a1 1 0 0 0-1.414 1.414L19.086 7.5H1.5a1 1 0 0 0 0 2h17.586l-5.293 5.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414Z"
    />
  </Svg>
);
export default SvgComponent;
