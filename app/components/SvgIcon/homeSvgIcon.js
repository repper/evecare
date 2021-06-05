import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function HomeSvgIcon(props) {
  return (
    <Svg width={52} height={65} viewBox="0 0 52 65" {...props}>
      <G fill="none" fillRule="evenodd">
        <Circle fill="#222872" cx={26} cy={39} r={26} />
        <Path
          d="M21.004 0s-7.932 5.602-6.914 14.41c.845 7.3 11.153 12.573 15.822 19.62 0 0 1.793 2.788 1.388 5.517 9.584-12.977 8.435-21.534-3.673-30.894C21.842 4.182 21.9 3.194 21.004 0"
          fill="#9CD5EC"
        />
        <Path
          d="M16.22 34.107c.571 4.944 11.175 9.648 10.837 15.374 5.885-8.165 5.108-13.175-2.619-19.148-3.69-2.854-3.22-3.353-3.792-5.392 0 0-5.077 3.547-4.426 9.166z"
          fill="#9CD5EC"
        />
      </G>
    </Svg>
  );
}

export default HomeSvgIcon;
