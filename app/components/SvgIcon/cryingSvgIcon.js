import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
			<G fill="#35809C" fillRule="nonzero">
				<Path d="M15.5 15a6.786 6.786 0 00-6.786 6.786h13.572A6.786 6.786 0 0015.5 15zM8.693 13.929l5.378-3.394-5.38-3.392-1.047 1.57 2.888 1.822-2.89 1.823zM23.356 8.714l-1.048-1.571-5.38 3.392 5.38 3.394 1.05-1.571-2.89-1.823z" />
				<Path d="M26.27 0H4.73A4.235 4.235 0 00.5 4.23v21.54A4.235 4.235 0 004.73 30h21.54a4.235 4.235 0 004.23-4.23V4.23A4.235 4.235 0 0026.27 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.73a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.73 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
