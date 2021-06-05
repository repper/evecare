import React from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import {Shadow} from 'react-native-neomorph-shadows';

import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextRegular} from '../Text';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import Button from '../Button';
//Own Code
const {width, height} = Dimensions.get('window');

const ModalLocation = props => {
  let boxStyle = {};
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={props.backdropColor}
      onBackButtonPress={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}
      backdropOpacity={props.backdropOpacity}
      //animationIn={props.animationIn}
      animationInTiming={props.animationInTiming}
      //animationOut={props.animationOut}
      animationOutTiming={props.animationOutTiming}
      useNativeDriverForBackdrop={true}
      propagateSwipe={true}
      style={styles.modal}
      useNativeDriver={props.useNativeDriver}
    >
      <Shadow style={{...styles.wrpr, ...boxStyle}}>
        <View style={[styles.boxWrpr, boxStyle]}>
          <View style={styles.headingWrpr}>
            <PoppinsTextRegular color={1} fontSize={32}>
              {`Share your location`}
            </PoppinsTextRegular>
            <PoppinsTextRegular color={'rgba(255, 255, 255, 0.7)'} fontSize={12}>
              Sharing your location helps provide a better experience
            </PoppinsTextRegular>
          </View>
          <View style={styles.btnWrpr}>
            <Button
              paddingLeftRight={0}
              hasElevation={false}
              backColor={colors.white}
              textColor={'#d8557f'}
              textFontSize={18}
              text="Yes, please"
              onPress={props.onLocationAllow}
            />
            <TouchableWithoutFeedback onPress={props.onLocationDeny}>
              <PoppinsTextRegular color={'rgba(255, 255, 255, 0.7)'} fontSize={12} style={styles.noView}>
                No, thank you
              </PoppinsTextRegular>
            </TouchableWithoutFeedback>
          </View>
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
    backgroundColor: '#d8557f',
    width: width,
    height: height * 0.45,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    borderRadius: moderateScale(60),
  },
  boxWrpr: {
    width: width,
    height: height * 0.45,
    backgroundColor: '#d8557f',
    borderTopLeftRadius: moderateScale(43),
    borderTopRightRadius: moderateScale(43),
    paddingHorizontal: moderateScale(30),
  },
  btnWrpr: {
    paddingHorizontal: moderateScale(30),
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(50),
  },
  noView: {
    marginTop: moderateScale(12),
    textAlign: 'center',
    paddingVertical: moderateScale(8),
  },
  headingWrpr: {
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
  },
});

ModalLocation.defaultProps = {
  contentKey: 'locationModal',
  visible: false,
  backdropColor: '#fceff6',
  onBackdropPress: () => {},
  backdropOpacity: 0.6,
  animationIn: 'fadeIn',
  animationInTiming: 300,
  animationOut: 'fadeOut',
  animationOutTiming: 300,
  useNativeDriver: true,
};

export default ModalLocation;
