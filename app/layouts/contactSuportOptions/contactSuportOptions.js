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

const ContactSuportOptions = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Contact Support Team"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <View>
          {props.settingsArray.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={`unit_setting_${index}`}
                onPress={() => props.clickOnOptions(item)}>
                <View>
                  <View style={styles.rowView}>
                    <View>
                      <PoppinsTextMedium color={3} fontSize={16}>
                        {item.title}
                      </PoppinsTextMedium>
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

ContactSuportOptions.propTypes = {};

export default ContactSuportOptions;
