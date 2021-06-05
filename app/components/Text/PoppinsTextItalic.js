import React from 'react';
import Text from './Text';

const PoppinsTextItalic = props => {
	const {fontType, fontSize, children, ...otherProps} = props;
	let textFontSize = fontSize;
	if (!fontSize) {
		textFontSize = 14;
	}
	return (
		<Text fontType={14} fontSize={textFontSize} {...otherProps}>
			{children}
		</Text>
	);
};

PoppinsTextItalic.propTypes = {};

export default PoppinsTextItalic;
