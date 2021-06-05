import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function PredictionSvgIcon(props) {
  return (
    <Svg
      width={22}
      height={18}
      viewBox="0 0 22 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M19.804 0c-1.212-.004-2.196.89-2.2 1.992 0 .52.219 1.02.618 1.39l-4.018 7.31a1.981 1.981 0 00-.267-.024c-.283 0-.567.05-.829.148l-3.12-3.191c.18-.293.28-.621.284-.96 0-1.106-.985-2-2.2-2-1.217 0-2.201.894-2.201 2 .004.476.193.937.541 1.296l-3.82 6.074A2.206 2.206 0 002.2 14C.984 14 0 14.895 0 16s.984 2 2.2 2c1.217 0 2.2-.895 2.2-2a1.884 1.884 0 00-.54-1.297L7.675 8.63c.408.074.833.035 1.216-.113l3.12 3.191c-.18.293-.275.625-.28.961-.004 1.105.98 2.004 2.193 2.008 1.216.004 2.204-.89 2.209-1.992 0-.52-.22-1.024-.62-1.399l4.02-7.308c.085.011.175.023.266.023 1.216 0 2.2-.895 2.2-2s-.98-2-2.196-2z"
        fill="#D8557F"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default PredictionSvgIcon;
