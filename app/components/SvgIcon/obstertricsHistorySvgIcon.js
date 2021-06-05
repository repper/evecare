import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={38} height={38} viewBox="0 0 38 38" {...props}>
			<G fill="#FF2E56" fillRule="nonzero">
				<Path d="M29.42 10.42a6.136 6.136 0 01-6.13-6.13V0h-8.58v4.29c0 3.38-2.75 6.13-6.13 6.13C3.85 10.42 0 14.267 0 19c0 10.477 8.523 19 19 19s19-8.523 19-19c0-4.732-3.849-8.58-8.58-8.58zM19 36.773C9.2 36.774 1.226 28.8 1.226 19c0-4.056 3.3-7.355 7.355-7.355 4.055 0 7.354-3.3 7.354-7.355V1.226h1.226v1.226h1.226V1.226h1.226v6.793a8.05 8.05 0 01-.654 3.189l-.43 1.005a9.265 9.265 0 00-.755 3.671c0 1.152.289 2.27.835 3.272-.44.128-.846.34-1.208.63l-.066-.165a10.937 10.937 0 01-.787-4.081c0-1.25.296-2.503.855-3.62a9.379 9.379 0 00.984-4.17V3.678h-1.226v4.074a8.13 8.13 0 01-.855 3.62 9.379 9.379 0 00-.983 4.169c0 1.56.293 3.086.874 4.536l.15.374a3.654 3.654 0 00-2.92-1.45c-.442 0-.877.08-1.292.234l-3.927 1.473-.719-1.078a1.413 1.413 0 00-2.586.783v2.265c0 1.014.825 1.84 1.839 1.84v1.225c0 .676.55 1.226 1.226 1.226h.923a15.326 15.326 0 004.498 3.891l.805.46a6.09 6.09 0 003.58 1.165c2.516 0 4.988-.685 7.146-1.98l2.958-1.774c.306.047.616.076.928.076 3.38 0 6.13-2.749 6.13-6.129 0-3.38-2.75-6.129-6.13-6.129a6.113 6.113 0 00-3.763 1.299 1.972 1.972 0 00-.527-.073c-1.052 0-1.979.802-2.542 2.156a3.497 3.497 0 00-2.01-.897l-.018-.026A5.606 5.606 0 0119 15.884c0-1.103.22-2.176.654-3.188l.43-1.005c.501-1.167.755-2.402.755-3.672V1.226h1.226V4.29c0 4.056 3.299 7.355 7.354 7.355 4.056 0 7.355 3.3 7.355 7.355 0 9.8-7.974 17.774-17.774 17.774zm5.064-13.296a2.3 2.3 0 01-.989-1.53 3.519 3.519 0 00-.22-.748l.037-.2c.325-1.196.978-2 1.624-2 .122 0 .247.032.383.096l.365.175.305-.269a4.894 4.894 0 013.237-1.228c2.704 0 4.904 2.2 4.904 4.903 0 2.704-2.2 4.904-4.904 4.904-1.19 0-2.339-.437-3.237-1.23l-.811.92c.461.407.978.734 1.528.984l-1.997 1.199a12.675 12.675 0 01-6.515 1.804 4.909 4.909 0 01-4.903-4.903c0-.528.227-1.03.623-1.38l-.81-.919a3.081 3.081 0 00-.421.457 3.293 3.293 0 00-2.556-1.223H6.742a.613.613 0 01-.613-.613v-2.265c0-.165.248-.241.34-.103l1.26 1.887 4.837-1.814a2.45 2.45 0 01.86-.156c.936 0 1.777.52 2.196 1.357a4.176 4.176 0 003.755 2.32h.849v-1.226h-.85c-.858 0-1.65-.363-2.206-.98l.796-.796a2.287 2.287 0 011.629-.675c1.13 0 2.085.809 2.27 1.924a3.53 3.53 0 001.52 2.348l.792.528.68-1.02-.793-.528zm-12.06 4.92a14.104 14.104 0 01-2.32-2.41l-.184-.246H7.968v-1.226h1.74c.894 0 1.685.57 1.969 1.42a3.076 3.076 0 00-.032.419c0 .717.13 1.403.358 2.043z" />
				<Path d="M28 30h1v1h-1zM32 16h1v1h-1zM22 13h1v1h-1zM11 17h1v1h-1zM8 29h1v1H8zM19 35h1v1h-1zM3 16h1v1H3z" />
			</G>
		</Svg>
	);
}

export default SvgComponent;