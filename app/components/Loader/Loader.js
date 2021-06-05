import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {colors, globalStyle as gs} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';

import {PoppinsTextMedium} from '../../components/Text';

const Loader = props => {
  const {message} = props;
  return (
    <View style={[styles.container, props.wrprStyle]}>
      <ActivityIndicator
        color={props.activityColor}
        size={props.activitySize}
      />
      <PoppinsTextMedium
        color={props.textColor}
        fontSize={14}
        style={{marginTop: moderateScale(10)}}>
        {message}
      </PoppinsTextMedium>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
});

Loader.propTypes = {};

Loader.defaultProps = {
  activityColor: colors.red_light,
  activitySize: 'small',
  message: 'Fetching...',
  textColor: 2,
};

export default Loader;
