import React from 'react';
import {View, Image, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../config/images';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium} from '../../components/Text';
import Button, {GradientButton} from '../../components/Button';
import {scale, moderateScale, verticalScale} from '../../lib/scalingUtils';
import GoogleSvg from '../../components/SvgIcon/googleIconSvg';
import AppModal from '../../components/AppModal';
import ImageBackgroundView from '../../components/ImageBackgroundView';

const Signup = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <View style={cs.displayFlex}>
          <View style={[styles.topView, props.showSkip ? {justifyContent: 'flex-end'} : {}]}>
            {!props.showSkip ? (
              <Button
                onPress={props.handleBackButtonClick}
                innerType={1}
                icon="left_arrow"
                iconColor={colors.wecome_txt}
                iconSize={25}
                hasElevation={false}
                outline
                borderWidth={0}
                height={60}
              />
            ) : null}
            {props.showSkip ? (
              <Button
                text="Skip"
                onPress={props.handleBackButtonClick}
                hasElevation={false}
                outline
                textColor={2}
                borderWidth={0}
                height={50}
              />
            ) : null}
          </View>
          <View style={styles.imageView}>
            <Image source={images.signup_logo} style={styles.logo_img} />
          </View>
          <View style={styles.singupView}>
            <PoppinsTextMedium color={14} fontSize={16} style={[cs.txtCenter]}>
              Sign in and synchronize your data to access your information later!
            </PoppinsTextMedium>

            <View style={styles.singupViewInner}>
              <Button
                onPress={props.clickOnGoogleSignIn}
                innerType={2}
                icon={getGoogleIcon}
                wrprStyle={styles.nextButton}
                hasElevation={false}
                text="Proceed with google"
                textColor={27}
                textFontSize={15}
                textStyle={styles.buttonTxtStyleGoogle}
                centerVertical
                backColor={colors.white}
              />
              {Platform.OS === 'ios' ? (
                <Button
                  onPress={props.clickOnAppleSignIn}
                  innerType={2}
                  icon="apple"
                  wrprStyle={styles.nextButton}
                  hasElevation={false}
                  text="Proceed with Apple Id"
                  textColor={1}
                  textFontSize={15}
                  textStyle={styles.buttonTxtStyle}
                  centerVertical
                  backColor={colors.black}
                />
              ) : null}
              <Button
                onPress={props.clickOnEmailBtn}
                innerType={2}
                icon="email"
                iconColor={colors.red_light}
                iconSize={scale(18)}
                wrprStyle={styles.nextButton}
                hasElevation={false}
                text="Proceed with email"
                textColor={27}
                textFontSize={15}
                textStyle={styles.buttonTxtStyle}
                centerVertical
                backColor={colors.white}
              />
              <Button
                onPress={props.clickOnFacebookLogin}
                innerType={2}
                icon="facebook"
                iconColor={colors.white}
                iconSize={scale(18)}
                wrprStyle={styles.nextButton}
                hasElevation={false}
                text="Proceed with facebook"
                textColor={1}
                textFontSize={15}
                textStyle={styles.buttonTxtStyle}
                centerVertical
                backColor={colors.facebook_back}
              />
              <GradientButton
                onPress={props.clickOnNumberLogin}
                icon="mobile"
                iconColor={colors.white}
                iconSize={scale(18)}
                text="Proceed with number"
                fontSize={15}
              />
            </View>
          </View>
        </View>
      </ImageBackgroundView>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const getGoogleIcon = () => {
  return <GoogleSvg height={scale(20)} width={scale(20)} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageView: {
    alignItems: 'center',
  },
  logo_img: {
    height: Platform.OS === 'ios' ? hp('26%') : hp('30%'),
    marginTop: hp('2%'),
    resizeMode: 'contain',
  },
  buttonTxtStyle: {
    height: moderateScale(17),
    lineHeight: moderateScale(19),
  },
  buttonTxtStyleGoogle: {
    height: moderateScale(21),
    lineHeight: moderateScale(23),
  },
  singupView: {
    paddingLeft: moderateScale(40),
    paddingRight: moderateScale(40),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    justifyContent: 'space-evenly',
    flex: 1,
  },
  singupViewInner: {
    flex: Platform.OS === 'ios' ? 1 : 0.8,
    justifyContent: 'space-evenly',
  },
});

Signup.propTypes = {};

export default Signup;
