import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import styles, {logoWidth, imageMargin} from './styles';
import ElevatedView from 'react-native-elevated-view';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';

import {PoppinsTextRegular} from '../../components/Text';

class Button extends Component {
  static propTypes = {
    idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    text: 'Button',
    btnStyle: {},
    textColor: 1,
    textFontSize: 16,
    icon: 'right_arrow_tail',
    hasIcon: false,
    isBlock: true,
    iconColor: colors.white,
    iconSize: 24,
    backColor: colors.red_light,
    underlayColor: colors.red_light,
    activeOpacity: 0.8,
    alignSelf: 'stretch',
    centerVertical: true,
    centerHorizontal: true,
    borderColor: colors.red_light,
    borderWidth: 1,
    textPosition: 'center',
    height: 46,
    borderRadius: 25,
    buttonType: 1,
    hasElevation: true,
    elevation: 2,
    paddingLeftRight: 20,
    hasPressAnimation: true,
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  };

  constructor(props) {
    super(props);
    this.rowTypes = [1, 2];
    this.animation = null;
    this.animationScale = null;
    if (props.hasPressAnimation) {
      this.animation = new Animated.Value(0);
      this.animationScale = this.animation.interpolate({
        inputRange: props.inputRange,
        outputRange: props.outputRange,
      });
    }
  }

  onPressIn = () => {
    Animated.spring(this.animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  onPressOut = () => {
    Animated.spring(this.animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      buttonType,
      idx,
      activeOpacity,
      underlayColor,
      onPress,
      ...otherProps
    } = this.props;
    switch (buttonType) {
      case 1:
        if (otherProps.hasPressAnimation && this.animation) {
          return (
            <Animated.View
              style={[{transform: [{scale: this.animationScale}]}]}>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={onPress}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}>
                {this.getInnerView(otherProps)}
              </TouchableOpacity>
            </Animated.View>
          );
        }
        return (
          <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
            {this.getInnerView(otherProps)}
          </TouchableOpacity>
        );
      case 2:
        if (otherProps.hasPressAnimation && this.animation) {
          return (
            <Animated.View
              style={[{transform: [{scale: this.animationScale}]}]}>
              <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}>
                {this.getInnerView(otherProps)}
              </TouchableWithoutFeedback>
            </Animated.View>
          );
        }
        return (
          <TouchableWithoutFeedback onPress={onPress}>
            {this.getInnerView(otherProps)}
          </TouchableWithoutFeedback>
        );
      default:
        return (
          <TouchableHighlight onPress={onPress} underlayColor={underlayColor}>
            {this.getInnerView(otherProps)}
          </TouchableHighlight>
        );
    }
  }

  getInnerView(props) {
    let {innerComponent, innerType, ...otherProps} = props;
    if (innerComponent && typeof innerComponent === 'function') {
      return innerComponent();
    }
    otherProps['innerType'] = innerType;
    switch (innerType) {
      case 1:
        return this.getTextRightIconView(otherProps);
      case 2:
        return this.getTextLeftIconView(otherProps);
      case 3:
        return this.getIconView(otherProps);
      default:
        return this.getPlainButton(otherProps);
    }
  }

  getWrapperStyle(props) {
    let wrprStyle = [];
    let wrprHeight = moderateScale(props.height, 0.5);
    let defaultStyle = {
      height: wrprHeight,
      borderRadius: wrprHeight / 2,
    };
    if (props.hasOwnProperty('outline')) {
      defaultStyle['backgroundColor'] = 'transparent';
      defaultStyle['borderColor'] = props.backColor
        ? props.backColor
        : props.borderColor;
      defaultStyle['borderWidth'] = props.borderWidth;
    } else {
      defaultStyle['backgroundColor'] = props.backColor;
    }

    if (props.hasOwnProperty('paddingLeftRight')) {
      defaultStyle['paddingLeft'] = scale(props.paddingLeftRight);
      defaultStyle['paddingRight'] = scale(props.paddingLeftRight);
    }

    if (props.isBlock) {
      // defaultStyle["flex"] = 1;
    }

    let hasRowView = this.rowTypes.indexOf(props.innerType) >= 0;

    if (hasRowView) {
      defaultStyle['flexDirection'] = 'row';
    }

    if (props.centerVertical && hasRowView) {
      defaultStyle['alignItems'] = 'center';
    } else {
      defaultStyle['justifyContent'] = 'center';
    }

    wrprStyle.push(defaultStyle);
    if (props.wrprStyle) {
      wrprStyle.push(props.wrprStyle);
    }
    return wrprStyle;
  }

  getTextRightIconView(props) {
    let wrprStyle = this.getWrapperStyle(props);
    if (props.hasElevation) {
      wrprStyle.push({marginBottom: scale(5)});
      return (
        <ElevatedView style={wrprStyle} elevation={props.elevation}>
          {this.getTextComponent(props)}
          {this.getIconComponent(props)}
        </ElevatedView>
      );
    } else {
      return (
        <View style={wrprStyle}>
          {this.getTextComponent(props)}
          {this.getIconComponent(props)}
        </View>
      );
    }
  }

  getTextLeftIconView(props) {
    let wrprStyle = this.getWrapperStyle(props);
    if (props.hasElevation) {
      wrprStyle.push({marginBottom: scale(5)});
      return (
        <ElevatedView style={wrprStyle} elevation={props.elevation}>
          {this.getTextComponent(props)}
          {this.getIconComponent(props)}
        </ElevatedView>
      );
    } else {
      return (
        <View style={wrprStyle}>
          {this.getIconComponent(props)}
          {this.getTextComponent(props)}
        </View>
      );
    }
  }

  getIconView(props) {
    let wrprStyle = this.getWrapperStyle(props);
    if (props.hasElevation) {
      wrprStyle.push({marginBottom: scale(5)});
      return (
        <ElevatedView style={wrprStyle} elevation={props.elevation}>
          {this.getIconComponent(props)}
        </ElevatedView>
      );
    } else {
      return <View style={wrprStyle}>{this.getIconComponent(props)}</View>;
    }
  }

  getPlainButton(props) {
    let wrprStyle = this.getWrapperStyle(props);
    if (props.hasElevation) {
      wrprStyle.push({marginBottom: scale(10)});
      return (
        <ElevatedView style={wrprStyle} elevation={props.elevation}>
          {this.getTextComponent(props)}
        </ElevatedView>
      );
    } else {
      return <View style={wrprStyle}>{this.getTextComponent(props)}</View>;
    }
  }

  getTextComponent(props) {
    let {innerTextType, text, textColor, textFontSize, ...otherProps} = props;
    let btnText = 'Button';
    if (text && text.length > 0) {
      btnText = text;
    }
    let textStyle = this.getTextStyle(props);
    if (otherProps.textStyle) {
      if (Array.isArray(otherProps.textStyle)) {
        textStyle.push(...otherProps.textStyle);
      } else {
        textStyle.push(otherProps.textStyle);
      }
    }
    switch (innerTextType) {
      case 1:
        return (
          <PoppinsTextRegular
            color={textColor}
            fontSize={textFontSize}
            style={textStyle}>
            {btnText}
          </PoppinsTextRegular>
        );
      default:
        return (
          <PoppinsTextRegular
            color={textColor}
            fontSize={textFontSize}
            style={textStyle}>
            {btnText}
          </PoppinsTextRegular>
        );
    }
  }

  getTextStyle(props) {
    let textStyle = [];

    switch (props.innerType) {
      case 1:
        textStyle.push({flex: 1, textAlign: 'center'});
        break;
      case 2:
        textStyle.push({flex: 1, textAlign: 'center'});
        break;
      default:
        textStyle.push({textAlign: 'center'});
        break;
    }

    return textStyle;
  }

  getIconComponent(props) {
    const {iconColor, iconSize, icon} = props;
    if (typeof icon === 'function') {
      return props.icon();
    }
    return <Icon color={iconColor} name={icon} size={iconSize} />;
  }
}

export default Button;
