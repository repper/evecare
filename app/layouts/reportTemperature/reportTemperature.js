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
import SvgIcon from '../../components/SvgIcon/icon';
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryScatter,
  VictoryBar,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryLabel,
} from 'victory-native';

import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {Text as PeoText, PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import TemperatureSvgIcon from '../../components/SvgIcon/temperatureSvgIcon';
import moment from 'moment';

const window = Dimensions.get('window');
const {height, width} = window;

const ReportTemperature = props => {
  const {updateState} = props;
  let dayLog = props.dayLog;
  let keys = Object.keys(dayLog);
  const getTimestamp = dateString => new Date(dateString).getTime();
  const isOlder = (object1, object2) => (getTimestamp(object1) < getTimestamp(object2) ? -1 : 1);
  keys.sort(isOlder);
  let temperature = 0;
  let date = '';
  for (let index = keys.length - 1; index >= 0; index--) {
    if (dayLog[keys[index]] && dayLog[keys[index]].bb_temperature) {
      let tempItems = dayLog[keys[index]].bb_temperature.items;
      Object.keys(tempItems).map(key => {
        temperature = tempItems[key];
        date = keys[index];
      });
      break;
    }
  }

  let loggedSymptopms = [].concat(props.indicatorArr);
  const requiredItems = 2 - (loggedSymptopms.length % 2);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    //loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);
  let categoryArr = [];
  let periodOvulArr = [];

  for (let index = 0; index < props.perCycleLength + 1; index++) {
    let dates = props.cycleStartDate;
    categoryArr.push(
      `${moment(dates)
        .add(index, 'days')
        .format('D')}`,
    );
  }

  for (let count = 0; count < categoryArr.length; count++) {
    if (count <= props.periodDiff) {
      periodOvulArr.push({
        x: categoryArr[count],
        y: 100,
        backgroundColor: 'rgba(255, 46, 86, 0.5)',
      });
    } else if (props.ovulationStartDate == categoryArr[count]) {
      for (let counter = count; counter <= count + 6; counter++) {
        periodOvulArr.push({
          x: categoryArr[counter],
          y: 100,
          backgroundColor: 'rgba(255, 187, 0, 0.5)',
        });
      }
    } else {
      periodOvulArr.push({
        x: categoryArr[count],
        y: 100,
        backgroundColor: 'transparent',
      });
    }
  }

  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        {props.cycleLineArr && props.cycleLineArr.length > 0 ? (
          <View style={styles.container}>
            {Object.keys(props.periods) && Object.keys(props.periods).length >= 2 ? (
              <ShadowFlex style={styles.weightView}>
                <LinearGradient
                  style={styles.gradient}
                  colors={['#FFFFFF', '#fceff6']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                >
                  <View style={styles.topRowView}>
                    <TemperatureSvgIcon width={moderateScale(23)} height={moderateScale(23)} />
                    <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                      Temperature
                    </PoppinsTextRegular>

                    <PoppinsTextRegular color={23} fontSize={14} style={{marginLeft: moderateScale(10)}}>
                      Last three cycle
                    </PoppinsTextRegular>
                  </View>
                </LinearGradient>

                <View style={styles.weekView}>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <PoppinsTextMedium color={26} fontSize={24} style={{includeFontPadding: false}}>
                        {`${temperature}`}
                      </PoppinsTextMedium>
                      <PoppinsTextMedium
                        color={26}
                        fontSize={13}
                        style={{
                          includeFontPadding: false,
                          opacity: 0.5,
                          marginLeft: moderateScale(5),
                          marginBottom: moderateScale(5),
                        }}
                      >
                        {props.units.temp}
                      </PoppinsTextMedium>
                    </View>
                    <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                      Last recorded on {moment(date).format('DD MMM')}
                    </PoppinsTextMedium>
                  </View>
                </View>
                <VictoryChart
                  //domain={{y: [0, 100]}}
                  theme={VictoryTheme.material}
                  domainPadding={{x: 100, y: 100}}
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
                    data={props.cycleArr1}
                    x="x"
                    y="y"
                    style={{
                      data: {
                        fill: 'transparent', //'url(#gradientStroke)',
                        stroke: '#eb5f33',
                        strokeWidth: 2,
                      },
                    }}
                    domain={[0, 2]}
                    //labels={({datum}) => datum.y}
                    interpolation="natural"
                  />

                  <VictoryArea
                    data={props.cycleArr2}
                    x="x"
                    y="y"
                    style={{
                      data: {
                        fill: 'transparent', //'url(#gradientStroke)',
                        stroke: '#35809c',
                        strokeWidth: 2,
                      },
                    }}
                    domain={[0, 2]}
                    //labels={({datum}) => datum.y}
                    interpolation="natural"
                  />
                  <VictoryArea
                    data={props.cycleArr3}
                    x="x"
                    y="y"
                    style={{
                      data: {
                        fill: 'transparent', //'url(#gradientStroke)',
                        stroke: '#d8557f',
                        strokeWidth: 2,
                      },
                    }}
                    domain={[0, 2]}
                    //labels={({datum}) => datum.y}
                    interpolation="natural"
                  />
                  <VictoryScatter
                    data={props.cycleArr1}
                    style={{
                      data: {fill: '#eb5f33'},
                    }}
                    size={4}
                  />
                  <VictoryScatter
                    data={props.cycleArr2}
                    style={{
                      data: {fill: '#35809c'},
                    }}
                    size={4}
                  />
                  <VictoryScatter
                    data={props.cycleArr3}
                    style={{
                      data: {fill: '#d8557f'},
                    }}
                    size={4}
                  />
                </VictoryChart>
                <View>
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
                              <View
                                style={[styles.smallCircleView, {backgroundColor: item.backgroundColor}]}
                              />
                              <PoppinsTextRegular
                                color={3}
                                fontSize={11}
                                style={{marginLeft: moderateScale(10)}}
                              >
                                {`${moment(item.start).format('DD MMM')} - ${moment(item.end).format(
                                  'DD MMM',
                                )}`}
                              </PoppinsTextRegular>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              </ShadowFlex>
            ) : null}

            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddTemperature}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Temperature
                    </PoppinsTextRegular>
                    <View style={styles.plusCircleView}>
                      <Icon name="plus_light" color={colors.white} size={16} />
                    </View>
                  </View>
                </Shadow>
              </View>
            </TouchableOpacity>

            <ShadowFlex style={styles.tmpPerCycleView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(0)}}>
                    Temperature
                  </PoppinsTextRegular>

                  <PoppinsTextRegular color={23} fontSize={14} style={{marginLeft: moderateScale(10)}}>
                    Per Cycle Analysis
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.dateRangeView}>
                <Icon
                  name="left_arrow"
                  color="#d8557f"
                  size={28}
                  onPress={() => props.clickOnArrows(false)}
                />
                <PoppinsTextRegular color={26} fontSize={18} style={{paddingHorizontal: moderateScale(15)}}>
                  {props.defaultCycleDates}
                </PoppinsTextRegular>
                <Icon
                  name="right_arrow"
                  color="#d8557f"
                  size={28}
                  onPress={() => props.clickOnArrows(true)}
                />
              </View>

              <VictoryChart padding={35} maxDomain={{y: 110}} theme={VictoryTheme.material}>
                <VictoryArea
                  data={props.cycleLineArr}
                  //categories={{x:categoryArr}}
                  x="x"
                  y="y"
                  style={{
                    data: {
                      fill: 'transparent',
                      stroke: '#eb5f33',
                      strokeWidth: 2,
                    },
                  }}
                  domain={[0, 2]}
                  //labels={({datum}) => datum.y}
                  interpolation="natural"
                />
                <VictoryBar
                  style={{data: {fill: ({datum}) => datum.backgroundColor}}}
                  data={periodOvulArr}
                  barWidth={12}
                />
              </VictoryChart>
            </ShadowFlex>
          </View>
        ) : (
          <View style={cs.noDataView}>
            <SvgIcon icon="ReportNoDataSvgIcon" />
            <PoppinsTextRegular color={25} fontSize={18} style={gs.textCenter}>
              Record at least one reading to see analysis
            </PoppinsTextRegular>
            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddTemperature}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Temperature
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

const getRowsAndItems = (storeItems, rowItemCount = 2) => {
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
    width: width - moderateScale(20),
    shadowColor: '#e8c5d8',
  },
  tmpPerCycleView: {
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 5,
    shadowRadius: 5,
    backgroundColor: colors.white,
    width: width - moderateScale(20),
    shadowColor: '#e8c5d8',
    marginTop: moderateScale(20),
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
    alignItems: 'center',
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
    marginLeft: moderateScale(10),
  },
  innerShadowView: {
    shadowRadius: moderateScale(12),
    width: moderateScale(229),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowOffset: {width: 0.1, height: 0.1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: '#ff2e56',
  },
  addLogView: {
    width: moderateScale(229),
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
  dateRangeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
  },
  smallCircleView: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
  },
});

ReportTemperature.propTypes = {};

export default ReportTemperature;
