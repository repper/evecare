import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import InfoModal from '../../components/InfoModal';
import ToggleButton from '../../components/ToggleButton';
import TextInput from '../../components/TextInput';

const MedicalHistory = props => {
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.white}]}>
      <KeyboardAwareFlatList
        data={props.medicalArr}
        contentContainerStyle={[cs.flexGrow]}
        renderItem={({item, index, separators}) => listRender(item, index, separators, props)}
        ItemSeparatorComponent={({highlighted}) => <View style={[styles.separator]} />}
        extraData={props.totalCount}
        keyExtractor={(item, index) => `med_${index}`}
      />
      <InfoModal
        onBackdropPress={props.hideInfoModal}
        visible={props.infoModalState}
        contentKey={props.contentKey}
      />
    </SafeAreaView>
  );
};

const listRender = (item, index, separators, props) => {
  let isSelected = props.selectedMedicalArr.indexOf(item.name) >= 0;
  let hasEditView = isSelected && item.isOther;
  const placeHolderTxt = hasEditView ? (item.isCancer ? 'Cancer Details' : 'Medical Diagnosis') : '';
  const lableTxt = hasEditView ? (item.isCancer ? 'Cancer' : 'Medical History') : '';
  const txtDefVal = props.textInputs[item.name] ? props.textInputs[item.name] : '';
  return (
    <View>
      {item.showSection ? (
        <View style={styles.sectionView}>
          <PoppinsTextMedium color={3} fontSize={15}>
            {item.sectionTitle}
          </PoppinsTextMedium>
        </View>
      ) : null}
      <View style={styles.rowView}>
        <View style={styles.leftView}>
          {item.name == 'Cancer' || item.name == 'Other History' ? (
            <Icon name="i_circle" color={'transparent'} style={styles.leftIcon} size={20} />
          ) : (
            <Icon
              name="i_circle"
              color={item.iconColor}
              style={styles.leftIcon}
              size={20}
              onPress={() => props.showInfoModal(index)}
            />
          )}

          <PoppinsTextRegular color={3} fontSize={15}>
            {item.name}
          </PoppinsTextRegular>
        </View>
        <View style={styles.switchView}>
          <ToggleButton
            onToggle={isOn => props.onMedicalHistoryChange(item, index, isOn)}
            isOn={isSelected}
            onColor={item.iconColor}
          />
        </View>
      </View>
      {hasEditView ? (
        <View style={styles.inputWrpr}>
          <PoppinsTextMedium
            color={3}
            fontSize={15}
          >{`Enter more information about ${lableTxt}`}</PoppinsTextMedium>
          <TextInput
            onChangeText={inputVal => props.updateInputState(item.name, inputVal)}
            placeholder={placeHolderTxt}
            autoCapitalize="none"
            placeholderColor={28}
            fontColor={3}
            fontType={1}
            fontSize={16}
            blurOnSubmit={true}
            returnKeyType={'done'}
            defaultValue={txtDefVal}
            onBlur={() => props.onTxtInputBlur(item.name)}
          />
        </View>
      ) : null}
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
    backgroundColor: colors.pinkish_grey,
    height: moderateScale(1),
    opacity: 0.5,
  },
  inputWrpr: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(15),
    borderBottomWidth: moderateScale(1),
    borderColor: colors.pinkish_grey,
  },
  sectionView: {
    backgroundColor: colors.light_pink,
    padding: moderateScale(10),
    alignItems: 'center',
  },
});

MedicalHistory.propTypes = {};

export default MedicalHistory;
