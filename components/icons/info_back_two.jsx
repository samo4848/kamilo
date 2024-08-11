import * as React from "react";
import { Path, Svg } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M10.85 11.693c.205 0 .402-.08.548-.225l4.87-4.816a.78.78 0 0 0 0-1.11L11.398.725a.781.781 0 1 0-1.098 1.11l4.308 4.26-4.308 4.26a.78.78 0 0 0 .55 1.337Z"
    />
    <Path
      fill="#000"
      d="M4.798 13.856h1.17a.781.781 0 1 0 0-1.562h-1.17c-1.508 0-2.736-1.215-2.736-2.708S3.29 6.878 4.799 6.878h10.67a.781.781 0 1 0 0-1.563H4.799C2.428 5.315.5 7.231.5 9.585c0 2.355 1.928 4.271 4.298 4.271Z"
    />
  </Svg>
);
export default SvgComponent;
