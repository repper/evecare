import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Shadow} from 'react-native-neomorph-shadows';
import moment from 'moment';

import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import {
  PoppinsTextMedium,
  PoppinsTextRegular,
  PoppinsTextLight,
} from '../Text';
import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import settings from '../../config/settings';
import Button, {GradientButton, LineButton} from '../../components/Button';
import SymptomIcon from '../../components/SymptomIcon';
import {convertFahrenToCelsi, convertKgToLbs} from '../../lib/util';
//Own Code
const {width, height} = Dimensions.get('window');

const innerPadding = moderateScale(15);
const cardPadding = moderateScale(8);
const itemWidth = (width - innerPadding) / 4;
const perRowItems = 4;

const ModalCalendarMore = props => {
  if (props.date && props.date.dateString) {
    const dateTopTxt = moment(props.date.dateString).format('ddd, DD MMM');
    let dateMarking = props.marking;
    if (Array.isArray(dateMarking)) {
      dateMarking = {};
    }
    let boxStyle = {};
    const hasNotes =
      props.notes &&
      typeof props.notes === 'object' &&
      Object.keys(props.notes).length > 0;
    if (hasNotes) {
      boxStyle['height'] = height * 0.8;
    }
    return (
      <Modal
        isVisible={props.visible}
        backdropColor={props.backdropColor}
        onBackButtonPress={props.onBackdropPress}
        onBackdropPress={props.onBackdropPress}
        backdropOpacity={props.backdropOpacity}
        //animationIn={props.animationIn}
        animationInTiming={props.animationInTiming}
        //animationOut={props.animationOut}
        animationOutTiming={props.animationOutTiming}
        useNativeDriverForBackdrop={true}
        propagateSwipe={true}
        style={styles.modal}
        useNativeDriver={props.useNativeDriver}>
        <Shadow style={{...styles.wrpr, ...boxStyle}}>
          <View style={styles.lineWrpr}>
            <View style={styles.headerLine} />
          </View>
          <View style={[styles.boxWrpr, boxStyle]}>
            <View style={styles.headingWrpr}>
              <PoppinsTextMedium color={3} fontSize={18}>
                {dateTopTxt}
              </PoppinsTextMedium>
              {getDeleteIconView(dateMarking, props.makeAlertModalVisible)}
              {getEditIconView(dateMarking, props.onEditPeriodPress)}
            </View>
            <View style={styles.mainActionRow}>
              {getPregnancyPredictionView(props, dateMarking)}
              {getAddEditPeriodBtn(props, dateMarking)}
            </View>
            <View style={styles.speparator} />
            <ScrollView
              contentContainerStyle={[cs.flexGrow, styles.scrollView]}>
              <View style={styles.notesRowView}>
                <PoppinsTextRegular color={26} fontSize={17}>
                  Notes
                </PoppinsTextRegular>
                <Button
                  innerType={3}
                  paddingLeftRight={0}
                  hasElevation={false}
                  iconColor={colors.white}
                  icon="plus_light"
                  wrprStyle={styles.notesAddBtn}
                  iconSize={15}
                  onPress={props.onClickAddNotesModal}
                />
              </View>
              {hasNotes ? getNotesView(props) : null}
            </ScrollView>
          </View>
        </Shadow>
      </Modal>
    );
  }
  return null;
};

const getPregnancyPredictionView = (props, marking) => {
  if (typeof marking === 'object' && !Array.isArray(marking)) {
    let pregChanceTxt = 'Low';
    if (marking.ovulationPercent >= 70 && marking.ovulationPercent !== 84) {
      pregChanceTxt = 'High';
    } else if (marking.ovulationPercent > 0) {
      pregChanceTxt = 'Medium';
    }
    return (
      <View style={styles.ovulationView}>
        <Shadow style={styles.ovulationFlwrView}>
          <Icon name="firtile_icon" size={20} color="#eb5f33" />
        </Shadow>
        <PoppinsTextRegular
          color={10}
          fontSize={14}
          style={{marginLeft: moderateScale(12)}}>
          {pregChanceTxt}
          {'\n'}Chance of pregnancy
        </PoppinsTextRegular>
      </View>
    );
  }
  return <View />;
};

const getDeleteIconView = (marking, onDeleteIconPress) => {
  if (marking.isFuture && marking.isPeriodPrediction) {
    return null;
  }
  if (marking.isPeriodDate && !marking.isPeriodPrediction) {
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
    return (
      <Animated.View
        style={[
          styles.headerDeleteView,
          {transform: [{scale: animationScale}]},
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => onDeleteIconPress('delete')}>
          <Icon name="delete" color={'#e8c5d8'} size={22} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
  if (marking.showAddPeriodBtn && marking.showEditPeriodBtn) {
    return getEditBtn(`End${'\n'}Period`, onDeleteIconPress, true);
  }
  return null;
};

const getEditIconView = (marking, onEditPeriodPress) => {
  if (marking.isFuture && marking.isPeriodPrediction) {
    return null;
  }
  if (marking.isPeriodDate && !marking.isPeriodPrediction) {
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
    return (
      <Animated.View
        style={[styles.headerEditView, {transform: [{scale: animationScale}]}]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onEditPeriodPress}>
          <Icon name="edit" color={'#e8c5d8'} size={22} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
  return null;
};

const getAddEditPeriodBtn = (props, marking) => {
  if (marking.isFuture && marking.isPeriodPrediction) {
    return null;
  }

  if (marking.isPeriodDate && !marking.isPeriodPrediction) {
    return getEditBtn(`End${'\n'}Period`, props.makeAlertModalVisible);
  }
  if (
    typeof marking.showAddPeriodBtn !== 'undefined' &&
    !marking.showAddPeriodBtn
  ) {
    return null;
  }
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

  return (
    <Animated.View
      style={[props.containerStyle, {transform: [{scale: animationScale}]}]}>
      <TouchableOpacity
        onPress={props.onClickAddPeriodModal}
        activeOpacity={0.8}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Shadow style={styles.addPeriodBtn}>
          <PoppinsTextMedium
            color={1}
            fontSize={18}
            style={{letterSpacing: 0.08}}>
            Add{'\n'}Period
          </PoppinsTextMedium>
        </Shadow>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getEditBtn = (text, onPress, isTopLeftEdit = false) => {
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
  let topEditBtn = {...styles.addPeriodBtn, ...styles.editPeriodBtn};
  let animViewStyle = [{transform: [{scale: animationScale}]}];
  let fontSize = 18;
  if (isTopLeftEdit) {
    topEditBtn = {...styles.editPeriodBtnSmall};
    animViewStyle.push(styles.editPeriodBtnFloat);
    fontSize = 14;
  }

  return (
    <Animated.View style={animViewStyle}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Shadow style={topEditBtn}>
          <PoppinsTextMedium
            color={6}
            fontSize={fontSize}
            style={{letterSpacing: 0.08}}>
            {text}
          </PoppinsTextMedium>
        </Shadow>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getNotesView = props => {
  return (
    <View>
      {getSpacerView()}
      {getSymptomsLifestyleLog(props)}
      {getSymptomsNotesLog(props)}
      {getSymptomsBleedingLog(props)}
      {getSymptomsFeelLog(props)}
      {getSymptomsEmotionLog(props)}
      {getSymptomsHygieneLog(props)}
      {getSymptomsFluidLog(props)}
      {getSymptomsIntercourseLog(props)}
      {getSymptomsTestMonitorLog(props)}
    </View>
  );
};

const getTitleText = text => {
  return (
    <PoppinsTextRegular color={6} fontSize={17}>{`${text}`}</PoppinsTextRegular>
  );
};

const getSpacerView = () => {
  return <View style={styles.spacerViewNotes} />;
};

const getSymptomsLifestyleLog = props => {
  //Check if we have lifestyle log
  if (
    !props.notes['weight'] &&
    !props.notes['bb_temperature'] &&
    !props.notes['blood_pressure'] &&
    !props.notes['sugar']
  ) {
    return null;
  }
  const viewKeys = ['weight', 'bb_temperature', 'blood_pressure', 'sugar'];
  const animatedStyle = styles.circleItemWrpr;
  return (
    <View>
      {getTitleText(props.masterLog.lifestyle.display)}
      <View style={styles.healthLogRowFull}>
        {viewKeys.map((storeKey, idx) => {
          const logData = props.notes[storeKey];
          if (typeof logData === 'undefined') {
            return null;
          }
          const showVal = true;
          const keys = Object.keys(logData.items);
          let storeVal = logData.items[keys[0]];
          let circleStyle = {};
          let storeUnit = '';
          let hasIconWidth = true;
          let iconWidth = 35;
          let iconHeight = 35;
          let item = props.masterLog.lifestyle.items.filter(
            mitm => mitm.storeKey === storeKey,
          )[0];
          switch (storeKey) {
            case 'sugar':
              storeUnit = 'mg/dl';
              iconWidth = 32;
              iconHeight = 38;
              break;
            case 'blood_pressure':
              storeUnit = 'mmHg';
              storeVal = `${storeVal.sys}/${storeVal.dia}`;
              break;
            case 'bb_temperature':
              storeUnit = props.units.temp.substr(0, 1).toUpperCase();
              if (storeUnit === 'C') {
                const tempVal = convertFahrenToCelsi(storeVal);
                storeVal = Number([tempVal[0], tempVal[1]].join('.'));
              }
              iconWidth = 19;
              iconHeight = 33;
              break;
            case 'weight':
              storeUnit = props.units.weight;
              if (storeUnit !== 'kg') {
                const conVal = convertKgToLbs(storeVal);
                storeVal = Number([conVal[0], conVal[1]].join('.'));
              }
              storeUnit = storeUnit.toUpperCase();
              iconWidth = 29;
              iconHeight = 28;
              break;
            default:
              break;
          }
          return (
            <SymptomIcon
              containerStyle={animatedStyle}
              key={`life_${idx}`}
              item={item}
              showVal={showVal}
              storeVal={storeVal}
              storeUnit={storeUnit}
              circleStyle={circleStyle}
              hasIconWidth={hasIconWidth}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
            />
          );
        })}
      </View>
      {getSpacerView()}
    </View>
  );
};

const getSymptomsNotesLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['notes']) {
    return null;
  }
  const notesTxt = props.notes['notes'];
  return (
    <View>
      {getTitleText('Day Note')}
      <View>
        <PoppinsTextLight
          color={6}
          fontSize={14}
          numberOfLines={2}
          style={{width: width - 2 * innerPadding}}>
          {notesTxt}
        </PoppinsTextLight>
      </View>
      {getSpacerView()}
    </View>
  );
};

const getSymptomsBleedingLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['bleeding']) {
    return null;
  }
  const viewKeys = ['flow', 'type', 'color', ''];
  const animatedStyle = styles.circleItemWrpr;
  return (
    <View>
      {getTitleText(props.masterLog.bleeding.display)}
      <View style={styles.healthLogRowFull}>
        {viewKeys.map((storeKey, idx) => {
          const logData = props.notes.bleeding[storeKey];
          if (typeof logData === 'undefined') {
            return <View style={animatedStyle} key={`symp_${idx}`} />;
          }
          let circleStyle = {borderColor: colors.walk_period_back};
          const masterItm = props.masterLog.bleeding[storeKey];
          let item = {...props.masterLog.bleeding[storeKey].items[logData]};
          item.name = `${masterItm.title}\n${item.name}`;
          return (
            <SymptomIcon
              containerStyle={animatedStyle}
              key={`life_${idx}`}
              item={item}
              circleStyle={circleStyle}
            />
          );
        })}
      </View>
      {props.notes.bleeding.smell ? (
        <View>
          <PoppinsTextRegular color={6} fontSize={14}>
            {`${props.masterLog.bleeding.smell.title}: ${
              props.masterLog.bleeding.smell.items[props.notes.bleeding.smell]
                .name
            }`}
          </PoppinsTextRegular>
        </View>
      ) : null}
      {props.notes.bleeding.modality &&
      props.notes.bleeding.modality.length > 0 ? (
        <View
          style={{marginTop: moderateScale(5), marginBottom: moderateScale(5)}}>
          <PoppinsTextRegular
            color={6}
            fontSize={14}
            style={{textDecorationLine: 'underline'}}>
            {`${props.masterLog.bleeding.modality.title}:`}
          </PoppinsTextRegular>
          {props.notes.bleeding.modality.map((mdl, idx) => {
            return (
              <PoppinsTextRegular color={6} fontSize={14} key={`mdl_${idx}`}>
                {`${props.masterLog.bleeding.modality.items[mdl].name}`}
              </PoppinsTextRegular>
            );
          })}
        </View>
      ) : null}
      {getSpacerView()}
    </View>
  );
};

const getRowsAndItems = (storeItems, rowItemCount = perRowItems) => {
  let listItems = [];
  let arrIdx = 0;
  storeItems.forEach((item, idx) => {
    if (typeof listItems[arrIdx] === 'undefined') {
      listItems[arrIdx] = [];
    }
    listItems[arrIdx].push(item);
    if (idx > 0 && (idx + 1) % rowItemCount === 0) {
      arrIdx++;
    }
  });
  return listItems;
};

const getSymptomsFeelLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['symptoms']) {
    return null;
  }
  let loggedSymptopms = [].concat(props.notes.symptoms.items);
  const requiredItems = 4 - (loggedSymptopms.length % 4);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);
  const animatedStyle = styles.circleItemWrpr;
  return (
    <View>
      {getTitleText(props.masterLog.symptoms.display)}
      {listItems.map((row, idx) => {
        return (
          <View style={styles.healthLogRowFull} key={`symp_${idx}`}>
            {row.map((symptom, index) => {
              if (!symptom) {
                return (
                  <View style={animatedStyle} key={`symp_${idx}_${index}`} />
                );
              }
              const item = props.masterLog.symptoms.items[symptom];
              let circleStyle = {};
              return (
                <SymptomIcon
                  containerStyle={animatedStyle}
                  key={`symp_${idx}_${index}`}
                  item={item}
                  circleStyle={circleStyle}
                />
              );
            })}
          </View>
        );
      })}
      {getSpacerView()}
    </View>
  );
};

const getSymptomsEmotionLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['emotion']) {
    return null;
  }
  let loggedSymptopms = [].concat(props.notes.emotion.items);
  const requiredItems = 4 - (loggedSymptopms.length % 4);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);
  const animatedStyle = styles.circleItemWrpr;
  return (
    <View>
      {getTitleText(props.masterLog.emotion.display)}
      {listItems.map((row, idx) => {
        return (
          <View style={styles.healthLogRowFull} key={`symp_${idx}`}>
            {row.map((symptom, index) => {
              if (!symptom) {
                return (
                  <View style={animatedStyle} key={`symp_${idx}_${index}`} />
                );
              }
              const item = props.masterLog.emotion.items[symptom];
              let circleStyle = {borderColor: colors.walk_discuss_back};
              return (
                <SymptomIcon
                  containerStyle={animatedStyle}
                  key={`symp_${idx}_${index}`}
                  item={item}
                  circleStyle={circleStyle}
                />
              );
            })}
          </View>
        );
      })}
      {getSpacerView()}
    </View>
  );
};

const getSymptomsHygieneLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['hygiene']) {
    return null;
  }
  let loggedSymptopms = [].concat(props.notes.hygiene.items);
  const requiredItems = 4 - (loggedSymptopms.length % 4);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);
  const animatedStyle = styles.circleItemWrpr;
  return (
    <View>
      {getTitleText(props.masterLog.hygiene.display)}
      {listItems.map((row, idx) => {
        return (
          <View style={styles.healthLogRowFull} key={`symp_${idx}`}>
            {row.map((symptom, index) => {
              if (!symptom) {
                return (
                  <View style={animatedStyle} key={`symp_${idx}_${index}`} />
                );
              }
              const item = props.masterLog.hygiene.items[symptom];
              let circleStyle = {};
              return (
                <SymptomIcon
                  containerStyle={animatedStyle}
                  key={`symp_${idx}_${index}`}
                  item={item}
                  circleStyle={circleStyle}
                />
              );
            })}
          </View>
        );
      })}
      {getSpacerView()}
    </View>
  );
};

const getSymptomsFluidLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['fluid']) {
    return null;
  }
  const animatedStyle = styles.circleItemWrpr;
  let circleStyle = {};
  return (
    <View>
      {getTitleText(props.masterLog.fluid.display)}
      <View style={styles.healthLogRowFull}>
        <SymptomIcon
          containerStyle={animatedStyle}
          item={props.masterLog.fluid.items[props.notes['fluid'].type]}
          circleStyle={circleStyle}
        />
        {props.notes['fluid'].color ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            item={props.masterLog.fluid.items[props.notes['fluid'].color]}
            circleStyle={{
              borderColor:
                props.masterLog.fluid.items[props.notes['fluid'].color]
                  .borderColor,
            }}
          />
        ) : (
          <View style={animatedStyle} />
        )}
        <View style={animatedStyle} />
        <View style={animatedStyle} />
      </View>
      {getSpacerView()}
    </View>
  );
};

const getSymptomsIntercourseLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['intercourse']) {
    return null;
  }
  const animatedStyle = styles.circleItemWrpr;
  let circleStyle = {borderColor: colors.intecourse_color};
  let emptyRows = 3;
  if (props.notes['intercourse'].female_orgasm) {
    emptyRows--;
  }
  if (
    props.notes['intercourse'].type === 'unprotected' &&
    props.notes['intercourse'].unprotected
  ) {
    emptyRows--;
  } else if (
    props.notes['intercourse'].type === 'protected' &&
    props.notes['intercourse'].protected
  ) {
    emptyRows--;
  }
  return (
    <View>
      {getTitleText(props.masterLog.intercourse.display)}
      <View style={styles.healthLogRowFull}>
        <SymptomIcon
          containerStyle={animatedStyle}
          item={
            props.masterLog.intercourse.type.items[
              props.notes['intercourse'].type
            ]
          }
          circleStyle={circleStyle}
        />
        {props.notes['intercourse'].protected ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            item={
              props.masterLog.intercourse.protected.items[
                props.notes['intercourse'].protected
              ]
            }
            circleStyle={circleStyle}
          />
        ) : null}
        {props.notes['intercourse'].unprotected ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            item={
              props.masterLog.intercourse.unprotected.items[
                props.notes['intercourse'].unprotected
              ]
            }
            circleStyle={circleStyle}
          />
        ) : null}
        {props.notes['intercourse'].female_orgasm ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            item={
              props.masterLog.intercourse.female_orgasm.items[
                props.notes['intercourse'].female_orgasm
              ]
            }
            circleStyle={circleStyle}
          />
        ) : null}

        {emptyRows === 3 ? (
          <Fragment>
            <View style={animatedStyle} />
            <View style={animatedStyle} />
            <View style={animatedStyle} />
          </Fragment>
        ) : emptyRows === 2 ? (
          <Fragment>
            <View style={animatedStyle} />
            <View style={animatedStyle} />
          </Fragment>
        ) : emptyRows === 1 ? (
          <View style={animatedStyle} />
        ) : null}
      </View>
      {getSpacerView()}
    </View>
  );
};

const getSymptomsTestMonitorLog = props => {
  //Check if we have lifestyle log
  if (!props.notes['testMonitor']) {
    return null;
  }
  const animatedStyle = styles.circleItemWrpr;
  let circleStyle = {};
  let emptyRows = 4;
  if (props.notes['testMonitor'].fertile) {
    emptyRows--;
  }
  if (props.notes['testMonitor'].ovulation) {
    emptyRows--;
  }
  if (props.notes['testMonitor'].pregnancy) {
    emptyRows--;
  }
  let ovulationItem = props.notes['testMonitor'].ovulation
    ? {
        ...props.masterLog.testMonitor.ovulation.items[
          props.notes['testMonitor'].ovulation
        ],
      }
    : null;
  if (ovulationItem) {
    ovulationItem.name = `Ovulation\n${ovulationItem.name}`;
  }
  let pregnancyItem = props.notes['testMonitor'].pregnancy
    ? {
        ...props.masterLog.testMonitor.pregnancy.items[
          props.notes['testMonitor'].pregnancy
        ],
      }
    : null;
  if (pregnancyItem) {
    pregnancyItem.name = `Pregnancy\n${pregnancyItem.name}`;
  }
  let fertileItem = props.notes['testMonitor'].fertile
    ? {
        ...props.masterLog.testMonitor.fertile.items[
          props.notes['testMonitor'].fertile
        ],
      }
    : null;
  if (fertileItem) {
    fertileItem.name = `Fertile\n${fertileItem.name}`;
  }
  return (
    <View>
      {getTitleText(props.masterLog.testMonitor.display)}
      <View style={styles.healthLogRowFull}>
        {ovulationItem ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            iconProps={{strokeColor: colors.txt_header_color}}
            item={ovulationItem}
          />
        ) : null}
        {pregnancyItem ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            iconProps={{strokeColor: colors.txt_header_color}}
            item={pregnancyItem}
          />
        ) : null}
        {fertileItem ? (
          <SymptomIcon
            containerStyle={animatedStyle}
            iconProps={{fillColor: colors.txt_header_color}}
            item={fertileItem}
          />
        ) : null}

        {emptyRows === 3 ? (
          <Fragment>
            <View style={animatedStyle} />
            <View style={animatedStyle} />
            <View style={animatedStyle} />
          </Fragment>
        ) : emptyRows === 2 ? (
          <Fragment>
            <View style={animatedStyle} />
            <View style={animatedStyle} />
          </Fragment>
        ) : emptyRows === 1 ? (
          <View style={animatedStyle} />
        ) : null}
      </View>
      {getSpacerView()}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(20),
  },
  wrpr: {
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    width: width,
    height: height * 0.45,
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
  headerDeleteView: {
    position: 'absolute',
    left: moderateScale(25),
    top: 0 - moderateScale(15),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  headerEditView: {
    position: 'absolute',
    right: moderateScale(25),
    top: 0 - moderateScale(15),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  boxWrpr: {
    width: width,
    height: height * 0.45,
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(43),
    borderTopRightRadius: moderateScale(43),
  },
  headingWrpr: {
    alignItems: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
  },
  speparator: {
    height: moderateScale(15),
    backgroundColor: '#f9f9f9',
    marginBottom: moderateScale(5),
  },
  scrollView: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  notesRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notesAddBtn: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(42) / 2,
    alignItems: 'center',
  },
  plusButtonView: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(42) / 2,
    backgroundColor: colors.gradient_header1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainActionRow: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    marginBottom: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ovulationView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(10),
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
  },
  addPeriodBtn: {
    height: moderateScale(70),
    width: moderateScale(100),
    borderRadius: moderateScale(20),
    backgroundColor: colors.gradient_header1,
    shadowColor: colors.gradient_header1,
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 0},
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPeriodBtn: {
    shadowColor: 'rgba(255, 210, 87, 0.8)',
    backgroundColor: 'rgba(255, 210, 87, 0.8)',
  },
  editPeriodBtnFloat: {
    position: 'absolute',
    left: moderateScale(25),
    top: 0 - moderateScale(15),
  },
  editPeriodBtnSmall: {
    height: moderateScale(50),
    width: moderateScale(90),
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(255, 210, 87, 0.5)',
    shadowColor: 'rgba(255, 210, 87, 0.5)',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthLogRowFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleItemWrpr: {
    marginBottom: moderateScale(6),
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
    width: itemWidth,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  lifestyleSelected: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40) / 2,
    borderWidth: moderateScale(2),
    borderColor: colors.walktrgh_arrow,
  },
  spacerViewNotes: {
    height: moderateScale(15),
  },
});

ModalCalendarMore.defaultProps = {
  contentKey: 'obstetricsHistory',
  visible: false,
  backdropColor: colors.white,
  onBackdropPress: () => {},
  backdropOpacity: 0.6,
  animationIn: 'fadeIn',
  animationInTiming: 300,
  animationOut: 'fadeOut',
  animationOutTiming: 300,
  useNativeDriver: true,
};

export default ModalCalendarMore;
