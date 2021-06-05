import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Shadow, ShadowFlex} from 'react-native-neomorph-shadows';
import {CalendarList} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium, PoppinsTextRegular} from '../Text';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import HorizontalScrollPicker from '../HorizontalScrollPicker';
import BottomButtons from '../BottomButtons';
import moment from 'moment';
//Own Code
const {width, height} = Dimensions.get('window');

const paddingInner = moderateScale(0);
const displayFormat = 'ddd, DD MMM';
const storeFormat = 'YYYY-MM-DD';

const calCardWidth = wp(90);
const dayCellWidth = (calCardWidth - moderateScale(20) - wp(5)) / 7;

const ModalEditPeriod = props => {
  const [bleedingDays, setBleedingDays] = useState([]);
  const [markedDays, setMarkedDays] = useState({});
  const [initMarkedDays, setInitMarkedDays] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);

  if (firstLoad && props.visible) {
    //We are going to set disable dates in marked
    let workingIdx = 0;
    let wrkMrkDays = {};
    if (props.periodDays.length > 0) {
      const endDate = moment(
        props.periods[props.periodDays[props.periodDays.length - 1]].end,
      )
        .add(2, 'days')
        .format('YYYY-MM-DD');
      let wrkDayMmt = moment(props.periodDays[0]).subtract(
        props.periodLength,
        'days',
      );
      let periodDate = false;
      //This will keep where the end date has to be
      let wrkEndDate = null;
      while (1) {
        const dateStr = wrkDayMmt.format('YYYY-MM-DD');
        if (props.periodDays.indexOf(dateStr) >= 0) {
          periodDate = true;
          wrkEndDate = props.periods[dateStr].end;
        }

        wrkMrkDays[dateStr] = {disabled: true, isPeriod: periodDate};
        if (endDate === dateStr) {
          break;
        }
        if (periodDate && dateStr === wrkEndDate) {
          periodDate = false;
          wrkEndDate = null;
        }
        wrkDayMmt.add(1, 'days');
      }
    }

    setInitMarkedDays(wrkMrkDays);
    setMarkedDays(wrkMrkDays);
    setFirstLoad(false);
  } else if (!firstLoad && !props.visible) {
    setMarkedDays({});
    setFirstLoad(true);
  }

  const mInst = moment();
  const mToday = new moment();
  const weekArr = [1, 2, 3, 4, 5, 6, 0].map(dayIdx => {
    return mInst
      .day(dayIdx)
      .format('dd')
      .toUpperCase();
  });
  const today = mToday.format('YYYY-MM-DD');
  return (
    <Modal
      isVisible={props.visible}
      backdropColor={props.backdropColor}
      onBackButtonPress={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}
      backdropOpacity={props.backdropOpacity}
      animationIn={props.animationIn}
      animationInTiming={props.animationInTiming}
      animationOut={props.animationOut}
      animationOutTiming={props.animationOutTiming}
      useNativeDriverForBackdrop={true}
      propagateSwipe={true}
      style={styles.modal}
      useNativeDriver={props.useNativeDriver}>
      <Shadow style={styles.wrpr}>
        <View style={styles.lineWrpr}>
          <View style={styles.headerLine} />
        </View>
        <View style={styles.boxWrpr}>
          <View style={styles.headingWrpr}>
            <PoppinsTextMedium color={3} fontSize={18}>
              Add Period
            </PoppinsTextMedium>
          </View>
          <View style={styles.datesWrpr}>
            <Shadow style={styles.shadowColor}>
              <View style={styles.weekView}>
                {weekArr.map((item, index) => {
                  return (
                    <View key={`wk_${index}`} style={styles.weekCell}>
                      <PoppinsTextRegular color={1} fontSize={16}>
                        {item}
                      </PoppinsTextRegular>
                    </View>
                  );
                })}
              </View>
              <View style={[cs.displayFlex]}>
                <CalendarList
                  hideDayNames={true}
                  firstDay={1}
                  monthFormat={'MMM yyyy'}
                  maxDate={today}
                  hideExtraDays={true}
                  current={today}
                  pastScrollRange={12}
                  futureScrollRange={1}
                  calendarHeight={
                    width > 500 ? moderateScale(460) : moderateScale(400)
                  }
                  calendarWidth={wp(90)}
                  markedDates={markedDays}
                  theme={{
                    textMonthFontSize: moderateScale(17),
                    textMonthFontFamily: 'Poppins-Medium',
                    monthTextColor: colors.red_light,
                    'stylesheet.calendar-list.main': {
                      calendar: {},
                    },
                  }}
                  dayComponent={({date, state, marking}) => {
                    let dayStyle = [styles.singleDay];
                    let dayBgColor = {backgroundColor: colors.bg_grey};
                    let txtColor = 39;
                    if (marking.selected) {
                      txtColor = 1;
                    }
                    if (marking.disabled && marking.isPeriod) {
                      dayBgColor.backgroundColor = colors.red_light_opacity;
                    } else if (state === 'disabled' || marking.disabled) {
                      txtColor = 15;
                    } else if (state === 'today') {
                      dayStyle.push(styles.dayToday);
                    }
                    if (typeof marking === 'object' && marking.marked) {
                      dayBgColor.backgroundColor = colors.red_light;
                      txtColor = 1;
                    }
                    dayStyle.push(dayBgColor);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (marking.disabled) {
                            return;
                          }
                          if (date.timestamp <= mToday.valueOf()) {
                            let periodBleedDays = [];
                            let markingDays = {...initMarkedDays};
                            for (
                              let indexer = 0;
                              indexer < props.periodLength;
                              indexer++
                            ) {
                              const dateStr = moment(date.dateString)
                                .add(indexer, 'days')
                                .format('YYYY-MM-DD');
                              periodBleedDays.push(dateStr);
                              markingDays[dateStr] = {marked: true};
                            }
                            setBleedingDays(periodBleedDays);
                            setMarkedDays(markingDays);
                          }
                        }}
                        activeOpacity={0.8}
                        style={dayStyle}>
                        <PoppinsTextRegular fontSize={13} color={txtColor}>
                          {`${date.day}`}
                        </PoppinsTextRegular>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </Shadow>
          </View>
          <BottomButtons
            showBottomTxt={false}
            showButton={false}
            onSave={() =>
              props.onSave(
                bleedingDays[0],
                bleedingDays[bleedingDays.length - 1],
              )
            }
          />
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
    backgroundColor: colors.white,
    width: width,
    height: height * 0.7,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    borderRadius: moderateScale(60),
  },
  lineWrpr: {
    alignItems: 'center',
  },
  headerLine: {
    height: moderateScale(6),
    backgroundColor: colors.tnc_text_color,
    borderRadius: moderateScale(6),
    width: moderateScale(width * 0.3),
  },
  boxWrpr: {
    width: width,
    height: height * 0.7,
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(43),
    borderTopRightRadius: moderateScale(43),
  },
  headingWrpr: {
    alignItems: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
  },
  datesWrpr: {
    flex: 0.9,
  },
  shadowColor: {
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    backgroundColor: colors.white,
    borderRadius: 16,
    width: wp(90),
    marginLeft: wp(5),
    height: height * 0.48,
    overflow: 'hidden',
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.bg_pink,
    height: moderateScale(30),
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingLeft: wp(1.7),
    paddingRight: wp(1.7),
  },
  weekCell: {
    width: dayCellWidth,
    paddingLeft: moderateScale(5),
  },
  singleDay: {
    borderRadius: moderateScale(4),
    width: dayCellWidth,
    height: dayCellWidth,
    backgroundColor: colors.bg_pink,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: moderateScale(3),
    paddingLeft: moderateScale(5),
  },
  dayToday: {
    borderColor: colors.txt_header_color,
    borderWidth: 1,
  },
});

ModalEditPeriod.defaultProps = {
  visible: false,
  backdropColor: colors.white,
  onBackdropPress: () => {},
  backdropOpacity: 0.6,
  animationIn: 'fadeIn',
  animationInTiming: 300,
  animationOut: 'fadeOut',
  animationOutTiming: 300,
  useNativeDriver: true,
  cancelTxt: 'Cancel',
  saveTxt: 'Delete',
};

export default ModalEditPeriod;
