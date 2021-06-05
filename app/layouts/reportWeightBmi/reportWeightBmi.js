import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Shadow, ShadowFlex} from 'react-native-neomorph-shadows';
import {VictoryChart, VictoryTheme, VictoryArea, VictoryScatter, VictoryZoomContainer} from 'victory-native';

import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {Text as PeoText, PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import WightSvgIcon from '../../components/SvgIcon/weightSvgIcon';
import DropDownPicker from '../../components/DropDownPicker';
import RoundeShapeButtonIcon from '../../components/SvgIcon/roundeShapeButtonIcon';
import SvgIcon from '../../components/SvgIcon/icon';
import {FlatList} from 'react-native-gesture-handler';

const window = Dimensions.get('window');
const {height, width} = window;
const totalWidth = width - moderateScale(50);
const middleDataPoints = 5; //the divisor has to be in odd numbers
const dataPoints = 0.9 / middleDataPoints;
const barsCount = middleDataPoints * 25 + 25;
const startRange = 15;
const endRange = 40;
const widthMargin = totalWidth / barsCount; //To find width of single value in BMI
const perRowItems = 2;

const ReportWeightBmi = props => {
  const {updateState} = props;
  const bmiPoints = [];
  let bmiColors = {'0': props.bmiIndicatorArr[0].color};
  let colorIndexToCheck = 1;
  let textColor = '#8e44ad';
  for (let indexer = startRange; indexer <= endRange; indexer += dataPoints) {
    bmiPoints.push(indexer);
    if (
      props.bmiIndicatorArr[colorIndexToCheck] &&
      props.bmiIndicatorArr[colorIndexToCheck].startRange <= indexer
    ) {
      bmiColors[bmiPoints.length - 1] = props.bmiIndicatorArr[colorIndexToCheck].color;
      colorIndexToCheck++;
    }
  }

  if (props.weightBmi > 15.0 && props.weightBmi < 18.4) {
    textColor = '#3498db';
  } else if (props.weightBmi >= 18.4 && props.weightBmi < 24.9) {
    textColor = '#27ae60';
  } else if (props.weightBmi >= 24.9 && props.weightBmi < 29.9) {
    textColor = '#f39c12';
  } else if (props.weightBmi >= 29.9 && props.weightBmi <= 34.8) {
    textColor = '#e74c3c';
  } else if (props.weightBmi > 34.8) {
    textColor = '#8e44ad';
  }

  //This will be used in bmi array while printing their
  let currentColor = bmiColors['0'];
  let bmiShown = false;

  let loggedSymptopms = [].concat(props.bmiIndicatorArr);
  const requiredItems = 2 - (loggedSymptopms.length % 2);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    //loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);

  console.log('222', props.dataArray && props.dataArray.length > 0);
  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        {props.dataArray && props.dataArray.length > 0 ? (
          <View style={styles.container}>
            <ShadowFlex style={styles.weightView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <WightSvgIcon width={moderateScale(23)} height={moderateScale(23)} />
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    Weight
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.topWeightRowView}>
                {props.dataArray.length > 0 ? (
                  <View>
                    <PoppinsTextMedium
                      color={26}
                      fontSize={24}
                      style={{includeFontPadding: false, height: moderateScale(33)}}
                    >
                      {`${props.lastWeightConv} ${props.units.weight}`}
                    </PoppinsTextMedium>
                    <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                      as on {props.lastWeightDay}
                    </PoppinsTextMedium>
                  </View>
                ) : (
                  <View style={styles.weekView} />
                )}
                <View>
                  <TouchableOpacity activeOpacity={0.5} onPress={props.openDropdownModal}>
                    <View style={[gs.weekMainView, {alignSelf: 'flex-start'}]}>
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
                    isVisible={props.dropDownVisible}
                    dropDownStyle={gs.dropDownStyle}
                    onChangeItem={item => props.getSelectedReport(item)}
                  />
                </View>
              </View>
              {props.dataArray.length > 0 ? (
                <VictoryChart
                  domain={{y: [0, 90]}}
                  theme={VictoryTheme.material}
                  height={300}
                  width={width}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={props.zoomDomain}
                      onZoomDomainChange={props.handleZoom}
                    />
                  }
                >
                  <VictoryArea
                    data={props.dataArray}
                    x="x"
                    y="y"
                    style={{
                      data: {
                        fill: 'transparent', //'url(#gradientStroke)',
                        stroke: '#ff2e57',
                        strokeWidth: 2,
                      },
                    }}
                    domain={[0, 2]}
                    labels={({datum}) => datum.y}
                    interpolation="natural"
                  />

                  <VictoryScatter
                    data={props.dataArray}
                    style={{
                      data: {fill: '#ff2e57'},
                    }}
                    size={4}
                  />
                </VictoryChart>
              ) : (
                <View style={{flex: 1}}>
                  <SvgIcon icon="ReportNoDataSvgIcon" />
                </View>
              )}
            </ShadowFlex>

            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddWeight}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Weight
                    </PoppinsTextRegular>
                    <View style={styles.plusCircleView}>
                      <Icon name="plus_light" color={colors.white} size={16} />
                    </View>
                  </View>
                </Shadow>
              </View>
            </TouchableOpacity>

            <ShadowFlex style={styles.weightView1}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <Icon name="bmi" size={22} />
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    BMI Calculator
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.weekView}>
                {props.auth.height > 0 ? (
                  <View>
                    <PoppinsTextMedium
                      //color={41}
                      fontSize={24}
                      style={{includeFontPadding: false, color: textColor}}
                    >
                      {`${props.weightBmi.toFixed(2)}`}
                    </PoppinsTextMedium>
                    <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                      as on {props.dataArray[props.dataArray.length - 1].x.replace(/\n/g, ' ')}
                    </PoppinsTextMedium>
                  </View>
                ) : (
                  <View style={{flex: 1}} />
                )}

                <View>
                  <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddHeight}>
                    <View style={[gs.weekMainView, {alignSelf: 'flex-start'}]}>
                      <View style={gs.weekSubView}>
                        <PoppinsTextRegular color={26} fontSize={12}>
                          Height
                        </PoppinsTextRegular>
                        <Icon
                          name="edit"
                          color={'#2d2d2d'}
                          size={20}
                          style={{marginLeft: moderateScale(10)}}
                        />
                      </View>
                      <RoundeShapeButtonIcon />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {props.auth.height > 0 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View style={styles.bmiRowView}>
                      {bmiPoints.map((bmiVal, index) => {
                        let showText = false;
                        let bmiCount = 0;

                        if (bmiColors[index]) {
                          currentColor = bmiColors[index];
                        }
                        let backgroundColor = index % 2 === 1 ? 'white' : currentColor;
                        let height = moderateScale(37);
                        let margin = 0;
                        if (props.weightBmi <= bmiVal && !bmiShown) {
                          bmiShown = true;
                          height = moderateScale(45);
                          backgroundColor = currentColor;
                          margin = moderateScale(3);
                        }

                        if (bmiVal.toFixed(1) === 15.0) {
                          bmiCount = 15;
                          showText = true;
                        } else if (bmiVal.toFixed(1) === 18.4) {
                          bmiCount = 18.5;
                          showText = true;
                        } else if (bmiVal.toFixed(1) === 24.9) {
                          bmiCount = 25;
                          showText = true;
                        } else if (bmiVal.toFixed(1) === 29.9) {
                          bmiCount = 30;
                          showText = true;
                        } else if (bmiVal.toFixed(1) === 34.8) {
                          bmiCount = 35;
                          showText = true;
                        } else if (bmiVal.toFixed(1) === 39.8) {
                          bmiCount = 40;
                          showText = true;
                        }

                        return (
                          <View key={`bmiData_${index}`}>
                            <View
                              style={[
                                styles.bmiIndicatorView,
                                {
                                  backgroundColor: backgroundColor,
                                  height: height,
                                  marginHorizontal: margin,
                                },
                              ]}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                width: width,
                                top: 50,
                                zIndex: 1,
                              }}
                            >
                              {showText ? (
                                <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                                  {`${bmiCount}`}
                                </PoppinsTextMedium>
                              ) : null}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: moderateScale(40),
                      paddingBottom: moderateScale(10),
                    }}
                  >
                    {listItems.map((istItem, idx) => {
                      return (
                        <View style={{flexDirection: 'row'}} key={`mainListItem_${idx}`}>
                          {istItem.map((item, index) => {
                            return (
                              <View
                                key={`sub_items_${index}`}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  padding: moderateScale(8),
                                  paddingLeft: moderateScale(15),
                                  flex: 1,
                                }}
                              >
                                <View style={[styles.smallCircleView, {backgroundColor: item.color}]} />
                                <PoppinsTextRegular
                                  color={3}
                                  fontSize={11}
                                  style={{marginLeft: moderateScale(10)}}
                                >
                                  {`${item.title} (${item.value})`}
                                </PoppinsTextRegular>
                              </View>
                            );
                          })}
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={cs.noDataView}>
                  <SvgIcon icon="ReportNoDataSvgIcon" />
                </View>
              )}
            </ShadowFlex>
          </View>
        ) : (
          <View style={cs.noDataView}>
            <SvgIcon icon="ReportNoDataSvgIcon" />
            <PoppinsTextRegular color={25} fontSize={18} style={gs.textCenter}>
              Record at least one reading to see analysis
            </PoppinsTextRegular>
            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddWeight}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Weight
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_pink,
  },
  weightView: {
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 5,
    shadowRadius: 5,
    backgroundColor: colors.white,
    //height: moderateScale(370),
    width: width - moderateScale(20),
    shadowColor: '#e8c5d8',
  },
  weightView1: {
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 5,
    shadowRadius: 5,
    backgroundColor: colors.white,
    //height: 354,
    width: width - moderateScale(20),
    shadowColor: '#e8c5d8',
    marginTop: moderateScale(20),
    flex: 1,
  },
  gradient: {
    height: moderateScale(36),
    width: width - moderateScale(20),
    justifyContent: 'center',
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
  },
  topRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
  },
  weekView: {
    width: width - moderateScale(20),
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(20),
    flex: 1,
  },
  topWeightRowView: {
    flexDirection: 'row',
    height: moderateScale(55),
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },
  weekSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8c5d8',
    width: moderateScale(92),
    height: moderateScale(32),
    borderRadius: moderateScale(5),
  },
  circleView: {
    width: moderateScale(16),
    height: moderateScale(16),
    backgroundColor: '#2d2d2d',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    //marginLeft: moderateScale(10),
  },
  innerShadowView: {
    shadowRadius: moderateScale(12),
    width: moderateScale(203),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowOpacity: 0.5,
    shadowColor: '#ff2e56',
  },
  heightMainView: {
    alignItems: 'center',
  },
  addHeightView: {
    shadowRadius: moderateScale(12),
    width: moderateScale(180),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowOpacity: 0.5,
    shadowColor: '#ff2e56',
    marginBottom: moderateScale(20),
  },
  addLogView: {
    width: moderateScale(158),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
  bmiRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'flex-start',
    alignSelf: 'center',
    //marginBottom: moderateScale(20),
  },
  bmiIndicatorView: {
    borderRadius: moderateScale(1.5),
    width: widthMargin,
  },
  smallCircleView: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
  },
});

ReportWeightBmi.propTypes = {};

export default ReportWeightBmi;
