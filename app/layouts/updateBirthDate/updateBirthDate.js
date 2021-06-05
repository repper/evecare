import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import AppModal from '../../components/AppModal';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import DotVertical from '../../components/DotVertical';
import Button, {GradientButton} from '../../components/Button';

const UpdateBirthDate = props => {
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
            <DotVertical dots={2} />
          </View>
          <View style={cs.largetTxtWrpr}>
            <PoppinsTextMedium color={2} fontSize={30} style={cs.txtLeft}>
              What is your birth date?
            </PoppinsTextMedium>
          </View>
        </View>
        <View style={[cs.displayFlexCenterVertical, cs.flexAlignCenter]}>
          <DatePicker
            date={props.nowDate}
            mode="date"
            maximumDate={props.maxBirthDate}
            fadeToColor="transparent"
            onDateChange={date => props.getSelectedDate(date)}
            textColor={colors.wecome_txt}
          />
        </View>
        <View style={cs.firstDataBottom}>
          <GradientButton
            text="Continue"
            onPress={props.clickOnUpdateBirthDate}
          />
          <View style={cs.firstDataBottomMsg}>
            <PoppinsTextRegular color={26} fontSize={12} style={cs.txtCenter}>
              (We will need this to help with your statistics better.)
            </PoppinsTextRegular>
          </View>
        </View>
      </ImageBackgroundView>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default UpdateBirthDate;
