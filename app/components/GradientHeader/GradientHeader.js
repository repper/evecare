import React from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs, sizes} from '../../config/styles';
import settings from '../../config/settings';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextRegular} from '../../components/Text';
import {Shadow} from 'react-native-neomorph-shadows';

const window = Dimensions.get('window');
const {width, height} = window;
const leftRightPadding = moderateScale(15);

const GradientHeader = props => {
  return (
    <SafeAreaView style={{backgroundColor: props.safeAreaBgColor}}>
      <Shadow style={styles.gradientView}>
        <View style={styles.headerWrpr}>
          {getBackButtonView(props)}
          {getTitleView(props)}
          {getRightIcon(props)}
          {getButtonView(props)}
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

const getBackButtonView = props => {
  if (!props.hideBack && !props.iconTitle) {
    const animation = new Animated.Value(0);
    const animationScale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const onPressIn = () => {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
    const onPressOut = () => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };
    return (
      <Animated.View style={[{transform: [{scale: animationScale}]}]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onLeftIconClick}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <View style={styles.backIconWrpr}>
            {props.backIconCallback ? (
              props.backIconCallback()
            ) : (
              <Icon
                name={props.backIcon}
                color={colors.wecome_txt}
                size={props.backIconSize}
              />
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  return null;
};

const getIconTitle = props => {
  return (
    <View style={[styles.specialView]}>
      <View style={[styles.rowView, {alignItems: 'center'}]}>
        <Icon
          name={props.iconTitle.icon ? props.iconTitle.icon : 'left_arrow_tail'}
          color={colors.white}
          size={
            props.iconTitle.iconSize
              ? props.iconTitle.iconSize
              : moderateScale(35)
          }
        />
        <View style={styles.slashView} />
        <PoppinsTextRegular fontSize={14}>
          {props.iconTitle.title}
        </PoppinsTextRegular>
      </View>
    </View>
  );
};

const getTitleView = props => {
  if (props.iconTitle) {
    return getIconTitle(props);
  }
  let titleViewStyle = [];
  titleViewStyle = [styles.titleWrprLeft];
  if (props.title.length == 0 && props.subTitle.length == 0) {
    return null;
  }
  return (
    <View style={[titleViewStyle, {flexDirection: 'row'}]}>
      <PoppinsTextRegular
        fontSize={17}
        numberOfLines={1}
        color={29}
        style={styles.txtTitle}>
        {props.title}
      </PoppinsTextRegular>
      {props.showUnitText != undefined && props.showUnitText ? (
        <PoppinsTextRegular
          fontSize={12}
          numberOfLines={1}
          color={29}
          style={{marginLeft: moderateScale(5)}}>
          {`(${props.unitText})`}
        </PoppinsTextRegular>
      ) : null}
    </View>
  );
};

const getButtonView = props => {
  if (props.button || props.iconButton) {
    let buttonViewWrprStyle = [styles.buttonViewWrpr];
    if (props.button) {
      return (
        <TouchableWithoutFeedback onPress={props.button.onPress}>
          <View style={buttonViewWrprStyle}>
            <View style={styles.plainButtonWrpr}>
              <PoppinsTextRegular fontSize={16}>
                {props.button.title}
              </PoppinsTextRegular>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={props.iconButton.onPress}>
          <View style={buttonViewWrprStyle}>
            <View style={styles.iconButtonWrpr}>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <Icon
                  name={
                    props.iconButton.icon ? props.iconButton.icon : 'filter'
                  }
                  color={colors.white}
                  size={
                    props.iconButton.iconSize
                      ? props.iconButton.iconSize
                      : moderateScale(15)
                  }
                />
                <PoppinsTextRegular
                  fontSize={16}
                  style={{marginLeft: moderateScale(7)}}>
                  {props.iconButton.title}
                </PoppinsTextRegular>
              </View>
              {props.filterApplied ? (
                <View style={styles.indicatorView} />
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  return null;
};

const getRightIcon = props => {
  if (props.rightIcon.length > 0 || props.hasRightIcon) {
    const animation = new Animated.Value(0);
    const animationScale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const onPressIn = () => {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
    const onPressOut = () => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };
    let rightIconWrprStyle = [styles.rightIconWrpr];

    return (
      <Animated.View
        style={[styles.rightIconWrpr, {transform: [{scale: animationScale}]}]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onRightIconClick}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <View>
            <Icon
              name={props.rightIcon ? props.rightIcon : 'share'}
              color={
                props.rightIconColor
                  ? props.rightIconColor
                  : colors.txt_header_color
              }
              size={props.rightIconSize}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  gradientView: {
    height: settings.headerHeight,
    width: width,
    shadowColor: 'rgba(255,46,86,0.24)',
    backgroundColor: colors.white,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 0},
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 46, 86, 0.2)',
  },
  headerWrpr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    textAlign: 'center',
  },
  titleWrpr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrprLeft: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    //marginLeft: moderateScale(60),
    position: 'absolute',
    zIndex:-1
  },
  backIconWrpr: {
    padding: moderateScale(5),
    paddingLeft: moderateScale(10),
  },
  rightIconWrpr: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    padding: moderateScale(5),
  },
  buttonViewWrpr: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    //padding: moderateScale(5)
  },

  rowView: {
    flexDirection: 'row',
  },

  specialView: {
    paddingLeft: leftRightPadding,
    height: sizes.headerHeight,
    justifyContent: 'center',
  },
  slashView: {
    width: moderateScale(1),
    height: moderateScale(25),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(10),
    backgroundColor: colors.cherry_nine,
    transform: [{rotate: '10deg'}],
  },

  plainButtonWrpr: {
    height: moderateScale(35),
    width: moderateScale(105),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: moderateScale(35) / 2,
  },
  iconButtonWrpr: {
    flexDirection: 'row',
    height: moderateScale(35),
    width: moderateScale(105),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: moderateScale(35) / 2,
  },
  indicatorView: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderRadius: moderateScale(8 / 2),
    backgroundColor: colors.butterscotch_two,
    position: 'absolute',
    right: 12,
    top: 6,
  },
});

GradientHeader.propTypes = {};

GradientHeader.defaultProps = {
  onLeftIconClick: () => {},
  safeAreaBgColor: colors.white,
  hideBack: false,
  backIconCallback: null,
  backIcon: '',
  backIconSize: moderateScale(25),
  title: '',
  subTitle: '',
  hasRightIcon: false,
  rightIcon: '',
  rightIconSize: moderateScale(25),
  onRightIconClick: () => {},
  button: null,
  iconButton: null,
};

export default GradientHeader;
