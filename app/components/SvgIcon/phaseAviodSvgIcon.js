import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={50} height={50} viewBox="0 0 50 50" {...props}>
			<G fill="none" fillRule="evenodd">
				<Path
					d="M2.465 49.102h27.702c.862 0 1.57-.707 1.57-1.57V19.83c0-.862-.708-1.567-1.57-1.567H2.465A1.57 1.57 0 00.898 19.83v27.702c0 .863.705 1.57 1.567 1.57zm10.588-12.158a2.54 2.54 0 010 3.58l-1.76 1.764-1.765 1.764a2.54 2.54 0 01-3.58 0 2.542 2.542 0 010-3.583l1.764-1.761 1.76-1.764a2.54 2.54 0 013.581 0zm6.526 3.525l1.764-1.761 1.76-1.764a2.543 2.543 0 013.584 0 2.54 2.54 0 010 3.58l-1.764 1.764-1.764 1.764a2.54 2.54 0 01-3.58 0 2.543 2.543 0 010-3.583zm3.58-10.05a2.54 2.54 0 01-3.58 0 2.54 2.54 0 010-3.58l1.763-1.762 1.761-1.764a2.543 2.543 0 013.583 0 2.54 2.54 0 010 3.58l-1.763 1.765-1.764 1.76zm-11.867-1.761l-1.764 1.76a2.54 2.54 0 01-3.58 0 2.54 2.54 0 010-3.58l1.764-1.76 1.76-1.765a2.54 2.54 0 013.581 0 2.54 2.54 0 010 3.58l-1.76 1.765z"
					fill="#FFF"
				/>
				<Path
					d="M31.805 19.762v11.975h15.727c.863 0 1.57-.708 1.57-1.57V2.465c0-.862-.707-1.567-1.57-1.567H19.83a1.57 1.57 0 00-1.567 1.567v15.73h11.973c.862 0 1.57.704 1.57 1.567zm5.533 6.53a4.47 4.47 0 010-6.32 4.47 4.47 0 016.32 0 4.47 4.47 0 010 6.32 4.47 4.47 0 01-6.32 0zm6.32-13.633a4.466 4.466 0 01-6.32 0 4.467 4.467 0 116.32-6.317 4.467 4.467 0 010 6.317zm-13.633 0a4.467 4.467 0 11-6.317-6.317 4.467 4.467 0 016.317 6.317z"
					fill="#CCF5FC"
				/>
				<Path
					d="M23.653 6.425l6.449 6.45a4.56 4.56 0 00-6.45-6.45z"
					fill="#FFCD69"
				/>
				<Path
					d="M23.491 12.735a4.556 4.556 0 006.45 0l-6.45-6.448a4.558 4.558 0 000 6.448zM37.263 6.287a4.56 4.56 0 106.45 6.448l-6.45-6.448z"
					fill="#FFE6B4"
				/>
				<Path
					d="M37.126 6.425l6.45 6.45a4.56 4.56 0 00-6.45-6.449zM37.126 19.898l6.45 6.45a4.562 4.562 0 000-6.45 4.562 4.562 0 00-6.45 0z"
					fill="#FFCD69"
				/>
				<Path
					d="M37.263 26.51a4.562 4.562 0 006.45 0l-6.45-6.45a4.562 4.562 0 000 6.45z"
					fill="#FFE6B4"
				/>
				<Path
					d="M21.257 25.042l3.701 3.7 1.824-1.823a2.625 2.625 0 000-3.7 2.628 2.628 0 00-3.704 0l-1.82 1.823z"
					fill="#CCF5FC"
				/>
				<Path
					d="M19.626 30.374a2.624 2.624 0 003.7 0l1.824-1.821-3.701-3.703-1.823 1.822a2.627 2.627 0 000 3.702z"
					fill="#FF7B79"
				/>
				<Path
					d="M7.485 25.042l3.703 3.7 1.82-1.823a2.624 2.624 0 000-3.7 2.627 2.627 0 00-3.702 0l-1.821 1.823z"
					fill="#CCF5FC"
				/>
				<Path
					d="M6.153 26.672a2.627 2.627 0 000 3.702 2.624 2.624 0 003.7 0l1.824-1.821-3.701-3.703-1.823 1.822z"
					fill="#FF7B79"
				/>
				<Path
					d="M7.485 38.814l3.703 3.701 1.82-1.823a2.624 2.624 0 000-3.701 2.627 2.627 0 00-3.702 0l-1.821 1.823z"
					fill="#CCF5FC"
				/>
				<Path
					d="M6.152 43.847a2.625 2.625 0 003.701 0l1.824-1.823-3.701-3.7-1.824 1.82a2.628 2.628 0 000 3.703zM19.626 40.144a2.628 2.628 0 000 3.704 2.625 2.625 0 003.7 0l1.824-1.824-3.701-3.7-1.823 1.82z"
					fill="#FF7B79"
				/>
				<Path
					d="M21.257 38.814l3.701 3.701 1.824-1.823a2.625 2.625 0 000-3.701 2.628 2.628 0 00-3.704 0l-1.82 1.823z"
					fill="#CCF5FC"
				/>
				<G fill="#000" fillRule="nonzero">
					<Path d="M22.985 5.72a5.442 5.442 0 000 7.686 5.396 5.396 0 003.843 1.595 5.395 5.395 0 003.844-1.594 5.442 5.442 0 000-7.687 5.4 5.4 0 00-3.844-1.592 5.4 5.4 0 00-3.843 1.592zm3.843 7.328c-.93 0-1.804-.363-2.462-1.022a3.488 3.488 0 01-.591-4.135l4.728 4.728c-.508.28-1.08.429-1.675.429zm3.054-1.812l-4.727-4.727a3.464 3.464 0 011.673-.428c.93 0 1.805.362 2.463 1.02a3.488 3.488 0 01.59 4.135zM40.434 15a5.404 5.404 0 003.846-1.593 5.442 5.442 0 00-.001-7.688 5.446 5.446 0 00-7.689 0 5.442 5.442 0 000 7.687 5.396 5.396 0 003.844 1.595zm0-8.917a3.477 3.477 0 013.056 5.153L38.76 6.51a3.487 3.487 0 011.673-.427zM37.38 7.891l4.73 4.728c-.508.28-1.08.429-1.676.429-.93 0-1.805-.363-2.463-1.022a3.488 3.488 0 01-.591-4.135zM36.59 19.325a5.447 5.447 0 000 7.69 5.419 5.419 0 003.844 1.59c1.392 0 2.784-.53 3.845-1.59h.001a5.446 5.446 0 00-.001-7.69 5.446 5.446 0 00-7.689 0zm1.382 6.31a3.494 3.494 0 01-.592-4.139l4.728 4.729a3.49 3.49 0 01-4.136-.59zm5.517-.791l-4.728-4.729a3.488 3.488 0 014.137.592 3.491 3.491 0 01.591 4.137z" />
					<Path d="M47.456 0h-9.44a.977.977 0 000 1.953h9.44c.32 0 .59.27.59.588v27.65c0 .32-.27.59-.59.59H32.735V19.807c0-1.401-1.141-2.541-2.543-2.541H19.218V2.54c0-.319.27-.588.588-.588h9.442a.977.977 0 000-1.953h-9.442c-1.401 0-2.54 1.14-2.54 2.54v14.725H2.54c-1.4 0-2.54 1.14-2.54 2.54v27.652A2.545 2.545 0 002.54 50h27.65a2.546 2.546 0 002.544-2.543V32.735h14.721A2.546 2.546 0 0050 30.192V2.54C50 1.14 48.86 0 47.456 0zM30.782 47.457c0 .32-.27.59-.59.59H2.542a.597.597 0 01-.588-.59V19.806c0-.324.263-.588.587-.588h27.65c.32 0 .59.27.59.588v27.65z" />
					<Path d="M13.8 22.592a3.48 3.48 0 00-2.477-1.023c-.938 0-1.818.363-2.477 1.023L5.327 26.11a3.508 3.508 0 000 4.955 3.48 3.48 0 002.478 1.023c.937 0 1.817-.363 2.477-1.023l1.732-1.732c.01-.009.02-.017.028-.026l.026-.029 1.732-1.731a3.508 3.508 0 000-4.955zm-4.899 7.092c-.29.29-.68.45-1.096.45-.416 0-.806-.16-1.097-.45a1.552 1.552 0 010-2.193l1.069-1.068 2.193 2.192L8.9 29.684zm3.518-3.518l-1.068 1.068-2.193-2.192 1.069-1.07c.29-.29.68-.45 1.096-.45.416 0 .805.16 1.096.45a1.552 1.552 0 010 2.194zM27.408 22.592a3.513 3.513 0 00-4.957 0l-3.519 3.518a3.508 3.508 0 000 4.955 3.48 3.48 0 002.478 1.023c.938 0 1.817-.363 2.477-1.023l1.746-1.745.015-.013.012-.014 1.748-1.746a3.508 3.508 0 000-4.955zm-4.902 7.092a1.552 1.552 0 01-2.192 0 1.552 1.552 0 010-2.193l1.068-1.068 2.193 2.193-1.069 1.068zm3.521-3.519l-1.07 1.07-2.194-2.193 1.068-1.068a1.553 1.553 0 012.196-.001 1.552 1.552 0 010 2.192zM13.8 36.197a3.48 3.48 0 00-2.477-1.023c-.938 0-1.818.364-2.477 1.023l-3.519 3.519a3.513 3.513 0 000 4.957 3.48 3.48 0 002.478 1.023 3.48 3.48 0 002.477-1.023l1.746-1.748.015-.012.013-.015 1.744-1.746a3.507 3.507 0 000-4.955zm-4.899 7.095a1.552 1.552 0 01-2.192.001 1.556 1.556 0 010-2.196l1.068-1.069 2.194 2.194-1.07 1.07zm3.518-3.52L11.35 40.84l-2.193-2.193 1.069-1.069c.29-.29.68-.45 1.096-.45.416 0 .805.16 1.096.45a1.552 1.552 0 010 2.193zM27.408 36.197a3.513 3.513 0 00-4.957 0l-3.519 3.519a3.513 3.513 0 000 4.957 3.48 3.48 0 002.478 1.023c.938 0 1.817-.363 2.477-1.023l1.76-1.76 1.761-1.761a3.508 3.508 0 000-4.955zm-4.902 7.095a1.552 1.552 0 01-2.191.001 1.556 1.556 0 01-.001-2.196l1.068-1.069 2.194 2.194-1.07 1.07zm3.521-3.521l-1.07 1.07-2.194-2.194 1.068-1.068a1.553 1.553 0 012.196 0 1.552 1.552 0 010 2.192zM33.632 1.953h.003A.975.975 0 1033.632 0a.977.977 0 100 1.953z" />
				</G>
			</G>
		</Svg>
	);
}

export default SvgComponent;
