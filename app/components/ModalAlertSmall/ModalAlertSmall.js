import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Shadow} from 'react-native-neomorph-shadows';

import {moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium, PoppinsTextRegular} from '../Text';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import BottomButtons from '../BottomButtons';
//Own Code
const {width, height} = Dimensions.get('window');

const ModalAlertSmall = props => {
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={props.backdropColor}
      onBackButtonPress={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}
      backdropOpacity={props.backdropOpacity}
      animationIn={props.animationIn}
      animationInTiming={props.animationInTiming}
      animationOut={props.animationOut}
      animationOutTiming={props.animationOutTiming}
      useNativeDriverForBackdrop={true}
      propagateSwipe={true}
      style={styles.modal}
      useNativeDriver={props.useNativeDriver}>
      <Shadow style={styles.wrpr}>
        <View style={styles.lineWrpr}>
          <View style={styles.headerLine} />
        </View>
        <View style={styles.boxWrpr}>
          <View style={styles.headingWrpr}>
            <PoppinsTextMedium color={2} fontSize={24}>
              {props.title}
            </PoppinsTextMedium>
            <PoppinsTextRegular
              color={3}
              fontSize={16}
              style={styles.messageTextWrpr}>
              {props.message}
            </PoppinsTextRegular>
          </View>
          <BottomButtons
            showButton={true}
            showBottomTxt={false}
            onDelete={props.onBackdropPress}
            onSave={props.onClickConfirmAlert}
            leftBtnTxt={props.cancelTxt}
            updateText={props.saveTxt}
          />
        </View>
      </Shadow>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrpr: {
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    width: width,
    height: height * 0.3,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    borderRadius: moderateScale(60),
  },
  lineWrpr: {
    alignItems: 'center',
  },
  headerLine: {
    height: moderateScale(6),
    backgroundColor: colors.tnc_text_color,
    borderRadius: moderateScale(6),
    width: moderateScale(width * 0.3),
  },
  boxWrpr: {
    width: width,
    height: height * 0.3,
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(43),
    borderTopRightRadius: moderateScale(43),
  },
  headingWrpr: {
    alignItems: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
    flex: 0.75,
  },
  messageTextWrpr: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
});

ModalAlertSmall.defaultProps = {
  visible: false,
  backdropColor: colors.white,
  onBackdropPress: () => {},
  backdropOpacity: 0.6,
  animationIn: 'slideInUp',
  animationInTiming: 300,
  animationOut: 'slideOutDown',
  animationOutTiming: 300,
  useNativeDriver: true,
  title: 'Delete',
  message: 'Are you sure, you want to delete this period?',
  cancelTxt: 'Cancel',
  saveTxt: 'Delete',
};

export default ModalAlertSmall;
