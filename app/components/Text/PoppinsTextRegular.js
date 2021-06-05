import React from 'react';
import Text from './Text';

const PoppinsTextRegular = props => {
  const {fontType, fontSize, children, ...otherProps} = props;
  let textFontSize = fontSize;
  if (!fontSize) {
    textFontSize = 14;
  }
  return (
    <Text fontType={11} fontSize={textFontSize} {...otherProps}>
      {children}
    </Text>
  );
};

PoppinsTextRegular.propTypes = {};

export default PoppinsTextRegular;
