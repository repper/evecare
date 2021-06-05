import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Shadow, ShadowFlex} from 'react-native-neomorph-shadows';
import {colors, globalStyle as gs} from '../../config/styles';
import Icon from '../../fonts/eveCareFont';
import cs from '../../config/commonStyles';
import images from '../../config/images';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import AppModal from '../../components/AppModal';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import HealthSvgComponent from '../../components/SvgIcon/healthLeafSvg';
import CycleSvgComponent from '../../components/SvgIcon/cycleLeafSvg';
import pj from '../../../package.json';
const window = Dimensions.get('window');
const {height, width} = window;

const leftRightPadding = moderateScale(20);
const topCardMargin = moderateScale(25);
const topCardWidthHeight = (width - 2 * leftRightPadding - topCardMargin) / 2;

const SettingScreen = props => {
  const menuListItem = props.optionsArray.filter(listItem => {
    if (!props.isLoggedIn && listItem.title === 'Logout') {
      return false;
    }
    return true;
  });
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.white}]}>
      <BackgroundWaveView topViewHeightPercent={15} bottomViewHeightPercent={85}>
        <TouchableWithoutFeedback onPress={props.navigateToEditProfile}>
          <View style={styles.profileView}>
            <View style={[cs.flexRow, cs.flexAlignCenter]}>
              {props.user && props.user.profile_picture_url ? (
                <Image
                  source={{
                    uri: props.user.profile_picture_url,
                  }}
                  style={styles.imageView}
                />
              ) : (
                <Image source={images.default_user} style={styles.imageView} />
              )}

              <View style={styles.nameView}>
                <PoppinsTextMedium
                  color={32}
                  fontSize={24}
                  numberOfLines={1}
                  style={{width: moderateScale(200)}}
                >
                  {props.user.user_name ? props.user.user_name : 'Sign-in here'}
                </PoppinsTextMedium>
                {props.user && props.user.email ? (
                  <PoppinsTextRegular
                    color={29}
                    fontSize={14}
                    numberOfLines={1}
                    style={{width: moderateScale(180)}}
                  >
                    {props.user.email}
                  </PoppinsTextRegular>
                ) : null}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: moderateScale(40),
          }}
        >
          <TouchableOpacity style={styles.goalView} onPress={props.navigateToChangeGoal}>
            <PoppinsTextMedium color={29} fontSize={20}>
              My goal:
            </PoppinsTextMedium>
            <View style={styles.goalRow}>
              {props.phaseArr.map(ph => {
                let vwStyle = [];
                let txtColor = 13;
                if (props.goal === ph.key) {
                  vwStyle.push(styles.goalSelected);
                  txtColor = 1;
                }
                return (
                  <View style={vwStyle} key={`gl_${ph.key}`}>
                    <PoppinsTextRegular color={txtColor}>{ph.titleShort}</PoppinsTextRegular>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
          <View style={styles.detailsTopRowView}>
            <TouchableWithoutFeedback onPress={props.navigateToHealthInsight}>
              <Shadow style={styles.healthView}>
                <PoppinsTextMedium color={33} fontSize={16}>
                  Health Insight
                </PoppinsTextMedium>
                <View style={styles.topCardIconMargin} />
                <HealthSvgComponent />
              </Shadow>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={props.navigateToPeriodLength}>
              <Shadow style={styles.healthView}>
                <PoppinsTextMedium color={33} fontSize={16} style={{textAlign: 'center'}}>
                  Cycle & Ovulation
                </PoppinsTextMedium>
                <View style={styles.topCardIconMargin} />
                <CycleSvgComponent />
              </Shadow>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.optionsMainView}>
            <ShadowFlex style={styles.optionsView} key={`sh_${props.expanded ? '1' : '0'}`}>
              {menuListItem.map((item, index) => {
                let iconName = 'arrow_down';
                if (props.expanded) {
                  iconName = 'arrow_up';
                }
                return (
                  <View key={`items_option${index}`}>
                    <TouchableWithoutFeedback onPress={() => props.navigateToOptions(item, index)}>
                      <View style={styles.txtOptionView}>
                        <View style={styles.txtSubOptionView}>
                          <PoppinsTextRegular color={33} fontSize={16} style={styles.txtOption}>
                            {item.title}
                          </PoppinsTextRegular>
                          {item.showView ? <Icon name={iconName} size={22} style={styles.iconStyle} /> : null}
                        </View>
                        {props.expanded && item.showView ? (
                          <View>
                            {props.subOptionArr.map((item, index) => {
                              return (
                                <View key={`items_sub_option${index}`}>
                                  <TouchableWithoutFeedback
                                    onPress={() => props.navigateToOptions(item, index)}
                                  >
                                    <View style={styles.txtOptionView}>
                                      <PoppinsTextRegular
                                        color={33}
                                        fontSize={15}
                                        style={[styles.txtOption, {marginLeft: moderateScale(50)}]}
                                      >
                                        {item.title}
                                      </PoppinsTextRegular>
                                    </View>
                                  </TouchableWithoutFeedback>
                                  {index + 1 < props.subOptionArr.length ? (
                                    <View style={[styles.seperatorView, {opacity: 0.5}]} />
                                  ) : null}
                                </View>
                              );
                            })}
                          </View>
                        ) : null}
                      </View>
                    </TouchableWithoutFeedback>
                    {index + 1 < menuListItem.length ? <View style={styles.seperatorView} /> : null}
                  </View>
                );
              })}
            </ShadowFlex>
            <View style={styles.versionView}>
              <PoppinsTextRegular color={16} fontSize={15}>
                Version - {pj.version}
              </PoppinsTextRegular>
            </View>
          </View>
        </ScrollView>
      </BackgroundWaveView>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(90) / 2,
    resizeMode: 'cover',
    marginBottom: moderateScale(20),
  },
  imageMainView: {
    height: moderateScale(68),
    width: moderateScale(68),
    borderRadius: moderateScale(68) / 2,
    borderWidth: 2,
    borderColor: '#ff2e56',
    marginLeft: moderateScale(10),
    overflow: 'hidden',
  },
  imageRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonView: {
    marginLeft: moderateScale(50),
    marginRight: moderateScale(50),
    marginTop: moderateScale(30),
  },
  deviderView: {
    height: moderateScale(2),
    width: width,
    backgroundColor: '#589c9c9c',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtOptionTitle: {
    marginLeft: moderateScale(15),
  },
  seperatorView: {
    height: 1,
    backgroundColor: '#e8c5d8',
  },
  profileView: {
    marginTop: moderateScale(40),
    alignItems: 'center',
  },
  nameView: {
    marginLeft: moderateScale(25),
  },
  detailsView: {
    margin: moderateScale(15),
    marginTop: moderateScale(0),
    marginBottom: moderateScale(0),
  },
  detailsTopRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: leftRightPadding,
    paddingBottom: 0,
  },
  goalView: {
    padding: leftRightPadding,
    paddingBottom: 0,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(8),
  },
  goalSelected: {
    backgroundColor: colors.txt_header_color,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(16),
  },
  healthView: {
    height: topCardWidthHeight,
    width: topCardWidthHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 9,
    backgroundColor: colors.white,
    shadowColor: colors.bg_pink,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    paddingBottom: moderateScale(18),
  },
  topCardIconMargin: {
    height: moderateScale(25),
  },
  optionsMainView: {
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(60),
  },
  optionsView: {
    padding: moderateScale(15),
    paddingBottom: moderateScale(0),
    borderRadius: 9,
    backgroundColor: colors.white,
    shadowColor: colors.bg_pink,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    width: width - moderateScale(40),
  },
  txtOption: {
    marginLeft: moderateScale(20),
    paddingBottom: moderateScale(10),
  },
  txtOptionView: {
    marginTop: moderateScale(15),
  },
  versionView: {
    marginTop: moderateScale(25),
    alignItems: 'center',
  },
  txtSubOptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(10),
    opacity: 0.5,
  },
});

SettingScreen.propTypes = {};

export default SettingScreen;
