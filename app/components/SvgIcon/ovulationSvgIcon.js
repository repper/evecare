import * as React from 'react';
import Svg, {Defs, Circle, G, Use, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

function SvgComponent(props) {
  return (
    <Svg width={50} height={50} viewBox="0 0 33 33" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path
          d="M24.092 16.794a11.553 11.553 0 00-2.613-.236c.504-1.3.608-2.868.305-4.673a.286.286 0 00-.123-.19.276.276 0 00-.22-.038 9.8 9.8 0 00-2.674 1.227A8.915 8.915 0 0016.1 9.06a.276.276 0 00-.37.025c-1.242 1.288-2.072 2.61-2.479 3.94a9.837 9.837 0 00-2.877-1.369.276.276 0 00-.22.039.286.286 0 00-.123.19c-.304 1.805-.199 3.372.304 4.673-.876-.021-1.753.058-2.612.236a.28.28 0 00-.184.146.29.29 0 00-.012.237C8.745 20.283 11.117 21 13.044 21a9.068 9.068 0 002.864-.484c.924.315 1.89.478 2.864.485 1.927 0 4.3-.716 5.516-3.822a.29.29 0 00-.012-.237.28.28 0 00-.184-.147zm-3.233-.205a7.267 7.267 0 00-2.939.828.274.274 0 00-.129.074 4.86 4.86 0 00-1.453 1.315 6.942 6.942 0 00-.142-1.57c.336-1.449 1.2-2.682 2.576-3.67a9.662 9.662 0 012.51-1.266c.24 1.679.095 3.119-.423 4.289zm-4.91-6.917c.494.445 1.804 1.76 2.337 3.553a6.882 6.882 0 00-2.378 3.05 6.789 6.789 0 00-2.177-2.894c.339-1.239 1.081-2.484 2.219-3.709zm-5.415 2.626c.97.322 1.885.8 2.709 1.413a6.119 6.119 0 012.377 3.524 6.927 6.927 0 00-.142 1.57c-1.135-1.553-2.938-2.088-4.521-2.217-.518-1.17-.663-2.61-.423-4.289zm2.124 8.132c-2.096-.116-3.6-1.174-4.477-3.145 1.27-.22 5.847-.744 7.356 2.754a8.32 8.32 0 01-2.879.392v-.001zm6.5 0a8.336 8.336 0 01-2.88-.392c1.51-3.497 6.087-2.973 7.358-2.753-.878 1.971-2.382 3.029-4.479 3.146v-.001z"
          fillRule="nonzero"
          fill={`${props.fillColor}`}
        />
      </G>
    </Svg>
  );
}

SvgComponent.defaultProps = {
  fillColor: '#EB5F33',
};

export default SvgComponent;
