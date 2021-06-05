import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={50}
      viewBox="0 0 18 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 0h12.892c3.484 0 5.944 3.343 4.842 6.581l-12.931 38C4.107 46.623 2.156 48-.041 48H0V0z"
        fill={props.color}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default SvgComponent;
