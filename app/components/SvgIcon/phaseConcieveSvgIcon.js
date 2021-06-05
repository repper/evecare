import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
	return (
		<Svg width={65} height={46} viewBox="0 0 71 50" {...props}>
			<G fill="none" fillRule="evenodd">
				<Path
					d="M52.882 29.1c-4.583 3.479-6.995 2.476-6.995 2.476s-.624.918-.715 1.529c-.194 1.3-.278 3.1-2.987 4.943-3.976 2.708-9.357 3.531-14.387 2.355-5.03-1.18-7.485-1.296-9.825-3.53-2.34-2.24-1.286-8.242-1.286-8.242l1.394-2.475a1.727 1.727 0 00-.194-1.971l-.676-.788a1.505 1.505 0 01-.09-1.842 5.193 5.193 0 014.253-2.22c.601 0 1.144.363 1.374.922l.017.04c.208.503.127 1.08-.21 1.507l-.839 1.061 2.311 2.98c.528.682.808.964.525 1.776l.322.145c2.223-1.161 3.694-.593 3.694-.593l.003.021a2.502 2.502 0 011.285-2.125c.093-.052.188-.1.282-.145.763-.361 1.526.67 1.84 1.169.086.137.24.271.215.43 1.295-.282 4.378 1.639 5.665 1.17 1.287-.474 1.244-1.858 1.244-1.858l.01.003c-.663-.434-1.467-1.189-1.818-2.427-.648-2.283.567-2.773 2.27-5.504 1.701-2.732 6.733-3.779 11.182-1.917 4.044 1.693 4.027 4.76 4.027 4.76l.566 2.112s1.17 3.485-2.457 6.239zM48.554 6.978c-3.137 3.387-7.606 5.508-12.57 5.51-4.964-.002-9.432-2.123-12.57-5.51L3.489 32.537c9.639 10.79 24.403 11.687 29.567 11.648 1.24-.007 2.48-.007 3.72 0 5.366.042 21.095-.94 30.667-12.98L48.554 6.977z"
					fill="#FFD257"
				/>
				<Path
					d="M38.62 22.093c-.111-.031-2.73-.81-3.523-3.487-.611-2.064.186-3.102 1.196-4.414.359-.467.765-.997 1.206-1.675 2.055-3.166 7.658-4.164 12.488-2.225 4.632 1.861 4.665 5.338 4.664 5.485l-.974-.006-.974.007c-.002-.097-.089-2.393-3.465-3.749-4.264-1.712-8.74-.591-10.088 1.487-.482.741-.931 1.326-1.293 1.797-.948 1.233-1.234 1.605-.887 2.776.494 1.669 2.186 2.196 2.203 2.2l-.553 1.804"
					fill="#FFF"
				/>
				<Path
					d="M2.384 29.187C11.43 42.288 27.958 43.413 33.32 43.413h.282c1.241-.007 2.5-.007 3.742 0 5.04.046 21.992-.886 31.202-14.226L47.972 2.945a18.25 18.25 0 01-12.499 4.998h-.016a18.252 18.252 0 01-12.5-4.998L2.385 29.187zm30.94 16.16c-5.698 0-23.46-1.227-32.943-15.675L0 29.092 22.81 0l.77.827a16.309 16.309 0 0011.885 5.181A16.31 16.31 0 0047.35.827L48.12 0l22.81 29.092-.381.58c-9.65 14.705-27.866 15.715-33.22 15.676a326.65 326.65 0 00-3.712 0h-.293z"
					fill="#FFF"
				/>
				<Path
					d="M32.297 37.21c-1.605 0-3.228-.179-4.825-.538-.973-.223-1.868-.408-2.657-.572-3.43-.712-5.694-1.183-7.827-3.159-2.694-2.491-1.724-8.346-1.605-9.005l.03-.163 1.507-2.591a.725.725 0 00-.086-.847l-.69-.778a2.39 2.39 0 01-.153-3.002c1.178-1.629 3.102-2.602 5.147-2.602 1.015 0 1.923.591 2.312 1.505l.017.04c.35.819.214 1.759-.353 2.453l-.373.458 1.881 2.348c.749.935.956 2.161.553 3.28l-.848 2.361-1.86-.635.85-2.361a1.51 1.51 0 00-.248-1.464l-2.836-3.54 1.34-1.642a.508.508 0 00.075-.522l-.018-.04a.532.532 0 00-.492-.321A4.367 4.367 0 0017.6 17.66a.51.51 0 00.033.641l.69.778c.752.847.877 2.072.31 3.048l-1.338 2.3c-.265 1.631-.536 5.655 1.05 7.12 1.729 1.603 3.558 1.983 6.88 2.674.797.168 1.702.353 2.692.58 4.936 1.12 10.136.3 13.91-2.189 2.225-1.465 2.418-2.795 2.588-3.971l.038-.262c.12-.778.763-1.727.89-1.909l.451-.645.74.3c.004 0 2.124.649 6.17-2.327 3.055-2.247 2.202-4.984 2.164-5.1l1.87-.606c.057.167 1.372 4.136-2.848 7.237-3.563 2.62-6.02 2.869-7.244 2.754-.126.233-.225.457-.244.582l-.037.245c-.193 1.333-.484 3.35-3.434 5.294-2.987 1.968-6.753 3.004-10.635 3.004"
					fill="#FFF"
				/>
				<Path
					d="M40.291 33.72c-1.028 0-1.806-.2-2.02-.26-2.057-.408-3.682-1.077-4.76-1.521-.406-.167-.756-.31-.996-.386-.987-.309-1.84-1.683-2.773-3.316-.14-.244-.313-.55-.37-.626-.131-.164-.337-.418-1.263-3.121-.567-1.653.096-3.533 1.54-4.374a5.94 5.94 0 01.326-.176c.478-.238 1.724-.561 2.994 1.574l.026.035c.12.166.402.554.318 1.102-.132.87.31 2.114 1.054 2.96.468.53 1.254 1.145 2.313 1.04l.173 1.993c-1.422.142-2.794-.451-3.863-1.67-1.082-1.229-1.679-2.893-1.572-4.326a1.346 1.346 0 01-.04-.065c-.29-.487-.548-.728-.667-.799a3.93 3.93 0 00-.156.087c-.637.37-.927 1.202-.676 1.935.676 1.972.903 2.449.958 2.547.125.163.262.4.515.843.316.553 1.275 2.233 1.713 2.444.296.091.662.244 1.125.433 1.081.444 2.562 1.055 4.465 1.426l.094.025c.126.037 3.2.939 5.204-1.41l1.396 1.341c-1.577 1.848-3.576 2.266-5.058 2.266z"
					fill="#FFF"
				/>
				<Path
					d="M36.818 24.419c-.854 0-1.838-.376-2.865-.769-.716-.273-1.797-.687-2.144-.604l-.414-2.061c.883-.21 2.011.22 3.203.676.707.27 2.021.77 2.378.63.583-.23.614-.88.614-1.008l1.944-.048c.023.842-.349 2.429-1.893 3.039a2.215 2.215 0 01-.823.145M24.177 24.419l-.921-2.344c2.629-1.801 4.451-.964 4.651-.863l-.36 1.232-.342 1.241c-.048-.023-1.204-.516-3.028.734M16.658 47.732c-1.723-.481-2.665-.85-2.705-.865l.78-1.518c.009.006.895.35 2.503.798l-.578 1.585zm30.597 1.194l-.36-1.633a79.49 79.49 0 002.669-.499L50 48.412c-.907.188-1.83.36-2.745.514zm-25.132.03a62.093 62.093 0 01-2.748-.547l.47-1.612a57.97 57.97 0 002.653.527l-.375 1.633zm19.582.705l-.207-1.654c.9-.088 1.811-.19 2.706-.308l.285 1.645c-.92.12-1.857.227-2.784.317zm-14.022.037c-.932-.085-1.87-.19-2.789-.315l.287-1.645c.89.12 1.8.224 2.703.305l-.2 1.655zm8.42.293l-.049-1.663a75.45 75.45 0 002.726-.112l.127 1.66c-.935.054-1.879.094-2.805.115zm-2.81.009a78.414 78.414 0 01-2.808-.097l.116-1.66c.9.048 1.817.079 2.725.094L33.293 50z"
					fill="#FFF"
				/>
			</G>
		</Svg>
	);
}

export default SvgComponent;