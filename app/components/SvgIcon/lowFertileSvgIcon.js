import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={8} height={9} viewBox="0 0 8 9" {...props}>
      <G fillRule="nonzero" fill={`${props.fillColor}`}>
        <Path d="M4.218 0c.493.445 1.804 1.76 2.337 3.553a6.882 6.882 0 00-2.378 3.05A6.789 6.789 0 002 3.708C2.339 2.47 3.08 1.224 4.218 0z" />
        <Path d="M1.986 6.356C.67 4.72.45 2.894 1.327.925 2.34 1.72 5.793 4.77 4.203 8.234a8.32 8.32 0 01-2.217-1.878z" />
        <Path d="M6.37 6.356a8.336 8.336 0 01-2.217 1.878C2.563 4.772 6.016 1.72 7.03.924c.877 1.97.657 3.796-.659 5.432z" />
      </G>
    </Svg>
  );
}

SvgComponent.defaultProps = {
  fillColor: '#EB5F33',
};

export default SvgComponent;
