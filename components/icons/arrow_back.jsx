import * as React from "react";
import { Path, Svg } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="m3.55 9 6.35 6.35c.25.25.37.542.362.875a1.246 1.246 0 0 1-.387.875 1.2 1.2 0 0 1-.875.375 1.2 1.2 0 0 1-.875-.375l-6.7-6.675c-.2-.2-.35-.425-.45-.675-.1-.25-.15-.5-.15-.75s.05-.5.15-.75c.1-.25.25-.475.45-.675l6.7-6.7c.25-.25.546-.37.887-.362C9.354.52 9.65.65 9.9.9s.375.542.375.875a1.2 1.2 0 0 1-.375.875L3.55 9Z"
    />
  </Svg>
);
export default SvgComponent;
