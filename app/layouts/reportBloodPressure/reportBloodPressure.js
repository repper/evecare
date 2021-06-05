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
import moment from 'moment';
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryScatter,
  VictoryBar,
  VictoryPie,
  VictoryZoomContainer,
} from 'victory-native';

import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {Text as PeoText, PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import SvgIcon from '../../components/SvgIcon/icon';
import {moderateScale} from '../../lib/scalingUtils';
import DropDownPicker from '../../components/DropDownPicker';
import BloodPressureSvgIcon from '../../components/SvgIcon/bloodPressureSvgIcon';
import RoundeShapeButtonIcon from '../../components/SvgIcon/roundeShapeButtonIcon';
import RoundedShapeSwitchButtonIcon from '../../components/SvgIcon/roundedShapeSwitchButtonIcon';
import RoundedShapeSwitchLeftButtonIcon from '../../components/SvgIcon/roundedShapeSwitchLeftButtonIcon';

const window = Dimensions.get('window');
const {height, width} = window;

const ReportBloodPressure = props => {
  const {updateState} = props;
  let loggedSymptopms = [].concat(props.chartArr);
  const requiredItems = 2 - (loggedSymptopms.length % 2);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    //loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);

  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        {props.dataArray.length > 0 ? (
          <View style={styles.container}>
            <Shadow style={styles.weightView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <BloodPressureSvgIcon width={moderateScale(23)} height={moderateScale(23)} />
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    Blood Pressure
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>
              {props.dataArray.length > 0 ? (
                <View style={styles.weekView}>
                  <View>
                    <PoppinsTextMedium color={26} fontSize={24} style={{includeFontPadding: false}}>
                      {`${props.dataArray[props.dataArray.length - 1].y}/${
                        props.diaArray[props.diaArray.length - 1].y
                      } mmHg`}
                    </PoppinsTextMedium>
                    <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                      Last recorded on {props.dataArray[props.dataArray.length - 1].x.replace(/\n/g, ' ')}
                    </PoppinsTextMedium>
                  </View>

                  <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={props.openBpDropdown}>
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
                      isVisible={props.bpDropdownVisible}
                      dropDownStyle={gs.dropDownStyle}
                      onChangeItem={item => props.getSelectedBpItems(item)}
                    />
                  </View>
                </View>
              ) : null}

              {props.dataArray.length > 0 ? (
                <View>
                  <VictoryChart
                    domain={{y: [0, 100]}}
                    theme={VictoryTheme.material}
                    domainPadding={{x: 100, y: 200}}
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
                          stroke: '#e67e22',
                          strokeWidth: 2,
                        },
                      }}
                      domain={[0, 2]}
                      labels={({datum}) => datum.y}
                      interpolation="natural"
                    />

                    <VictoryArea
                      data={props.diaArray}
                      x="x"
                      y="y"
                      style={{
                        data: {
                          fill: 'transparent', //'url(#gradientStroke)',
                          stroke: '#3498db',
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
                        data: {fill: '#e67e22'},
                      }}
                      size={4}
                    />
                    <VictoryScatter
                      data={props.diaArray}
                      style={{
                        data: {fill: '#3498db'},
                      }}
                      size={4}
                    />
                  </VictoryChart>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SvgIcon icon="ReportNoDataSvgIcon" />
                </View>
              )}
            </Shadow>

            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddBloodPressure}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add BP
                    </PoppinsTextRegular>
                    <View style={styles.plusCircleView}>
                      <Icon name="plus_light" color={colors.white} size={16} />
                    </View>
                  </View>
                </Shadow>
              </View>
            </TouchableOpacity>

            <View style={styles.predictionTabsView}>
              <View style={styles.gradientTabs}>
                <TouchableWithoutFeedback onPress={props.clickOnChangeBPSystolic}>
                  <View style={[gs.weekMainView, {flex: 1}]}>
                    <View
                      style={[
                        styles.tabOptionView,
                        {
                          backgroundColor: props.showSystolic ? colors.bg_pink : 'transparent',
                        },
                      ]}
                    >
                      <PoppinsTextRegular color={26} fontSize={16}>
                        Systolic
                      </PoppinsTextRegular>
                    </View>
                    <RoundedShapeSwitchButtonIcon
                      color={props.showSystolic ? colors.bg_pink : 'transparent'}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <View style={{width: moderateScale(10)}} />
                <TouchableWithoutFeedback onPress={props.clickOnChangeBPDiastilic}>
                  <View style={[gs.weekMainView, {flex: 1}]}>
                    <RoundedShapeSwitchLeftButtonIcon
                      color={!props.showSystolic ? colors.bg_pink : 'transparent'}
                    />
                    <View
                      style={[
                        styles.tabOptionViewRight,
                        {
                          backgroundColor: !props.showSystolic ? colors.bg_pink : 'transparent',
                        },
                      ]}
                    >
                      <PoppinsTextRegular color={26} fontSize={16}>
                        Diastolic
                      </PoppinsTextRegular>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.systolicRowView}>
                <PoppinsTextMedium color={26} fontSize={moderateScale(16)}>
                  {moment(props.systolicDataLastDate).format('DD MMM')} - {moment().format('DD MMM')}
                </PoppinsTextMedium>
                <View>
                  <TouchableOpacity activeOpacity={0.5} onPress={props.openPredictionDropDown}>
                    <View style={gs.weekMainView}>
                      <View style={gs.weekSubView}>
                        <PoppinsTextRegular color={26} fontSize={12}>
                          {props.selectSystolicLabel}
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
                    isVisible={props.predictionDropdownVisible}
                    dropDownStyle={gs.dropDownStyle}
                    onChangeItem={item => props.getSelectedSystolicData(item)}
                  />
                </View>
              </View>
              <VictoryChart
                theme={VictoryTheme.material}
                width={width}
                style={{
                  data: {fill: 'red'},
                  parent: {
                    flexDirection: 'row',
                  },
                }}
              >
                <VictoryBar
                  maxDomain={{x: 5}}
                  domainPadding={{x: 45}}
                  data={props.systoPerArr}
                  y="y"
                  x="x"
                  barWidth={35}
                  labels={({datum}) => `${datum.y}%`}
                  style={{
                    data: {
                      fill: ({datum}) => datum.color,
                    },
                  }}
                />
              </VictoryChart>
            </View>

            <ShadowFlex style={styles.bpSummaryView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    Blood Pressure Summary
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.circleChartView}>
                <View style={styles.circlePerView}>
                  <VictoryPie
                    padAngle={({datum}) => 0.5}
                    colorScale={props.bpColorsArr}
                    radius={moderateScale(95)}
                    innerRadius={moderateScale(50)}
                    labels={({datum}) => `${datum.y}%`}
                    data={props.bpSummaryPerFinalArr}
                    height={moderateScale(200)}
                    width={moderateScale(200)}
                    labelRadius={({innerRadius}) => innerRadius + 10}
                    labelPlacement="parallel"
                    style={{
                      labels: {
                        fill: '#ffffff',
                      },
                    }}
                  />
                </View>

                <View>
                  <TouchableOpacity activeOpacity={0.5} onPress={props.openBpSummaryDropDown}>
                    <View style={gs.weekMainView}>
                      <View style={gs.weekSubView}>
                        <PoppinsTextRegular color={26} fontSize={12}>
                          {props.selectBpSummaryLabel}
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
                    isVisible={props.bpSummaryDropdownVisible}
                    dropDownStyle={gs.dropDownStyle}
                    onChangeItem={item => props.getSelectedBpSummaryData(item)}
                  />
                </View>
              </View>
              <View style={{paddingBottom: moderateScale(5)}}>
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
                            <View style={[styles.smallCircleView, {backgroundColor: item.backgroundColor}]} />
                            <PoppinsTextRegular
                              color={3}
                              fontSize={11}
                              style={{marginLeft: moderateScale(10)}}
                            >
                              {`${item.title}`}
                            </PoppinsTextRegular>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
              <View>
                <PoppinsTextRegular
                  color={26}
                  fontSize={moderateScale(13)}
                  style={{marginLeft: moderateScale(15)}}
                >
                  * Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text.
                </PoppinsTextRegular>

                <PoppinsTextRegular
                  color={26}
                  fontSize={moderateScale(13)}
                  style={{marginLeft: moderateScale(15)}}
                >
                  ** Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text.
                </PoppinsTextRegular>
              </View>
            </ShadowFlex>
          </View>
        ) : (
          <View style={cs.noDataView}>
            <SvgIcon icon="ReportNoDataSvgIcon" />
            <PoppinsTextRegular color={25} fontSize={18} style={gs.textCenter}>
              Record at least one reading to see analysis
            </PoppinsTextRegular>
            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddBloodPressure}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(25)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add BP
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
    backgroundColor: colors.white,
  },
  weightView: {
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 5,
    shadowRadius: 5,
    backgroundColor: colors.white,
    height: 400,
    width: width - moderateScale(20),
    shadowColor: '#e8c5d8',
  },
  bpSummaryView: {
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
    paddingBottom: 0,
    paddingTop: 5,
  },
  systolicRowView: {
    flexDirection: 'row',
    padding: moderateScale(20),
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: moderateScale(148),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
    backgroundColor: colors.white,
    shadowOffset: {width: 0.1, height: 0.1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: '#ff2e56',
  },
  addLogView: {
    width: moderateScale(148),
    height: moderateScale(46),
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
  circleChartView: {
    flexDirection: 'row',
    width: width - moderateScale(20),
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },
  circlePerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //width: moderateScale(200),
  },
  circleDotView: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
  },
  circleRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  predictionTabsView: {
    width: width - moderateScale(20),
    alignSelf: 'center',
    backgroundColor: '#fceff6',
    borderRadius: moderateScale(12),
    marginTop: moderateScale(30),
    //height: 332,
  },
  gradientTabs: {
    height: moderateScale(56),
    width: width - moderateScale(20),
    justifyContent: 'center',
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fceff6',
  },
  tabOptionView: {
    backgroundColor: '#e8c5d8',
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    height: moderateScale(47),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: moderateScale(-2),
  },
  tabOptionViewRight: {
    flex: 1,
    backgroundColor: '#e8c5d8',
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
    height: moderateScale(47),
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallCircleView: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
  },
});

ReportBloodPressure.propTypes = {};

export default ReportBloodPressure;
