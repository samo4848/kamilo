import * as React from "react";
import { Path, Svg, SvgAst } from "react-native-svg";
const InfoBackOneSvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M6.15 11.693a.778.778 0 0 1-.548-.225L.732 6.652a.781.781 0 0 1 0-1.11L5.602.725A.781.781 0 1 1 6.7 1.836l-4.308 4.26 4.308 4.26a.781.781 0 0 1-.55 1.337Z"
    />
    <Path
      fill="#000"
      d="M12.202 13.856h-1.17a.781.781 0 1 1 0-1.562h1.17c1.508 0 2.736-1.215 2.736-2.708s-1.228-2.708-2.736-2.708H1.532a.781.781 0 0 1 0-1.563h10.67c2.37 0 4.298 1.916 4.298 4.27 0 2.355-1.928 4.271-4.298 4.271Z"
    />
  </Svg>
);
export default InfoBackOneSvgComponent;
