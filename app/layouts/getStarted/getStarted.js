import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {globalStyle as gs} from '../../config/styles';
import images from '../../config/images';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {GradientButton, LineButton} from '../../components/Button';
import {moderateScale} from '../../lib/scalingUtils';
import ImageBackgroundView from '../../components/ImageBackgroundView';

const GetStarted = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <View style={styles.container}>
          <View style={styles.centerView}>
            <View style={styles.imageView}>
              <Image source={images.welcome} style={styles.yogaGirl} />
            </View>
            <View style={styles.centerInner}>
              <View style={styles.descView}>
                <View>
                  <Image
                    source={images.evecare_text_logo}
                    style={styles.txtLogoImg}
                  />
                  <PoppinsTextMedium fontSize={28} color={25}>
                    Welcomes you
                  </PoppinsTextMedium>
                </View>
              </View>
              <View style={styles.buttonsView}>
                <LineButton
                  onPress={props.navigateToSignIn}
                  text="New User"
                  borderWidth={2}
                  hasElevation={false}
                />

                <View style={styles.btnWrprBottom}>
                  <GradientButton
                    textColor={1}
                    text="Restore Data"
                    style={{marginTop: moderateScale(70)}}
                    onPress={props.navigateToSignup}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tncView}>
            <TouchableWithoutFeedback onPress={props.openTnCLink}>
              <PoppinsTextRegular color={26} fontSize={12}>
                I agree to terms and conditions by proceeding further
              </PoppinsTextRegular>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ImageBackgroundView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    height: hp('30%'),
  },
  yogaGirl: {
    height: '100%',
    resizeMode: 'contain',
  },
  centerView: {
    marginTop: moderateScale(20),
    justifyContent: 'center',
    flex: 1,
  },
  centerInner: {},
  descView: {
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  txtLogoImg: {
    height: moderateScale(38),
    width: moderateScale(125),
  },
  btnWrprBottom: {
    marginTop: moderateScale(30),
  },
  buttonsView: {
    marginTop: moderateScale(45),
    paddingLeft: moderateScale(30),
    paddingRight: moderateScale(30),
  },
  tncView: {
    alignItems: 'center',
    marginBottom: moderateScale(25),
    opacity: 0.7,
  },
});

GetStarted.propTypes = {};

export default GetStarted;
