import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Shadow, ShadowFlex} from 'react-native-neomorph-shadows';
import DropDownPicker from '../../components/DropDownPicker';
import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import images from '../../config/images';
import {
  Text as PeoText,
  PoppinsTextRegular,
  PoppinsTextMedium,
  PoppinsTextLight,
  PoppinsTextSemiBold,
} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import HealthProfileSvgIcon from '../../components/SvgIcon/healthProfileSvgIcon';
import RoundeShapeButtonIcon from '../../components/SvgIcon/roundeShapeButtonIcon';
import SymptomIcon from '../../components/SymptomIcon';
import cs from '../../config/commonStyles';
import SvgIcon from '../../components/SvgIcon/icon';

const window = Dimensions.get('window');
const {height, width} = window;

const innerPadding = moderateScale(15);
const itemWidth = (width - innerPadding) / 4;
const perRowItems = 4;

const ReportHealthProfile = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {props.allHealthLogData && props.allHealthLogData.length > 0 && props.allHealthLogData[0].key ? (
          <View style={styles.container}>
            <ShadowFlex style={styles.shadowView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <HealthProfileSvgIcon />
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    Overview
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.weekView}>
                <View>
                  <PoppinsTextMedium color={26} fontSize={22} style={{height: moderateScale(33)}}>
                    Most Logged
                  </PoppinsTextMedium>
                  <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                    Health logs
                  </PoppinsTextMedium>
                </View>
                <View>
                  <TouchableOpacity onPress={props.openOverViewDropdown}>
                    <View style={gs.weekMainView}>
                      <View style={gs.weekSubView}>
                        <PoppinsTextRegular color={26} fontSize={12}>
                          {props.selectedReportLabel}
                        </PoppinsTextRegular>
                        <View style={gs.circleView}>
                          <Icon name="arrow_down_fill" color={colors.white} />
                        </View>
                      </View>
                      <RoundeShapeButtonIcon />
                    </View>
                  </TouchableOpacity>
                  <DropDownPicker
                    items={props.dropDownItems}
                    containerStyle={{height: 0, width: 0}}
                    style={{backgroundColor: 'transparent'}}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    isVisible={props.overViewDropdownVisible}
                    dropDownStyle={[gs.dropDownStyle]}
                    onChangeItem={item => props.getSelectedHealthLog(item)}
                  />
                </View>
              </View>
              {getSymptomsFeelLog(props)}
            </ShadowFlex>
            <TouchableOpacity activeOpacity={0.5} onPress={props.navigateToAddNotes}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Logs
                    </PoppinsTextRegular>
                    <View style={styles.plusCircleView}>
                      <Icon name="plus_light" color={colors.white} size={16} />
                    </View>
                  </View>
                </Shadow>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={cs.noDataView}>
            <SvgIcon icon="ReportNoDataSvgIcon" />
            <PoppinsTextRegular color={25} fontSize={18} style={gs.textCenter}>
              Track at least one symptom to see analysis
            </PoppinsTextRegular>
            <TouchableOpacity activeOpacity={0.5} onPress={props.navigateToAddNotes}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Logs
                    </PoppinsTextRegular>
                    <View style={styles.plusCircleView}>
                      <Icon name="plus_light" color={colors.white} size={16} />
                    </View>
                  </View>
                </Shadow>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getSymptomsFeelLog = props => {
  const listItems = getRowsAndItems(props.allHealthLogData);

  return (
    <View>
      <View style={styles.healthLogRowFul}>
        {listItems.map((row, idx) => {
          const animatedStyle = styles.circleItemWrpr;
          return (
            <View style={styles.healthLogRowFull} key={`life_${idx}`}>
              {row.map((item, index) => {
                if (item.empty) {
                  return <View style={animatedStyle} key={`life_${idx}_${index}`} />;
                }
                let circleStyle = {};
                let iconItem = {name: item.name, icon: ''};
                try {
                  if (!item.itemSubKey && props.masterLog[item.key] && props.masterLog[item.key].items) {
                    iconItem.icon = props.masterLog[item.key].items[item.itemKey].icon;
                  } else if (item.itemSubKey) {
                    if (props.masterLog[item.key].items) {
                      iconItem.icon = props.masterLog[item.key].items[item.itemSubKey].icon;
                    } else {
                      iconItem.icon = props.masterLog[item.key][item.itemKey].items[item.itemSubKey].icon;
                    }
                  }
                } catch (err) {
                  console.log('$$$', err.message);
                }

                if (item.key === 'emotion') {
                  circleStyle['borderColor'] = colors.walk_discuss_back;
                }

                return (
                  <View key={`life_${idx}_${index}`} style={styles.iconsView}>
                    <SymptomIcon containerStyle={animatedStyle} item={iconItem} circleStyle={circleStyle} />
                    <PoppinsTextLight color={3} fontSize={10}>
                      {`${item.count}`}x
                    </PoppinsTextLight>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const getRowsAndItems = (storeItems, rowItemCount = 4) => {
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

const getSpacerView = () => {
  return <View style={styles.spacerViewNotes} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_pink,
    paddingBottom: moderateScale(10),
  },
  shadowView: {
    margin: moderateScale(10),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(12),
    width: width - moderateScale(20),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 5,
    shadowRadius: 5,
    shadowColor: '#e8c5d8',
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginBottom: moderateScale(5),
    paddingBottom: moderateScale(10),
  },
  gradient: {
    height: moderateScale(35),
    width: width - moderateScale(20),
    justifyContent: 'center',
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    paddingLeft: moderateScale(15),
  },
  topRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekView: {
    width: width - moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },
  symptomsCircleView: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50) / 2,
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#eb5f33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMainView: {
    flex: 1,
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  addLogView: {
    width: moderateScale(158),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  plusCircleView: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30) / 2,
    backgroundColor: '#ff2d55',
    overflow: 'hidden',
    zIndex: 1,
    marginLeft: moderateScale(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 17,
    borderTopWidth: 28,
    borderTopLeftRadius: 5,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  innerShadowView: {
    shadowRadius: moderateScale(12),
    width: moderateScale(158),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: '#ff2e56',
  },
  spacerViewNotes: {
    height: moderateScale(15),
  },
  circleItemWrpr: {
    marginTop: moderateScale(6),
    // paddingTop: moderateScale(6),
    // paddingBottom: moderateScale(6),
    width: itemWidth,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  healthLogRowFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ReportHealthProfile.propTypes = {};

export default ReportHealthProfile;
