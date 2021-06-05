import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={23} height={29} viewBox="0 0 23 29" {...props}>
			<G fill="#FF2E56" fillRule="nonzero">
				<Path d="M20.917 1.87h-1.999v-.41c0-.805-.655-1.46-1.46-1.46H5.085C4.28 0 3.625.655 3.625 1.46v.41H1.626C.73 1.87 0 2.598 0 3.495v23.878C0 28.27.73 29 1.626 29h19.29c.897 0 1.627-.73 1.627-1.626V3.496c0-.897-.73-1.627-1.626-1.627zM5.324 1.7H17.22v1.982H5.324V1.699zm15.52 25.6H1.699V3.569h1.926v.352c0 .806.655 1.46 1.46 1.46h12.372c.806 0 1.461-.654 1.461-1.46v-.352h1.926v23.733z" />
				<Path d="M10.422 14.953a.85.85 0 001.7 0v-2.322h2.321a.85.85 0 000-1.7h-2.322V8.61a.85.85 0 00-1.7 0v2.323H8.1a.85.85 0 000 1.699h2.322v2.322zM6.287 17.729H4.475a.85.85 0 000 1.699h1.812a.85.85 0 000-1.7zM6.287 21.354H4.475a.85.85 0 000 1.699h1.812a.85.85 0 000-1.7zM18.068 17.729h-7.703a.85.85 0 000 1.699h7.703a.85.85 0 000-1.7zM18.068 21.354h-7.703a.85.85 0 000 1.699h7.703a.85.85 0 000-1.7z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
