import React from "react";
import {Text as ReactText} from "react-native";
import {colors, colorTypes, globalStyle as gs} from "../../config/styles";
import {scale, verticalScale, moderateScale} from "../../lib/scalingUtils";

const Text = props => {
  const {children, maxLetters, fontType, fontSize, isItalic, color, style, ...otherProps} = props;
  let txtStyle = getTextStyle(fontType, fontSize, isItalic, color, style);
  let text = "";
  if (children && (typeof children == "string" || typeof children == "object")) {
    text = children;
    if (
      maxLetters &&
      typeof maxLetters == "number" &&
      typeof children == "string" &&
      text.length > maxLetters
    ) {
      text = text.substring(0, maxLetters - 3) + "...";
    }
  }
  return (
    <ReactText allowFontScaling={false} style={[txtStyle]} {...otherProps}>
      {text}
    </ReactText>
  );
};

const getTextStyle = (fontType, fontSize, isItalic, color, style) => {
  let txtStyle = [];
  //For reference use this link, order is starts from 1
  let fontName = "";
  if (!fontSize) {
    fontSize = 14;
  }
  fontSize = moderateScale(fontSize);
  switch (fontType) {
    case 8:
      fontName = "Poppins-SemiBold";
      break;
    case 10:
      fontName = "Poppins-Medium";
      break;
    case 11:
      fontName = "Poppins-Regular";
      break;
    case 12:
      fontName = "Poppins-Light";
      break;
    case 13:
      fontName = "Poppins-ExtraLight";
      break;
    case 14:
      fontName = "Poppins-Italic";
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

Text.propTypes = {};

// const colorTypes = {
// 	1: colors.white,
// 	2: colors.red_light,
// 	3: colors.black_light,
// 	4: colors.black_light1,
// 	5: colors.black,
// 	6: colors.grey,
// 	7: colors.brown,
// 	8: colors.walk_discuss_txt,
// 	9: colors.walk_discrptn_txt,
// 	10: colors.wecome_txt,
// };

ReactText.defaultProps = ReactText.defaultProps || {};
ReactText.defaultProps.allowFontScaling = false;

export default Text;
