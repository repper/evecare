import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function DepressedSvgIcon(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="#35809C" fillRule="nonzero">
				<Path d="M9.071 18.476a4.416 4.416 0 003.615-6.952l-7.53 4.581a4.415 4.415 0 003.915 2.371zM20.929 18.476c1.701 0 3.177-.962 3.915-2.371l-7.53-4.58a4.416 4.416 0 003.615 6.952z" />
				<Path d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z" />
			</G>
		</Svg>
	);
}

export default DepressedSvgIcon;
