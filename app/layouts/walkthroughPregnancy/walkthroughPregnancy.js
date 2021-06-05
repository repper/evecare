import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
} from 'react-native';
import Icon from '../../fonts/eveCareFont';
import images from '../../config/images';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {validateEmail, validateMobile} from '../../lib/validators';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import IconTextInput from '../../components/IconTextInput';
const window = Dimensions.get('window');
const {height, width} = window;

const WalkthroughPregnancy = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Image source={images.preg} style={styles.imageChild} />

          <View style={styles.txtView}>
            <PoppinsTextMedium
              color={1}
              fontSize={30}
              style={{textAlign: 'center'}}>
              Track your Pregnancy & Health
            </PoppinsTextMedium>
            <PoppinsTextRegular color={9} fontSize={20} style={styles.txtDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </PoppinsTextRegular>
          </View>

          <View style={styles.skipView}>
            <PoppinsTextRegular
              color={1}
              fontSize={15}
              style={{padding: 10}}
              onPress={props.clickOnSkip}>
              Skip
            </PoppinsTextRegular>
            <TouchableWithoutFeedback onPress={props.navigateToWalkChild}>
              <View style={styles.nextView}>
                <Icon name="arrow_small_tail" color="#222872" size={26} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: moderateScale(20),
    backgroundColor: colors.walk_preg_back,
  },
  imageChild: {
    resizeMode: 'cover',
    width: width,
    height: moderateScale(450),
  },
  txtView: {
    marginTop: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
  },
  txtDesc: {
    marginTop: moderateScale(40),
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.32,
  },
  skipView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(25),
    paddingLeft: moderateScale(40),
    paddingRight: moderateScale(40),
  },
  nextView: {
    width: moderateScale(65),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

WalkthroughPregnancy.propTypes = {};

export default WalkthroughPregnancy;
