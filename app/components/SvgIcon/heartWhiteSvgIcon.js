import * as React from 'react';
import Svg, {Defs, Path, Use} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function HeartWhiteSvgIcon(props) {
  return (
    <Svg width={34} height={32} viewBox="0 0 34 32" {...props}>
      <Defs>
        <Path
          d="M32 10.146h-.016C31.9 4.78 27.918 0 23.001 0 20.156 0 17.65 1.626 16 4.013 14.35 1.626 11.844 0 9 0 4.081 0 .1 4.781.015 10.146H0c0 .033.005.063.005.095 0 .025-.005.049-.005.075 0 .15.034.265.04.409C.48 24.395 15.875 30 15.875 30s15.62-5.599 16.082-19.254c.008-.152.044-.272.044-.43 0-.026-.005-.05-.005-.075 0-.035.005-.063.005-.095z"
          id="prefix__a"
        />
      </Defs>
      <Use
        stroke="#FFFFFF"
        xlinkHref="#prefix__a"
        transform="translate(1 1.027)"
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default HeartWhiteSvgIcon;
