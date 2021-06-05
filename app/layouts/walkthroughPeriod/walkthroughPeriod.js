import React from 'react';
import {View, Image, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../../config/images';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import BgWalkSvg from '../../components/SvgIcon/bgWalkCurve';
import WalkthroughBottom from '../../components/WalkthroughBottom';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import {moderateScale} from '../../lib/scalingUtils';

const window = Dimensions.get('window');
const {width, height} = window;

const WalkthroughPeriod = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageChild}>
          <ImageBackgroundView image={images.walk_bg}>
            <View style={styles.handCalendarView}>
              <Image source={images.menstruation} style={styles.handCalendar} />
            </View>
            <View style={styles.curveBg}>
              <BgWalkSvg />
            </View>
          </ImageBackgroundView>
        </View>

        <View style={styles.descView}>
          <View style={styles.txtView}>
            <PoppinsTextMedium color={1} fontSize={23} style={[cs.txtCenter]}>
              Period, PMS & Fertility Predictions
            </PoppinsTextMedium>
            <PoppinsTextRegular color={9} fontSize={16} style={styles.txtDesc}>
              Free, user friendly way to track your periods, symptoms, moods and
              lifestyle with smart predictions and reminders.
            </PoppinsTextRegular>
          </View>
          <WalkthroughBottom
            onSkip={props.clickOnSkip}
            onNext={props.navigateToNextWalkthrough}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.walk_period_back,
    flex: 1,
  },
  descView: {
    flex: 1,
  },
  imageChild: {
    resizeMode: 'stretch',
    width: wp('100%'),
    height: hp('45%'),
    overflow: 'hidden',
  },
  curveBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  handCalendarView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: hp(40),
    width: wp(80),
    alignItems: 'flex-end',
  },
  handCalendar: {
    flex: 1,
    width: width > 500 ? '75%' : '100%',
    resizeMode: 'contain',
  },
  txtView: {
    marginTop: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    flex: 1,
  },
  txtDesc: {
    marginTop: moderateScale(0),
    textAlign: 'center',
    lineHeight: moderateScale(21),
    letterSpacing: -0.32,
  },
});

WalkthroughPeriod.propTypes = {};

export default WalkthroughPeriod;
