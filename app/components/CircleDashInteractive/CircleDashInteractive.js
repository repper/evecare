import React, {Component} from 'react';
import {View, StyleSheet, PanResponder, Vibration} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import {Svg, Path} from 'react-native-svg';
import moment from 'moment';

import {colors} from '../../config/styles';
import {scale, moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextMedium} from '../Text';
import Icon from '../../fonts/eveCareFont';

const dotSize = moderateScale(4);
const CLOCKWISE = 'CW';
const COUNTER_CLOCKWISE = 'CCW';
class CircleDashInteractive extends Component {
  constructor(props) {
    super(props);

    const stateDerived = this.getStateFromProps(props);
    this.state = stateDerived;

    this.elRefs = {
      circleSlider: React.createRef(),
      circleDot: React.createRef(),
    };
  }

  static defaultProps = {
    startDegree: 0,
    value: 0,
    maxValue: 360,
    arcDirection: CLOCKWISE,
    decimalPlaces: 0,
  };

  static getDerivedStateFromProps = (props, state) => {
    try {
      if (props.initialIdx !== state.selected) {
        let newState = {
          ...state,
          selected: props.initialIdx,
        };

        return newState;
      }
    } catch (error) {}
    return null;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevState.selected !== this.state.selected) {
      return {oper: 'selected'};
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  getStateFromProps(props) {
    const size = props.outerWidth;
    const strokeWidth = (props.outerWidth - props.innerWidth) / 2;
    const radius = (size - strokeWidth) / 2;
    const centerX = size / 2;
    const dotWidth = moderateScale(50);

    //When shall the next period date should be there
    const lastPeriodMoment = moment(props.lastPeriodDate).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const todayDate = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
    const todayDateStr = todayDate.format('YYYY-MM-DD');

    //When next period will be coming
    const probableDate = lastPeriodMoment.clone().add(props.cycleLength, 'days');
    const nextPeriodDate = probableDate.format('DD MMM');
    //Check if period is today
    const isPeriodToday = probableDate.isSame(todayDate);
    //Check if period is after probable date of next period
    const daysAfter = todayDate.diff(probableDate, 'days') + 1;
    const isLate = daysAfter > 0;

    const circleDeg = 360; // This is 360 degrees
    const cycleLength = isLate ? props.cycleLength + daysAfter : props.cycleLength;

    const periodLength = props.periodLength - 1;
    const circleSlice = circleDeg / cycleLength;
    const periodAngle = periodLength * circleSlice;

    // const ovulationDay = isLate ? cycleLength - daysAfter - 14 : cycleLength - 14;
    const ovulationDay = cycleLength - props.ovulationLength;
    const ovulationStart = ovulationDay - 5;
    const ovulationEnd = ovulationDay + 1;

    const ovuStartAngle = ovulationStart * circleSlice;
    const ovuEndAngle = ovulationEnd * circleSlice;

    const d = this.circlePath(centerX, centerX, radius, 0, periodAngle);
    const d2 = this.circlePath(centerX, centerX, radius, ovuStartAngle, ovuEndAngle);

    const slice = (2 * Math.PI) / cycleLength;

    let todayAngle = 0;
    let todayPos = null;
    let ovulPos = null;
    let currentPos = null;

    let positions = Array.from(Array(cycleLength).keys()).map(dotPos => {
      dotPos -= cycleLength / 4;
      const angle = slice * dotPos;
      let rVal = {
        pointX: radius * Math.sin(angle) + centerX,
        pointY: radius * Math.cos(angle) + centerX,
      };
      const derAng = this.getOnPressAngle(rVal.pointY, rVal.pointX, {
        xCenter: radius,
        radius,
        dotWidth,
      });
      rVal.angle = derAng.angle;
      return rVal;
    });

    positions = positions.map((pos, idx) => {
      let posMom = lastPeriodMoment.clone().add(idx, 'days');
      const dateStr = posMom.format('YYYY-MM-DD');
      const daysDiff = posMom.diff(lastPeriodMoment, 'days');
      const isPosLate = daysDiff > props.cycleLength;
      let isTodayPredicted = daysDiff === props.cycleLength;

      let mensesData = {...props.menstrualData[dateStr]};
      //Since the ovulation will move from actual prediction
      if (daysAfter > 1 && mensesData.ovulationPercent > 0) {
        //So that it shows safe date otherwise
        mensesData.ovulationPercent = 0;
      } else if (isLate && isPosLate && mensesData.isPeriodDate) {
        //So that it shows safe date otherwise
        mensesData.isPeriodDate = false;
      }
      if (isTodayPredicted) {
        //So that it shows safe date otherwise
        mensesData.isPeriodDate = false;
      }

      pos.date = dateStr;
      // pos.cycleDay = mensesData.dayCounter;
      pos.cycleDay = posMom.diff(lastPeriodMoment, 'days') + 1;

      if (isPosLate) {
        const lateDiff = posMom.diff(probableDate, 'days');
        if (lateDiff < 11) {
          pos.centerDays = lateDiff;
          pos.centerDaysHelpTxt = lateDiff === 0 ? 'Period Date' : 'Days Late';
          pos.centerBottom = `Next Period ${nextPeriodDate}`;
        } else if (lateDiff >= 11) {
          pos.centerDays = daysDiff;
          pos.centerDaysHelpTxt = 'Days Ago';
          pos.centerBottom = `Last Period ${moment(props.lastPeriodDate).format('DD MMM')}`;
        }
      } else {
        pos.centerDays = probableDate.diff(moment(dateStr), 'days');
        pos.centerDaysHelpTxt = pos.centerDays > 1 ? 'Days Left' : 'Day Left';
        pos.centerBottom = `Next Period ${nextPeriodDate}`;
      }

      if (mensesData.isPeriodDate) {
        //Red
        pos.bgColor = colors.pink_light;
        pos.outerShadowColor = '#ff2d55';
        pos.outerShadowOpacity = 0.5;
        pos.innerShadowColor = '#ff2d55';
        pos.innerShadowOpacity = 0.16;
        pos.dotGradient = ['#ff588c', '#ff4270', '#ff2f58'];
        pos.dotShadow = '#e65e8a';
        pos.dotShadowOpacity = 1;
        pos.centerColor = colors.gradient_header1;
      } else if (mensesData.ovulationPercent > 0) {
        //Yellow
        pos.bgColor = '#fff7e0';
        pos.outerShadowColor = '#fbd154';
        pos.outerShadowOpacity = 0.5;
        pos.innerShadowColor = '#ffd14e';
        pos.innerShadowOpacity = 0.5;
        pos.dotGradient = ['#fbe49d', '#fbd668', '#fbd154'];
        pos.dotShadow = '#fbd152';
        pos.dotShadowOpacity = 1;
        pos.centerColor = '#fbd154';
      } else {
        pos.bgColor = '#dcfeff';
        pos.outerShadowColor = '#149ea3';
        pos.outerShadowOpacity = 0.55;
        pos.innerShadowColor = '#abf2ff';
        pos.innerShadowOpacity = 0.53;
        pos.dotGradient = ['#9ec1c2', '#5da0a2', '#149ea3'];
        pos.dotShadow = '#149ea3';
        pos.dotShadowOpacity = 1;
        pos.centerColor = '#149ea3';
      }

      if (isTodayPredicted) {
        //So that it shows safe date otherwise
        pos.centerDays = '';
        pos.centerDaysHelpTxt = 'Period Starts\nToday';
        pos.centerBottom = '';
      }
      pos.isTodayPredicted = isTodayPredicted;
      pos.isOvulationDay = false;

      if (daysAfter < 1 && ovulPos === null && props.menstrualData[dateStr].ovulationPercent === 100) {
        ovulPos = pos;
        pos.isOvulationDay = true;
      }
      //If period is late we will not change bg
      if (daysAfter > 1) {
        pos.bgColor = '#dbffee';
        pos.outerShadowColor = '#75c7a0';
        pos.outerShadowOpacity = 0.55;
        pos.innerShadowColor = '#abf2ff';
        pos.innerShadowOpacity = 0.53;
        pos.dotGradient = ['#9cc6b2', '#87c5a7', '#75c7a0'];
        pos.dotShadow = '#75c7a0';
        pos.dotShadowOpacity = 1;
        pos.centerColor = '#75c7a0';
        if (ovulPos === null && props.ovulationLength === cycleLength - idx) {
          ovulPos = pos;
          pos.isOvulationDay = true;
        }
      } else {
      }

      if (todayPos === null && todayDateStr === dateStr) {
        todayPos = pos;
        todayAngle = circleSlice * idx;
        currentPos = pos;
      }

      return pos;
    });

    const dotPos = cycleLength / 2;

    //Change Background color without updating state of outer component
    props.bottomBgRef &&
      props.bottomBgRef.current &&
      props.bottomBgRef.current.setNativeProps &&
      props.bottomBgRef.current.setNativeProps({
        style: {
          flex: props.bottomViewHeightPercent / 100,
          backgroundColor: todayPos.bgColor,
        },
      });

    let state = {
      // angle: this.relativeToAbsoluteAngle(
      //   ((this.props.value !== undefined ? this.props.value : 0) * 360) /
      //     this.props.maxValue,
      // ),
      angle: this.relativeToAbsoluteAngle((todayAngle * 360) / this.props.maxValue),
      outerWidth: props.outerWidth ? props.outerWidth : moderateScale(100),
      outerShadowColor: '#75c7a0',
      outerShadowOpacity: 0.55,
      innerWidth: props.innerWidth ? props.innerWidth : moderateScale(70),
      innerShadowColor: '#abf2ff',
      innerShadowOpacity: 0.53,
      centerWidth: props.centerWidth ? props.centerWidth : moderateScale(40),
      centerColor: colors.red_light,
      selected: props.initialIdx,
      arcPath: d,
      ovuPath: d2,
      isLate,
      daysAfter,
      radius,
      positions,
      strokeWidth,
      dotWidth: dotWidth,
      dotWidthStart: dotWidth,
      dotPos: dotPos,
      centerX,
      //From here
      xCenter: radius,
      yCenter: radius,
      origin: {x: 0, y: 0},
      circleCenter: {x: 0, y: 0},
      currentPos,
      lastPos: currentPos, //To maintain the distance from last position
      todayPos,
      ovulPos,
      measuredBox: null,
      menstrualData: props.menstrualData,
      cycleLength: props.cycleLength,
      periodLength: props.periodLength,
    };

    return state;
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  circlePath(x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }

  _updatePosition() {
    debugger;
  }

  cartesianToPolar = (x, y, args) => {
    let radius = this.state && this.state.radius ? this.state.radius : 0;
    let dotWidth = this.state && this.state.dotWidth ? this.state.dotWidth : 0;
    if (args) {
      radius = args.radius;
      dotWidth = args.dotWidth;
    }
    const hC = radius + dotWidth / 2;
    // const hC = this.state.outerWidth / 2 + this.state.radius;
    if (x === 0) {
      return y > hC ? 0 : 180;
    } else if (y === 0) {
      return x > hC ? 90 : 270;
    } else {
      const part1 = (Math.atan((y - hC) / (x - hC)) * 180) / Math.PI;
      const part2 = x > hC ? 90 : 270;
      return Math.round(part1 + part2);
    }
  };

  handleMeasure = (ox, oy, width, height, px, py) => {
    const center = (this.state.outerWidth + this.state.radius * 2) / 2;
    this.setState(
      {
        xCenter: this.state.radius,
        yCenter: this.state.radius,
        circleCenter: {x: center, y: center},
      },
      () => {
        if (this.props.onValueChange) {
          this.props.onValueChange(this.props.startDegree ? this.props.startDegree : 0);
        }
      },
    );
  };

  measureLocation = () => {
    // @ts-ignore
    this.elRefs.circleSlider.current.measure(this.handleMeasure);
  };

  getOnPressAngle = (x, y, args) => {
    let xCenter = this.state && this.state.xCenter ? this.state.xCenter : 0;
    let yCenter = this.state && this.state.yCenter ? this.state.yCenter : 0;
    let radius = this.state && this.state.radius ? this.state.radius : 0;
    let dotWidth = this.state && this.state.dotWidth ? this.state.dotWidth : 0;
    if (args) {
      xCenter = args.xCenter;
      yCenter = args.xCenter;
      radius = args.radius;
      dotWidth = args.dotWidth;
    }
    const xOrigin = xCenter - (radius + dotWidth / 2);
    const yOrigin = yCenter - (radius + dotWidth / 2);
    const a = this.cartesianToPolar(x - xOrigin, y - yOrigin, args);
    const relativeAngle = this.getRelativeAngle(a);
    return {angle: a, relativeAngle};
  };

  getRelativeAngle = angle => {
    const start = this.props.startDegree !== undefined ? this.props.startDegree : 0;
    if (angle < start) {
      return this.props.arcDirection === CLOCKWISE ? (Math.abs(360 - start) + angle) % 360 : start - angle;
    }
    return this.props.arcDirection === CLOCKWISE ? angle - start : (start + (360 - angle)) % 360;
  };

  relativeToAbsoluteAngle = relativeAngle => {
    const start = this.props.startDegree !== undefined ? this.props.startDegree : 0;
    const relative = (this.props.arcDirection === CLOCKWISE ? 1 : -1) * relativeAngle;
    return start + (relative % 360);
  };

  getCurrentValue = () => {
    return parseFloat(
      ((this.state.relativeAngle / 360) * this.props.maxValue).toFixed(this.props.decimalPlaces),
    );
  };

  setValue = value => {
    const rel = ((value * 360) / this.props.maxValue) % 360;
    const a = this.relativeToAbsoluteAngle(rel) % 360;
    this.setState({angle: a, relativeAngle: rel});
  };

  onValueChanged = value => {
    if (this.props.onValueChange !== undefined) {
      this.props.onValueChange(value);
    }
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gs) => true,
    onMoveShouldSetPanResponderCapture: (e, gs) => true,
    onPanResponderMove: (e, gs) => {
      const dotWidthHalf = this.state.dotWidth / 2;
      const todayDotPos = {
        x: this.state.lastPos.pointY - dotWidthHalf,
        y: this.state.lastPos.pointX - dotWidthHalf,
      };
      const moveX = todayDotPos.x + gs.dx + dotWidthHalf;
      const moveY = todayDotPos.y + gs.dy + dotWidthHalf;

      const angles = this.getOnPressAngle(moveX, moveY);
      // const angles = this.getOnPressAngle(gs.moveX, gs.moveY);

      //We will sort the angle which is most near to current position and set the dot position there
      let mappedPos = this.state.positions.map((pos, idx) => {
        return {
          diff: Math.abs(angles.angle - pos.angle),
          idx: idx,
        };
      });

      mappedPos = mappedPos.sort((a, b) => {
        if (a.diff < b.diff) {
          return -1;
        }
        if (a.diff > b.diff) {
          return 1;
        }

        return 0;
      });

      const nearestPos = this.state.positions[mappedPos[0].idx];

      // console.log('MMMMMMMM::', mappedPos, nearestPos);
      // console.log('ANGULOS::', angles);

      // this.setState(
      //   {angle: angles.angle, relativeAngle: angles.relativeAngle},
      //   () => {
      //     this.onValueChanged(this.getCurrentValue());
      //   },
      // );
      this.setState({angle: nearestPos.angle, currentPos: nearestPos}, () => {
        // Vibration.vibrate([400], true);
        this.props.bottomBgRef &&
          this.props.bottomBgRef.current &&
          this.props.bottomBgRef.current.setNativeProps &&
          this.props.bottomBgRef.current.setNativeProps({
            style: {
              flex: this.props.bottomViewHeightPercent / 100,
              backgroundColor: this.state.currentPos.bgColor,
            },
          });
        this.onValueChanged(this.getCurrentValue());
      });
      // if (angles.angle > 84 && angles.angle < 280) {
      // }
    },
    onPanResponderRelease: (e, gs) => {
      this.setState({lastPos: this.state.currentPos});
    },
    onStartShouldSetPanResponder: (e, gs) => true,
    onStartShouldSetPanResponderCapture: (e, gs) => true,
  });

  render() {
    const dotWidthHalf = this.state.dotWidth / 2;
    const dotPos = {
      x: this.state.currentPos.pointY - dotWidthHalf,
      y: this.state.currentPos.pointX - dotWidthHalf,
    };
    const dotViewStyle = {
      shadowRadius: 16,
      shadowOpacity: this.state.currentPos.dotShadowOpacity,
      shadowColor: this.state.currentPos.dotShadow,
      backgroundColor: '#fbd152',
      width: this.state.dotWidth,
      height: this.state.dotWidth,
      borderRadius: this.state.dotWidth / 2,
      position: 'absolute',
      zIndex: 2,
      left: dotPos.x,
      top: dotPos.y,
    };

    const todayDotPos = {
      x: this.state.todayPos.pointY - dotWidthHalf,
      y: this.state.todayPos.pointX - dotWidthHalf,
    };
    const todayDotViewStyle = {
      width: this.state.dotWidth,
      height: this.state.dotWidth,
      borderRadius: this.state.dotWidth / 2,
      borderWidth: moderateScale(4),
      borderColor: colors.txt_header_color,
      position: 'absolute',
      zIndex: 1,
      left: todayDotPos.x,
      top: todayDotPos.y,
    };

    const ovulIconSize = scale(20);
    const ovulIconStyle = {
      position: 'absolute',
      zIndex: this.state.daysAfter > 1 ? 1 : 3,
      left: this.state.ovulPos.pointY - ovulIconSize / 2,
      top: this.state.ovulPos.pointX - ovulIconSize / 2,
    };

    return (
      <View onLayout={this.measureLocation} ref={this.elRefs.circleSlider}>
        <Shadow
          style={{
            ...styles.outerCircle,
            shadowOpacity: this.state.currentPos.outerShadowOpacity,
            shadowColor: this.state.currentPos.outerShadowColor,
            width: this.state.outerWidth,
            height: this.state.outerWidth,
            borderRadius: this.state.outerWidth / 2,
          }}
        >
          {this.state.positions.map((el, idx) => {
            return <View key={`dc_${idx}`} style={[styles.dotView, {top: el.pointX, left: el.pointY}]} />;
          })}
          <Shadow style={dotViewStyle} ref={this.elRefs.circleDot} {...this.panResponder.panHandlers}>
            <LinearGradient
              colors={this.state.currentPos.dotGradient}
              style={{
                width: this.state.dotWidth,
                height: this.state.dotWidth,
                borderRadius: this.state.dotWidth / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {this.state.daysAfter < 1 && this.state.currentPos.isOvulationDay ? null : (
                <PoppinsTextMedium
                  color={1}
                  fontSize={15}
                  style={{textAlign: 'center', lineHeight: moderateScale(17)}}
                >
                  {`Day\n${this.state.currentPos.cycleDay}`}
                </PoppinsTextMedium>
              )}
            </LinearGradient>
          </Shadow>

          {
            //Today circle
          }
          <View style={todayDotViewStyle} />
          {
            //Ovulation Circle
          }
          <Svg
            height={this.props.outerWidth}
            width={this.props.outerWidth}
            style={{
              position: 'absolute',
              top: 0,
            }}
          >
            <Path
              fill="none"
              stroke={this.state.daysAfter > 1 ? `#ff2d5580` : `#ff2d55`}
              strokeLinecap="round"
              {...{d: this.state.arcPath, strokeWidth: this.state.strokeWidth}}
            />

            <Path
              fill="none"
              stroke={this.state.daysAfter > 1 ? `#ffcf4b80` : `#ffcf4b`}
              strokeLinecap="round"
              {...{d: this.state.ovuPath, strokeWidth: this.state.strokeWidth}}
            />
          </Svg>
          {
            //Ovulation Icon
          }
          <Icon name="firtile_icon" size={ovulIconSize} color={'#eb5f33'} style={ovulIconStyle} />
          <Shadow
            style={{
              ...styles.innerCircle,
              shadowOpacity: this.state.currentPos.innerShadowOpacity,
              shadowColor: this.state.currentPos.innerShadowColor,
              width: this.state.innerWidth,
              height: this.state.innerWidth,
              borderRadius: this.state.innerWidth / 2,
            }}
          >
            <View
              style={[
                styles.innerMostCircle,
                {
                  backgroundColor: this.state.currentPos.centerColor,
                  width: this.state.centerWidth,
                  height: this.state.centerWidth,
                  borderRadius: this.state.centerWidth / 2,
                },
              ]}
            >
              <View
                style={[
                  {alignItems: 'center'},
                  this.state.currentPos.isTodayPredicted ? {flex: 1, justifyContent: 'center'} : {},
                ]}
              >
                {this.state.currentPos.isTodayPredicted ? null : (
                  <PoppinsTextMedium color={1} fontSize={40} style={{lineHeight: moderateScale(44)}}>
                    {`${this.state.currentPos.centerDays}`}
                  </PoppinsTextMedium>
                )}

                <PoppinsTextMedium
                  color={1}
                  fontSize={21}
                  style={[
                    {lineHeight: moderateScale(23)},
                    this.state.currentPos.isTodayPredicted ? {textAlign: 'center'} : {},
                  ]}
                >
                  {this.state.currentPos.centerDaysHelpTxt}
                </PoppinsTextMedium>
              </View>
              {this.state.currentPos.isTodayPredicted ? null : (
                <View style={{alignItems: 'center', marginTop: moderateScale(12)}}>
                  <PoppinsTextMedium color={1} fontSize={14}>
                    {this.state.currentPos.centerBottom}
                  </PoppinsTextMedium>
                </View>
              )}
            </View>
          </Shadow>
        </Shadow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerCircle: {
    backgroundColor: '#fff8fa',
    shadowRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: '#fff8fa',
    shadowRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerMostCircle: {
    alignItems: 'center',
    paddingTop: moderateScale(25),
  },
  dotView: {
    position: 'absolute',
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
    backgroundColor: colors.white,
    zIndex: 1,
  },
});

export default CircleDashInteractive;
