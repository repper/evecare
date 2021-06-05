import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';
import Button from '../Button';

const Component = props => {
  return (
    <View style={styles.skipView}>
      <Button
        text="Skip"
        onPress={props.onSkip}
        wrprStyle={styles.skipButton}
        hasElevation={false}
      />
      <Button
        onPress={props.onNext}
        innerType={1}
        icon="arrow_small_tail"
        iconColor={colors.walktrgh_arrow}
        iconSize={26}
        wrprStyle={styles.nextButton}
        hasElevation={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
  },
  skipView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(40),
    paddingRight: moderateScale(40),
    marginBottom: moderateScale(15),
  },
});

export default Component;
