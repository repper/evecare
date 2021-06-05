import React from 'react';
import Text from './Text';

const PoppinsTextMedium = props => {
  const {fontType, fontSize, children, ...otherProps} = props;
  let textFontSize = fontSize;
  if (!fontSize) {
    textFontSize = 14;
  }
  return (
    <Text fontType={10} fontSize={textFontSize} {...otherProps}>
      {children}
    </Text>
  );
};

PoppinsTextMedium.propTypes = {};

export default PoppinsTextMedium;
