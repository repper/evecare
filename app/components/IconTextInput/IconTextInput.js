import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import {colors, globalStyle as gs} from '../../config/styles';
import TextInput from '../TextInput';
import Icon from '../../fonts/eveCareFont';
import {moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium} from '../Text';
const {width} = Dimensions.get('window');

const IconTextInput = props => {
  const {
    leftText,
    rightText,
    placeholder,
    elevation,
    fontSize,
    fontType,
    icon,
    color,
    sizeIcon,
    onLeftIconClick,
    onPress,
    onPressRight,
    value,
    rightComp,
    borderStyle,
    ...otherProps
  } = props;
  let textColor = color ? color : colors.black;
  let textFontSize = fontSize ? fontSize : 16;
  let textFontType = fontType ? fontType : 10;
  let hasElevation = elevation ? true : false;
  let hasIcon = icon ? true : false;
  let leftIcon = icon ? icon : 'search';
  let iconSize = sizeIcon ? sizeIcon : 10;
  let hasRightView = rightText ? true : false;
  let righttxt = rightText ? rightText : false;

  if (hasElevation) {
    return (
      <ElevatedView
        elevation={elevation}
        style={[styles.wrprView, props.parentStyle]}>
        {getTextInput(
          placeholder,
          textColor,
          textFontSize,
          textFontType,
          onPress,
          value,
          otherProps,
        )}
        {getLeftView(
          hasIcon,
          leftIcon,
          onLeftIconClick,
          leftText,
          textFontSize,
          iconSize,
          onPress,
        )}
      </ElevatedView>
    );
  } else {
    return (
      <View>
        <View style={[styles.wrprView, props.parentStyle]}>
          {getLeftView(
            hasIcon,
            leftIcon,
            onLeftIconClick,
            leftText,
            textFontSize,
            iconSize,
            onPress,
          )}
          {getTextInput(
            placeholder,
            textColor,
            textFontSize,
            textFontType,
            onPress,
            value,
            otherProps,
          )}
          {rightComp ? rightComp : null}
        </View>
        <View style={[styles.borderView, borderStyle]} />
      </View>
    );
  }
};

const getLeftView = (
  hasIcon,
  leftIcon,
  onLeftIconClick,
  leftText,
  textFontSize,
  iconSize,
) => {
  let viewStyle = [styles.iconWrpr];
  if (!hasIcon && !leftText) {
    viewStyle.push({paddingRight: 0});
  }
  if (typeof onLeftIconClick != 'function') {
    onLeftIconClick = () => {};
  }
  return (
    <View style={viewStyle}>
      {hasIcon ? (
        <Icon
          name={leftIcon}
          size={iconSize}
          color={colors.red_light}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 0,
          }}
        />
      ) : (
        <PoppinsTextMedium
          color={28}
          fontSize={textFontSize}
          style={{marginTop: 5}}>
          {leftText}
        </PoppinsTextMedium>
      )}
    </View>
  );
};
const getTextInput = (
  placeholder,
  textColor,
  textFontSize,
  textFontType,
  onPress,
  value,
  otherProps,
) => {
  let {style, textRef, ...textProps} = otherProps;
  if (typeof textRef == 'undefined') {
    textRef = () => {};
  }
  let textStyle = [styles.textInputStyle, style];
  return (
    <TextInput
      placeholder={placeholder}
      fontColor={textColor}
      fontSize={textFontSize}
      fontType={textFontType}
      style={textStyle}
      value={value}
      onPress={onPress}
      textRef={textRef}
      selectionColor={Platform.OS === 'ios' ? colors.red_light : '#ffdee4'}
      {...textProps}
    />
  );
};

const getRightView = (
  hasRightView,
  textColor,
  textFontSize,
  textFontType,
  righttxt,
  onPressRight,
  otherProps,
) => {
  if (typeof onPressRight != 'function') {
    onPressRight = () => {};
  }
  return (
    <View style={styles.rightTextView}>
      <TouchableOpacity onPress={onPressRight}>
        {hasRightView ? (
          <PoppinsTextMedium color={10} fontSize={16}>
            {righttxt}
          </PoppinsTextMedium>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrprView: {
    flexDirection: 'row',
    height: moderateScale(45, 0.4),
    //backgroundColor: colors.white,
    borderRadius: moderateScale(3),
  },
  iconWrpr: {
    //paddingLeft: moderateScale(10),
    paddingRight: moderateScale(20),
    justifyContent: 'center',
  },
  textInputStyle: {
    padding: 0,
    flex: 1,
  },
  rightTextView: {
    marginRight: moderateScale(15),
    marginTop: moderateScale(7),
  },
  borderView: {
    height: 1,
    backgroundColor: '#979797',
    opacity: 0.25,
  },
});

export default IconTextInput;
