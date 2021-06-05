import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import IconTextInput from '../../components/IconTextInput';
import AppModal from '../../components/AppModal';
import Button, {GradientButton} from '../../components/Button';
import ImageBackgroundView from '../../components/ImageBackgroundView';

const LoginEmail = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <KeyboardAwareScrollView
          contentContainerStyle={[cs.flexGrow]}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={true}
          extraScrollHeight={moderateScale(20)}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={cs.displayFlex}>
              <View style={cs.topNavView}>
                <Button
                  onPress={props.navigateToGoBack}
                  innerType={1}
                  icon="left_arrow"
                  iconColor={colors.wecome_txt}
                  iconSize={25}
                  hasElevation={false}
                  outline
                  borderWidth={0}
                  height={60}
                />
              </View>
              <View style={cs.largetTxtWrpr}>
                <PoppinsTextMedium color={2} fontSize={30} style={cs.txtLeft}>
                  Proceed with email
                </PoppinsTextMedium>
              </View>
              <View style={[cs.paddedView, styles.loginView]}>
                <View>
                  <PoppinsTextMedium color={10} fontSize={15}>
                    ENTER VALID EMAIL ID
                  </PoppinsTextMedium>
                  <IconTextInput
                    onChangeText={email => props.updateState({email: email})}
                    value={props.email}
                    placeholder="email@address.com"
                    autoCapitalize="none"
                    placeholderColor={28}
                    color={2}
                    keyboardType="email-address"
                    fontType={10}
                    autoFocus={true}
                    fontSize={22}
                    rightComp={getIconRightComponent(props)}
                    editable={!props.showOtpView}
                    textRef={ref => props.setInputRef('email', ref)}
                    blurOnSubmit={true}
                    returnKeyType={'done'}
                    selectTextOnFocus={true}
                    onSubmitEditing={() => props.clickOnVerifyEmail()}
                  />
                </View>
                {props.showOtpView ? (
                  <View style={[styles.otpView]}>
                    <PoppinsTextMedium color={10} fontSize={15}>
                      ENTER OTP RECEIVED ON EMAIL
                    </PoppinsTextMedium>
                    <IconTextInput
                      onChangeText={otp => props.updateState({otp: otp})}
                      value={props.otp}
                      placeholder="1234"
                      placeholderColor={28}
                      color={2}
                      keyboardType="numeric"
                      maxLength={4}
                      fontType={10}
                      fontSize={22}
                      textRef={ref => props.setInputRef('otp', ref)}
                      blurOnSubmit={true}
                      returnKeyType={'done'}
                      selectTextOnFocus={true}
                      onSubmitEditing={() => props.clickOnVerifyEmail()}
                    />
                  </View>
                ) : null}
              </View>
              <View style={[cs.firstDataBottom, styles.buttonView]}>
                <GradientButton
                  textColor={1}
                  text={`${props.buttonTxt}`}
                  onPress={props.clickOnVerifyEmail}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </ImageBackgroundView>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const getIconRightComponent = props => {
  if (props.showOtpView) {
    return (
      <Button
        innerType={3}
        hasElevation={false}
        icon="cross"
        paddingLeftRight={0}
        iconSize={20}
        wrprStyle={styles.txtRightIconBtn}
        onPress={props.clearNumber}
      />
    );
  }
  return null;
};

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    marginTop: moderateScale(50),
  },
  otpView: {
    marginTop: moderateScale(35),
  },
  buttonView: {
    marginBottom: moderateScale(20),
  },
  txtRightIconBtn: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    padding: 0,
    marginTop: moderateScale(6),
    marginRight: moderateScale(8),
    backgroundColor: '#ff2e5761',
  },
});

LoginEmail.propTypes = {};

export default LoginEmail;
