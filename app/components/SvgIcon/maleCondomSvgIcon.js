import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill={`${props.fillColor}`} fillRule="nonzero">
        <Path d="M28.859 22.369l-.154-2.83c-.106-2.028-1.737-3.623-3.705-3.623s-3.599 1.595-3.71 3.63l-.155 2.829C15.664 23.395 12 26.427 12 29.965c0 4.461 5.708 7.95 13 7.95s13-3.489 13-7.95c0-3.538-3.664-6.57-9.141-7.596zm-6.388-2.756c.077-1.387 1.188-2.475 2.529-2.475s2.452 1.088 2.53 2.475l.247 4.663c.118 2.23 1.495 4.21 3.504 5.041.071.03.148.043.219.043a.594.594 0 00.55-.385.612.612 0 00-.331-.794 4.425 4.425 0 01-2.11-1.864c2.783.819 4.255 2.218 4.255 3.043 0 1.296-3.363 3.667-8.864 3.667-5.501 0-8.864-2.371-8.864-3.667 0-.825 1.472-2.224 4.255-3.043a4.452 4.452 0 01-2.11 1.864.625.625 0 00-.33.794.591.591 0 00.768.342c2.009-.83 3.38-2.81 3.504-5.041l.248-4.663zM25 36.693c-6.518 0-11.818-3.019-11.818-6.728 0-2.83 3.22-5.384 7.888-6.337l-.03.58a4.749 4.749 0 01-.094.71c-3.492.806-5.991 2.64-5.991 4.442 0 2.31 4.124 4.889 10.045 4.889 5.92 0 10.045-2.579 10.045-4.889 0-1.803-2.5-3.636-5.991-4.443a4.749 4.749 0 01-.095-.709l-.03-.58c4.669.953 7.89 3.508 7.89 6.337 0 3.71-5.301 6.728-11.819 6.728z" />
        <Path d="M23.305 24.913c1.104-.16 2.276-.16 3.38 0h.028c.149 0 .27-.169.286-.399.012-.24-.103-.461-.257-.479a12.73 12.73 0 00-3.483 0c-.154.027-.275.24-.257.479.005.248.137.425.303.399zM23.32 22.914c1.112-.15 2.265-.15 3.371 0h.023c.148 0 .274-.177.285-.407.012-.24-.102-.46-.262-.479a13.41 13.41 0 00-3.474 0c-.16.018-.274.24-.262.479.028.248.16.425.32.407zM10.47 30.786l-2.4-1.192a.6.6 0 00-.534 0L5.4 30.649l-2.13-1.061a.6.6 0 00-.534 0l-1.536.763V2.48l1.53.762a.6.6 0 00.534 0L5.4 2.183l2.13 1.06a.6.6 0 00.534 0l2.136-1.06 2.13 1.06a.6.6 0 00.534 0L15 2.183l2.13 1.06a.6.6 0 00.534 0l2.136-1.06 2.13 1.06a.6.6 0 00.534 0l2.136-1.06 2.13 1.06a.6.6 0 00.534 0L28.8 2.48v12.743a.6.6 0 001.2 0V1.515a.594.594 0 00-.864-.53L27 2.038 24.87.98a.6.6 0 00-.534 0L22.2 2.038 20.07.98a.6.6 0 00-.534 0L17.4 2.038 15.27.98a.6.6 0 00-.534 0L12.6 2.038 10.47.98a.6.6 0 00-.534 0L7.8 2.038 5.67.984a.6.6 0 00-.534 0L3 2.04.87.984a.607.607 0 00-.588.024.594.594 0 00-.282.507v29.802a.594.594 0 00.864.53L3 30.792l2.13 1.061a.6.6 0 00.534 0L7.8 30.792l2.13 1.061c.09.042.18.06.27.06.222 0 .432-.12.54-.328a.597.597 0 00-.27-.799z" />
        <Path d="M11.107 26.768c-4.19-1.63-6.894-5.538-6.894-9.957 0-5.906 4.893-10.706 10.914-10.706 5.112 0 9.605 3.557 10.672 8.452a.613.613 0 00.722.458.601.601 0 00.466-.708C25.8 8.865 20.81 4.916 15.127 4.916 8.44 4.916 3 10.25 3 16.81c0 4.913 3.008 9.255 7.658 11.063a.61.61 0 00.788-.333.593.593 0 00-.339-.773z" />
        <Path d="M15.41 8.508c2.793 0 5.36 1.25 7.043 3.437.103.13.291.16.425.06a.29.29 0 00.06-.416c-1.797-2.334-4.54-3.673-7.528-3.673C10.22 7.916 6 12.034 6 17.1c0 3.17 1.64 6.073 4.39 7.768.048.03.109.048.163.048.104 0 .2-.048.255-.137a.29.29 0 00-.097-.409c-2.568-1.588-4.104-4.307-4.104-7.27 0-4.74 3.946-8.592 8.803-8.592z" />
      </G>
    </Svg>
  );
}

SvgComponent.defaultProps = {
  fillColor: '#ec6233',
};

export default SvgComponent;