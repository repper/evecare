import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function MoodSwingSvgIcon(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="#35809C" fillRule="nonzero">
				<Circle cx={13.953} cy={10.814} r={2.616} />
				<Circle cx={21.802} cy={10.814} r={2.616} />
				<Path d="M23.72 18.898L12.247 21.28l-.386-1.805 11.476-2.381z" />
				<Path d="M30 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30h21.54A4.235 4.235 0 0030 25.77zm-1.875 0a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z" />
			</G>
		</Svg>
	);
}

export default MoodSwingSvgIcon;
