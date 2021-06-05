import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import images from '../../config/images';

const ImageBackgroundView = props => {
  const {source, ...otherProps} = props;

  const sourceImg = source ? source : props.image;

  return (
    <ImageBackground
      source={sourceImg}
      imageStyle={otherProps.imageStyle}
      style={styles.imageBgStyle}>
      {props.children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBgStyle: {
    flex: 1,
    width: '100%',
  },
});

ImageBackgroundView.propTypes = {};

ImageBackgroundView.defaultProps = {
  image: images.bgWhite,
  imageStyle: {
    resizeMode: 'cover',
  },
};

export default ImageBackgroundView;
