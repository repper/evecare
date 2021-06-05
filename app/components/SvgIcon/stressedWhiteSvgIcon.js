import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<G fill="none" fillRule="evenodd">
				<Path
					d="M8.578 22.295c.269-.2 6.66-4.831 13.137 0l1.12-1.503c-7.615-5.683-15.303-.056-15.38 0l1.123 1.503zM8.46 14.006l1.73-1.732 1.732 1.732 1.326-1.326-1.732-1.731 1.732-1.732-1.326-1.326-1.731 1.732L8.459 7.89 7.134 9.217l1.731 1.732-1.731 1.731zM18.078 14.006l1.731-1.732 1.732 1.732 1.325-1.326-1.731-1.731 1.731-1.732-1.325-1.326-1.732 1.732-1.731-1.732-1.326 1.326 1.732 1.732-1.732 1.731z"
					fill="#FFFFFF"
					fillRule="nonzero"
				/>
				<Path
					d="M4.23 30h21.54A4.235 4.235 0 0030 25.77V4.23A4.235 4.235 0 0025.77 0H4.23A4.235 4.235 0 000 4.23v21.54A4.235 4.235 0 004.23 30zM1.875 4.23A2.358 2.358 0 014.23 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54a2.358 2.358 0 01-2.355 2.355H4.23a2.358 2.358 0 01-2.355-2.355V4.23z"
					fill="#FFFFFF"
					fillRule="nonzero"
				/>
			</G>
		</Svg>
	);
}

export default SvgComponent;