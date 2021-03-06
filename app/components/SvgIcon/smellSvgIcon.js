import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={28} height={20} viewBox="0 0 28 20" {...props}>
			<G fill="#FF2E56" fillRule="nonzero">
				<Path d="M5.432 0L3.137 3.444A2.862 2.862 0 014.43 5.861c0 .988-.472 1.869-1.293 2.417A7.029 7.029 0 000 14.138 7.03 7.03 0 003.137 20l2.295-3.444A2.863 2.863 0 014.14 14.14c0-.988.472-1.869 1.293-2.417a7.029 7.029 0 003.137-5.86A7.03 7.03 0 005.432 0zM15.002 0l-2.296 3.444a2.862 2.862 0 011.293 2.417c0 .988-.471 1.869-1.293 2.417a7.03 7.03 0 00-3.137 5.86A7.03 7.03 0 0012.706 20l2.296-3.444a2.862 2.862 0 01-1.294-2.417c0-.988.472-1.869 1.294-2.417a7.03 7.03 0 003.136-5.86A7.031 7.031 0 0015.002 0zM24.57 0l-2.295 3.444a2.862 2.862 0 011.293 2.417c0 .988-.471 1.869-1.293 2.417a7.029 7.029 0 00-3.137 5.86A7.03 7.03 0 0022.275 20l2.296-3.444a2.863 2.863 0 01-1.294-2.417c0-.988.472-1.869 1.294-2.417a7.029 7.029 0 003.136-5.86A7.03 7.03 0 0024.571 0z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
