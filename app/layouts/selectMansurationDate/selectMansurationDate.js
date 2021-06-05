import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import Button, {GradientButton} from '../../components/Button';
import DotVertical from '../../components/DotVertical';
import {Shadow} from 'react-native-neomorph-shadows';
import {CalendarList} from 'react-native-calendars';

const calCardWidth = wp(90);
const dayCellWidth = (calCardWidth - moderateScale(20) - wp(5)) / 7;
const window = Dimensions.get('window');
const {width, height} = window;
const SelectMansurationDate = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <View>
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
          <View style={cs.dotFloatWrpr}>
            <DotVertical active={2} />
          </View>
          <View style={cs.largetTxtWrpr}>
            <PoppinsTextMedium color={2} fontSize={30} style={cs.txtLeft}>
              When did your last period start?
            </PoppinsTextMedium>
          </View>
        </View>
        <View style={styles.calendarWrpr}>
          <Shadow style={styles.shadowColor}>
            <View style={styles.weekView}>
              {props.weekArr.map((item, index) => {
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
                maxDate={props.today}
                hideExtraDays={true}
                current={props.today}
                pastScrollRange={12}
                futureScrollRange={1}
                calendarHeight={
                  width > 500 ? moderateScale(460) : moderateScale(400)
                }
                calendarWidth={wp(90)}
                markedDates={props.markedDays}
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
                  if (state === 'disabled') {
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
                      onPress={() => props.onDayCalendarSelect(date)}
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
            <View style={[cs.firstDataBottom]}>
              <GradientButton text="Continue" onPress={props.clickOnProceed} />
              <View style={cs.firstDataBottomMsg}>
                <PoppinsTextRegular
                  onPress={props.clickOnDontRemember}
                  color={26}
                  fontSize={14}
                  style={cs.firstDataBottomTxtUnderline}>
                  I don’t remember
                </PoppinsTextRegular>
                <PoppinsTextRegular
                  color={26}
                  fontSize={12}
                  style={cs.txtCenter}>
                  (You can add the dates of your next period later)
                </PoppinsTextRegular>
              </View>
            </View>
          </Shadow>
        </View>
      </ImageBackgroundView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendarWrpr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(20),
  },
  shadowColor: {
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    backgroundColor: colors.white,
    borderRadius: 16,
    width: wp(90),
    height: hp(65),
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

SelectMansurationDate.propTypes = {};

export default SelectMansurationDate;
