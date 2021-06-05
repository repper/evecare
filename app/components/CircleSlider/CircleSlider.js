'use strict';
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
Object.defineProperty(exports, '__esModule', {value: true});
const React = __importStar(require('react'));
const react_native_1 = require('react-native');
const react_native_svg_1 = require('react-native-svg');
const CLOCKWISE = 'CW';
const COUNTER_CLOCKWISE = 'CCW';
import moment from 'moment';
import images from '../../config/images';
import {moderateScale} from '../../lib/scalingUtils';
import {colors, globalStyle as gs} from '../../config/styles';
import Icon from '../../fonts/eveCareFont';
import CircleShaowIcon from '../../components/SvgIcon/circleShadowIcon';

class CircleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.polarToCartesian = angle => {
      const r = this.props.sliderRadius;
      //const hC = this.props.sliderRadius + this.props.btnRadius;
      const hC = this.props.sliderWidth / 2 + this.props.sliderRadius + 25;
      const a = ((angle - 90) * Math.PI) / 180.0;
      const x = hC + r * Math.cos(a);
      const y = hC + r * Math.sin(a);
      return {x, y};
    };

    this.polarToCartesianDate = angle => {
      const r = this.props.sliderRadius;
      //const hC = this.props.sliderRadius + this.props.btnRadius;
      const hC = this.props.sliderWidth / 2 + this.props.sliderRadius + 25;
      const a = ((angle - 90) * Math.PI) / 180.0;
      const x = hC + r * Math.cos(a);
      const y = hC + r * Math.sin(a);
      return {x, y};
    };

    this.polarToCartesianAngle = angle => {
      const r = this.props.pointerRadius;
      //const hC = this.props.sliderRadius + this.props.btnRadius;
      const hC = this.props.sliderWidth / 2 + this.props.sliderRadius + 25;
      const a = ((angle - 90) * Math.PI) / 180.0;

      const x = hC + r * Math.cos(a);
      const y = hC + r * Math.sin(a);
      return {x, y};
    };

    this.cartesianToPolar = (x, y) => {
      //const hC = this.props.sliderRadius + this.props.btnRadius;
      const hC = this.props.sliderWidth / 2 + this.props.sliderRadius;
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
    this.handleMeasure = (ox, oy, width, height, px, py) => {
      // console.log(
      //   `Width for SVG Layout: ${width}, height: ${height}, px: ${px}, py: ${py}`,
      // );
      const center = (this.props.sliderWidth + this.props.sliderRadius * 2) / 2;
      this.setState(
        {
          xCenter: px + (this.props.sliderRadius + this.props.btnRadius),
          yCenter: py + (this.props.sliderRadius + this.props.btnRadius),
          measuredBox: this.getBoxBounds(),
          circleCenter: {x: center, y: center},
        },
        () => {
          // if (this.props.onValueChange) {
          //   this.props.onValueChange(
          //     this.props.startDegree ? this.props.startDegree : 0,
          //   );
          // }
        },
      );
    };
    this.measureLocation = () => {
      // @ts-ignore
      this.refs.circleslider.measure(this.handleMeasure);
    };
    this.getOnPressAngle = (x, y) => {
      const xOrigin =
        this.state.xCenter - (this.props.sliderRadius + this.props.btnRadius);
      const yOrigin =
        this.state.yCenter - (this.props.sliderRadius + this.props.btnRadius);
      const a = this.cartesianToPolar(x - xOrigin, y - yOrigin);
      const relativeAngle = this.getRelativeAngle(a);
      const width = this.props.sliderWidth + this.props.sliderRadius * 2 + 50;
      this.setState({origin: {x: xOrigin, y: yOrigin}});
      return {angle: a, relativeAngle};
    };
    this.getRelativeAngle = angle => {
      const start =
        this.props.startDegree !== undefined ? this.props.startDegree : 0;
      if (angle < start) {
        return this.props.arcDirection === CLOCKWISE
          ? (Math.abs(360 - start) + angle) % 360
          : start - angle;
      }
      return this.props.arcDirection === CLOCKWISE
        ? angle - start
        : (start + (360 - angle)) % 360;
    };

    this.getCurrentValue = () => {
      return parseFloat(
        ((this.state.relativeAngle / 360) * this.props.maxValue).toFixed(
          this.props.decimalPlaces,
        ),
      );
    };
    this.setValue = value => {
      const rel = ((value * 360) / this.props.maxValue) % 360;
      const a = this.relativeToAbsoluteAngle(rel) % 360;
      // console.log(`Setting new angle: ${a}, relativeAngle: ${rel}`);
      this.setState({angle: a, relativeAngle: rel});
    };

    this.setDateValue = value => {
      const rel = ((value * 360) / this.props.maxValue) % 360;
      const a = this.relativeToAbsoluteAngle(rel) % 360;
      // console.log(`Setting new angle: ${a}, relativeAngle: ${rel}`);
      this.setState({fixedAngle: a});
    };

    this.onValueChanged = value => {
      if (this.props.onValueChange !== undefined) {
        this.props.onValueChange(value);
      }
    };
    this.innerCirclePressed = value => {
      if (this.props.onPressInnerCircle !== undefined) {
        this.props.onPressInnerCircle(value);
      }
    };
    this.outerCirclePressed = value => {
      if (this.props.onPressOuterCircle !== undefined) {
        this.props.onPressOuterCircle(value);
      }
    };
    this.getBoxBounds = () => {
      let degree = 45;
      if (this.props.startDegree) {
        degree += this.props.startDegree;
      }
      const arr = [];
      for (var i = 0; i < 4; i++) {
        arr.push((degree + 90 * i) % 360);
      }
      const pointArray = [];
      const px =
        this.state.xCenter - (this.props.sliderRadius + this.props.btnRadius);
      const py =
        this.state.yCenter - (this.props.sliderRadius + this.props.btnRadius);
      arr.forEach(angle => {
        let x =
          (this.props.sliderRadius - this.props.sliderWidth / 2) *
            Math.cos(this.degreeToRadian(angle)) +
          this.state.circleCenter.x;
        let y =
          (this.props.sliderRadius - this.props.sliderWidth / 2) *
            Math.sin(this.degreeToRadian(angle)) +
          this.state.circleCenter.y;
        let newPoint = {
          angle: this.relativeToAbsoluteAngle(angle),
          x: x,
          y: y,
        };
        pointArray.push(newPoint);
      });
      return pointArray;
    };
    this.degreeToRadian = angle => {
      return angle * 0.0174533;
    };
    this.radianToDegree = radian => {
      return radian * 57.2958;
    };

    this.relativeToAbsoluteAngle = relativeAngle => {
      const start =
        this.props.startDegree !== undefined ? this.props.startDegree : 0;
      const relative =
        (this.props.arcDirection === CLOCKWISE ? 1 : -1) * relativeAngle;
      return start + (relative % 360);
    };

    this.panResponder = '';
    if (
      props.arcDirection !== CLOCKWISE &&
      props.arcDirection !== COUNTER_CLOCKWISE
    ) {
      throw new Error(
        "Prop 'arcDirection' only supports 'CW' or 'CCW', for Clockwise or Counterclockwise",
      );
    }
    let position = new react_native_1.Animated.ValueXY();
    this.panResponder = react_native_1.PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        const angles = this.getOnPressAngle(gs.moveX, gs.moveY);
        position.setValue({x: gs.dx, y: gs.dy});

        this.setState(
          {angle: angles.angle, relativeAngle: angles.relativeAngle},
          () => {
            this.onValueChanged(this.getCurrentValue());
          },
        );
      },

      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
    });

    this.state = {
      angle: this.relativeToAbsoluteAngle(
        ((this.props.value !== undefined ? this.props.value : 0) * 360) /
          this.props.maxValue,
      ),
      fixedAngle: this.relativeToAbsoluteAngle(
        ((this.props.value !== undefined ? this.props.value : 0) * 360) /
          this.props.maxValue,
      ),
      relativeAngle:
        ((this.props.value !== undefined ? this.props.value : 0) * 360) /
        this.props.maxValue,
      xCenter: Number.NEGATIVE_INFINITY,
      yCenter: Number.NEGATIVE_INFINITY,
      origin: {x: 0, y: 0},
      circleCenter: {x: 0, y: 0},
      measuredBox: [],
      position,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      // @ts-ignore
      this.setValue(nextProps.value !== undefined ? nextProps.value : 0);
    }
    this.setDateValue(
      nextProps.dateCircleValue !== undefined ? nextProps.dateCircleValue : 0,
    );
  }

  render() {
    const value = 15;
    const rel = ((value * 360) / this.props.maxValue) % 360;
    const a = this.relativeToAbsoluteAngle(rel) % 360;

    const my = this.polarToCartesian(a);

    const width = this.props.sliderWidth + this.props.sliderRadius * 2 + 50; //(this.props.sliderRadius + this.props.btnRadius) * 2;
    const bR = this.props.btnRadius;
    const pR = this.props.pointerRadius;
    const dR = this.props.sliderRadius;
    const startCoord = this.polarToCartesian(
      this.props.startDegree !== undefined ? this.props.startDegree : 0,
    );
    const endCoord = this.polarToCartesian(this.state.angle);
    const endDateCoord = this.polarToCartesianDate(this.state.fixedAngle);

    const endCoordPointer = this.polarToCartesianAngle(this.state.angle);

    const radiusX = dR;
    const radiusY = dR;
    const xAxisRotation = 0; // The x-axis-rotation does not have an effect on a circle, 0 is a good choice.
    const largeArc = this.state.relativeAngle >= 180 ? 1 : 0;
    const sweepFlag = this.props.arcDirection === CLOCKWISE ? 1 : 0;
    let backColor = '';
    let currentdate = moment().format('D MMM');
    return (
      <react_native_1.Animated.View>
        <react_native_svg_1.Svg
          style={{
            width: '100%',
          }}
          onLayout={this.measureLocation}
          ref="circleslider"
          width={width}
          height={width}
          flex={1}>
          <react_native_svg_1.Circle
            r={dR}
            cx={width / 2}
            cy={width / 2}
            stroke={this.props.backgroundColor}
            strokeWidth={this.props.sliderWidth}
            //fill={this.props.backgroundColor}
          />

          {Object.keys(this.props.startPeriodDate).length > 0 ? (
            this.props.diff > this.props.menstrualDate ? null : (
              <react_native_svg_1.Path
                stroke={'#ff3d69'}
                strokeWidth={this.props.sliderWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`M${startCoord.x} ${
                  startCoord.y
                } A ${130} ${130} ${0} ${0} ${1} ${moderateScale(
                  270,
                )} ${moderateScale(83)}`}
                onPressIn={e => {
                  const p = e.nativeEvent;
                  const angles = this.getOnPressAngle(p.locationX, p.locationY);
                  this.setState(
                    {angle: angles.angle, relativeAngle: angles.relativeAngle},
                    () => {
                      const currentValue = this.getCurrentValue();
                      this.outerCirclePressed(currentValue);
                      this.onValueChanged(currentValue);
                    },
                  );
                }}
              />
            )
          ) : null}

          {Object.keys(this.props.startPeriodDate).length > 0 ? (
            this.props.diff > this.props.menstrualDate ? null : (
              <react_native_svg_1.Path
                stroke={'#f7c25c'}
                strokeWidth={this.props.sliderWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`M${moderateScale(253)} ${moderateScale(
                  270,
                )} A ${radiusX} ${radiusY} ${0} ${0} ${1} ${moderateScale(
                  130,
                )} ${moderateScale(295)}`}
                onPressIn={e => {
                  const p = e.nativeEvent;
                  const angles = this.getOnPressAngle(p.locationX, p.locationY);
                  this.setState(
                    {angle: angles.angle, relativeAngle: angles.relativeAngle},
                    () => {
                      const currentValue = this.getCurrentValue();
                      this.outerCirclePressed(currentValue);
                      this.onValueChanged(currentValue);
                    },
                  );
                }}
              />
            )
          ) : null}

          {/* {
            Object.keys(this.props.startPeriodDate).length > 0 ?
            this.props.diff > this.props.menstrualDate && this.props.showDiff > 30 ? null :
              <react_native_svg_1.Image
                x={moderateScale(160)}
                y={moderateScale(290)}
                width={22}
                height={22}
                href={images.egg}
              />
              :
              null
          } */}

          <react_native_svg_1.Circle
            r={dR + (dR * 25) / 100}
            cx={width / 2}
            cy={width / 2}
            stroke="none"
            fill="none"
            onPressIn={e => {
              const p = e.nativeEvent;
              const angles = this.getOnPressAngle(p.pageX, p.pageY);
              this.setState(
                {angle: angles.angle, relativeAngle: angles.relativeAngle},
                () => {
                  const currentValue = this.getCurrentValue();
                  this.outerCirclePressed(currentValue);
                  this.onValueChanged(currentValue);
                },
              );
            }}
          />

          {Object.keys(this.props.startPeriodDate).length > 0 ? (
            this.props.diff > this.props.menstrualDate ? null : (
              <react_native_svg_1.G x={endCoordPointer.x} y={endCoordPointer.y}>
                <react_native_svg_1.Pattern
                  id="Pattern"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  transform={`rotate(${this.state.relativeAngle + 180})`}
                  viewBox="0 0 10 10">
                  <react_native_svg_1.Path
                    d="M 0 0 L 8 1 L 3.5 12 z"
                    fill={'url(#gradient1)'}
                    //fill={this.props.btnColor}
                    //stroke={this.props.btnColor}
                  />
                </react_native_svg_1.Pattern>
              </react_native_svg_1.G>
            )
          ) : null}

          {this.props.dotValues.map(n => {
            var rel = ((n * 360) / this.props.maxValue) % 360;
            var a = this.relativeToAbsoluteAngle(rel) % 360;
            var my = this.polarToCartesian(a);

            return (
              <react_native_svg_1.G
                x={my.x - this.props.dotSize}
                y={my.y - this.props.dotSize}>
                <react_native_svg_1.Circle
                  r={this.props.dotSize}
                  cx={this.props.dotSize}
                  cy={this.props.dotSize}
                  fill={this.props.dotColor}
                />
              </react_native_svg_1.G>
            );
          })}

          <react_native_svg_1.Defs>
            <react_native_svg_1.LinearGradient id="gradient1" x="0" y="1">
              <react_native_svg_1.Stop
                offset="0%"
                stopColor={this.props.btnColor[0]}
              />
              <react_native_svg_1.Stop
                offset="30%"
                stopColor={this.props.btnColor[1]}
              />
              <react_native_svg_1.Stop
                offset="100%"
                stopColor={this.props.btnColor[2]}
              />
            </react_native_svg_1.LinearGradient>
          </react_native_svg_1.Defs>

          <react_native_svg_1.Defs>
            <react_native_svg_1.LinearGradient id="gradient2" x="0" y="1">
              <react_native_svg_1.Stop offset="0%" stopColor={'#d8557f'} />
              <react_native_svg_1.Stop offset="50%" stopColor={'#d8557f'} />
              <react_native_svg_1.Stop offset="100%" stopColor={'#d8557f'} />
            </react_native_svg_1.LinearGradient>
          </react_native_svg_1.Defs>

          {Object.keys(this.props.startPeriodDate).length > 0 ? (
            this.props.diff > this.props.menstrualDate ? null : (
              <react_native_svg_1.G
                x={endDateCoord.x - bR}
                y={endDateCoord.y - bR}>
                <react_native_svg_1.Circle
                  r={bR}
                  cx={bR}
                  cy={bR}
                  stroke={'url(#gradient2)'}
                  fill={'none'}
                  strokeWidth="1"
                />
              </react_native_svg_1.G>
            )
          ) : null}
          {Object.keys(this.props.startPeriodDate).length > 0 ? (
            this.props.diff > this.props.menstrualDate ? null : (
              <react_native_svg_1.G
                x={endCoord.x - bR}
                y={endCoord.y - bR}
                style={[this.state.position.getLayout()]}>
                <react_native_svg_1.Circle
                  r={bR}
                  cx={bR}
                  cy={bR}
                  //stroke={this.props.btnColor}
                  fill={'url(#gradient1)'}
                  //strokeWidth="5"
                  {...this.panResponder.panHandlers}
                />
                {this.props.value == 14 ? null : (
                  <react_native_svg_1.Text
                    x={bR}
                    y={bR + 1 / 2}
                    fontSize={10}
                    fill={'#fff'}
                    style={{fontFamily: 'Poppins-Medium'}}
                    textAnchor="middle">
                    <react_native_svg_1.TSpan x="1.5em" dy="0">
                      {this.props.startDay}
                      {'  '}
                    </react_native_svg_1.TSpan>
                    <react_native_svg_1.TSpan x="2.8em" dy="-0.5em">
                      {this.props.startDay == 1
                        ? 'st'
                        : this.props.startDay == 2
                        ? 'nd'
                        : this.props.startDay == 3
                        ? 'rd'
                        : 'th'}
                    </react_native_svg_1.TSpan>
                    <react_native_svg_1.TSpan x="2em" dy="15">
                      {' '}
                      Day
                    </react_native_svg_1.TSpan>
                  </react_native_svg_1.Text>
                )}
              </react_native_svg_1.G>
            )
          ) : null}
        </react_native_svg_1.Svg>
      </react_native_1.Animated.View>
    );
  }
}
const styles = react_native_1.StyleSheet.create({
  outerCircleView: {
    height: moderateScale(234),
    width: moderateScale(234),
    backgroundColor: colors.white,
    //position: 'absolute',
    borderRadius: moderateScale(234) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
    marginLeft: 55,
    //overflow: 'hidden',
    //zIndex: -999
  },
  innerCircleView: {
    height: moderateScale(168),
    width: moderateScale(168),
    borderRadius: moderateScale(168) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

CircleSlider.defaultProps = {
  arcDirection: CLOCKWISE,
  backgroundColor: 'white',
  btnColor: 'yellow',
  btnRadius: 13,
  component: undefined,
  decimalPlaces: 0,
  endGradient: '#A6FFCB',
  flex: 1,
  maxValue: 360,
  onPressInnerCircle: value => value,
  onPressOuterCircle: value => value,
  onValueChange: value => value,
  showValue: true,
  sliderRadius: 130,
  sliderWidth: 25,
  startDegree: 0,
  startGradient: '#12D8FA',
  textColor: 'white',
  textSize: 50,
  value: 0,
};
exports.default = CircleSlider;
