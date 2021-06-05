import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
			<G transform="translate(.5)" fill="#35809C" fillRule="nonzero">
				<Path d="M7.317 21.05l1.121 1.633c.27-.216 6.654-5.25 13.125 0l1.12-1.633c-7.61-6.174-15.29-.06-15.366 0z" />
				<Circle cx={20.122} cy={10.61} r={2.561} />
				<Path d="M7.318 12.378l1.074 1.524 5.51-3.292-5.51-3.293-1.075 1.525 2.96 1.768z" />
				<Path d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
