import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={29} height={29} viewBox="0 0 29 29" {...props}>
			<G fill="#FF2E56" fillRule="nonzero">
				<Path d="M14.5 0C6.505 0 0 6.505 0 14.5S6.505 29 14.5 29 29 22.495 29 14.5 22.495 0 14.5 0zm0 27.187c-6.996 0-12.687-5.691-12.687-12.687 0-6.996 5.691-12.687 12.687-12.687 6.996 0 12.687 5.691 12.687 12.687 0 6.996-5.691 12.687-12.687 12.687z" />
				<Path d="M15.406 5.438h-1.812v9.437l5.703 5.703 1.281-1.281-5.172-5.172z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
