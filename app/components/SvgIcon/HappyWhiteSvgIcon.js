import * as React from 'react';
import Svg, {Defs, Path, G, Use} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
      <Defs>
        <Path
          d="M12.556 8.69h-.003c-.015-.893-.706-1.69-1.56-1.69-.494 0-.929.27-1.215.669C9.49 7.27 9.056 7 8.562 7c-.853 0-1.545.797-1.56 1.69H7v.029c0 .025.006.044.007.069C7.083 11.066 9.756 12 9.756 12s2.712-.933 2.792-3.21c.001-.024.008-.044.008-.07l-.001-.013V8.69z"
          id="prefix__a"
        />
        <Path
          d="M23.556 8.69h-.003c-.015-.893-.706-1.69-1.56-1.69-.494 0-.929.27-1.215.669C20.49 7.27 20.056 7 19.562 7c-.853 0-1.545.797-1.56 1.69H18v.029c0 .025.006.044.007.069.076 2.278 2.749 3.212 2.749 3.212s2.712-.933 2.792-3.21c.001-.024.008-.044.008-.07l-.001-.013V8.69z"
          id="prefix__b"
        />
      </Defs>
      <G fill="#FFFFFF" fillRule="evenodd">
        <Path
          d="M15 23.848a6.76 6.76 0 006.76-6.76H8.24a6.76 6.76 0 006.76 6.76zm4.51-4.885a4.893 4.893 0 01-4.51 3.01 4.893 4.893 0 01-4.51-3.01h9.02z"
          fillRule="nonzero"
        />
        <Use xlinkHref="#prefix__a" />
        <Use xlinkHref="#prefix__b" />
        <Path
          d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
