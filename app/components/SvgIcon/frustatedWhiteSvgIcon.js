import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
			<G transform="translate(.5)" fill="#ffffff" fillRule="nonzero">
				<Circle cx={15.517} cy={20.69} r={4.138} />
				<Path d="M12.102 14.483l1.346-1.346-1.757-1.758 1.757-1.757-1.346-1.346-1.757 1.758-1.758-1.758-1.346 1.346L9 11.379l-1.758 1.758 1.346 1.346 1.758-1.758zM21.413 8.276l-1.758 1.758-1.757-1.758-1.346 1.346 1.757 1.757-1.757 1.758 1.346 1.346 1.757-1.758 1.758 1.758 1.346-1.346L21 11.379l1.758-1.757z" />
				<Path d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
