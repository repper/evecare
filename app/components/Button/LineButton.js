import React from 'react';
import Button from './Button';

const LineButton = props => {
  const {text, ...otherProps} = props;
  return <Button text={text} textColor={2} outline {...otherProps} />;
};

export default LineButton;
