import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function OrgasmYesSvgIcon(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="#EC6233" fillRule="nonzero">
				<Path d="M22.727 19.873l-1.126-1.691c-6.512 5.436-12.93.224-13.2 0l-1.128 1.69c.051.042 3.483 2.855 8.03 2.855 2.288 0 4.86-.713 7.424-2.854z" />
				<Circle cx={10} cy={10.909} r={2.727} />
				<Path d="M22.726 12.163l-2.859-1.708 2.86-1.71-1.04-1.472-5.323 3.182 5.325 3.181z" />
				<Path d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z" />
			</G>
		</Svg>
	);
}

export default OrgasmYesSvgIcon;
