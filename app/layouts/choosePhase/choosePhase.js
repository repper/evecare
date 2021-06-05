import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';

import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import GradientHeader from '../../components/GradientHeader';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import PhaseTrackperiodSvgIcon from '../../components/SvgIcon/phaseTrackperiodSvgIcon';
import PhaseConcieveSvgIcon from '../../components/SvgIcon/phaseConcieveSvgIcon';
import PhaseAviodSvgIcon from '../../components/SvgIcon/phaseAviodSvgIcon';

const ChoosePhase = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        {props.hasHeader ? (
          <GradientHeader
            backIcon="left_arrow"
            title="Change your Goal"
            onLeftIconClick={() => props.navigation.goBack()}
          />
        ) : null}
        <View style={styles.container}>
          {!props.hasHeader ? (
            <View style={styles.headerView}>
              <PoppinsTextRegular color={29} fontSize={24}>
                {props.goal != null ? 'Change your Goal' : 'Choose your Goal'}
              </PoppinsTextRegular>
            </View>
          ) : null}
          <View style={styles.phaseWrpr}>
            {props.phaseArr.map((item, index) => {
              let backgroundColor = colors.walk_period_back;
              let marginTop = 0;
              let svgIcon = (
                <PhaseTrackperiodSvgIcon width={scale(43)} height={scale(50)} />
              );
              if (index === 1) {
                backgroundColor = colors.bg_yellow;
                svgIcon = (
                  <PhaseConcieveSvgIcon width={scale(65)} height={scale(46)} />
                );
                marginTop = moderateScale(20);
              } else if (index === 2) {
                backgroundColor = colors.walk_discuss_back;
                svgIcon = (
                  <PhaseAviodSvgIcon width={scale(50)} height={scale(50)} />
                );
                marginTop = moderateScale(20);
              }

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
                <Animated.View
                  style={[{transform: [{scale: animationScale}]}]}
                  key={`key_${index}`}>
                  <TouchableOpacity
                    onPress={() => props.navigateToMainScreen(item)}
                    activeOpacity={0.8}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}>
                    <View
                      style={[
                        styles.phaseView,
                        {backgroundColor: backgroundColor, marginTop},
                      ]}
                      key={`phase_${index}`}>
                      <View style={styles.phaseRowView}>
                        <PoppinsTextMedium color={1} fontSize={18}>
                          {item.title}
                        </PoppinsTextMedium>
                        <PoppinsTextRegular
                          color={1}
                          fontSize={12}
                          style={{marginTop: moderateScale(5)}}>
                          {item.desc}
                        </PoppinsTextRegular>
                      </View>
                      <View style={styles.iconView}>{svgIcon}</View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </ImageBackgroundView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
  },
  headerView: {
    alignItems: 'center',
    marginTop: moderateScale(30),
  },
  phaseWrpr: {
    flex: 1,
    justifyContent: 'center',
  },
  phaseView: {
    height: moderateScale(90),
    borderRadius: moderateScale(40),
  },
  phaseRowView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: moderateScale(30),
  },
  iconView: {
    position: 'absolute',
    right: moderateScale(15),
    top: moderateScale(10),
  },
});

ChoosePhase.propTypes = {};

export default ChoosePhase;
