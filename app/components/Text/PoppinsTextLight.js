import React from 'react';
import Text from './Text';

const PoppinsTextLight = props => {
	const {fontType, fontSize, children, ...otherProps} = props;
	let textFontSize = fontSize;
	if (!fontSize) {
		textFontSize = 14;
	}
	return (
		<Text fontType={12} fontSize={textFontSize} {...otherProps}>
			{children}
		</Text>
	);
};

PoppinsTextLight.propTypes = {};

export default PoppinsTextLight;
