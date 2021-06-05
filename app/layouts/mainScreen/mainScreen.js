import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
// componets
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular, PoppinsTextLight, PoppinsTextMedium} from '../../components/Text';
import CircleDashEmpty from '../../components/CircleDashEmpty';
import CircleDashInteractive from '../../components/CircleDashInteractive';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import ModalAddPeriod from '../../components/ModalAddPeriod';
import ModalEditPeriod from '../../components/ModalEditPeriod';
import ModalLocation from '../../components/ModalLocation';
import InfoModal from '../../components/InfoModal';
import AppModal from '../../components/AppModal';
import {scale, moderateScale} from '../../lib/scalingUtils';
import calendarDates from '../../lib/calendar';

const window = Dimensions.get('window');
const {width, height} = window;
const animation = new Animated.Value(0);
const animationScale = animation.interpolate({
  inputRange: [0, 1],
  outputRange: [1, 0.8],
});

const onPressIn = () => {
  Animated.spring(animation, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};
const onPressOut = () => {
  Animated.spring(animation, {
    toValue: 0,
    useNativeDriver: true,
  }).start();
};

const outerCircleWidth = width > 500 ? wp(66) : wp(80);
const innerCircleWidth = width > 500 ? wp(51) : wp(65);
const centerCircleWidth = width > 500 ? wp(36) : wp(47.46);
const circleTop = hp(6);
const circleLeft = (wp(100) - outerCircleWidth) / 2;

const HomeScreen = props => {
  const hasPeriods = Array.isArray(props.menstrual.periodDays) && props.menstrual.periodDays.length > 0;
  const calDates = hasPeriods ? calendarDates(props.menstrual) : null;
  const lastPeriodDate = props.menstrual.periodDays[props.menstrual.periodDays.length - 1];

  const todayDateStr = moment().format('YYYY-MM-DD');
  //we will get the period key using props menstrual Data

  const daysFromLastPeriod = moment(todayDateStr).diff(lastPeriodDate, 'days');

  return (
    <SafeAreaView style={[gs.safeArea]}>
      <BackgroundWaveView
        hasBottomTabBar={true}
        topViewHeightPercent={42}
        bottomViewHeightPercent={58}
        bottomBgRef={props.elRefBgBottom}
        bottomBgColor={daysFromLastPeriod >= 90 ? '#dcfeff' : '#dfdfdfb3'}
      >
        {
          //Top View
        }
        <View style={styles.topRowView}>
          <View style={styles.nameView}>
            <PoppinsTextLight color={29} fontSize={24}>
              Hi,
            </PoppinsTextLight>
            {Object.keys(props.user).length > 0 && props.user.first_name ? (
              <PoppinsTextRegular color={29} fontSize={24}>
                {` ${props.user.first_name}`}
              </PoppinsTextRegular>
            ) : (
              <View />
            )}
          </View>
          <TouchableWithoutFeedback onPress={props.clickOnShowInfoModal}>
            <View style={cs.flexAlignCenter}>
              <Icon name="circle_i" color={colors.gradient_header1} size={20} />
              <PoppinsTextLight color={29} fontSize={14}>
                {moment().format('DD MMM')}
              </PoppinsTextLight>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{height: circleTop + outerCircleWidth, position: 'relative'}}>
          {
            //CircleView
          }
          {!hasPeriods ? (
            <View style={styles.circleWrpr}>
              {
                <CircleDashEmpty
                  onPress={props.showHideAddPeriodModal}
                  outerWidth={outerCircleWidth}
                  innerWidth={innerCircleWidth}
                  centerWidth={centerCircleWidth}
                />
              }
            </View>
          ) : daysFromLastPeriod >= 90 ? (
            <View style={styles.circleWrpr}>
              {
                <CircleDashEmpty
                  onPress={props.showHideAddPeriodModal}
                  outerWidth={outerCircleWidth}
                  innerWidth={innerCircleWidth}
                  centerWidth={centerCircleWidth}
                  daysLate={daysFromLastPeriod}
                />
              }
            </View>
          ) : (
            <View style={styles.circleWrpr}>{getInternactiveCircle(calDates, props)}</View>
          )}
        </View>
        {
          //Ovulation Card
        }
        {getOvulationCardView(hasPeriods, calDates, props)}
        {
          //Start End Period Btn
        }
        {getStartEndPeriodBtn(daysFromLastPeriod, hasPeriods, calDates, props)}
        {
          //Bottom Button
        }
        <Animated.View style={[styles.addButtonWrpr, {transform: [{scale: animationScale}]}]}>
          <TouchableOpacity
            onPress={props.navigateToNotes}
            activeOpacity={0.8}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Shadow style={styles.circleAddButton}>
              <Icon name="plus_light" size={21} color={colors.white} />
            </Shadow>
          </TouchableOpacity>
        </Animated.View>
        {
          //Modals
        }
        <InfoModal
          onBackdropPress={props.hideInfoModal}
          visible={props.infoModalState}
          contentKey={props.contentKey}
        />
        <ModalAddPeriod
          onBackdropPress={props.showHideAddPeriodModal}
          visible={props.showAddPeriodModal}
          periodLength={props.menstrual.periodLength}
          periods={props.menstrual.periods}
          periodDays={props.menstrual.periodDays}
          onSave={props.onAddPeriodSave}
          key={props.updatedTime}
        />
        {props.statePeriodDateKey && props.showEditPeriodModal ? (
          <ModalEditPeriod
            topTitle={'End Period'}
            onBackdropPress={props.showHideEditPeriodModal}
            visible={props.showEditPeriodModal}
            onConfirmEdit={props.onEditPeriodModalSave}
            periodKey={props.statePeriodDateKey}
            period={props.menstrual.periods[props.statePeriodDateKey]}
            key={props.updatedTime}
          />
        ) : null}
        <ModalLocation
          onBackdropPress={props.showHideLocationModal}
          visible={props.showLocationModal}
          onLocationAllow={props.onLocationAllow}
          onLocationDeny={props.onLocationDeny}
        />
        <AppModal listenerKey={props.listenerKey} />
      </BackgroundWaveView>
    </SafeAreaView>
  );
};

const getInternactiveCircle = (calDates, props) => {
  try {
    if (props.elRefBgBottom && props.elRefBgBottom.current) {
      return (
        <CircleDashInteractive
          outerWidth={outerCircleWidth}
          innerWidth={innerCircleWidth}
          centerWidth={centerCircleWidth}
          radius={(outerCircleWidth - (outerCircleWidth - innerCircleWidth) / 2) / 2}
          menstrualData={calDates.markedDates}
          cycleLength={props.menstrual.cycleLength}
          periodLength={props.menstrual.periodLength}
          ovulationLength={props.menstrual.ovulationLength}
          bottomBgRef={props.elRefBgBottom}
          bottomViewHeightPercent={58}
          lastPeriodDate={props.menstrual.periodDays[props.menstrual.periodDays.length - 1]}
          key={props.updatedTime}
        />
      );
    }
  } catch (error) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', error);
  }
  return null;
};

const getOvulationCardView = (hasPeriods, calDates, props) => {
  if (!hasPeriods || props.userGoal === 'track_period') {
    return null;
  }
  let txtEls = [];

  let mToday = new moment();

  let dateStr = mToday.format('YYYY-MM-DD');

  let dateMarkation = calDates.markedDates[dateStr];
  //Set todays pregnancy markation
  let pregChanceTxt = 'Low';
  if (dateMarkation.ovulationPercent >= 70 && dateMarkation.ovulationPercent !== 84) {
    pregChanceTxt = 'High';
  } else if (dateMarkation.ovulationPercent > 0) {
    pregChanceTxt = 'Medium';
  }
  txtEls[0] = (
    <PoppinsTextRegular color={36} style={styles.txtOvulationRegular} key={`ovulation_txt_0`}>
      Today’s Chance of pregnancy:{' '}
      <PoppinsTextMedium color={36} style={styles.txtOvulationRegular}>
        {pregChanceTxt}
      </PoppinsTextMedium>
    </PoppinsTextRegular>
  );

  //Now we will loop till we get ovulation day and next fertile window
  //1. We might get next fertile first or after ovulation depending on current day in cycle
  let foundOvulation = false;
  let ovulationDays = 0;
  let ovulStart = null;
  let ovulEnd = null;
  while (1) {
    dateStr = mToday.format('YYYY-MM-DD');

    dateMarkation = calDates.markedDates[dateStr];

    //Logic to add ovulation day
    if (!foundOvulation) {
      if (dateMarkation.ovulationPercent === 100) {
        foundOvulation = true;
        if (ovulationDays === 0) {
          txtEls[1] = (
            <PoppinsTextMedium color={36} style={styles.txtOvulationRegular} key={`ovulation_txt_1`}>
              Ovulation Day
            </PoppinsTextMedium>
          );
        } else if (ovulationDays === 1) {
          txtEls[1] = (
            <PoppinsTextMedium color={36} style={styles.txtOvulationRegular} key={`ovulation_txt_1`}>
              Ovulation Day Tomorrow
            </PoppinsTextMedium>
          );
        } else {
          txtEls[1] = (
            <PoppinsTextRegular color={36} style={styles.txtOvulationRegular} key={`ovulation_txt_1`}>
              Ovulation in{' '}
              <PoppinsTextMedium color={36} style={styles.txtOvulationRegular}>
                {`${ovulationDays} days`}
              </PoppinsTextMedium>
            </PoppinsTextRegular>
          );
        }
      }
      ovulationDays++;
    }

    if (ovulStart == null && dateMarkation.isFuture && dateMarkation.ovulationPercent === 25) {
      ovulStart = dateStr;
    }
    if (ovulStart && dateMarkation.isFuture && dateMarkation.ovulationPercent !== 0) {
      ovulEnd = dateStr;
    }

    //Check if we have ovulend and today is not period date means we got period prediction
    if (ovulEnd && dateMarkation.ovulationPercent === 0) {
      txtEls[2] = (
        <PoppinsTextRegular color={36} style={styles.txtOvulationRegular} key={`ovulation_txt_2`}>
          Next Fertile Window{' '}
          <PoppinsTextMedium color={36} style={styles.txtOvulationRegular}>
            {`${moment(ovulStart).format('DD MMM')} - ${moment(ovulEnd).format('DD MMM')}`}
          </PoppinsTextMedium>
        </PoppinsTextRegular>
      );
    }

    if (txtEls.length > 2) {
      break;
    }
    mToday.add(1, 'days');
  }

  return (
    <View style={styles.ovulationWrpr}>
      <View style={styles.ovulationTriangle} />
      <Shadow style={styles.ovulationFlwrView}>
        <Icon name="firtile_icon" size={20} color="#eb5f33" />
      </Shadow>
      <View style={styles.ovulationWrprTxt}>{txtEls}</View>
    </View>
  );
};

const getStartEndPeriodBtn = (daysFromLastPeriod, hasPeriods, calDates, props) => {
  if (!hasPeriods) {
    return null;
  }
  const btnAnimation = new Animated.Value(0);
  const btnAnimationScale = btnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const btnOnPressIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const btnOnPressOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  let isStartPeriod = true;
  let isPeriodEnded = false;
  const mToday = new moment();

  const dateStr = mToday.format('YYYY-MM-DD');
  const dateMarkation = calDates.markedDates[dateStr];
  if (!dateMarkation.isPeriodPrediction && dateMarkation.dayCounter <= 10) {
    isStartPeriod = false;
  }
  if (!dateMarkation.isPeriodPrediction && props.menstrual.periods[dateMarkation.periodDateKey]) {
    isPeriodEnded = props.menstrual.periods[dateMarkation.periodDateKey].isEnded;
  }

  const btnTxt = isStartPeriod
    ? daysFromLastPeriod >= 90
      ? 'Add Period'
      : 'Start Period'
    : isPeriodEnded
    ? 'Edit Period'
    : 'End Period';

  return (
    <Animated.View
      style={[
        styles.startEndPeriodWrpr,
        {transform: [{scale: btnAnimationScale}]},
        props.userGoal === 'track_period' ? {marginTop: moderateScale(90)} : {},
      ]}
    >
      <TouchableOpacity
        onPress={
          isStartPeriod
            ? props.showHideAddPeriodModal
            : () => {
                props.showHideEditPeriodModal(dateMarkation.periodDateKey);
              }
        }
        activeOpacity={0.8}
        onPressIn={btnOnPressIn}
        onPressOut={btnOnPressOut}
      >
        <Shadow style={styles.startEndPeriodBtn}>
          <PoppinsTextMedium fontSize={18}>{btnTxt}</PoppinsTextMedium>
        </Shadow>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  topBgImage: {
    width: width,
    resizeMode: 'cover',
    height: hp(50),
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  nameView: {
    flexDirection: 'row',
  },
  circleWrpr: {
    position: 'absolute',
    width: outerCircleWidth,
    left: circleLeft,
    top: circleTop,
    marginBottom: moderateScale(50),
  },
  ovulationWrpr: {
    marginTop: moderateScale(45),
    marginBottom: moderateScale(30),
    marginHorizontal: width > 500 ? moderateScale(40) : moderateScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(17),
    paddingBottom: moderateScale(10),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ovulationTriangle: {
    position: 'absolute',
    top: scale(-12),
    left: (width - (width > 500 ? moderateScale(40) : moderateScale(20)) * 2 - scale(12)) / 2,
    width: 0,
    height: 0,
    borderLeftWidth: scale(6),
    borderRightWidth: scale(6),
    borderBottomWidth: scale(12),
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255, 255, 255, 0.7)',
    // borderBottomColor: 'red',
  },
  ovulationFlwrView: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40) / 2,
    backgroundColor: colors.white,
    shadowColor: '#ffd257',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(15),
  },
  txtOvulationRegular: {
    lineHeight: moderateScale(18),
  },
  startEndPeriodWrpr: {
    alignItems: 'center',
  },
  startEndPeriodBtn: {
    height: moderateScale(45),
    width: wp(45),
    borderRadius: moderateScale(45) / 2,
    backgroundColor: colors.gradient_header1,
    shadowOpacity: 0.6,
    shadowColor: colors.gradient_header1,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonWrpr: {
    position: 'absolute',
    right: moderateScale(25),
    bottom: moderateScale(30),
  },
  circleAddButton: {
    height: moderateScale(54),
    width: moderateScale(54),
    borderRadius: moderateScale(54) / 2,
    backgroundColor: colors.gradient_header1,
    shadowOpacity: 0.6,
    shadowColor: colors.gradient_header1,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

HomeScreen.propTypes = {};

export default HomeScreen;
