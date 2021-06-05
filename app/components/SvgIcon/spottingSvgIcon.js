import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SpottingSvgIcon(props) {
  return (
    <Svg width={21} height={28} viewBox="0 0 21 28" {...props}>
      <Path
        d="M20 16.885c0-4.05-2.68-8.476-4.929-11.476a.526.526 0 00-.775-.09.623.623 0 00-.084.833c2.137 2.851 4.685 7.028 4.685 10.733 0 4.953-3.789 8.93-8.397 8.93-4.709 0-8.397-3.923-8.397-8.93 0-4.843 4.6-11.03 7.803-14.44a.81.81 0 011.186-.004 44.747 44.747 0 011.708 1.93.525.525 0 00.78.045.624.624 0 00.042-.837 45.918 45.918 0 00-1.755-1.982A1.875 1.875 0 0010.5 1c-.519 0-1.006.214-1.37.603C5.666 5.29 1 11.672 1 16.885 1 22.585 5.236 27 10.5 27c5.175 0 9.5-4.465 9.5-10.115h0z"
        fill="#ff2e56"
        fillRule="nonzero"
        stroke="#ff2e56"
        strokeWidth={0.5}
      />
    </Svg>
  );
}

export default SpottingSvgIcon;
