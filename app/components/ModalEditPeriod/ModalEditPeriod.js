import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Shadow, ShadowFlex} from 'react-native-neomorph-shadows';

import {moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium} from '../Text';
import {colors, globalStyle as gs} from '../../config/styles';
import HorizontalScrollPicker from '../../components/HorizontalScrollPicker';
import BottomButtons from '../BottomButtons';
import moment from 'moment';
//Own Code
const {width, height} = Dimensions.get('window');

const paddingInner = moderateScale(15);
const displayFormat = 'ddd, DD MMM';
const storeFormat = 'YYYY-MM-DD';

const ModalEditPeriod = props => {
  const [daysArray, setDaysArray] = useState([]);
  //Index
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);
  //Display String
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');
  //Sending Dates
  const [startDateStore, setStartDateStore] = useState('');
  const [endDateStore, setEndDateStore] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);

  if (props.periodKey && firstLoad) {
    //We will take array of +10 days before and +10 days after
    let workArr = [];
    for (let indexer = -10, counter = 0; indexer < 11; indexer++, counter++) {
      const dayMoment = moment(props.periodKey).add(indexer, 'days');
      const formattedDate = dayMoment.format(storeFormat);
      const dispDate = dayMoment.format(displayFormat);
      if (props.period && formattedDate === props.period.start) {
        setStartIdx(counter);
        setStartDateStr(dayMoment.format(displayFormat));
        setStartDateStore(formattedDate);
      } else if (props.period && formattedDate === props.period.end) {
        setEndIdx(counter);
        setEndDateStr(dayMoment.format(displayFormat));
        setEndDateStore(formattedDate);
      }
      workArr.push({
        label: dayMoment.format('DD'),
        idx: counter,
        value: formattedDate,
        valueDisp: dispDate,
      });
    }
    setDaysArray(workArr);
    setFirstLoad(false);
  }

  if (!props.periodKey) {
    return null;
  }

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
              {props.topTitle}
            </PoppinsTextMedium>
          </View>
          <View style={styles.datesWrpr}>
            <ShadowFlex style={styles.datesElevation}>
              <View style={styles.dateTitle}>
                <PoppinsTextMedium color={1} fontSize={20}>
                  Start
                </PoppinsTextMedium>
                <PoppinsTextMedium color={1} fontSize={20}>
                  {startDateStr}
                </PoppinsTextMedium>
              </View>
              <HorizontalScrollPicker
                items={daysArray}
                width={width - paddingInner * 2}
                initialIdx={startIdx}
                onSelect={item => {
                  setStartDateStr(item.valueDisp);
                  setStartDateStore(item.value);
                  setStartIdx(item.idx);
                }}
              />
              <View style={[styles.dateTitle, styles.endDateTitle]}>
                <PoppinsTextMedium color={1} fontSize={20}>
                  End
                </PoppinsTextMedium>
                <PoppinsTextMedium color={1} fontSize={20}>
                  {endDateStr}
                </PoppinsTextMedium>
              </View>
              <HorizontalScrollPicker
                items={daysArray}
                width={width - paddingInner * 2}
                initialIdx={endIdx}
                onSelect={item => {
                  setEndDateStr(item.valueDisp);
                  setEndDateStore(item.value);
                  setEndIdx(item.idx);
                }}
              />
            </ShadowFlex>
          </View>
          <BottomButtons
            showBottomTxt={false}
            showButton={false}
            onSave={() =>
              props.onConfirmEdit(startDateStore, endDateStore, props.periodKey)
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
    height: height * 0.65,
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
    height: height * 0.65,
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
    paddingHorizontal: paddingInner,
  },
  datesElevation: {
    width: width - paddingInner * 2,
    shadowOpacity: 0.3,
    shadowColor: colors.grey,
    shadowRadius: 10,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  dateTitle: {
    padding: moderateScale(20),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    backgroundColor: colors.bg_pink,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  endDateTitle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: moderateScale(15),
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
  topTitle: 'Edit Period',
  cancelTxt: 'Cancel',
  saveTxt: 'Delete',
};

export default ModalEditPeriod;
