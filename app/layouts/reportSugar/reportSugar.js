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
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryScatter,
  VictoryPie,
  VictoryZoomContainer,
} from 'victory-native';

import LinearGradient from 'react-native-linear-gradient';
import {Shadow, ShadowFlex} from 'react-native-neomorph-shadows';
import DropDownPicker from '../../components/DropDownPicker';
import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {Text as PeoText, PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import SugarSvgIcon from '../../components/SvgIcon/sugarSvgIcon';
import RoundeShapeButtonIcon from '../../components/SvgIcon/roundeShapeButtonIcon';
import SvgIcon from '../../components/SvgIcon/icon';

const window = Dimensions.get('window');
const {height, width} = window;

const ReportSugar = props => {
  const {updateState} = props;
  let loggedSymptopms = [].concat(props.chartArr);
  const requiredItems = 2 - (loggedSymptopms.length % 2);
  for (let indexer = 0; indexer < requiredItems; indexer++) {
    //loggedSymptopms.push('');
  }
  const listItems = getRowsAndItems(loggedSymptopms);
  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.light_pink,
        }}
      >
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
                  <SugarSvgIcon width={moderateScale(23)} height={moderateScale(23)} />
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    Sugar log
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.weekView}>
                <View>
                  <PoppinsTextMedium color={26} fontSize={24} style={{includeFontPadding: false}}>
                    {`${props.dataArray[props.dataArray.length - 1].y}`} mg/dL
                  </PoppinsTextMedium>
                  <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                    Last recorded on {`${props.dataArray[props.dataArray.length - 1].x.replace(/\n/g, ' ')}`}
                  </PoppinsTextMedium>
                </View>
                <View>
                  <TouchableOpacity activeOpacity={0.5} onPress={props.openSugarLogDropdown}>
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
                    isVisible={props.sugarLogDropdownVisible}
                    dropDownStyle={gs.dropDownStyle}
                    onChangeItem={item => props.getSelectedSugarReport(item)}
                  />
                </View>
              </View>
              <View style={{flex: 1, paddingBottom: moderateScale(20)}}>
                <VictoryChart
                  domain={{y: [0, 170]}}
                  theme={VictoryTheme.material}
                  domainPadding={{x: 100, y: 180}}
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
                    //categories={{y: ["","","mg/dL","",""] }}

                    x="x"
                    //labelComponent={<VictoryLabel dy={-30} />}
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
              </View>
            </ShadowFlex>

            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddSugar}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Sugar
                    </PoppinsTextRegular>
                    <View style={styles.plusCircleView}>
                      <Icon name="plus_light" color={colors.white} size={16} />
                    </View>
                  </View>
                </Shadow>
              </View>
            </TouchableOpacity>

            <View style={styles.bloodGlucoseView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <PoppinsTextRegular
                    color={29}
                    fontSize={moderateScale(16)}
                    style={{marginLeft: moderateScale(0)}}
                  >
                    Sugar Analysis
                  </PoppinsTextRegular>

                  <PoppinsTextRegular
                    color={23}
                    fontSize={moderateScale(14)}
                    style={{marginLeft: moderateScale(8)}}
                  >
                    Last ten days
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.glucoseBarView}>
                <View style={styles.averageRowView}>
                  <View style={styles.averageView}>
                    <PoppinsTextMedium color={26} fontSize={24} style={{includeFontPadding: false}}>
                      {`${props.averageSugar.toFixed(2)}`} mg/dL
                    </PoppinsTextMedium>
                    <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                      average
                    </PoppinsTextMedium>
                  </View>

                  <View style={styles.averageRightView}>
                    <PoppinsTextMedium color={26} fontSize={24} style={{includeFontPadding: false}}>
                      {`${props.finalAnaArray.length}`}
                    </PoppinsTextMedium>
                    <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                      Total test
                    </PoppinsTextMedium>
                  </View>
                </View>
                <View style={styles.horizontalBarView}>
                  {props.finalAnaArray.map((item, index) => {
                    return (
                      <View
                        key={`analysis_${index}`}
                        style={[styles.redBarView, {backgroundColor: item.backgroundColor}]}
                      />
                    );
                  })}
                </View>
                <View style={styles.percentageRowView}>
                  {props.pecentageArr.map((item, index) => {
                    return (
                      <View>
                        <PoppinsTextMedium color={26} fontSize={13} style={{opacity: 0.5}}>
                          {`${item}%`}
                        </PoppinsTextMedium>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            <ShadowFlex style={styles.glucoseSummary}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(0)}}>
                    Blood Glucose Summary
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>

              <View style={styles.circleChartView}>
                <View style={styles.circlePerView}>
                  <VictoryPie
                    padAngle={({datum}) => 0.5}
                    colorScale={props.glucoseColorArr}
                    radius={moderateScale(95)}
                    innerRadius={moderateScale(50)}
                    labels={({datum}) => `${datum.y}%`}
                    data={props.gluPerArr}
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
                  <TouchableOpacity activeOpacity={0.5} onPress={props.openBloodGlucoseDropdown}>
                    <View style={gs.weekMainView}>
                      <View style={gs.weekSubView}>
                        <PoppinsTextRegular color={26} fontSize={12}>
                          {props.selectedGlucoseLabel}
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
                    isVisible={props.bloodGlucoseDropdownVisible}
                    dropDownStyle={gs.dropDownStyle}
                    onChangeItem={item => props.getSelectedGlucoseReport(item)}
                  />
                </View>
              </View>
              <View style={{marginTop: moderateScale(10)}}>
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
            </ShadowFlex>
          </View>
        ) : (
          <View style={cs.noDataView}>
            <SvgIcon icon="ReportNoDataSvgIcon" />
            <PoppinsTextRegular color={25} fontSize={18} style={gs.textCenter}>
              Record at least one reading to see analysis
            </PoppinsTextRegular>
            <TouchableOpacity activeOpacity={0.5} onPress={props.clickOnAddSugar}>
              <View style={{alignSelf: 'center', marginTop: moderateScale(15)}}>
                <Shadow style={styles.innerShadowView}>
                  <View style={styles.addLogView}>
                    <PoppinsTextRegular color={25} fontSize={18}>
                      Add Sugar
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
    // backgroundColor: colors.white,
  },
  weightView: {
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 5,
    shadowRadius: 5,
    backgroundColor: colors.white,
    //height: 354,
    width: width - moderateScale(20),
    shadowColor: '#e8c5d8',
  },
  glucoseSummary: {
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
    width: moderateScale(203),
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
    width: moderateScale(148),
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
  circleChartView: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },
  circlePerView: {
    width: moderateScale(200),
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
  glucoseBarView: {
    padding: moderateScale(20),
  },
  averageRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bloodGlucoseView: {
    marginTop: moderateScale(20),
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    backgroundColor: colors.white,
  },
  averageRightView: {
    alignItems: 'flex-end',
  },
  horizontalBarView: {
    height: moderateScale(12),
    borderRadius: moderateScale(4.5),
    marginTop: moderateScale(20),
    overflow: 'hidden',
    flexDirection: 'row',
  },
  redBarView: {
    flex: 1,
    height: moderateScale(12),
    marginHorizontal: -1,
  },
  greenBarView: {
    flex: 0.5,
    height: moderateScale(12),
    backgroundColor: '#458f6d',
  },
  blueBarView: {
    flex: 0.3,
    height: moderateScale(12),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#35809c',
  },
  percentageRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  smallCircleView: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
  },
});

ReportSugar.propTypes = {};

export default ReportSugar;
