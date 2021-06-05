import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={19}
      height={50}
      viewBox="0 0 19 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.96 48H6.066c-3.484 0-5.944-3.343-4.842-6.581l12.932-38C14.852 1.377 16.803 0 19 0h-.04v48z"
        fill={props.color}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default SvgComponent;
