import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path
          d="M16.639 21.474c0 .823-.67 1.493-1.493 1.493-.823 0-1.494-.67-1.494-1.493v-1.786h2.987v1.786zM11.922 14.006l1.326-1.326-1.732-1.731 1.732-1.732-1.326-1.326-1.731 1.732L8.459 7.89 7.134 9.217l1.731 1.732-1.731 1.731 1.325 1.326 1.732-1.732zM21.54 7.891l-1.73 1.732-1.732-1.732-1.326 1.326 1.732 1.732-1.732 1.731 1.326 1.326 1.731-1.732 1.732 1.732 1.325-1.326-1.731-1.731 1.731-1.732z"
          fill="#35809C"
          fillRule="nonzero"
        />
        <Path
          d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z"
          fill="#35809C"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
