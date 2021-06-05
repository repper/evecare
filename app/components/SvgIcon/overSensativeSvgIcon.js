import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
			<G fill="#35809C" fillRule="nonzero">
				<Path d="M16.941 8.276H6.501v1.875h1.8a2.587 2.587 0 00-.622 1.674 2.61 2.61 0 005.221 0c0-.64-.24-1.22-.622-1.674h6.591a2.587 2.587 0 00-.622 1.674 2.61 2.61 0 005.221 0c0-.64-.24-1.22-.622-1.674h1.673V8.276H16.94zM9.55 19.253l11.514 2.42.386-1.835-11.514-2.42z" />
				<Path d="M26.27 0H4.73A4.235 4.235 0 00.5 4.23v21.54A4.235 4.235 0 004.73 30h21.54a4.235 4.235 0 004.23-4.23V4.23A4.235 4.235 0 0026.27 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.73a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.73 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
