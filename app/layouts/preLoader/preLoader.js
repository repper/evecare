import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {globalStyle as gs} from '../../config/styles';
import images from '../../config/images';
import {PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import ImageBackgroundView from '../../components/ImageBackgroundView';

const PreLoader = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <View style={styles.wrprView}>
          <View style={styles.topView}>
            <Image source={images.logo} style={styles.logoImg} />
            <Image source={images.ladies} />
          </View>
          <View style={styles.bottomView}>
            <PoppinsTextRegular color={26} fontSize={12}>
              One stop solution for women healthcare.
            </PoppinsTextRegular>
            <Image source={images.spiner_loader} style={styles.loaderImage} />
          </View>
        </View>
      </ImageBackgroundView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrprView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topView: {
    alignItems: 'center',
    marginTop: moderateScale(50),
    justifyContent: 'space-between',
    flex: 0.84,
  },
  logoImg: {
    height: moderateScale(200),
    width: moderateScale(218),
    resizeMode: 'contain',
  },
  bottomView: {
    alignItems: 'center',
  },
  loaderImage: {
    height: moderateScale(40),
    width: moderateScale(40),
    marginTop: moderateScale(10),
  },
});

PreLoader.propTypes = {};

export default PreLoader;
