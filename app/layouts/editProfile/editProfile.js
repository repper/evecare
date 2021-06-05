import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Shadow} from 'react-native-neomorph-shadows';
import Modal from 'react-native-modal';
import {colors, globalStyle as gs} from '../../config/styles';
import images from '../../config/images';
import Icon from '../../fonts/eveCareFont';
import cs from '../../config/commonStyles';
import GradientHeader from '../../components/GradientHeader';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {verticalScale, moderateScale} from '../../lib/scalingUtils';
import {convertCmToFeetInch} from '../../lib/util';
import IconTextInput from '../../components/IconTextInput';
import AppModal from '../../components/AppModal';
import Button, {GradientButton} from '../../components/Button';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import CameraModal from '../../components/CameraModal';
import {RNCamera} from 'react-native-camera';

const {width, height} = Dimensions.get('window');
//topViewHeightPercent: 48,
// bottomViewHeightPercent: 52,
const leftRightPadding = width * 0.0533;
const EditProfile = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView topViewHeightPercent={9} bottomViewHeightPercent={91}>
        <GradientHeader
          backIcon="left_arrow"
          title="Edit Profile"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={[cs.flexGrow]}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={true}
          behavior="padding"
          extraScrollHeight={moderateScale(20)}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={cs.displayFlex}>
              <TouchableWithoutFeedback onPress={props.clickOnImage}>
                <View style={styles.profileImageView}>
                  <View style={styles.imageWrprView}>
                    {props.imageData ? (
                      <Image
                        source={{
                          uri: props.imageData.uri,
                        }}
                        style={styles.imageView}
                      />
                    ) : props.user && props.user.profile_picture_url ? (
                      <Image
                        source={{
                          uri: props.user.profile_picture_url,
                        }}
                        style={styles.imageView}
                      />
                    ) : (
                      <Image
                        source={images.default_user}
                        style={styles.imageView}
                      />
                    )}
                    <TouchableWithoutFeedback onPress={props.openImagePicker}>
                      <View style={styles.plusView}>
                        <Icon
                          name={
                            props.user && props.user.profile_picture_url
                              ? 'pencil'
                              : 'plus_light'
                          }
                          color={colors.white}
                          size={moderateScale(14)}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <Shadow style={styles.profileCardHolder}>
                <View style={cs.displayFlex}>
                  <IconTextInput
                    onChangeText={txt => props.updateState({first_name: txt})}
                    value={props.first_name}
                    placeholder="Maria"
                    placeholderColor={43}
                    color={2}
                    maxLength={32}
                    fontType={10}
                    fontSize={18}
                    borderStyle={styles.inputBorderStyle}
                    textRef={props.inputs.first_name}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    selectTextOnFocus={true}
                    onSubmitEditing={() => props.focusNextField('last_name')}
                  />
                  <View style={styles.inputSpacerView} />
                  <IconTextInput
                    onChangeText={txt => props.updateState({last_name: txt})}
                    value={props.last_name}
                    placeholder="Joseph"
                    placeholderColor={43}
                    color={2}
                    maxLength={32}
                    fontType={10}
                    fontSize={18}
                    borderStyle={styles.inputBorderStyle}
                    textRef={props.inputs.last_name}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    selectTextOnFocus={true}
                    onSubmitEditing={() => props.focusNextField('email')}
                  />
                  <View style={styles.inputSpacerView} />
                  <IconTextInput
                    onChangeText={txt => props.updateState({email: txt})}
                    value={props.email}
                    placeholder="email@domain.com"
                    placeholderColor={43}
                    color={props.isEmailLocked ? 28 : 2}
                    maxLength={128}
                    fontType={10}
                    fontSize={18}
                    borderStyle={styles.inputBorderStyle}
                    textRef={props.inputs.email}
                    blurOnSubmit={false}
                    editable={!props.isEmailLocked}
                    returnKeyType={'next'}
                    selectTextOnFocus={true}
                    onSubmitEditing={() => props.focusNextField('mobile')}
                  />
                  <View style={styles.inputSpacerView} />
                  <IconTextInput
                    onChangeText={txt => props.updateState({mobile: txt})}
                    value={props.mobile}
                    placeholder="9890123456"
                    placeholderColor={43}
                    color={props.isMobileLocked ? 28 : 2}
                    keyboardType="numeric"
                    fontType={10}
                    leftText="+91"
                    maxLength={32}
                    fontSize={18}
                    borderStyle={styles.inputBorderStyle}
                    textRef={props.inputs.mobile}
                    blurOnSubmit={true}
                    editable={!props.isMobileLocked}
                    returnKeyType={'done'}
                    selectTextOnFocus={true}
                  />
                  <View style={styles.inputSpacerView} />
                  <View style={styles.heightMainWrpr}>
                    <PoppinsTextRegular color={2} fontSize={20}>
                      Height
                    </PoppinsTextRegular>
                    <TouchableWithoutFeedback
                      activeOpacity={0.8}
                      onPress={props.navigateToEditHeight}>
                      <View style={[cs.flexRow, {alignItems: 'flex-end'}]}>
                        {props.units.height === 'cm'
                          ? getCmView(props)
                          : getFeetInchView(props)}
                        <Icon
                          name="edit"
                          size={18}
                          color={colors.red_light}
                          style={{
                            marginBottom: moderateScale(10),
                          }}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View style={[cs.firstDataBottom, styles.buttonView]}>
                  <GradientButton
                    textColor={1}
                    text="Update"
                    onPress={props.clickOnUpdateProfile}
                  />
                </View>
              </Shadow>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </BackgroundWaveView>
      <CameraModal
        isOpen={props.cameraModalVisible}
        onCameraPress={props.onCameraSelect}
        onGalleryPress={props.onGallerySelect}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModalView}
        onRequestClose={props.closeModalView}>
        <View style={styles.modalContainer}>
          <RNCamera
            ref={props.cameraRefs}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            type={RNCamera.Constants.Type.front}
            playSoundOnCapture={false}
            captureQuality="1080p"
            style={styles.preview}>
            <TouchableWithoutFeedback onPress={() => props._takePicture()}>
              <View style={styles.captureButtonView}>
                <View style={styles.capture} />
              </View>
            </TouchableWithoutFeedback>
          </RNCamera>
        </View>
      </Modal>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const getFeetInchView = props => {
  const convHeight = convertCmToFeetInch(props.userHeight);
  const feetVal = convHeight[0];
  const decimalVal = convHeight[1];
  return (
    <View style={[cs.flexRow]}>
      <View style={styles.heightValWrpr}>
        <PoppinsTextRegular
          color={34}
          fontSize={20}
          style={styles.heightValTxt}>
          {`${feetVal}`}
        </PoppinsTextRegular>
        <PoppinsTextRegular color={28} fontSize={14}>
          (ft)
        </PoppinsTextRegular>
      </View>
      <View style={[cs.flexRow, styles.heightValWrpr]}>
        <PoppinsTextRegular
          color={34}
          fontSize={20}
          style={styles.heightValTxt}>
          {`${decimalVal}`}
        </PoppinsTextRegular>
        <PoppinsTextRegular color={28} fontSize={14}>
          (in)
        </PoppinsTextRegular>
      </View>
    </View>
  );
};

const getCmView = props => {
  return (
    <View style={styles.heightValWrpr}>
      <PoppinsTextRegular color={34} fontSize={20} style={styles.heightValTxt}>
        {`${props.userHeight}`}
      </PoppinsTextRegular>
      <PoppinsTextRegular color={28} fontSize={14}>
        (cm)
      </PoppinsTextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageView: {
    marginTop: moderateScale(45),
    alignItems: 'center',
  },
  imageWrprView: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(100) / 2,
    backgroundColor: '#fff7fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(90) / 2,
  },
  plusView: {
    height: moderateScale(36),
    width: moderateScale(36),
    borderRadius: moderateScale(36) / 2,
    backgroundColor: colors.red_light,
    borderColor: colors.white,
    borderWidth: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: moderateScale(65),
    bottom: 0,
  },
  profileCardHolder: {
    marginTop: moderateScale(30),
    marginLeft: leftRightPadding,
    marginBottom: moderateScale(40),
    height: moderateScale(500),
    width: width - leftRightPadding * 2,
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(20),
    shadowColor: '#e8c5d881',
    backgroundColor: colors.white,
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: moderateScale(9),
    shadowOffset: {width: 0, height: 0},
  },
  inputBorderStyle: {
    backgroundColor: colors.bg_pink,
    opacity: 1,
  },
  inputSpacerView: {
    height: moderateScale(30),
  },
  heightMainWrpr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heightValWrpr: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomColor: colors.bg_pink,
    borderBottomWidth: moderateScale(1),
    marginBottom: moderateScale(3),
    marginRight: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  heightValTxt: {
    lineHeight: moderateScale(22),
    marginRight: moderateScale(6),
  },
  modalContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButtonView: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderColor: '#fff',
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(40),
  },
  capture: {
    flex: 0,
    height: moderateScale(40),
    width: moderateScale(40),
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(20),
  },
});

EditProfile.propTypes = {};

export default EditProfile;
