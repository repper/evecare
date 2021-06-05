import React from 'react';
import Text from './Text';

const PoppinsTextSemiBold = props => {
	const {fontType, fontSize, children, ...otherProps} = props;
	let textFontSize = fontSize;
	if (!fontSize) {
		textFontSize = 14;
	}
	return (
		<Text fontType={8} fontSize={textFontSize} {...otherProps}>
			{children}
		</Text>
	);
};

PoppinsTextSemiBold.propTypes = {};

export default PoppinsTextSemiBold;
