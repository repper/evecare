import React from 'react';
import {View, ScrollView, TouchableWithoutFeedback, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Shadow} from 'react-native-neomorph-shadows';
import moment from 'moment';
import {VictoryChart, VictoryGroup, VictoryBar, VictoryTheme} from 'victory-native';

import {colors, globalStyle as gs} from '../../config/styles';
import {Text as PeoText, PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import AnalysisSvgIcon from '../../components/SvgIcon/analysisSvgIcon';
import cs from '../../config/commonStyles';
import SvgIcon from '../../components/SvgIcon/icon';
import AnimatedCircularProgress from '../../components/AnimatedCircularProgress';

const window = Dimensions.get('window');
const {height, width} = window;
const categories = {y: ['None', 'Spotting', 'Light', 'Medium', 'Heavy']};
const ReportCycleAnalysis = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        {Object.keys(props.periods).length > 0 ? (
          <View style={styles.container}>
            <View style={styles.periodView}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FFFFFF', '#fceff6']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.topRowView}>
                  <AnalysisSvgIcon width={20} height={20} />
                  <PoppinsTextRegular color={29} fontSize={16} style={{marginLeft: moderateScale(20)}}>
                    Periods, Cycle & Cycle Variation
                  </PoppinsTextRegular>
                </View>
              </LinearGradient>
              <View style={styles.periodDetailsView}>
                <PoppinsTextRegular color={26} fontSize={18} style={{textAlign: 'center'}}>
                  {moment(props.startDate).format('DD MMM')} - {moment(props.endDate).format('DD MMM')} |{' '}
                  {`${props.totalCycleLength}`} days
                </PoppinsTextRegular>
                <View style={styles.circleRowView}>
                  <View>
                    <PoppinsTextRegular color={6} fontSize={14}>
                      Period Length
                    </PoppinsTextRegular>
                    <AnimatedCircularProgress
                      size={moderateScale(96)}
                      width={moderateScale(8)}
                      fill={props.periodLengthPer}
                      tintColor="#ff2e56"
                      lineCap="round"
                      rotation={0}
                      style={styles.circleView}
                      duration={1200}
                      padding={2}
                      backgroundColor={colors.grey_border_color}
                    >
                      {fill => (
                        <PoppinsTextRegular
                          color={25}
                          fontSize={moderateScale(21)}
                          style={{
                            includeFontPadding: false,
                            lineHeight: moderateScale(31),
                          }}
                        >
                          {`${props.periodLength}`}
                          <PoppinsTextRegular color={25} fontSize={12} style={{includeFontPadding: false}}>
                            {` Days`}
                          </PoppinsTextRegular>
                        </PoppinsTextRegular>
                      )}
                    </AnimatedCircularProgress>
                  </View>

                  <View>
                    <PoppinsTextRegular color={6} fontSize={14}>
                      Cycle Length
                    </PoppinsTextRegular>
                    <AnimatedCircularProgress
                      size={moderateScale(96)}
                      width={moderateScale(8)}
                      fill={100}
                      tintColor={colors.seafoam_blue}
                      lineCap="round"
                      rotation={0}
                      style={styles.circleView}
                      duration={0}
                      padding={2}
                      backgroundColor={colors.grey_border_color}
                    >
                      {fill => (
                        <PoppinsTextRegular
                          color={45}
                          fontSize={moderateScale(21)}
                          style={{
                            includeFontPadding: false,
                            lineHeight: moderateScale(31),
                          }}
                        >
                          {`${props.totalCycleDiff ? props.totalCycleDiff.toFixed() : 0}`}
                          <PoppinsTextRegular color={45} fontSize={12} style={{includeFontPadding: false}}>
                            {` Days`}
                          </PoppinsTextRegular>
                        </PoppinsTextRegular>
                      )}
                    </AnimatedCircularProgress>
                  </View>

                  <View>
                    <PoppinsTextRegular color={6} fontSize={14}>
                      Cycle Variation
                    </PoppinsTextRegular>
                    <AnimatedCircularProgress
                      size={moderateScale(96)}
                      width={moderateScale(8)}
                      fill={props.cycleVarPer}
                      tintColor="#35809c"
                      lineCap="round"
                      rotation={0}
                      style={styles.circleView}
                      duration={1200}
                      padding={2}
                      backgroundColor={colors.grey_border_color}
                    >
                      {fill => (
                        <PoppinsTextRegular
                          color={40}
                          fontSize={moderateScale(21)}
                          style={{
                            includeFontPadding: false,
                            //backgroundColor: 'black',
                            lineHeight: moderateScale(31),
                            //transform: [{translateY: 5}],
                          }}
                        >
                          {`${props.varDiff}`}
                          <PoppinsTextRegular color={40} fontSize={12} style={{includeFontPadding: false}}>
                            {` Days`}
                          </PoppinsTextRegular>
                        </PoppinsTextRegular>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                </View>
              </View>
            </View>
            {Object.keys(props.periods) && Object.keys(props.periods).length >= 2 ? (
              <View style={styles.periodGraphView}>
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
                      Period Analysis
                    </PoppinsTextRegular>

                    <PoppinsTextRegular
                      color={23}
                      fontSize={moderateScale(14)}
                      style={{marginLeft: moderateScale(8)}}
                    >
                      Last two Cycle
                    </PoppinsTextRegular>
                  </View>
                </LinearGradient>
                <VictoryChart>
                  <VictoryGroup offset={16} colorScale={'qualitative'}>
                    <VictoryBar
                      data={props.firstCycleArr}
                      cornerRadius={{top: 4, bottom: 4}}
                      barWidth={16}
                      style={{
                        data: {
                          fill: ({datum}) => datum.color,
                        },
                      }}
                    />
                    <VictoryBar
                      data={props.secondCycleArr}
                      cornerRadius={{top: 4, bottom: 4}}
                      style={{
                        data: {
                          fill: ({datum}) => datum.color,
                        },
                      }}
                      barWidth={16}
                    />
                  </VictoryGroup>
                </VictoryChart>
                <View style={styles.txtDescView}>
                  <PoppinsTextRegular
                    color={26}
                    fontSize={moderateScale(16)}
                    style={{marginLeft: moderateScale(15)}}
                  >
                    Lorem Ipsum is simply dummy text.{'\n'}Lorem Ipsum is simply dummy text.
                  </PoppinsTextRegular>
                </View>
              </View>
            ) : null}
            {props.firstFlowArr.length > 0 || props.secondFlowArr.length > 0 ? (
              <View style={[styles.periodGraphView, {marginTop: moderateScale(20)}]}>
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
                      Menstrual Flow
                    </PoppinsTextRegular>

                    <PoppinsTextRegular
                      color={23}
                      fontSize={moderateScale(14)}
                      style={{marginLeft: moderateScale(8)}}
                    >
                      Last two Cycle
                    </PoppinsTextRegular>
                  </View>
                </LinearGradient>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <VictoryChart padding={70} minDomain={{y: 1}}>
                    <VictoryGroup offset={9} colorScale={'qualitative'}>
                      <VictoryBar
                        data={props.firstFlowArr}
                        categories={categories}
                        cornerRadius={{top: 4, bottom: 4}}
                        barWidth={8}
                        style={{
                          data: {
                            fill: 'rgba(255, 46, 86, 0.7)',
                          },
                        }}
                      />
                      <VictoryBar
                        data={props.secondFlowArr}
                        cornerRadius={{top: 4, bottom: 4}}
                        style={{
                          data: {
                            fill: '#ff2e56',
                          },
                        }}
                        barWidth={8}
                      />
                    </VictoryGroup>
                  </VictoryChart>
                </View>
                <View style={styles.txtDescView}>
                  <PoppinsTextRegular
                    color={26}
                    fontSize={moderateScale(16)}
                    style={{marginLeft: moderateScale(15)}}
                  >
                    Lorem Ipsum is simply dummy text.{'\n'}Lorem Ipsum is simply dummy text.
                  </PoppinsTextRegular>
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={cs.noDataView}>
            <SvgIcon icon="ReportNoDataSvgIcon" />
            <PoppinsTextRegular color={25} fontSize={18} style={gs.textCenter}>
              Record at least one reading to see analysis
            </PoppinsTextRegular>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  periodView: {
    borderRadius: moderateScale(12),
    backgroundColor: colors.light_pink,
    margin: moderateScale(10),
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
    paddingLeft: moderateScale(15),
  },
  periodDetailsView: {
    padding: moderateScale(15),
    paddingBottom: moderateScale(30),
  },
  circleRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(15),
  },
  circleView: {
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 3,
    shadowRadius: 5,
    shadowColor: colors.grey_border_color,
    marginTop: moderateScale(10),
  },
  circleFillView: {
    width: moderateScale(94),
    height: moderateScale(94),
    borderRadius: moderateScale(94) / 2,
    borderWidth: moderateScale(8),
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ff2e56',
    transform: [{rotateZ: '45deg'}],
  },
  circleCycleView: {
    width: moderateScale(94),
    height: moderateScale(94),
    borderRadius: moderateScale(94) / 2,
    borderWidth: moderateScale(8),
    borderColor: colors.seafoam_blue,
    position: 'absolute',
  },
  periodGraphView: {
    //height: 406,
    backgroundColor: colors.light_pink,
    margin: moderateScale(10),
    borderRadius: moderateScale(12),
    paddingBottom: moderateScale(30),
  },
  txtDescView: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

ReportCycleAnalysis.propTypes = {};

export default ReportCycleAnalysis;
