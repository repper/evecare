import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function TemperatureSvgIcon(props) {
	return (
		<Svg width={19} height={33} viewBox="0 0 19 33" {...props}>
			<G fillRule="nonzero" fill="none">
				<Path
					d="M12.95 26.789c0 3.238-2.6 5.894-5.911 6.157a6.65 6.65 0 01-.633.02C2.956 32.922.13 30.243.048 26.94c-.058-2.34 1.243-4.395 3.2-5.49V5.144c0-.859.365-1.637.952-2.2a3.273 3.273 0 011.308-.765c.312-.095.645-.147.99-.147 1.795 0 3.25 1.394 3.25 3.112V21.45c1.916 1.071 3.203 3.06 3.203 5.339z"
					fill="#E9F5FF"
				/>
				<Path
					d="M12.95 26.789c0 3.238-2.6 5.894-5.911 6.157a2.225 2.225 0 01.006-.449c2.323-.934 3.956-3.134 3.956-5.7 0-2.277-1.287-3.769-3.202-4.84V5.153c0-1.4-.964-2.582-2.291-2.975.312-.095.645-.147.99-.147 1.795 0 3.25 1.394 3.25 3.112V21.45c1.916 1.071 3.203 3.06 3.203 5.339z"
					fill="#BDE2EF"
				/>
				<Path
					d="M8.765 23.071a1.854 1.854 0 01-.966-1.612V5.153c0-.687-.584-1.245-1.3-1.245-.152 0-.297.025-.432.07-.506.171-.868.633-.868 1.175v16.306c0 .663-.368 1.277-.967 1.612-1.417.793-2.274 2.262-2.235 3.833.028 1.112.503 2.16 1.34 2.952a4.57 4.57 0 003.097 1.253 4.635 4.635 0 002.454-.656c.276-.165.534-.36.772-.585a4.194 4.194 0 001.34-3.07c0-1.527-.856-2.955-2.235-3.727z"
					fill="#FF6E6E"
				/>
				<Path
					d="M8.765 23.071a1.854 1.854 0 01-.966-1.612V5.153c0-.687-.584-1.245-1.3-1.245-.152 0-.297.025-.432.07.265.228.432.558.432.926v17.738c0 .663.368 1.277.966 1.612 1.379.772 2.236 2.2 2.236 3.727a4.15 4.15 0 01-.813 2.472c.276-.165.534-.36.772-.585a4.194 4.194 0 001.34-3.07c0-1.527-.856-2.955-2.235-3.727z"
					fill="#F44E92"
				/>
				<Path
					d="M7.799 5.153V9.98h-2.6V5.153c0-.542.362-1.004.868-1.175.135-.045.28-.07.432-.07.716 0 1.3.558 1.3 1.245z"
					fill="#4F667A"
				/>
				<Path
					d="M6.499 3.908c-.152 0-.297.025-.432.07.265.228.432.558.432.926V9.98h1.3V5.153c0-.687-.584-1.245-1.3-1.245z"
					fill="#3A5366"
				/>
				<G fill="#000">
					<Path d="M13.452 3.936h5.034a.491.491 0 00.499-.484.491.491 0 00-.499-.483h-5.034a.491.491 0 00-.498.483c0 .267.223.484.498.484zM13.452 6.167h2.517a.491.491 0 00.499-.483.491.491 0 00-.499-.483h-2.517a.491.491 0 00-.498.483c0 .267.223.483.498.483zM18.486 7.457h-5.034a.491.491 0 00-.498.483c0 .267.223.483.498.483h5.034a.491.491 0 00.499-.483.491.491 0 00-.499-.483zM13.452 10.655h2.517a.491.491 0 00.499-.483.491.491 0 00-.499-.484h-2.517a.491.491 0 00-.498.484c0 .267.223.483.498.483zM18.486 11.911h-5.034a.491.491 0 00-.498.484c0 .266.223.483.498.483h5.034a.491.491 0 00.499-.483.491.491 0 00-.499-.484zM13.452 15.11h2.517a.491.491 0 00.499-.484.491.491 0 00-.499-.483h-2.517a.491.491 0 00-.498.483c0 .267.223.484.498.484zM18.486 16.408h-5.034a.491.491 0 00-.498.483c0 .267.223.484.498.484h5.034a.491.491 0 00.499-.484.491.491 0 00-.499-.483zM15.97 18.64h-2.518a.491.491 0 00-.498.483c0 .267.223.483.498.483h2.517a.491.491 0 00.499-.483.491.491 0 00-.499-.483z" />
					<Path d="M10.927 20.254V7.8a.491.491 0 00-.499-.483.491.491 0 00-.498.483v12.725c0 .172.094.33.247.417a5.964 5.964 0 013.026 5.176 5.786 5.786 0 01-1.816 4.21 6.15 6.15 0 01-4.367 1.703 6.156 6.156 0 01-4.197-1.716c-1.13-1.085-1.773-2.525-1.81-4.053a5.943 5.943 0 013.023-5.32.48.48 0 00.247-.417V3.706c0-1.51 1.267-2.74 2.824-2.74s2.823 1.23 2.823 2.74v1.849c0 .267.223.483.498.483a.491.491 0 00.499-.483V3.706C10.927 1.663 9.213 0 7.107 0 5 0 3.287 1.663 3.287 3.706v16.548a6.9 6.9 0 00-3.27 6.03c.043 1.78.79 3.456 2.105 4.718a7.163 7.163 0 004.884 1.996h.102a7.154 7.154 0 004.979-1.98c1.362-1.304 2.112-3.044 2.112-4.9a6.926 6.926 0 00-3.272-5.864z" />
					<Path d="M5.042 22.686a2.413 2.413 0 001.234-2.087v-1.57a.491.491 0 00-.498-.484.491.491 0 00-.498.483V20.6c0 .513-.284.993-.74 1.252-1.606.91-2.575 2.595-2.531 4.397a4.847 4.847 0 001.515 3.39 5.149 5.149 0 003.578 1.437 5.152 5.152 0 003.585-1.425 4.84 4.84 0 001.52-3.523c0-1.752-.97-3.39-2.533-4.276a1.448 1.448 0 01-.74-1.252V3.716c0-.978-.82-1.773-1.827-1.773-1.008 0-1.827.795-1.827 1.773v13.046c0 .267.223.484.498.484a.491.491 0 00.498-.484V9.197h1.661v11.402c0 .856.473 1.655 1.235 2.087 1.257.712 2.038 2.031 2.038 3.441 0 1.074-.434 2.08-1.222 2.835a4.14 4.14 0 01-2.94 1.145 4.141 4.141 0 01-2.823-1.156 3.898 3.898 0 01-1.22-2.726c-.036-1.45.745-2.807 2.037-3.539zM6.276 8.23V3.716a.82.82 0 01.83-.806.82.82 0 01.831.806V8.23h-1.66z" />
				</G>
			</G>
		</Svg>
	);
}

export default TemperatureSvgIcon;