import React from 'react';
import {StyleSheet, View, Image, Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import images from '../../config/images';
import {colors, globalStyle as gs, sizes} from '../../config/styles';
import settings from '../../config/settings';
import {moderateScale} from '../../lib/scalingUtils';

const BackgroundWaveView = props => {
  const {source, ...otherProps} = props;
  const {width, height} = Dimensions.get('window');

  let mainViewHeight = height;
  if (props.hasBottomTabBar) {
    mainViewHeight -= moderateScale(60);
  }

  if (Platform.OS === 'ios') {
    //For all iphones
    mainViewHeight -= moderateScale(20);
    //For having bottom notch
    if (DeviceInfo.hasNotch()) {
      mainViewHeight -= moderateScale(58);
    }
  }

  return (
    <View style={styles.imageBgStyle}>
      <View style={[styles.childWrprView, {height: mainViewHeight, width: width}]}>{props.children}</View>
      <View style={[styles.bgView, {width: width, height: height}]}>
        <View
          style={{
            flex: props.topViewHeightPercent / 100,
            backgroundColor: props.topBgColor,
            width: width,
          }}
        />
        <View
          style={{
            flex: props.bottomViewHeightPercent / 100,
            backgroundColor: props.bottomBgColor,
          }}
          ref={props.bottomBgRef ? props.bottomBgRef : () => {}}
        >
          <View style={styles.imageWrprView}>
            <Image source={props.image} style={[props.imageStyle, {width: width}]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBgStyle: {
    flex: 1,
  },
  childWrprView: {
    zIndex: 2,
  },
  bgView: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  imageWrprView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

BackgroundWaveView.propTypes = {};

BackgroundWaveView.defaultProps = {
  hasBottomTabBar: false,
  topViewHeightPercent: 48,
  bottomViewHeightPercent: 52,
  topBgColor: colors.white,
  bottomBgColor: colors.light_pink,
  image: images.wave,
  imageStyle: {
    resizeMode: 'cover',
  },
};

export default BackgroundWaveView;
