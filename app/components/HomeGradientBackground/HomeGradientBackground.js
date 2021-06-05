import React from 'react';
import {View, StyleSheet, Alert, ImageBackground} from 'react-native';
import {colors, globalStyle as gs} from '../../config/styles';
import LinearGradient from 'react-native-linear-gradient';

const HomeGradientBackground = props => {
	const {source, ...otherProps} = props;
	let parentStyle = [];
	if (props.style) {
		parentStyle.push(props.style);
	} else {
		parentStyle.push({flex: 1});
	}
	// let imageView = true;
	// if (
	// 	source == undefined ||
	// 	(typeof source == "string" && source.trim().length == 0)
	// ) {
	// 	imageView = false;
	// }
	// let gdStart = { x: 0.0, y: 0.5 };
	// let gdEnd = { x: 1, y: 1.5 };
	return (
		<LinearGradient
			// start={({x: 0.0, y: 0.2}, {x: 0.0, y: 0.2})}
			// end={{x: 1, y: 1}}
			colors={props.colorsArr}
			style={parentStyle}>
			{props.children}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	imageBgStyle: {
		flex: 1,
	},
});

HomeGradientBackground.propTypes = {};

export default HomeGradientBackground;
