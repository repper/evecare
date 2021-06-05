import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={31}
      viewBox="0 0 37 38"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M32.25 13.092h-4.927c.561-2.382 1.016-5.19 1.005-7.913l-.005-1.319-1.293.26a9.693 9.693 0 01-7.34-1.446l-.982-.654A11.877 11.877 0 0010.047.193l-.81.142-.245 2.444c-.385 3.848.171 7.648.705 10.158l.034.155H4.75L0 22.593v14.422h37V22.593l-4.75-9.5zM11.15 2.995l.077-.772a9.713 9.713 0 016.28 1.6l.981.655a11.832 11.832 0 007.644 1.96c-.223 4.554-1.665 9.185-2.38 10.99h-1.999v-2.167h-2.168v2.168h-2.168v-6.505h-2.168v6.505h-1.996c-.805-2.064-2.721-8.253-2.103-14.434zM6.089 15.26h4.174c.225.815.455 1.55.671 2.168h-2.19v2.168h19.512V17.43H26.06a39.09 39.09 0 00.693-2.168h4.156l3.252 6.504H2.838l3.252-6.504zm28.743 8.672v6.577H2.168v-6.577h32.664zM2.168 34.847v-2.169h32.664v2.169H2.168z"
        fill={`${props.fillColor}`}
        fillRule="nonzero"
      />
    </Svg>
  );
}

SvgComponent.defaultProps = {
  fillColor: '#ec6233',
};

export default SvgComponent;
