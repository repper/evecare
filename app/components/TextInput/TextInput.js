import React, {Component} from "react";
import {TextInput as ReactTextInput, View} from "react-native";
import {colors, colorTypes} from "../../config/styles";
import styles from "./styles";
import {scale, verticalScale, moderateScale} from "../../lib/scalingUtils";
class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onPress,
      fontColor,
      placeholderColor,
      fontType,
      fontSize,
      style,
      isItalic,
      ...textProps
    } = this.props;
    let {textRef, ...otherProps} = textProps;
    let textColor = fontColor ? fontColor : 2;
    let textPlaceholderColor = placeholderColor ? placeholderColor : 2;
    let txtStyle = [styles.textStyle, getTextStyle(fontType, fontSize, isItalic, textColor, style)];
    if (typeof textRef == "undefined") {
      textRef = () => {};
    }

    return (
      <ReactTextInput
        style={txtStyle}
        underlineColorAndroid={"transparent"}
        placeholderTextColor={colorTypes[textPlaceholderColor]}
        selectionColor={"#ff2e56"}
        ref={textRef}
        {...otherProps}
      />
    );
  }
}

const getTextStyle = (fontType, fontSize, isItalic, color, style) => {
  let txtStyle = [];
  let fontName = "Poppins-Regular";
  if (!fontSize) {
    fontSize = 14;
  }
  fontSize = moderateScale(fontSize, 0.4);
  switch (fontType) {
    case 1:
      fontName = "Poppins-Regular";
      break;
    case 2:
      fontName = "Poppins-Medium";
      break;
    case 3:
      fontName = "Poppins-SemiBold";
      break;
  }

  txtStyle.push({fontFamily: fontName});
  txtStyle.push({fontSize: fontSize});
  if (isItalic) {
    txtStyle.push({fontStyle: "italic"});
  }
  if (typeof color === "number") {
    txtStyle.push({color: colorTypes[color]});
  } else if (typeof color === "string") {
    txtStyle.push({color: color});
  } else {
    txtStyle.push({color: colorTypes[1]});
  }
  if (style) {
    txtStyle.push(style);
  }
  return txtStyle;
};

TextInput.defaultProps = {
  fontType: 2,
  defaultValue: "",
};

ReactTextInput.defaultProps = ReactTextInput.defaultProps || {};
ReactTextInput.defaultProps.allowFontScaling = false;

export default TextInput;
