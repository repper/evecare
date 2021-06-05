import React from "react";
import {View, ScrollView, StyleSheet, SafeAreaView, Dimensions} from "react-native";
import {Shadow} from "react-native-neomorph-shadows";
import Icon from "../../fonts/eveCareFont";
import GradientHeader from "../../components/GradientHeader";
import {colors, globalStyle as gs} from "../../config/styles";
import {PoppinsTextRegular, PoppinsTextMedium} from "../../components/Text";
import HorizontalScrollPicker from "../../components/HorizontalScrollPicker";
import InfoModal from "../../components/InfoModal";
import {moderateScale} from "../../lib/scalingUtils";
const window = Dimensions.get("window");
const {height, width} = window;

const innerPadding = moderateScale(0);
const cardPadding = moderateScale(15);

const PeriodLength = props => {
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.light_pink}]}>
      <GradientHeader
        backIcon="left_arrow"
        title="Cycle & Ovulation"
        rightIcon="circle_i"
        onRightIconClick={props.showHideInfoModal}
        onLeftIconClick={() => props.navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Shadow style={{...styles.card, height: moderateScale(280)}}>
          {getCardTitleView("Period Length", "Usually lasts between 3-8 days.")}
          <View>
            <HorizontalScrollPicker
              items={props.periodDaysArray}
              initialIdx={props.selectedPeriodIndex}
              onSelect={props.setPeriodLength}
            />
            <Icon
              name="period_icon"
              color={colors.walk_period_back}
              size={30}
              style={{alignSelf: "center"}}
            />
          </View>
        </Shadow>

        <Shadow style={{...styles.card, height: moderateScale(280)}}>
          {getCardTitleView("Cycle Length", "Usually between 26-30 days.")}
          <View>
            <HorizontalScrollPicker
              items={props.daysArray}
              initialIdx={props.selectedIndex}
              onSelect={props.setCycleLength}
              offset={20}
            />
            <Icon name="cycle_icon" color={colors.walk_period_back} size={30} style={{alignSelf: "center"}} />
          </View>
        </Shadow>
      </ScrollView>
      <InfoModal
        onBackdropPress={props.showHideInfoModal}
        visible={props.infoModalState}
        contentKey={props.contentKey}
      />
    </SafeAreaView>
  );
};

const getCardTitleView = (title, subTitle) => {
  return (
    <View style={styles.titleRow}>
      <PoppinsTextRegular color={10} fontSize={20}>{`${title}`}</PoppinsTextRegular>
      <PoppinsTextMedium color={23} fontSize={15}>{`${subTitle}`}</PoppinsTextMedium>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  titleRow: {
    marginBottom: moderateScale(30),
    paddingLeft: cardPadding,
  },
  card: {
    width: width - 2 * innerPadding,
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    backgroundColor: colors.white,
    paddingTop: moderateScale(20),
    // paddingLeft: cardPadding,
    // paddingRight: cardPadding,
    marginBottom: moderateScale(30),
  },
});

PeriodLength.propTypes = {};

export default PeriodLength;
