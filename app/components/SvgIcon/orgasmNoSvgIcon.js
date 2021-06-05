import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function OrgasmNoSvgIcon(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
      <G fill="#EC6233" fillRule="nonzero">
        <Circle cx={16.622} cy={10.946} r={2.838} />
        <Circle cx={8.514} cy={10.946} r={2.838} />
        <Path d="M6.486 18.775l11.768 2.306.395-1.748L6.88 17.027z" />
        <Path d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z" />
      </G>
    </Svg>
  );
}

export default OrgasmNoSvgIcon;
