import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
			<G transform="translate(.5)" fill="#ffffff" fillRule="nonzero">
				<Circle cx={9.828} cy={10.862} r={2.586} />
				<Circle cx={20.172} cy={10.862} r={2.586} />
				<Path d="M9.31 19.655h11.379v2.069H9.31z" />
				<Path d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.234 4.234 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
