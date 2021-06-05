import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import {colors, globalStyle as gs} from '../../config/styles';
import GradientHeader from '../../components/GradientHeader';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import {GradientButton} from '../../components/Button';
import DropDownPicker from '../../components/DropDownPicker';

const TemperatureFilter = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Unit Settings"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <View style={cs.displayFlex}>
          <PoppinsTextRegular
            color={10}
            fontSize={20}
            style={{padding: moderateScale(15)}}>
            Set temperature unit
          </PoppinsTextRegular>

          <View style={styles.rowView}>
            <PoppinsTextRegular color={10} fontSize={20}>
              Unit
            </PoppinsTextRegular>
            <View>
              <DropDownPicker
                items={props.unitArray}
                defaultValue={props.selectedUnit}
                containerStyle={{height: 40, width: moderateScale(130)}}
                style={{backgroundColor: colors.white, borderWidth: 0}}
                itemStyle={{
                  justifyContent: 'flex-start',
                  paddingLeft: moderateScale(5),
                }}
                labelStyle={{color: colors.black}}
                dropDownStyle={{backgroundColor: colors.white}}
                onChangeItem={item => props.setSelectedUnit(item)}
              />

              <View style={styles.deviderView} />
            </View>
          </View>
        </View>
        <View style={cs.firstDataBottom}>
          <GradientButton text="Apply" onPress={props.clickOnProceed} />
          <View style={cs.firstDataBottomMsg} />
        </View>
      </BackgroundWaveView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(15),
  },
  deviderView: {
    width: moderateScale(150),
    height: 1,
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: colors.bg_pink,
  },
});

TemperatureFilter.propTypes = {};

export default TemperatureFilter;
