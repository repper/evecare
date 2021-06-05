import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Shadow} from 'react-native-neomorph-shadows';
import moment from 'moment';

import Modal from 'react-native-modal';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import settings from '../../config/settings';
import {
  PoppinsTextRegular,
  PoppinsTextLight,
  PoppinsTextMedium,
  PoppinsTextSemiBold,
} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import InfoModal from '../../components/InfoModal';
import Button from '../../components/Button';

import SymptomIcon from '../../components/SymptomIcon';
import {convertFahrenToCelsi, convertKgToLbs} from '../../lib/util';

const {width, height} = Dimensions.get('window');

const headerHeight = settings.headerHeight;
const innerPadding = moderateScale(15);
const cardPadding = moderateScale(8);
const itemWidth = (width - innerPadding - cardPadding * 2) / 4;
const perRowItems = 4;

const storeDtFormat = 'YYYY-MM-DD';

const AddNotes = props => {
  const isFutureDate = moment(props.selectedDate.format('YYYY-MM-DD')).isAfter(
    props.today.format('YYYY-MM-DD'),
  );
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.light_pink}]}>
      {getHeader(props)}
      {getCalendarStrip(props)}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {isFutureDate ? (
          getNotesView(props)
        ) : (
          <View>
            {getLifeStyleView(props)}
            {getSpacerView()}
            {getNotesView(props)}
            {getSpacerView()}
            {getBleedingView(props)}
            {getSpacerView()}
            {getSymptoms(props)}
            {getSpacerView()}
            {getEmotionsMood(props)}
            {getSpacerView()}
            {getHygieneView(props)}
            {getSpacerView()}
            {getFluidView(props)}
            {getSpacerView()}
            {getIntercourseView(props)}
            {getSpacerView()}
            {getTestMonitorView(props)}
            {getSpacerView()}
            {getMoreView(props)}
            {getSpacerView()}
            {getSpacerView()}
            {bleedingModal(props)}
            {intercourseModal(props)}
            {ovulationModal(props)}
          </View>
        )}
      </ScrollView>
      <InfoModal
        onBackdropPress={props.hideInfoModal}
        visible={props.infoModalState}
        contentKey={props.contentKey}
      />
    </SafeAreaView>
  );
};

const getHeader = props => {
  {
    /** HEADER */
  }
  return (
    <Shadow style={{...styles.headerView, ...cs.headerStyle}}>
      <PoppinsTextRegular color={29} fontSize={22}>
        {props.currentMonth}
      </PoppinsTextRegular>
      <TouchableWithoutFeedback onPress={props.setSelectedDayToToday}>
        <View style={styles.calendarView}>
          <PoppinsTextRegular
            color={29}
            fontSize={13}
            style={{lineHeight: 15, top: 2}}>
            {props.today.format('D')}
          </PoppinsTextRegular>
          <Icon
            name="calendar_icon"
            color={colors.txt_header_color}
            size={moderateScale(24)}
            style={styles.calendarIcon}
          />
        </View>
      </TouchableWithoutFeedback>
    </Shadow>
  );
};

const getCalendarStrip = props => {
  {
    /**
    CALENDAR STRIP
     */
  }
  const dayLoggedDates = props.healthLog.dates;
  return (
    <CalendarStrip
      scrollable={true}
      selectedDate={props.selectedDate}
      style={{
        height: moderateScale(60),
      }}
      key={props.selectedDate.format('YYYY-MM-DD')}
      showMonth={false}
      showDate={true}
      leftSelector={[]}
      rightSelector={[]}
      onWeekChanged={(start, end) => props.onCalStripWeekChanged(end)}
      datesBlacklist={date => calStripDisabledDates(date, props)}
      dayComponent={event => {
        let highlighStyle = [styles.calStripDate];
        let wrprStyle = [styles.calStripWrpr];
        let borderBottomStyle = [styles.calBorderBottom];
        const dtFormatted = event.date.format('YYYY-MM-DD');
        if (
          moment(dtFormatted).isSame(props.selectedDate.format('YYYY-MM-DD'))
        ) {
          wrprStyle.push(styles.calStripDateSelected);
        }
        if (dayLoggedDates.indexOf(dtFormatted) >= 0) {
          borderBottomStyle.push(styles.calBorderBottomSelected);
        }
        let txt_color = 38;
        if (event.enabled) {
          txt_color = 5;
        }
        return (
          <TouchableWithoutFeedback
            onPress={() => props.onCalStripDateChanged(event.date)}>
            <View style={wrprStyle}>
              <View style={highlighStyle}>
                <PoppinsTextRegular
                  color={txt_color}
                  fontSize={13}
                  style={styles.calStripDateName}>
                  {event.date.format('dd').toUpperCase()}
                </PoppinsTextRegular>
                <PoppinsTextSemiBold color={txt_color} fontSize={14}>
                  {event.date.format('DD')}
                </PoppinsTextSemiBold>
              </View>
              <View style={styles.calBottomView}>
                <View style={borderBottomStyle} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
};

const calStripDisabledDates = (date, props) => {
  return moment(date.format('YYYY-MM-DD')).isBefore(
    props.today.format('YYYY-MM-DD'),
  );
};

const getSpacerView = () => {
  return <View style={styles.spacerView} />;
};

const getCardTitleView = (title, onPress, onPressNext) => {
  return (
    <View style={styles.titleRow}>
      <PoppinsTextRegular
        color={6}
        fontSize={15}>{`${title}`}</PoppinsTextRegular>
      {typeof onPress === 'function' ? (
        <Icon
          name="i_circle"
          color={colors.grey_popino}
          size={20}
          onPress={onPress}
        />
      ) : onPress === 'add_note' ? (
        <Icon name={'plus'} size={20} onPress={onPressNext} />
      ) : onPress === 'add_note_edit' ? (
        <Icon name={'edit'} size={20} onPress={onPressNext} />
      ) : null}
    </View>
  );
};

const getRowsAndItems = (items, rowItemCount = perRowItems) => {
  let listItems = [];
  let arrIdx = 0;
  let storeItems = Object.keys(items).map(key => {
    return {key, ...items[key]};
  });
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

const getLifeStyleView = props => {
  {
    /**
    Lifestyle
     */
  }
  const listItems = getRowsAndItems(props.masterHealthLog.lifestyle.items);
  const logData =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(156)}}>
      {getCardTitleView(props.masterHealthLog.lifestyle.display, () =>
        props.showInfoModal('hlog_lifestyle'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`life_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`life_${idx}_${index}`} />
                  );
                }
                let circleStyle = {};
                let showVal = false;
                let storeVal = '';
                let storeUnit = '';
                let hasIconWidth = true;
                let iconWidth = 35;
                let iconHeight = 35;
                switch (item.storeKey) {
                  case 'sugar':
                    iconWidth = 32;
                    iconHeight = 38;
                    break;
                  case 'blood_pressure':
                    break;
                  case 'bb_temperature':
                    iconWidth = 19;
                    iconHeight = 33;
                    break;
                  case 'weight':
                    iconWidth = 29;
                    iconHeight = 28;
                    break;
                  default:
                    break;
                }
                if (logData && logData[item.storeKey]) {
                  const keys = Object.keys(logData[item.storeKey].items);
                  if (keys.length > 0) {
                    showVal = true;
                    storeVal = logData[item.storeKey].items[keys[0]];
                    circleStyle = styles.lifestyleSelected;
                    switch (item.storeKey) {
                      case 'sugar':
                        storeUnit = 'mg/dl';
                        iconWidth = 22;
                        iconHeight = 28;
                        break;
                      case 'blood_pressure':
                        storeUnit = 'mmHg';
                        storeVal = `${storeVal.sys}/${storeVal.dia}`;
                        iconWidth = 25;
                        iconHeight = 25;
                        break;
                      case 'bb_temperature':
                        storeUnit = props.units.temp.substr(0, 1).toUpperCase();
                        if (storeUnit === 'C') {
                          const tempVal = convertFahrenToCelsi(storeVal);
                          storeVal = Number([tempVal[0], tempVal[1]].join('.'));
                        }
                        iconWidth = 15;
                        iconHeight = 25;
                        break;
                      case 'weight':
                        storeUnit = props.units.weight;
                        if (storeUnit !== 'kg') {
                          const conVal = convertKgToLbs(storeVal);
                          storeVal = Number([conVal[0], conVal[1]].join('.'));
                        }
                        storeUnit = storeUnit.toUpperCase();
                        iconWidth = 20;
                        iconHeight = 20;
                        break;
                      default:
                        break;
                    }
                  }
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`life_${idx}_${index}`}
                    item={item}
                    showVal={showVal}
                    storeVal={storeVal}
                    storeUnit={storeUnit}
                    circleStyle={circleStyle}
                    hasIconWidth={hasIconWidth}
                    iconWidth={iconWidth}
                    iconHeight={iconHeight}
                    onPress={() => props.navigateToScreen(item)}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getNotesView = props => {
  {
    /**
    Write Notes
     */
  }
  const logData =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  const hasNotes = logData && logData.notes && logData.notes.length > 0;
  const heightShadow = hasNotes ? moderateScale(85) : moderateScale(48);
  return (
    <Shadow
      style={{
        ...styles.card,
        height: heightShadow,
      }}
      key={`snv_${heightShadow}`}>
      {hasNotes
        ? getCardTitleView('Write Notes', 'add_note_edit', () =>
            props.navigateToScreen({screen: 'WriteNotes'}),
          )
        : getCardTitleView('Write Notes', 'add_note', () =>
            props.navigateToScreen({screen: 'WriteNotes'}),
          )}
      {hasNotes ? (
        <View>
          <PoppinsTextLight
            color={6}
            fontSize={14}
            numberOfLines={2}
            style={{width: width - 2 * innerPadding - 2 * cardPadding}}>
            {logData.notes}
          </PoppinsTextLight>
        </View>
      ) : null}
    </Shadow>
  );
};

const getBleedingView = props => {
  {
    /**
    Bleeding
     */
  }
  const listItems = getRowsAndItems(props.masterHealthLog.bleeding.flow.items);
  const logData =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(146)}}>
      {getCardTitleView(props.masterHealthLog.bleeding.display, () =>
        props.showInfoModal('hlog_bleeding'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`bled_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`bled_${idx}_${index}`} />
                  );
                }
                let circleStyle = {borderColor: colors.walk_period_back};
                let isSelected = false;
                if (
                  logData &&
                  logData.bleeding &&
                  logData.bleeding.flow === item.key
                ) {
                  circleStyle['backgroundColor'] = colors.walk_period_back;
                  isSelected = true;
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`bled_${idx}_${index}`}
                    item={item}
                    circleStyle={circleStyle}
                    icon={isSelected ? item.iconSelected : item.icon}
                    onPress={() =>
                      props.showBleedingPopup(
                        item,
                        'bleeding',
                        isSelected,
                        props.masterHealthLog.bleeding.display,
                      )
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getSymptoms = props => {
  {
    /**
    SYMPOTOMS
     */
  }

  const listItems = getRowsAndItems(props.masterHealthLog.symptoms.items);
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(636)}}>
      {getCardTitleView(props.masterHealthLog.symptoms.display, () =>
        props.showInfoModal('hlog_symptom'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`symp_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`symp_${idx}_${index}`} />
                  );
                }
                let circleStyle = {};
                let isSelected = false;
                if (
                  dayLog &&
                  dayLog.symptoms &&
                  dayLog.symptoms.items &&
                  dayLog.symptoms.items.indexOf(item.key) >= 0
                ) {
                  circleStyle['backgroundColor'] = colors.symptomes_svg_color;
                  circleStyle['borderColor'] = colors.walktrgh_arrow;
                  isSelected = true;
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`symp_${idx}_${index}`}
                    item={item}
                    circleStyle={circleStyle}
                    onPress={() =>
                      props.onHealthLogPress(item, 'symptoms', isSelected)
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getEmotionsMood = props => {
  {
    /**
    Emotoions/Mood
     */
  }
  const listItems = getRowsAndItems(props.masterHealthLog.emotion.items);
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(515)}}>
      {getCardTitleView(props.masterHealthLog.emotion.display, () =>
        props.showInfoModal('hlog_emotion_mood'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`emot_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`emot_${idx}_${index}`} />
                  );
                }
                let circleStyle = {borderColor: colors.walk_discuss_back};
                let isSelected = false;
                if (
                  dayLog &&
                  dayLog.emotion &&
                  dayLog.emotion.items &&
                  dayLog.emotion.items.indexOf(item.key) >= 0
                ) {
                  circleStyle['backgroundColor'] = colors.walk_discuss_back;
                  circleStyle['borderColor'] = colors.walk_discuss_back;
                  isSelected = true;
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`emot_${idx}_${index}`}
                    item={item}
                    icon={isSelected ? item.iconSelected : item.icon}
                    circleStyle={circleStyle}
                    onPress={() =>
                      props.onHealthLogPress(item, 'emotion', isSelected)
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getHygieneView = props => {
  {
    /**
    Hygiene
     */
  }
  const listItems = getRowsAndItems(props.masterHealthLog.hygiene.items);
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(146)}}>
      {getCardTitleView(props.masterHealthLog.hygiene.display, () =>
        props.showInfoModal('hlog_hygiene'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`hyge_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`hyge_${idx}_${index}`} />
                  );
                }
                let circleStyle = {};
                let isSelected = false;
                if (
                  dayLog &&
                  dayLog.hygiene &&
                  dayLog.hygiene.items &&
                  dayLog.hygiene.items.indexOf(item.key) >= 0
                ) {
                  circleStyle['backgroundColor'] = colors.txt_header_color;
                  isSelected = true;
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`hyge_${idx}_${index}`}
                    item={item}
                    icon={isSelected ? item.iconSelected : item.icon}
                    circleStyle={circleStyle}
                    onPress={() =>
                      props.onHealthLogPress(item, 'hygiene', isSelected)
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getFluidView = props => {
  {
    /**
    fluid
     */
  }
  const listItems = getRowsAndItems(props.masterHealthLog.fluid.items);
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(232)}}>
      {getCardTitleView(props.masterHealthLog.fluid.display, () =>
        props.showInfoModal('hlog_fluid'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`fluid_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`fluid_${idx}_${index}`} />
                  );
                }
                let circleStyle = {};
                let isSelected = false;
                if (dayLog && dayLog.fluid) {
                  if (item.borderColor && item.key === dayLog.fluid.color) {
                    circleStyle['backgroundColor'] = colors.symptomes_svg_color;
                    isSelected = true;
                  } else if (
                    !item.borderColor &&
                    item.key === dayLog.fluid.type
                  ) {
                    circleStyle['backgroundColor'] = colors.symptomes_svg_color;
                    isSelected = true;
                  }
                }
                if (item.borderColor) {
                  circleStyle['borderColor'] = item.borderColor;
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`fluid_${idx}_${index}`}
                    item={item}
                    circleStyle={circleStyle}
                    onPress={() =>
                      props.onHealthLogPress(item, 'fluid', isSelected)
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getIntercourseView = props => {
  {
    /**
    Intercourse
     */
  }
  const listItems = getRowsAndItems(
    props.masterHealthLog.intercourse.type.items,
  );
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(156)}}>
      {getCardTitleView(props.masterHealthLog.intercourse.display, () =>
        props.showInfoModal('hlog_intercourse'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`inter_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View style={animatedStyle} key={`inter_${idx}_${index}`} />
                  );
                }
                let circleStyle = {borderColor: colors.intecourse_color};
                let isSelected = false;
                const isFemaleOrgasmKey = item.key === 'female_orgasm';

                if (dayLog && dayLog.intercourse) {
                  if (dayLog.intercourse.type === item.key) {
                    circleStyle['backgroundColor'] = colors.intecourse_color;
                    isSelected = true;
                  } else if (
                    dayLog.intercourse.female_orgasm &&
                    isFemaleOrgasmKey
                  ) {
                    //Check if female orgasm is selected
                    circleStyle['backgroundColor'] = colors.intecourse_color;
                    isSelected = true;
                  }
                }
                let icon = isSelected ? item.iconSelected : item.icon;
                if (
                  dayLog &&
                  dayLog.intercourse &&
                  isFemaleOrgasmKey &&
                  isSelected
                ) {
                  icon =
                    dayLog.intercourse.female_orgasm === 'yes'
                      ? item.iconSelected
                      : item.iconSelectedNo;
                }

                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`inter_${idx}_${index}`}
                    item={item}
                    icon={icon}
                    circleStyle={circleStyle}
                    onPress={
                      isFemaleOrgasmKey
                        ? () => {}
                        : () =>
                            props.showIntercoursePopup(
                              item,
                              'intercourse',
                              isSelected,
                              props.masterHealthLog.intercourse.display,
                            )
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getTestMonitorView = props => {
  {
    /**
    TestMonitor
     */
  }
  const listItems = getRowsAndItems(
    props.masterHealthLog.testMonitor.type.items,
  );
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Shadow style={{...styles.card, height: moderateScale(146)}}>
      {getCardTitleView(props.masterHealthLog.testMonitor.display, () =>
        props.showInfoModal('hlog_test_monitor'),
      )}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`testmon_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View
                      style={animatedStyle}
                      key={`testmon_${idx}_${index}`}
                    />
                  );
                }
                let isSelected = false;
                let icon = item.icon;
                let iconProps = {fillColor: colors.yellow_color};
                if (item.key === 'pregnancy') {
                  iconProps = {strokeColor: colors.txt_header_color};
                }
                let circleStyle = {};
                if (
                  dayLog &&
                  dayLog.testMonitor &&
                  dayLog.testMonitor[item.key]
                ) {
                  if (
                    props.masterHealthLog.testMonitor[item.key] &&
                    props.masterHealthLog.testMonitor[item.key].items &&
                    props.masterHealthLog.testMonitor[item.key].items[
                      dayLog.testMonitor[item.key]
                    ]
                  ) {
                    const selItem =
                      props.masterHealthLog.testMonitor[item.key].items[
                        dayLog.testMonitor[item.key]
                      ];
                    icon = selItem.icon;
                    isSelected = true;
                    iconProps = {strokeColor: colors.white};
                    if (item.key === 'fertile') {
                      iconProps = {fillColor: colors.white};
                    }
                    circleStyle['backgroundColor'] = colors.txt_header_color;
                  }
                }
                //fbd154
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`testmon_${idx}_${index}`}
                    item={item}
                    icon={icon}
                    circleStyle={circleStyle}
                    iconProps={iconProps}
                    onPress={() =>
                      props.showTestMonitorPopup(
                        item,
                        'testMonitor',
                        isSelected,
                      )
                    }
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const getMoreView = props => {
  {
    /**
    MORE
     */
  }
  const listItems = getRowsAndItems(props.masterHealthLog.moreSympt.items);
  return (
    <Shadow style={{...styles.card, height: moderateScale(156)}}>
      {getCardTitleView(props.masterHealthLog.moreSympt.display)}
      <View style={styles.healthLogWrpr}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`moresym_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return (
                    <View
                      style={animatedStyle}
                      key={`moresym_${idx}_${index}`}
                    />
                  );
                }
                return (
                  <SymptomIcon
                    containerStyle={animatedStyle}
                    key={`moresym_${idx}_${index}`}
                    item={item}
                    onPress={() => props.navigateToScreen(item)}
                    circleStyle={{borderColor: colors.red_light}}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </Shadow>
  );
};

const bleedingModal = props => {
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Modal
      isVisible={props.popUps.bleeding}
      onBackButtonPress={props.hideSymptomMorePopup}
      onBackdropPress={props.hideSymptomMorePopup}
      animationInTiming={300}
      animationOutTiming={300}
      backdropColor="rgb(252,239,246)"
      backdropOpacity={0.9}
      useNativeDriver={true}>
      <Shadow style={styles.modalWrpr}>
        <View style={styles.modalInner}>
          <View style={styles.modalTitleWrpr}>
            <PoppinsTextMedium color={3} fontSize={18}>{`${
              props.popUps.title
            }`}</PoppinsTextMedium>
            <View style={styles.modalSelectedInfo}>
              <View style={styles.headerTitleInfo}>
                <PoppinsTextRegular color={10} fontSize={15}>
                  {`${props.popUps.item.name}`}
                </PoppinsTextRegular>
                <PoppinsTextLight color={6} fontSize={12}>
                  Flow
                </PoppinsTextLight>
              </View>
              <SymptomIcon
                containerStyle={[
                  styles.circleItemWrpr,
                  {width: 'auto', height: 'auto'},
                ]}
                item={props.popUps.item}
                icon={props.popUps.item.iconSelected}
                showTitle={false}
                circleStyle={{
                  borderColor: colors.walk_period_back,
                  backgroundColor: colors.walk_period_back,
                }}
              />
            </View>
          </View>
          <ScrollView
            contentContainerStyle={[cs.flexGrow, styles.modalScrollView]}
            showsVerticalScrollIndicator={false}>
            {getBleedRow(true, false, false, 3, 'type', props, dayLog)}

            {getBleedRow(false, false, false, 4, 'color', props, dayLog)}

            {getBleedRow(false, false, true, 0, 'smell', props, dayLog)}

            {getBleedRow(false, true, true, 0, 'modality', props, dayLog)}
          </ScrollView>
          {modalCloseView(props)}
        </View>
      </Shadow>
    </Modal>
  );
};

const modalCloseView = props => {
  return (
    <View style={styles.modalClose}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.hideSymptomMorePopup}>
        <PoppinsTextRegular
          color={15}
          fontSize={15}
          style={styles.modalCloseTxt}>
          Close
        </PoppinsTextRegular>
      </TouchableOpacity>
    </View>
  );
};

const getBleedRow = (
  isFirst,
  isLast,
  isRowItem,
  perRow,
  storeKey,
  props,
  dayLog,
) => {
  let listArr = [];
  if (isRowItem) {
    listArr = Object.keys(props.masterHealthLog.bleeding[storeKey].items);
  } else {
    listArr = getRowsAndItems(
      props.masterHealthLog.bleeding[storeKey].items,
      perRow,
    );
  }
  let styleArr = [styles.modalSectionWrpr];
  if (isLast) {
    styleArr.push(styles.modalSectionWrprLast);
  }
  return (
    <View style={styleArr}>
      <PoppinsTextRegular color={6} fontSize={14}>
        {`${props.masterHealthLog.bleeding[storeKey].title}`}
      </PoppinsTextRegular>

      {isRowItem
        ? listArr.map((key, idx) => {
            let item = props.masterHealthLog.bleeding[storeKey].items[key];
            item.key = key;
            let isSelected = false;
            let iconName = 'radio_empty';
            if (dayLog && dayLog.bleeding) {
              if (item.key === dayLog.bleeding[storeKey]) {
                iconName = 'radio_fill';
                isSelected = true;
              } else if (
                Array.isArray(dayLog.bleeding[storeKey]) &&
                dayLog.bleeding[storeKey].indexOf(item.key) >= 0
              ) {
                iconName = 'tick_circle';
                isSelected = true;
              }
            }
            return (
              <TouchableOpacity
                key={`bled_${storeKey}_${idx}`}
                activeOpacity={0.8}
                onPress={() =>
                  props.onBleedMoreSelect(
                    storeKey,
                    item,
                    'bleeding',
                    isSelected,
                  )
                }>
                <View style={styles.checkRow}>
                  <Icon
                    name={iconName}
                    color={colors.walk_discuss_back}
                    size={moderateScale(22)}
                  />
                  <PoppinsTextLight
                    color={10}
                    fontSize={13}
                    style={{
                      marginLeft: moderateScale(6),
                      marginTop: moderateScale(3),
                    }}>
                    {item.name}
                  </PoppinsTextLight>
                </View>
              </TouchableOpacity>
            );
          })
        : listArr.map((row, idx) => {
            const animatedStyle = styles.circleItemWrpr;
            return (
              <View
                style={styles.healthLogRowFull}
                key={`bled_${storeKey}_${idx}`}>
                {row.map((item, index) => {
                  if (item.empty) {
                    return (
                      <View
                        style={animatedStyle}
                        key={`bled_${storeKey}_${idx}_${index}`}
                      />
                    );
                  }
                  let circleStyle = {};
                  let isSelected = false;
                  if (storeKey === 'color') {
                    circleStyle['borderColor'] = item.color;
                  }
                  if (dayLog && dayLog.bleeding) {
                    if (item.key === dayLog.bleeding[storeKey]) {
                      isSelected = true;
                      if (storeKey === 'color') {
                        circleStyle['borderColor'] = colors.symptomes_svg_color;
                      } else {
                        circleStyle['borderColor'] = colors.walktrgh_arrow;
                        circleStyle['backgroundColor'] =
                          colors.symptomes_svg_color;
                      }
                    }
                  }

                  return (
                    <SymptomIcon
                      containerStyle={animatedStyle}
                      key={`bled_${storeKey}_${idx}_${index}`}
                      item={item}
                      circleStyle={circleStyle}
                      onPress={() =>
                        props.onBleedMoreSelect(
                          storeKey,
                          item,
                          'bleeding',
                          isSelected,
                        )
                      }
                    />
                  );
                })}
              </View>
            );
          })}
    </View>
  );
};

const intercourseModal = props => {
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  return (
    <Modal
      isVisible={props.popUps.intercourse}
      onBackButtonPress={props.hideSymptomMorePopup}
      onBackdropPress={props.hideSymptomMorePopup}
      animationInTiming={300}
      animationOutTiming={300}
      backdropColor="rgb(252,239,246)"
      backdropOpacity={0.9}
      useNativeDriver={true}>
      <Shadow style={styles.modalWrpr}>
        <View style={styles.modalInner}>
          <View style={styles.modalTitleWrpr}>
            <PoppinsTextMedium color={3} fontSize={18}>{`${
              props.popUps.title
            }`}</PoppinsTextMedium>
            <View style={styles.modalSelectedInfo}>
              <View style={styles.headerTitleInfo}>
                <PoppinsTextRegular color={10} fontSize={15}>
                  {`${props.popUps.item.name}`}
                </PoppinsTextRegular>
                <PoppinsTextLight color={6} fontSize={12}>
                  Sex
                </PoppinsTextLight>
              </View>
              <SymptomIcon
                containerStyle={[
                  styles.circleItemWrpr,
                  {width: 'auto', height: 'auto'},
                ]}
                item={props.popUps.item}
                icon={props.popUps.item.iconSelected}
                showTitle={false}
                circleStyle={{
                  borderColor: colors.intecourse_color,
                  backgroundColor: colors.intecourse_color,
                }}
              />
            </View>
          </View>
          <ScrollView
            contentContainerStyle={[cs.flexGrow, styles.modalScrollView]}
            showsVerticalScrollIndicator={false}>
            {getIntercourseRow(false, 2, props.popUps.item.key, props, dayLog)}
            {getIntercourseRow(true, 2, 'female_orgasm', props, dayLog)}
            <View style={styles.modalDeleteWrpr}>
              <Button
                text="Delete Record"
                onPress={props.onDeleteIntercourse}
              />
            </View>
          </ScrollView>
          {modalCloseView(props)}
        </View>
      </Shadow>
    </Modal>
  );
};

const getIntercourseRow = (isLast, perRow, storeKey, props, dayLog) => {
  if (typeof props.masterHealthLog.intercourse[storeKey] === 'undefined') {
    return null;
  }
  let listArr = getRowsAndItems(
    props.masterHealthLog.intercourse[storeKey].items,
    perRow,
  );
  let styleArr = [styles.modalSectionWrpr];
  if (isLast) {
    styleArr.push(styles.modalSectionWrprLast);
  }
  return (
    <View style={styleArr}>
      <PoppinsTextRegular color={6} fontSize={14}>
        {`${props.masterHealthLog.intercourse[storeKey].title}`}
      </PoppinsTextRegular>

      {listArr.map((row, idx) => {
        const animatedStyle = styles.circleItemWrpr;
        return (
          <View
            style={styles.healthLogRowFull}
            key={`inter_${storeKey}_${idx}`}>
            {row.map((item, index) => {
              if (item.empty) {
                return (
                  <View
                    style={animatedStyle}
                    key={`inter_${storeKey}_${idx}_${index}`}
                  />
                );
              }
              let circleStyle = {};
              let isSelected = false;
              circleStyle['borderColor'] = colors.intecourse_color;
              if (dayLog && dayLog.intercourse) {
                if (item.key === dayLog.intercourse[storeKey]) {
                  isSelected = true;
                  circleStyle['backgroundColor'] = colors.intecourse_color;
                }
              }
              let icon =
                isSelected && item.iconSelected ? item.iconSelected : item.icon;
              let iconProps = {};
              if (isSelected && item.iconSelectedColor) {
                iconProps['fillColor'] = item.iconSelectedColor;
              }

              return (
                <SymptomIcon
                  containerStyle={animatedStyle}
                  key={`inter_${storeKey}_${idx}_${index}`}
                  item={item}
                  icon={icon}
                  iconProps={iconProps}
                  circleStyle={circleStyle}
                  onPress={() =>
                    props.onBleedMoreSelect(
                      storeKey,
                      item,
                      'intercourse',
                      isSelected,
                    )
                  }
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const ovulationModal = props => {
  let storeKey = 'ovulation';
  let itemCount = 2;
  const isVisible =
    props.popUps.ovulation || props.popUps.pregnancy || props.popUps.fertile;
  if (!isVisible) {
    return null;
  }
  let iconPropsUpper = {fillColor: colors.yellow_color};
  if (props.popUps.pregnancy) {
    storeKey = 'pregnancy';
    iconPropsUpper = {strokeColor: colors.txt_header_color};
  } else if (props.popUps.fertile) {
    storeKey = 'fertile';
    itemCount = 3;
  }
  if (typeof props.masterHealthLog.testMonitor[storeKey] === 'undefined') {
    return null;
  }
  const dayLog =
    props.healthLog.dayLog[props.selectedDate.format(storeDtFormat)];
  let listArr = getRowsAndItems(
    props.masterHealthLog.testMonitor[storeKey].items,
    itemCount,
  );
  let styleArr = [styles.modalSectionWrpr, styles.modalSectionWrprLast];
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={props.hideSymptomMorePopup}
      onBackdropPress={props.hideSymptomMorePopup}
      animationInTiming={300}
      animationOutTiming={300}
      backdropColor="rgb(252,239,246)"
      backdropOpacity={0.9}
      useNativeDriver={true}>
      <Shadow style={{...styles.modalWrpr, ...styles.modalWrprShort}}>
        <View style={{...styles.modalInner, ...styles.modalInnerShort}}>
          <View style={styles.modalTitleWrpr}>
            <PoppinsTextMedium color={3} fontSize={18}>{`${
              props.popUps.title
            }`}</PoppinsTextMedium>
            <View style={styles.modalSelectedInfo}>
              <SymptomIcon
                containerStyle={[
                  styles.circleItemWrpr,
                  {width: 'auto', height: 'auto'},
                ]}
                item={props.popUps.item}
                icon={props.popUps.item.iconSelected}
                iconProps={iconPropsUpper}
                showTitle={false}
                circleStyle={{
                  borderColor: colors.txt_header_color,
                }}
              />
            </View>
          </View>
          <ScrollView
            contentContainerStyle={[cs.flexGrow, styles.modalScrollView]}
            showsVerticalScrollIndicator={false}>
            <View style={styleArr}>
              <PoppinsTextRegular color={6} fontSize={14}>
                {`${props.masterHealthLog.testMonitor[storeKey].title}`}
              </PoppinsTextRegular>

              {listArr.map((row, idx) => {
                const animatedStyle = styles.circleItemWrpr;
                return (
                  <View
                    style={styles.healthLogRowFull}
                    key={`tesmn_${storeKey}_${idx}`}>
                    {row.map((item, index) => {
                      if (item.empty) {
                        return (
                          <View
                            style={animatedStyle}
                            key={`tesmn_${storeKey}_${idx}_${index}`}
                          />
                        );
                      }
                      let circleStyle = {};
                      let isSelected = false;
                      circleStyle['borderColor'] = colors.txt_header_color;
                      let strokeColor = colors.txt_header_color;
                      let iconProps = {};
                      if (dayLog && dayLog.testMonitor) {
                        if (item.key === dayLog.testMonitor[storeKey]) {
                          isSelected = true;
                          circleStyle['backgroundColor'] =
                            colors.txt_header_color;
                          strokeColor = colors.white;
                        }
                      }
                      iconProps = {strokeColor: strokeColor};
                      if (storeKey === 'fertile') {
                        iconProps = {fillColor: strokeColor};
                      }

                      return (
                        <SymptomIcon
                          containerStyle={animatedStyle}
                          key={`tesmn_${storeKey}_${idx}_${index}`}
                          item={item}
                          icon={isSelected ? item.iconSelected : item.icon}
                          circleStyle={circleStyle}
                          iconProps={iconProps}
                          onPress={() =>
                            props.onTestMonitorSelect(
                              storeKey,
                              item,
                              'testMonitor',
                              isSelected,
                            )
                          }
                        />
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {modalCloseView(props)}
        </View>
      </Shadow>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  calendarView: {
    position: 'absolute',
    height: headerHeight,
    right: moderateScale(15),
    width: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    right: moderateScale(2),
    top: moderateScale(14),
  },
  calStripDateSelected: {
    borderRadius: moderateScale(8),
    backgroundColor: colors.bg_pink,
  },
  calStripWrpr: {
    paddingTop: moderateScale(6),
  },
  calStripDate: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calBottomView: {
    paddingLeft: moderateScale(11),
    paddingRight: moderateScale(11),
  },
  calBorderBottom: {
    height: moderateScale(4),
    borderRadius: moderateScale(8),
  },
  calBorderBottomSelected: {
    backgroundColor: '#cca1b8',
  },
  calStripDateName: {
    letterSpacing: 1,
    lineHeight: moderateScale(14),
  },
  scrollView: {
    padding: innerPadding,
  },
  spacerView: {
    marginBottom: moderateScale(16),
  },
  card: {
    width: width - 2 * innerPadding,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    backgroundColor: colors.white,
    borderRadius: 9,
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: cardPadding,
    paddingRight: cardPadding,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLogWrpr: {
    marginTop: moderateScale(16),
  },
  healthLogRowFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthLogRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  circleItem: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(50) / 2,
    borderWidth: moderateScale(2),
    borderColor: colors.txt_header_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lifestyleSelected: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40) / 2,
    borderWidth: moderateScale(2),
    borderColor: colors.walktrgh_arrow,
  },
  modalWrpr: {
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    width: width * 0.9,
    height: height * 0.85,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    borderRadius: moderateScale(9),
  },
  modalWrprShort: {
    height: height * 0.4,
  },
  modalClose: {
    alignItems: 'center',
  },
  modalCloseTxt: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    textDecorationLine: 'underline',
  },
  modalInner: {
    width: width * 0.9,
    height: height * 0.85,
    backgroundColor: colors.white,
    borderRadius: moderateScale(9),
  },
  modalInnerShort: {
    height: height * 0.4,
  },
  modalTitleWrpr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    borderBottomWidth: moderateScale(1),
    borderColor: 'rgba(208, 208, 208, 0.5)',
  },
  modalSelectedInfo: {
    flexDirection: 'row',
  },
  headerTitleInfo: {
    marginRight: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  modalScrollView: {},
  modalSectionWrprFirst: {
    marginTop: moderateScale(16),
  },
  modalSectionWrpr: {
    marginTop: moderateScale(10),
    paddingTop: moderateScale(11),
    paddingBottom: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.bg_pink,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  modalSectionWrprLast: {
    borderBottomWidth: 0,
  },
  checkRow: {
    flexDirection: 'row',
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
    alignItems: 'center',
  },
  modalDeleteWrpr: {
    paddingHorizontal: moderateScale(15),
    flex: 1,
    justifyContent: 'flex-end',
  },
});

AddNotes.propTypes = {};

export default AddNotes;
