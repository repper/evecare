import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={34}
      viewBox="0 0 16 33"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 14V0h11.09c2.963 0 5.168 4.685 3.91 8L5 30c-.666 1.756-3.431 3-5 3V14z"
        fill="#E8C5D8"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default SvgComponent;
