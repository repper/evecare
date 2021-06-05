import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import Icon from '../../fonts/eveCareFont';
import GradientHeader from '../../components/GradientHeader';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import InfoModal from '../../components/InfoModal';
import ToggleButton from '../../components/ToggleButton';

const BirthControl = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Birth control methods used"
          rightIcon="circle_i"
          onRightIconClick={props.showInfoHeaderModal}
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <FlatList
          data={props.optionsArr}
          contentContainerStyle={[cs.flexGrow]}
          renderItem={({item, index, separators}) =>
            listRender(item, index, separators, props)
          }
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator]} />
          )}
          extraData={props.totalCount}
          keyExtractor={(item, index) => `birc_${index}`}
        />
        <InfoModal
          onBackdropPress={props.hideInfoModal}
          visible={props.infoModalState}
          contentKey={props.contentKey}
        />
      </BackgroundWaveView>
    </SafeAreaView>
  );
};

const listRender = (item, index, separators, props) => {
  let isSelected = props.selectedBirthControlArr.indexOf(item.name) >= 0;
  return (
    <View>
      <View style={styles.rowView}>
        <View style={styles.leftView}>
          <Icon
            name="i_circle"
            color={colors.walk_discuss_back}
            style={styles.leftIcon}
            size={20}
            onPress={() => props.showInfoModal(index)}
          />
          <PoppinsTextRegular color={3} fontSize={15}>
            {item.name}
          </PoppinsTextRegular>
        </View>
        <View style={styles.switchView}>
          <ToggleButton
            onToggle={isOn => props.onBirthControlChange(item, index, isOn)}
            isOn={isSelected}
            onColor={colors.walk_discuss_back}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  leftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: moderateScale(40),
  },
  leftIcon: {
    paddingRight: moderateScale(10),
  },
  switchView: {
    width: widthPercentageToDP(16),
  },
  separator: {
    backgroundColor: colors.bg_pink,
    height: moderateScale(0),
  },
});

BirthControl.propTypes = {};

export default BirthControl;
