import React from 'react'
import { Dimensions } from "react-native";
const window = Dimensions.get("window");
const { width, height } = window;
import Svg, { Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg'
import { scale, verticalScale, moderateScale } from "../../lib/scalingUtils";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const NotificationPermissionIcon = props => (
  <Svg width={width} height={167} viewBox={`0 0 ${width-110} 156`} {...props}>
    <Ellipse
      cx={184}
      cy={140.5}
      rx={219}
      ry={106.5}
      transform="translate(-33 -95)"
      fill="#d8557f"
      fillRule="evenodd"
    />
  </Svg>
)

export default NotificationPermissionIcon
