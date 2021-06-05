import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Icon from '../../fonts/eveCareFont';
import GradientHeader from '../../components/GradientHeader';
import {colors, globalStyle as gs} from '../../config/styles';
import {
  PoppinsTextRegular,
  PoppinsTextMedium,
  PoppinsTextSemiBold,
} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import InfoModal from '../../components/InfoModal';
import AppModal from '../../components/AppModal';
import Button from '../../components/Button';

const ObstetricsHistory = props => {
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.white}]}>
      <GradientHeader
        backIcon="left_arrow"
        title="Pregnancy History"
        rightIcon="circle_i"
        onRightIconClick={props.showInfoHeaderModal}
        onLeftIconClick={() => props.navigation.goBack()}
      />
      <FlatList
        data={props.obstetricsArr}
        renderItem={({item, index, separators}) =>
          listRender(item, index, separators, props)
        }
        ItemSeparatorComponent={({highlighted}) => (
          <View style={[styles.separator]} />
        )}
        extraData={props.totalCount}
        keyExtractor={(item, index) => `obs_${index}`}
      />
      <InfoModal
        onBackdropPress={props.hideInfoModal}
        visible={props.infoModalState}
        contentKey={props.contentKey}
      />
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const listRender = (item, index, separators, props) => {
  if (item.isSection) {
    return (
      <View style={styles.sectionView}>
        <PoppinsTextMedium color={3} fontSize={15}>
          {`${item.name}`}
        </PoppinsTextMedium>
      </View>
    );
  }
  return (
    <View style={styles.rowView} key={`obs_${index}`}>
      <View style={styles.leftView}>
        <Icon
          name="i_circle"
          color={item.iconColor}
          style={styles.leftIcon}
          size={20}
          onPress={() => props.showInfoModal(index)}
        />
        {item.excludeTotal ? (
          <PoppinsTextMedium color={3} fontSize={15}>
            {item.name}
          </PoppinsTextMedium>
        ) : item.noIncrement ? (
          <PoppinsTextSemiBold color={3} fontSize={17}>
            {item.name}
          </PoppinsTextSemiBold>
        ) : (
          <PoppinsTextRegular color={3} fontSize={15}>
            {item.name}
          </PoppinsTextRegular>
        )}
      </View>
      {item.noIncrement ? (
        <View style={styles.addButtonView}>
          <PoppinsTextSemiBold color={3} fontSize={19} style={styles.textStyle}>
            {`${item.count}`}
          </PoppinsTextSemiBold>
        </View>
      ) : (
        <View style={styles.addButtonView}>
          <Button
            onPress={() => props.getSelectedObstrtics(false, index)}
            innerType={3}
            paddingLeftRight={0}
            icon="minus"
            iconColor={colors.warning_desc}
            iconSize={11}
            wrprStyle={styles.buttonStyle}
            backColor={colors.pinkish_grey}
            hasElevation={false}
          />
          <PoppinsTextRegular color={3} fontSize={14} style={styles.textStyle}>
            {`${item.count}`}
          </PoppinsTextRegular>
          <Button
            onPress={() => props.getSelectedObstrtics(true, index)}
            innerType={3}
            paddingLeftRight={0}
            icon="plus_light"
            iconColor={colors.white}
            iconSize={11}
            wrprStyle={styles.buttonStyle}
            backColor={item.iconColor}
            hasElevation={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    padding: moderateScale(10),
    paddingTop: moderateScale(20),
  },
  leftView: {
    flex: 0.78,
    flexDirection: 'row',
    paddingRight: moderateScale(40),
  },
  leftIcon: {
    paddingRight: moderateScale(10),
  },
  addButtonView: {
    flex: 0.22,
    flexDirection: 'row',
  },
  //   separator: {
  //     backgroundColor: colors.bg_pink,
  //     height: moderateScale(0),
  //   },
  buttonStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(25 / 2),
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
  },
  sectionView: {
    backgroundColor: colors.light_pink,
    padding: moderateScale(10),
    alignItems: 'center',
  },
  separator: {
    backgroundColor: colors.pinkish_grey,
    height: moderateScale(1),
    opacity: 0.5,
  },
});

ObstetricsHistory.propTypes = {};

export default ObstetricsHistory;
