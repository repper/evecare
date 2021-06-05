import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
      <G transform="translate(.5)" fill="#35809C" fillRule="nonzero">
        <Path d="M15 15.455c-3.766 0-6.818 2.849-6.818 6.363h13.636c0-3.514-3.052-6.363-6.818-6.363zm-4.55 4.598c.743-1.662 2.503-2.833 4.55-2.833 2.047 0 3.807 1.17 4.55 2.833h-9.1z" />
        <Circle cx={10} cy={10.909} r={2.727} />
        <Circle cx={20} cy={10.909} r={2.727} />
        <Path d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
