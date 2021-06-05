import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="#35809C" fillRule="nonzero">
				<Path d="M15.105 15.889c-3.724 0-6.743 3.041-6.743 6.794h13.485c0-3.753-3.019-6.794-6.742-6.794zM8.423 14.007l1.716-1.717 1.717 1.717 1.315-1.314-1.717-1.717 1.717-1.717-1.315-1.315-1.717 1.717-1.716-1.717L7.108 9.26l1.717 1.717-1.717 1.717zM21.577 7.944l-1.716 1.717-1.717-1.717-1.315 1.315 1.717 1.717-1.717 1.717 1.315 1.314 1.717-1.717 1.716 1.717 1.315-1.314-1.717-1.717 1.717-1.717z" />
				<Path d="M25.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;