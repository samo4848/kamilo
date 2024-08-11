import * as React from "react";
import { ClipPath, Defs, G, Path, Svg } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={12}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M11.429 4.929H7.786a.214.214 0 0 1-.215-.215V1.071a1.071 1.071 0 0 0-2.142 0v3.643a.214.214 0 0 1-.215.215H1.571a1.071 1.071 0 0 0 0 2.142h3.643c.119 0 .215.096.215.215v3.643a1.071 1.071 0 0 0 2.142 0V7.286c0-.119.096-.215.215-.215h3.643a1.071 1.071 0 0 0 0-2.142Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h12v12H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
