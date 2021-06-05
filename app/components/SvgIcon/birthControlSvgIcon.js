import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={26} height={33} viewBox="0 0 26 33" {...props}>
			<G fill="#FF2E56" fillRule="nonzero">
				<Path d="M13.52 15.065l-1.439-.73a.54.54 0 01-.295-.485v-1.502h.535a1.08 1.08 0 001.072-1.087V9.087c0-.6-.48-1.087-1.072-1.087H2.68a1.08 1.08 0 00-1.072 1.087v2.174c0 .6.48 1.087 1.072 1.087h.535v1.502a.541.541 0 01-.296.486l-1.437.73A2.708 2.708 0 000 17.495V31.37C0 32.268.721 33 1.607 33h11.786A1.62 1.62 0 0015 31.37V17.496a2.708 2.708 0 00-1.48-2.43zM2.678 11.261V9.087h1.607v1.087h1.071V9.087h1.607v1.087h1.072V9.087h1.607v1.087h1.071V9.087h1.607l.002 2.174H2.678zm11.25 20.109c0 .3-.24.543-.536.543H1.607a.54.54 0 01-.536-.543v-1.63H13.93v1.63zm0-2.718H1.07V18.87H13.93v9.782zm0-10.87H1.07v-.286c0-.622.341-1.18.889-1.458l1.438-.73c.547-.278.888-.837.888-1.458v-1.502h6.428v1.502c0 .622.341 1.18.888 1.459l1.438.729c.548.278.889.836.889 1.458v.287z" />
				<Path d="M8.714 22.286V20H5.286v2.286H3v3.428h2.286V28h3.428v-2.286H11v-3.428H8.714zm1.143 2.285H7.571v2.286H6.43v-2.286H4.143V23.43h2.286v-2.286H7.57v2.286h2.286v1.142zM26 1.05V0H16v1.05h3.333v4.11l-.555 1.575v1.134H16v1.049h2.222v14.164h1.111v2.098h1.111V32h1.112v-6.82h1.11v-2.098h1.112V8.918H26v-1.05h-2.778V6.736l-.555-1.574V1.049H26zm-6.111 5.855l.555-1.574V1.049h1.112v4.282l.555 1.574v.964H19.89v-.964zm1.667 17.226h-1.112v-1.049h1.112v1.05zm1.11-14.164h-2.222v1.05h2.223v1.573h-1.111v1.05h1.11v1.573h-2.222v1.05h2.223v1.573h-1.111v1.05h1.11v3.147h-3.333V8.918h3.334v1.05z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;
