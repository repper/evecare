import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Dimensions, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import GradientHeader from '../../components/GradientHeader';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextRegular, PoppinsTextSemiBold} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import BottomButtons from '../../components/BottomButtons';
import ScrollCountPicker from '../../components/ScrollCountPicker';
import moment from 'moment';
import DateTimePickerModal from '../../components/DateTimePickerModal';

const window = Dimensions.get('window');
const {height, width} = window;

const Weight = props => {
  const leftArr = props.isInKg ? props.kgArr : props.lbsArr;
  const leftSelIdx = props.isInKg ? props.kgIdx : props.lbsIndex;
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Weight"
          rightIcon="edit"
          onRightIconClick={() => props.navigation.navigate('WeightFilter')}
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <TouchableWithoutFeedback
          onPress={Platform.OS === 'ios' ? props.openModalReq : props.clickOnDatePicker}
        >
          <View style={cs.dateView}>
            <View style={cs.dateSubView}>
              <Icon name="calendar_fill" size={25} color={'#dbb6ca'} />
              <View>
                <PoppinsTextMedium
                  color={29}
                  fontSize={15}
                  style={{
                    marginLeft: moderateScale(10),
                    height: moderateScale(20),
                  }}
                >
                  {moment(props.date).format('DD MMM YYYY')}
                </PoppinsTextMedium>
                <PoppinsTextRegular
                  color={'#dbb6ca'}
                  fontSize={12}
                  style={{
                    marginLeft: moderateScale(10),
                  }}
                >
                  Change Date
                </PoppinsTextRegular>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={[cs.displayFlex, cs.flexGrow]}>
          <View style={[cs.displayFlex]}>
            <View style={styles.verticleView}>
              <View
                style={{
                  height: moderateScale(280),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
                <PoppinsTextSemiBold
                  color={2}
                  fontSize={20}
                  style={{
                    position: 'absolute',
                    right: -10,
                    alignSelf: 'center',
                  }}
                >
                  {props.units.weight.toUpperCase()}
                </PoppinsTextSemiBold>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flex: 0.55,
                  }}
                >
                  <ScrollCountPicker
                    dataSource={leftArr}
                    selectedIndex={leftSelIdx}
                    onValueChange={(data, selectedIndex) => props.setWeightSelection(data, selectedIndex)}
                    wrapperHeight={280}
                    wrapperWidth={moderateScale(50)}
                    wrapperBackground={'transparent'}
                    itemHeight={60}
                    highlightColor={colors.bg_pink}
                    highlightBorderWidth={1}
                    key={leftSelIdx}
                  />
                  <PoppinsTextSemiBold color={2}>.</PoppinsTextSemiBold>
                  <ScrollCountPicker
                    dataSource={props.decimalArr}
                    selectedIndex={props.decimalIndex}
                    onValueChange={(data, selectedIndex) => props.setDecimalSelection(data, selectedIndex)}
                    wrapperHeight={280}
                    wrapperWidth={10}
                    wrapperBackground={'transparent'}
                    itemHeight={60}
                    highlightColor={colors.bg_pink}
                    highlightBorderWidth={1}
                    key={props.decimalIndex}
                  />
                </View>
              </View>
            </View>
          </View>
          <BottomButtons
            showButton={props.showButton}
            onDelete={props.onDelete}
            onSave={props.onSaveOrUpdate}
            // date={props.date}
          />
        </View>
      </BackgroundWaveView>
      {props.isDatePickerVisible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(props.date)}
          mode={'date'}
          is24Hour={false}
          display="spinner"
          maximumDate={new Date()}
          onChange={props.getSelectedDate}
        />
      ) : null}
      <DateTimePickerModal
        isOpen={props.isOpen}
        closeModalReq={props.closeModalReq}
        date={props.date}
        getDateFromPicker={props.getDateFromPicker}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  verticleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(100),
  },
});

Weight.propTypes = {};

export default Weight;
