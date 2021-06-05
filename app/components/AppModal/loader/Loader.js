import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Dimensions,
	Platform
} from "react-native";
import { colors } from "../../../config/styles";
import { scale, verticalScale, moderateScale } from "../../../lib/scalingUtils";

const Loader = props => {
	const { indicatorColor, size } = props;

	return (
		<View style={styles.loadingWrpr}>
			<ActivityIndicator size={size} color={indicatorColor} />
		</View>
	);
};

Loader.defaultProps = {
	indicatorColor: colors.yellow_color,
	size: "large"
};

const styles = StyleSheet.create({
	loadingWrpr: {
		alignItems: "center"
	}
});

export default Loader;
