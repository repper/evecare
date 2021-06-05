import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function BloodPressureSvgIcon(props) {
	return (
		<Svg width={35} height={36} viewBox="0 0 35 36" {...props}>
			<G fillRule="nonzero" fill="none">
				<Path
					d="M12.684 10a7.048 7.048 0 011.374-8.007c2.654-2.657 7.286-2.657 9.942 0l-1.42 1.421c-1.896-1.897-5.204-1.899-7.101 0a5.037 5.037 0 00-.982 5.72L12.684 10z"
					fill="#293939"
				/>
				<Path
					d="M10 33.752l1.42-1.553c1.958 2.14 5.144 2.14 7.101 0 1.503-1.644 1.897-4.157.982-6.253L21.316 25c1.281 2.934.73 6.45-1.374 8.752-2.742 2.998-7.2 2.997-9.942 0z"
					fill="#1E2D2D"
				/>
				<Path
					fill="#384949"
					d="M18.34 16.66L11.68 10 5 16.66l6.67 6.67L18.34 30 25 23.32z"
				/>
				<Path fill="#293939" d="M25 22.989L18.505 16 12 23l6.505 7z" />
				<Path
					d="M32.802 2.135c-2.83-2.846-7.77-2.848-10.604 0a7.555 7.555 0 000 10.656 7.466 7.466 0 0010.604 0 7.555 7.555 0 000-10.656z"
					fill="#FF6C6C"
				/>
				<Path
					d="M32.94 11.94a7.023 7.023 0 000-9.94L23 11.94a7.023 7.023 0 009.94 0z"
					fill="#E63950"
				/>
				<Circle fill="#EBF8FF" cx={27.5} cy={7.5} r={5.5} />
				<Path
					d="M31.455 11.498a5.32 5.32 0 000-7.498L24 11.498c1.991 2.003 5.463 2.003 7.455 0z"
					fill="#CCE6FF"
				/>
				<Path fill="#384949" d="M27 4v4h2V4z" />
				<Path fill="#293939" d="M29 6l-2 2h2z" />
				<Path
					d="M21.371 14.625L14.741 8l-2.209 2.208a5.204 5.204 0 000 7.376l2.94 2.937 2.939 2.938a5.187 5.187 0 007.38 0L28 21.25l-6.629-6.625z"
					fill="#4A696F"
				/>
				<Path
					d="M25.707 22.515L28 20.385 21.121 14 15 19.683l3.05 2.832c2.133 1.98 5.523 1.98 7.657 0z"
					fill="#384949"
				/>
				<Path
					d="M10.26 24.742c-2.474-2.476-6.62-3.914-9.024-1.504-2.391 2.391-.998 6.525 1.504 9.026 2.478 2.48 6.631 3.898 9.023 1.505 2.396-2.396.993-6.531-1.503-9.027z"
					fill="#FF6C6C"
				/>
				<Path
					d="M11.795 33.8c2.334-2.336.968-6.367-1.466-8.8L3 32.332c2.415 2.419 6.463 3.8 8.795 1.468z"
					fill="#E63950"
				/>
			</G>
		</Svg>
	);
}

export default BloodPressureSvgIcon;
