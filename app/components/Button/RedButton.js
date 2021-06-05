import React from 'react';
import {colors} from '../../config/styles';
import Button from './Button';

const RedButton = props => {
  const {text, ...otherProps} = props;
  return <Button text={text} backColor={props.backColor} {...otherProps} />;
};

RedButton.defaultProps = {
  backColor: colors.btn_back_color,
};

export default RedButton;
