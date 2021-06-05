import React from 'react';
import Text from './Text';

const PoppinsTextExtraLight = props => {
	const {fontType, fontSize, children, ...otherProps} = props;
	let textFontSize = fontSize;
	if (!fontSize) {
		textFontSize = 14;
	}
	return (
		<Text fontType={13} fontSize={textFontSize} {...otherProps}>
			{children}
		</Text>
	);
};

PoppinsTextExtraLight.propTypes = {};

export default PoppinsTextExtraLight;
