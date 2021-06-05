import * as React from 'react';
import Svg, {Defs, Circle, G, Use, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

function SvgComponent(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 33 33" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path
          d="M14.5 9v12m4-12v12"
          stroke={`${props.strokeColor}`}
          strokeWidth={2}
          strokeLinecap="square"
        />
      </G>
    </Svg>
  );
}

SvgComponent.defaultProps = {
  strokeColor: '#EB5F33',
};

export default SvgComponent;
