import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={10} height={9} viewBox="0 0 10 9" {...props}>
      <G fillRule="nonzero" fill={`${props.fillColor}`}>
        <Path d="M5.218 0c.493.445 1.804 1.76 2.337 3.553a6.882 6.882 0 00-2.378 3.05A6.789 6.789 0 003 3.708C3.339 2.47 4.08 1.224 5.218 0z" />
        <Path d="M2.323 7.456C.718 6.102.153 4.352.64 2.251c1.146.588 5.117 2.924 4.217 6.626a8.32 8.32 0 01-2.535-1.42z" />
        <Path d="M8.002 7.463a8.336 8.336 0 01-2.56 1.375C4.609 5.122 8.62 2.856 9.778 2.286c.448 2.11-.147 3.85-1.774 5.177h-.001z" />
      </G>
    </Svg>
  );
}

SvgComponent.defaultProps = {
  fillColor: '#EB5F33',
};

export default SvgComponent;
