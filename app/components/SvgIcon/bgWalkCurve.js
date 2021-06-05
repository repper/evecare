import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {moderateScale} from '../../lib/scalingUtils';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  const {width} = Dimensions.get('window');
  const orgWidth = width === 375 ? 375 : 360.5;
  const orgHeight = 94;

  const percent = width / orgWidth;
  const newHeight = orgHeight * percent + moderateScale(1);

  let curvePoints = [
    20.74,
    11.862,
    152.744,
    81.335,
    279.08,
    81.95,
    354.263,
    70.117,
    0.012,
    0.094,
    6.612,
    4,
    13.53,
    7.922,
    20.752,
    11.768,
  ];
  if (width > 375) {
    curvePoints = curvePoints.map(p => p * percent);
  }

  let curvePath = `M${curvePoints[0]} ${curvePoints[1]}c${curvePoints[2]} ${
    curvePoints[3]
  } ${curvePoints[4]} ${curvePoints[5]} ${curvePoints[6]} ${
    curvePoints[7]
  }L${width} ${newHeight}H0L-${curvePoints[8]}${curvePoints[9]}c${
    curvePoints[10]
  } ${curvePoints[11]} ${curvePoints[12]} ${curvePoints[13]} ${
    curvePoints[14]
  } ${curvePoints[15]}z`;
  return (
    <Svg
      width={width}
      height={newHeight}
      viewBox={`0 0 ${width} ${newHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d={curvePath} fill={`${props.color}`} fillRule="evenodd" />
    </Svg>
  );
}

SvgComponent.defaultProps = {
  color: '#FF2E56',
};

export default SvgComponent;
