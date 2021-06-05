import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="none" fillRule="evenodd">
				<Circle
					fill="#35809C"
					fillRule="nonzero"
					cx={9.652}
					cy={10.732}
					r={2.611}
				/>
				<Circle
					fill="#35809C"
					fillRule="nonzero"
					cx={20.348}
					cy={10.732}
					r={2.611}
				/>
				<Path
					d="M7.309 19.926c.05.038 3.468 2.54 7.991 2.54 2.278 0 4.838-.635 7.39-2.539l-1.121-1.503c-6.481 4.834-12.869.2-13.138 0L7.31 19.926z"
					fill="#35809C"
					fillRule="nonzero"
				/>
				<Path
					d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z"
					fill="#35809C"
					fillRule="nonzero"
				/>
			</G>
		</Svg>
	);
}

export default SvgComponent;
