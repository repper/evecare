import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="#ffffff" fillRule="nonzero">
				<Circle cx={14.891} cy={20.365} r={3.942} />
				<Path d="M8.263 7.445L7.227 9.017l2.853 1.822-2.854 1.823 1.037 1.572 5.314-3.395zM22.773 9.017l-1.036-1.572-5.314 3.394 5.314 3.395 1.037-1.572-2.854-1.823z" />
				<Path d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
