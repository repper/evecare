import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import GradientHeader from '../../components/GradientHeader';
import ModalCalendarMore from '../../components/ModalCalendarMore';
import ModalAlertSmall from '../../components/ModalAlertSmall';
import ModalEditPeriod from '../../components/ModalEditPeriod';
import {moderateScale} from '../../lib/scalingUtils';
import calendarDates from '../../lib/calendar';
import {CalendarList} from 'react-native-calendars';
import InfoModal from '../../components/InfoModal';
import moment from 'moment';
import Modal from 'react-native-modal';

const calCardWidth = wp(100);
const dayCellWidth = (calCardWidth - moderateScale(20) - wp(5)) / 7;

const PredictionCalendar = props => {
  const calDates = calendarDates(props.menstrual);
  return (
    <SafeAreaView style={gs.safeArea}>
      <GradientHeader
        backIconCallback={() => headerDate(props)}
        title="Calendar"
        rightIcon="circle_i"
        onRightIconClick={props.openInfoModal}
        onLeftIconClick={props.onHeaderDateClick}
      />
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
          futureScrollRange={12}
          calendarHeight={moderateScale(430)}
          calendarWidth={wp(100)}
          markedDates={calDates.markedDates}
          theme={{
            textMonthFontSize: moderateScale(17),
            textMonthFontFamily: 'Poppins-Medium',
            monthTextColor: colors.red_light,
            'stylesheet.calendar-list.main': {
              calendar: {},
            },
          }}
          ref={props.setCalendarListRef}
          dayComponent={({date, state, marking}) => {
            let dayStyle = [styles.singleDay];
            let dayBgColor = {backgroundColor: colors.bg_grey};
            let txtColor = 39;
            if (marking.selected) {
              txtColor = 1;
            }
            let notesStyle = [styles.triangleView];
            if (state === 'disabled') {
              txtColor = 44;
              notesStyle.push({
                borderTopColor: colors.walk_discuss_back_light,
              });
            } else if (state === 'today') {
              dayStyle.push(styles.dayToday);
            }
            let dayCounter = 0;
            let dayCounterColor = 39;
            let ovulationIconColor = '#eb5f33';
            if (typeof marking === 'object') {
              dayCounter = marking.dayCounter;
              if (marking.isFuture) {
                dayCounterColor = 44;
              }
              if (marking.isPeriodDate) {
                if (marking.isPeriodPrediction) {
                  dayBgColor.backgroundColor = colors.red_light_opacity;
                } else {
                  dayBgColor.backgroundColor = colors.red_light;
                  notesStyle.push({
                    borderTopColor: colors.white,
                  });
                  txtColor = 1;
                  dayCounterColor = 1;
                }
              }
              //Check if it is ovulation day
              if (!marking.isPeriodDate && marking.ovulationPercent > 0) {
                const ovuBgPercent = marking.isFuture
                  ? marking.ovulationPercent / 2 / 100
                  : marking.ovulationPercent / 100;
                dayBgColor.backgroundColor = `rgba(255, 210, 87, ${ovuBgPercent})`;
                if (marking.isFuture) {
                  ovulationIconColor = '#eb5f33b3';
                }
              }
            }
            dayStyle.push(dayBgColor);
            let showNotesIcon = props.healthLog.dates.indexOf(date.dateString) >= 0;

            return (
              <TouchableOpacity
                onPress={() => props.onDayCalendarOpenModal(date, marking)}
                activeOpacity={0.8}
                style={dayStyle}
              >
                <View style={styles.dayNumber}>
                  <PoppinsTextRegular fontSize={13} color={txtColor}>
                    {`${date.day}`}
                  </PoppinsTextRegular>

                  {dayCounter ? (
                    <PoppinsTextRegular
                      fontSize={8}
                      color={dayCounterColor}
                      style={{
                        marginTop: moderateScale(3),
                        marginRight: moderateScale(1),
                      }}
                    >
                      {`${dayCounter}`}
                    </PoppinsTextRegular>
                  ) : null}
                </View>
                {typeof marking === 'object' && marking.ovulationPercent === 100 ? (
                  <Icon
                    name="firtile_icon"
                    size={20}
                    color={ovulationIconColor}
                    style={styles.dayOvulationIcon}
                  />
                ) : null}
                {showNotesIcon ? <View style={notesStyle} /> : null}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {Platform.OS == 'ios' ? (
        <Modal visible={props.showDateModal}>
          <ModalCalendarMore
            onBackdropPress={props.hideInfoModal}
            visible={props.showDateModal}
            date={props.selectedDate}
            marking={props.selectedDateMarkation}
            onClickAddNotesModal={props.onClickAddNotesModal}
            onClickAddPeriodModal={props.onClickAddPeriodModal}
            onEditPeriodPress={props.onEditPeriodPress}
            makeAlertModalVisible={props.makeAlertModalVisible}
            masterLog={props.masterLog}
            units={props.units}
            notes={props.selectedDate ? props.healthLog.dayLog[props.selectedDate.dateString] : {}}
          />
        </Modal>
      ) : (
        <ModalCalendarMore
          onBackdropPress={props.hideInfoModal}
          visible={props.showDateModal}
          date={props.selectedDate}
          marking={props.selectedDateMarkation}
          onClickAddNotesModal={props.onClickAddNotesModal}
          onClickAddPeriodModal={props.onClickAddPeriodModal}
          onEditPeriodPress={props.onEditPeriodPress}
          makeAlertModalVisible={props.makeAlertModalVisible}
          masterLog={props.masterLog}
          units={props.units}
          notes={props.selectedDate ? props.healthLog.dayLog[props.selectedDate.dateString] : {}}
        />
      )}

      {props.selectedDateMarkation && props.selectedDateMarkation.periodDateKey ? (
        <ModalAlertSmall
          onBackdropPress={props.hideAlertModal}
          visible={props.showAlertModal}
          onClickConfirmAlert={props.onClickConfirmAlert}
          title={props.isDeleteAlert ? 'Delete' : 'Edit Period'}
          message={
            props.isDeleteAlert
              ? 'Are you sure, you want to delete this period?'
              : `${moment(props.selectedDateMarkation.periodDateKey).format('DD MMM')} - ${moment(
                  props.selectedDate.dateString,
                ).format('DD MMM')}\nAre you sure, you want to end this period?`
          }
          saveTxt={props.isDeleteAlert ? 'Delete' : 'End Period'}
        />
      ) : null}
      <InfoModal
        onBackdropPress={props.openInfoModal}
        visible={props.infoModalState}
        contentKey={props.contentKey}
      />
      {props.selectedDateMarkation && props.selectedDateMarkation.periodDateKey ? (
        <ModalEditPeriod
          onBackdropPress={props.hideEditPeriodModal}
          visible={props.showEditPeriodModal}
          onConfirmEdit={props.onEditPeriodModalSave}
          periodKey={props.selectedDateMarkation.periodDateKey}
          period={props.menstrual.periods[props.selectedDateMarkation.periodDateKey]}
        />
      ) : null}
    </SafeAreaView>
  );
};

const headerDate = props => {
  return (
    <View style={styles.headerDateView}>
      <PoppinsTextMedium fontSize={12} color={1} style={{lineHeight: moderateScale(14), textAlign: 'center'}}>
        {`${props.todayInst.format('DD')}${'\n'}${props.todayInst.format('MMM')}`}
      </PoppinsTextMedium>
    </View>
  );
};

const styles = StyleSheet.create({
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.bg_pink,
    height: moderateScale(30),
    alignItems: 'center',
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
  dayNumber: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayOvulationIcon: {
    position: 'absolute',
    bottom: 2,
    left: 3,
  },
  headerDateView: {
    width: moderateScale(43),
    height: moderateScale(43),
    borderRadius: moderateScale(43) / 2,
    backgroundColor: colors.txt_header_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleView: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#35809c',
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    right: 2,
    bottom: 2,
  },
});

PredictionCalendar.propTypes = {};

export default PredictionCalendar;
