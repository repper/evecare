import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../../config/images';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import WalkthroughBottom from '../../components/WalkthroughBottom';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import BgWalkSvg from '../../components/SvgIcon/bgWalkCurve';
import {moderateScale} from '../../lib/scalingUtils';

const window = Dimensions.get('window');
const {width, height} = window;

const WalkthroughDiscuss = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageChild}>
          <ImageBackgroundView image={images.walk_bg}>
            <View style={styles.handCalendarView}>
              <Image source={images.discuss} style={styles.handCalendar} />
            </View>
            <View style={styles.curveBg}>
              <BgWalkSvg color={colors.walk_discuss_back} />
            </View>
          </ImageBackgroundView>
        </View>
        <View style={styles.descView}>
          <View style={styles.txtView}>
            <PoppinsTextMedium color={1} fontSize={23} style={[cs.txtCenter]}>
              Community - Your space, Your social circle
            </PoppinsTextMedium>
            <PoppinsTextRegular color={9} fontSize={16} style={styles.txtDesc}>
              Connect with 100's of women's to share views and learn from others
              similar experience. Create groups of women's who share same belief
              and interest.
            </PoppinsTextRegular>
          </View>
          <WalkthroughBottom
            onSkip={props.clickOnSkip}
            onNext={props.navigateToWalkPeriod}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.walk_discuss_back,
    flex: 1,
  },
  descView: {
    flex: 1,
  },
  imageChild: {
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
    height: hp(45),
    width: wp(100),
    alignItems: 'flex-end',
    zIndex: 1,
  },
  handCalendar: {
    flex: 1,
    width: width > 500 ? '70%' : '90%',
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
    marginTop: moderateScale(20),
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: -0.32,
  },
});

WalkthroughDiscuss.propTypes = {};

export default WalkthroughDiscuss;
