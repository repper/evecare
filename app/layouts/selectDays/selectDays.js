import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import Button, {GradientButton} from '../../components/Button';
import DotVertical from '../../components/DotVertical';
import HorizontalScrollPicker from '../../components/HorizontalScrollPicker';

const SelectDays = props => {
  const daysArray = props.daysArray.filter(item => item.value >= 20);
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <View>
          <View style={cs.topNavView}>
            <Button
              onPress={props.navigateToGoBack}
              innerType={1}
              icon="left_arrow"
              iconColor={colors.wecome_txt}
              iconSize={25}
              hasElevation={false}
              outline
              borderWidth={0}
              height={60}
            />
          </View>
          <View style={cs.dotFloatWrpr}>
            <DotVertical />
          </View>
          <View style={cs.largetTxtWrpr}>
            <PoppinsTextMedium color={2} fontSize={30} style={cs.txtLeft}>
              How long is your menstrual cycle?
            </PoppinsTextMedium>
          </View>
        </View>
        <View style={cs.displayFlexCenterVertical}>
          <HorizontalScrollPicker
            items={props.daysArray}
            initialIdx={props.selectedIndex}
            offset={20}
            onSelect={props.setSelectedDay}
          />
          <Icon
            name="cycle_icon"
            color={colors.walk_period_back}
            size={30}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={cs.firstDataBottom}>
          <GradientButton text="Continue" onPress={props.clickOnProceed} />
          <View style={cs.firstDataBottomMsg}>
            <PoppinsTextRegular
              onPress={props.clickOnDontRemember}
              color={26}
              fontSize={14}
              style={cs.firstDataBottomTxtUnderline}>
              I don’t remember
            </PoppinsTextRegular>
            <PoppinsTextRegular color={26} fontSize={12} style={cs.txtCenter}>
              (We will set the menstruation length to 28 days. You can change it
              in settings)
            </PoppinsTextRegular>
          </View>
        </View>
      </ImageBackgroundView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

SelectDays.propTypes = {};

export default SelectDays;
