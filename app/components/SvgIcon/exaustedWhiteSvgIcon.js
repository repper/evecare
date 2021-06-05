import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function ExaustedWhiteSvgIcon(props) {
	return (
		<Svg width={31} height={30} viewBox="0 0 31 30" {...props}>
			<G fill="none" fillRule="evenodd">
				<Path
					d="M17.139 21.474c0 .823-.67 1.493-1.493 1.493-.823 0-1.494-.67-1.494-1.493v-1.786h2.987v1.786zM12.422 14.006l1.326-1.326-1.732-1.731 1.732-1.732-1.326-1.326-1.731 1.732L8.959 7.89 7.634 9.217l1.731 1.732-1.731 1.731 1.325 1.326 1.732-1.732zM22.04 7.891l-1.73 1.732-1.732-1.732-1.326 1.326 1.732 1.732-1.732 1.731 1.326 1.326 1.731-1.732 1.732 1.732 1.325-1.326-1.731-1.731 1.731-1.732z"
					fill="#ffffff"
					fillRule="nonzero"
				/>
				<Path
					d="M26.27 0H4.73A4.235 4.235 0 00.5 4.23v21.54A4.235 4.235 0 004.73 30h21.54a4.235 4.235 0 004.23-4.23V4.23A4.235 4.235 0 0026.27 0zm2.355 25.77a2.358 2.358 0 01-2.355 2.355H4.73a2.358 2.358 0 01-2.355-2.355V4.23A2.358 2.358 0 014.73 1.875h21.54a2.358 2.358 0 012.355 2.355v21.54z"
					fill="#ffffff"
					fillRule="nonzero"
				/>
			</G>
		</Svg>
	);
}

export default ExaustedWhiteSvgIcon;
