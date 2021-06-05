import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../config/styles';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../../components/Text';
import Button, {LineButton} from '../../../components/Button';
import Icon from '../../../fonts/eveCareFont';
import {scale, verticalScale, moderateScale} from '../../../lib/scalingUtils';

const {width} = Dimensions.get('window');

let alertWrprWidthPer = 0.95;
let modalMargin = width - width * alertWrprWidthPer;
let viewWidth = width - modalMargin * 2;

const Alert = props => {
  let btnWrprStyle = [styles.buttonWrpr];
  if (props.buttons.length > 1) {
    //btnWrprStyle.push({justifyContent: 'space-between'});
  }
  return (
    <View style={styles.alertWrpr}>
      <View style={styles.alertBox}>
        <View style={styles.contentView}>
          {getTopIconView(props)}
          {getTitleView(props)}
          {getMessageView(props)}
          <View style={btnWrprStyle}>{getButtons(props)}</View>
        </View>
      </View>
    </View>
  );
};

const getTopIconView = props => {
  if (props.type === 'success') {
  }
  return (
    <View style={[styles.iconWrpr]}>
      <View style={[styles.iconCircle]}>
        <Icon name="cross" color={colors.white} size={moderateScale(30)} />
      </View>
    </View>
  );
};

const getTitleView = props => {
  if (props.title && props.title.length > 0) {
    return (
      <View style={[styles.titleWrpr]}>
        <PoppinsTextMedium
          color={props.titleColor}
          fontSize={props.titleFontSize}>
          {props.title}
        </PoppinsTextMedium>
      </View>
    );
  }
  return null;
};

const getMessageView = props => {
  if (props.message && props.message.length > 0) {
    let messageStyle = [];
    if (!props.title) {
      // messageStyle.push(styles.topMargin);
    } else {
      messageStyle.push({marginTop: moderateScale(5)});
    }
    messageStyle.push(styles.messageWrpr);
    return (
      <View style={messageStyle}>
        <PoppinsTextRegular
          color={props.messageColor}
          fontSize={props.messageFontSize}
          style={styles.messageTextWrpr}>
          {props.message}
        </PoppinsTextRegular>
      </View>
    );
  }
  return null;
};

const getButtons = props => {
  let buttons = [];
  let minWidth = viewWidth - 20;
  if (props.buttons.length > 1) {
    minWidth = viewWidth / 2 - 20;
  }

  for (var counter = 0; counter < props.buttons.length; counter++) {
    let btn = props.buttons[counter];
    let onPress = btn.onPress
      ? () => btn.onPress(props, btn)
      : props.onBackdropPress;
    if (btn.type == 'line') {
      buttons[counter] = (
        <LineButton
          key={`mdl_btn_${counter}`}
          onPress={onPress}
          text={btn.title}
          backColor={colors.pale_red}
          hasElevation={false}
          wrprStyle={[[styles.btnStyle, {minWidth: minWidth}]]}
        />
      );
    } else {
      buttons[counter] = (
        <Button
          key={`mdl_btn_${counter}`}
          onPress={onPress}
          text={btn.title}
          width={moderateScale(120)}
          backColor={colors.red_light}
          wrprStyle={[styles.btnStyle, {minWidth: minWidth}]}
        />
      );
    }
  }
  return buttons;
};

Alert.defaultProps = {
  title: '',
  titleFontSize: 24,
  titleColor: 2,
  message: '',
  messageColor: 3,
  messageFontSize: 16,
  buttons: [{title: 'Ok', dismissModal: true}],
};

const styles = StyleSheet.create({
  alertWrpr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBox: {
    width: viewWidth,
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
  },
  alertTopLine: {
    height: moderateScale(8),
  },
  contentView: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    paddingBottom: moderateScale(25),
    paddingTop: moderateScale(60),
  },
  titleWrpr: {
    alignItems: 'center',
  },
  messageWrpr: {},
  messageTextWrpr: {
    textAlign: 'center',
  },
  buttonWrpr: {
    flexDirection: 'row',
    marginTop: moderateScale(30),
    justifyContent: 'center',
    //margin: moderateScale(10),
    alignItems: 'center',
    width: viewWidth,
    alignSelf: 'center',
  },
  btnStyle: {
    minWidth: moderateScale(120),
    margin: moderateScale(10),
  },
  iconWrpr: {
    position: 'absolute',
    top: -moderateScale(30),
    left: moderateScale(15),
    width: '100%',
    alignItems: 'center',
  },
  iconCircle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderColor: colors.white,
    borderWidth: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red_light,
  },
});

export default Alert;
