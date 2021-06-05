import * as React from 'react';
import Svg, {Defs, Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function CircleShaowIcon(props) {
	return (
		<Svg width={230} height={120} {...props}>
			<Circle cx={170} cy={60} r={50} fill="green" filter="url(#prefix__a)" />
		</Svg>
	);
}

export default CircleShaowIcon;
