import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={15} height={2} viewBox="0 0 15 2" {...props}>
      <Path
        d="M1.5 1h12"
        stroke={`${props.strokeColor}`}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="square"
      />
    </Svg>
  );
}

SvgComponent.defaultProps = {
  strokeColor: '#EB5F33',
};

export default SvgComponent;
