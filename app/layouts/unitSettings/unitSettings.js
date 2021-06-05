import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextLight} from '../../components/Text';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import GradientHeader from '../../components/GradientHeader';
import Icon from '../../fonts/eveCareFont';
import {moderateScale} from '../../lib/scalingUtils';
import TextInput from '../../components/TextInput';

const UnitSettings = props => {
  const {updateState} = props;
  let weightText = `${props.units.weight == 'kg' ? 'Kilogram' : 'Pound'}  -  ${
    props.units.height == 'cm' ? 'Centimeter' : 'Feet'
  }`;
  let tempText = `${
    props.units.temp == 'fahrenheit' ? 'Fahrenheit' : 'Celsius'
  }`;
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Unit Settings"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <View>
          {props.settingsArray.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={`unit_setting_${index}`}
                onPress={() => props.clickOnSettingOption(item)}>
                <View>
                  <View style={styles.rowView}>
                    <View>
                      <PoppinsTextMedium color={3} fontSize={16}>
                        {item.title}
                      </PoppinsTextMedium>
                      <PoppinsTextLight color={3} fontSize={12}>
                        {index == 0 ? weightText : tempText}
                      </PoppinsTextLight>
                    </View>
                    <Icon name="right_arrow" size={20} color={'#ff598e'} />
                  </View>
                  <View style={styles.deviderView} />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </BackgroundWaveView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(20),
    justifyContent: 'space-between',
    paddingBottom: moderateScale(10)
  },
  deviderView: {
    backgroundColor: colors.pinkish_grey,
    height: moderateScale(1),
    opacity: 0.5,
  },
});

UnitSettings.propTypes = {};

export default UnitSettings;
