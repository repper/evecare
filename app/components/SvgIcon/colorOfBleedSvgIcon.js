import * as React from 'react';
import Svg, {G, Circle} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<G transform="translate(-1)" fill="none" fillRule="evenodd">
				<Circle fill="red" cx={12.774} cy={3} r={3} />
				<Circle
					fill="#D30606"
					transform="rotate(51 19.81 6.389)"
					cx={19.811}
					cy={6.389}
					r={3}
				/>
				<Circle
					fill="#8B0707"
					transform="rotate(103 21.549 14.003)"
					cx={21.549}
					cy={14.003}
					r={3}
				/>
				<Circle
					fill="#4E0404"
					transform="rotate(154 16.68 20.109)"
					cx={16.679}
					cy={20.109}
					r={3}
				/>
				<Circle
					fill="#251F1F"
					transform="rotate(-154 8.87 20.109)"
					cx={8.869}
					cy={20.109}
					r={3}
				/>
				<Circle
					fill="#F6E3AC"
					transform="rotate(-103 4 14.003)"
					cx={4}
					cy={14.003}
					r={3}
				/>
				<Circle
					fill="#FF2E56"
					transform="rotate(-51 5.738 6.389)"
					cx={5.738}
					cy={6.389}
					r={3}
				/>
			</G>
		</Svg>
	);
}

export default SvgComponent;
