import React from 'react';
import {StyleSheet} from 'react-native';
import images from '../../config/images';
import ImageBackground from '../ImageBackgroundView';

const GradientBackgroundView = props => {
  return (
    <ImageBackground image={images.bgWhite}>{props.children}</ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBgStyle: {
    flex: 1,
    width: '100%',
  },
});

GradientBackgroundView.propTypes = {};

export default GradientBackgroundView;
