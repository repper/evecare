import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="#35809C" fillRule="nonzero">
				<Circle cx={9.5} cy={11.5} r={2.5} />
				<Circle cx={20.5} cy={11.5} r={2.5} />
				<Path d="M9 19.275L9.39 21 21 18.725 20.61 17z" />
				<Path d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
