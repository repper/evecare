import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import {Text as PeoText, PoppinsTextRegular} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';

import PredictionSvgIcon from '../../components/SvgIcon/predictionSvgIcon';
import RoundedShapeSwitchButtonIcon from '../../components/SvgIcon/roundedShapeSwitchButtonIcon';
import RoundedShapeSwitchLeftButtonIcon from '../../components/SvgIcon/roundedShapeSwitchLeftButtonIcon';
import SvgIcon from '../../components/SvgIcon/icon';
const window = Dimensions.get('window');
const {height, width} = window;

const ReportPredictionsHistory = props => {
  const {updateState} = props;

  return (
    <SafeAreaView style={gs.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.white,
          paddingBottom: moderateScale(10),
        }}>
        <View style={styles.predictionView}>
          <LinearGradient
            style={styles.gradient}
            colors={['#FFFFFF', '#fceff6']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}>
            <View style={styles.topRowView}>
              <PredictionSvgIcon />
              <PoppinsTextRegular
                color={29}
                fontSize={16}
                style={{marginLeft: moderateScale(20)}}>
                Predictions
              </PoppinsTextRegular>
            </View>
          </LinearGradient>

          <View style={styles.lengthView}>
            <PoppinsTextRegular color={26} fontSize={18}>
              Period length
            </PoppinsTextRegular>
            <PoppinsTextRegular
              color={29}
              fontSize={32}
              style={{letterSpacing: -0.38}}>
              {`${props.menstrual.periodLength}`}
              <PoppinsTextRegular color={29} fontSize={18}>
                {' '}
                Days
              </PoppinsTextRegular>
            </PoppinsTextRegular>
          </View>

          <View style={styles.lengthView}>
            <PoppinsTextRegular color={26} fontSize={18}>
              Cycle length
            </PoppinsTextRegular>
            <PoppinsTextRegular
              color={29}
              fontSize={32}
              style={{letterSpacing: -0.38}}>
              {`${props.menstrual.cycleLength}`}
              <PoppinsTextRegular color={29} fontSize={18}>
                {' '}
                Days
              </PoppinsTextRegular>
            </PoppinsTextRegular>
          </View>
        </View>

        <View style={styles.predictionTabsView}>
          <View style={styles.gradientTabs}>
            <TouchableWithoutFeedback
              onPress={props.clickOnChangePredictionView}>
              <View
                style={[
                  gs.weekMainView,
                  {
                    flex: 1,
                  },
                ]}>
                <View
                  style={[
                    styles.tabOptionView,
                    {
                      backgroundColor: props.showPrediction
                        ? colors.bg_pink
                        : 'transparent',
                    },
                  ]}>
                  <PoppinsTextRegular color={26} fontSize={16}>
                    Predictions
                  </PoppinsTextRegular>
                </View>
                <RoundedShapeSwitchButtonIcon
                  color={props.showPrediction ? colors.bg_pink : 'transparent'}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={{width: moderateScale(10)}} />
            <TouchableWithoutFeedback onPress={props.clickOnChangeHistoryView}>
              <View style={[gs.weekMainView, {flex: 1}]}>
                <RoundedShapeSwitchLeftButtonIcon
                  color={!props.showPrediction ? colors.bg_pink : 'transparent'}
                />
                <View
                  style={[
                    styles.tabOptionViewRight,
                    {
                      backgroundColor: !props.showPrediction
                        ? colors.bg_pink
                        : 'transparent',
                    },
                  ]}>
                  <PoppinsTextRegular color={26} fontSize={16}>
                    History
                  </PoppinsTextRegular>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {props.showPrediction ? (
            <View>
              {props.predictionArr && props.predictionArr.length > 0 ? (
                props.predictionArr.map((item, index) => {
                  return (
                    <View key={`prediction_${index}`}>
                      <View style={styles.predictionSubView}>
                        <PoppinsTextRegular color={26} fontSize={12}>
                          {`${moment(item).format('MMM DD')} - ${moment(item)
                            .add(props.menstrual.periodLength - 1, 'days')
                            .format('MMM DD, YYYY')}`}
                        </PoppinsTextRegular>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: moderateScale(140),
                            //alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}>
                          <PoppinsTextRegular
                            color={25}
                            fontSize={12}
                            style={{
                              position: 'absolute',
                              left: 5,
                              bottom: 0,
                              //backgroundColor: 'red',
                              height: moderateScale(15),
                            }}>
                            {`${props.menstrual.periodLength}`}
                          </PoppinsTextRegular>
                          <View style={styles.squareView}>
                            <PoppinsTextRegular color={26} fontSize={10}>
                              {`${moment(item)
                                .add(props.menstrual.cycleLength - 14, 'days')
                                .format('MMM DD')}`}
                            </PoppinsTextRegular>
                            <PoppinsTextRegular color={26} fontSize={8}>
                              Ovulation
                            </PoppinsTextRegular>
                          </View>
                          <View style={[styles.triangle]} />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View style={styles.loaderView}>
                            <View style={styles.redView} />
                            <View style={styles.yellowView}>
                              <View style={styles.yellowCircleView} />
                            </View>
                          </View>
                          <PoppinsTextRegular
                            color={26}
                            fontSize={12}
                            style={{marginLeft: moderateScale(5)}}>
                            {`${props.menstrual.cycleLength}`} days
                          </PoppinsTextRegular>
                        </View>
                      </View>
                      {index == props.predictionArr.length - 1 ? null : (
                        <View style={styles.deviderView} />
                      )}
                    </View>
                  );
                })
              ) : (
                <View style={styles.noDataView}>
                  <SvgIcon
                    icon="ReportNoDataSvgIcon"
                   
                  />
                </View>
              )}
            </View>
          ) : props.historyArr && props.historyArr.length > 0 ? (
            showHistoryPrediction(props)
          ) : (
            <View style={styles.noDataView}>
              <SvgIcon
                icon="ReportNoDataSvgIcon"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

showHistoryPrediction = props => {
   
  return (
    <View>
      {props.historyArr.map((item, index) => {
            let layoutWidth = moderateScale(140) + item.ovulationDiff;   
            let redViewWidth =  moderateScale(20) + item.periodCycle;
            let marginLeft = item.ovulationDiff - 14;
            let yelloViewMargin = item.ovulationDiff + moderateScale(20) + item.periodCycle - 8;
        return (
          <View key={`prediction_${index}`}>
            <View style={styles.predictionSubView}>
              <PoppinsTextRegular color={26} fontSize={12}>
                {`${moment(item.start).format('MMM DD')} - ${moment(
                  item.end,
                ).format('MMM DD, YYYY')}`}
              </PoppinsTextRegular>
              <PoppinsTextRegular
                  color={25}
                  fontSize={12}
                  style={{
                    position: 'absolute',
                    left: moderateScale(19),
                    bottom: moderateScale(30),
                    height: moderateScale(15),
                  }}>
                  {`${item.periodCycle}`}
                </PoppinsTextRegular>
              <View
                style={{
                  flexDirection: 'row',
                  width: moderateScale(40),
                  alignItems:"center",
                  justifyContent: 'center',
                  marginLeft: yelloViewMargin
                }}>
                
                <View style={styles.squareView}>
                  <PoppinsTextRegular color={26} fontSize={10}>
                    {`${moment(item.start)
                      .add(item.ovulationDiff - 14, 'days')
                      .format('MMM DD')}`}
                  </PoppinsTextRegular>
                  <PoppinsTextRegular color={26} fontSize={8}>
                    Ovulation
                  </PoppinsTextRegular>
                </View>
                <View style={[styles.triangle]} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={[styles.loaderView,{width: layoutWidth}]}>
                  <View style={[styles.redView,{width: redViewWidth}]} />
                  <View style={[styles.yellowView,{marginLeft:marginLeft}]}>
                    <View style={styles.yellowCircleView} />
                  </View>
                </View>
                <PoppinsTextRegular
                  color={26}
                  fontSize={12}
                  style={{marginLeft: moderateScale(5)}}>
                  {`${item.ovulationDiff}`} days
                </PoppinsTextRegular>
              </View>
            </View>
            {index == props.historyArr.length - 1 ? null : (
              <View style={styles.deviderView} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  predictionView: {
    borderRadius: 12,
    backgroundColor: '#fceff6',
    margin: moderateScale(10),
  },
  gradient: {
    height: moderateScale(35),
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
  lengthView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    paddingBottom: 0,
  },
  predictionTabsView: {
    width: width - moderateScale(20),
    alignSelf: 'center',
    backgroundColor: '#fceff6',
    borderRadius: moderateScale(12),
  },
  gradientTabs: {
    height: moderateScale(56),
    width: width - moderateScale(20),
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fceff6',
  },
  predictionSubView: {
    padding: moderateScale(15),
  },
  squareView: {
    width: moderateScale(54),
    height: moderateScale(41),
    borderRadius: moderateScale(2),
    backgroundColor: '#ffbb00',
    marginTop: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderView: {
    width: moderateScale(140),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: '#e8c5d8',
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: moderateScale(10),
  },
  redView: {
    width: moderateScale(25),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: '#ff2e56',
  },
  yellowView: {
    marginLeft: moderateScale(20),
    width: moderateScale(35),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: '#ffbb00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviderView: {
    width: width - moderateScale(30),
    height: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e8c5d8',
    alignSelf: 'center',
  },
  yellowCircleView: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(7) / 2,
    backgroundColor: '#ffbb00',
    position: 'absolute',
    right: moderateScale(6),
    zIndex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: moderateScale(3),
    borderRightWidth: moderateScale(3),
    borderTopWidth: moderateScale(5),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffbb00',
    position: 'absolute',
    bottom: moderateScale(-4),
    zIndex: 1,
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
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: moderateScale(20),
    borderTopWidth: moderateScale(40),
    borderTopLeftRadius: 5,
    borderRightColor: 'transparent',
    borderTopColor: '#fceff6',
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  noDataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(322)
  },
});

ReportPredictionsHistory.propTypes = {};

export default ReportPredictionsHistory;
