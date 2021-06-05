import React from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions, TouchableWithoutFeedback, Platform} from 'react-native';
import moment from "moment";
import Icon from '../../fonts/eveCareFont';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientHeader from '../../components/GradientHeader';
import {colors, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import ScrollCountPicker from '../../components/ScrollCountPicker';
import BottomButtons from '../../components/BottomButtons';
import DateTimePickerModal from '../../components/DateTimePickerModal';

const window = Dimensions.get('window');
const {height, width} = window;

const BpScreen = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Blood Pressure"
          showUnitText={true}
          unitText="mmHg"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <TouchableWithoutFeedback onPress={
            Platform.OS == 'ios' ? props.openModalReq : props.clickOnDatePicker
          }>
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
                  }}>
                  {moment(props.date).format('DD MMM YYYY')}
                </PoppinsTextMedium>
                <PoppinsTextRegular
                  color={'#dbb6ca'}
                  fontSize={12}
                  style={{
                    marginLeft: moderateScale(10),
                  }}>
                  Change Date
                </PoppinsTextRegular>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={cs.displayFlex}>
          <View style={cs.displayFlex}>
            <View style={styles.rowView}>
              <View style={styles.verticleView}>
                <PoppinsTextRegular
                  color={2}
                  fontSize={14}
                  style={cs.txtCenter}>
                  Systolic
                </PoppinsTextRegular>

                <View
                  style={{
                    height: moderateScale(300),
                  }}>
                  <ScrollCountPicker
                    dataSource={props.bpArray}
                    selectedIndex={props.lowBpIndex} //1259
                    onValueChange={(data, selectedIndex) =>
                      props.setSelectedLowBp(data, selectedIndex)
                    }
                    wrapperHeight={300}
                    wrapperWidth={width / 2}
                    wrapperBackground={'transparent'}
                    itemHeight={60}
                    highlightColor={colors.bg_pink}
                    highlightBorderWidth={1}
                    key={props.lowBpIndex}
                  />
                </View>
              </View>

              <View style={styles.verticleView}>
                <PoppinsTextRegular
                  color={2}
                  fontSize={14}
                  style={cs.txtCenter}>
                  Diastolic
                </PoppinsTextRegular>

                <View
                  style={{
                    height: moderateScale(300),
                    //marginTop: moderateScale(80),
                  }}>
                  <ScrollCountPicker
                    dataSource={props.highBpArr}
                    selectedIndex={props.highBpIndex} //1259
                    onValueChange={(data, selectedIndex) =>
                      props.setSelectedHighBp(data, selectedIndex)
                    }
                    //wrapperHeight={280}
                    wrapperHeight={300}
                    wrapperWidth={width / 2}
                    wrapperBackground={'transparent'}
                    itemHeight={60}
                    highlightColor={colors.bg_pink}
                    highlightBorderWidth={1}
                    key={props.highBpIndex}
                  />
                </View>
              </View>
            </View>
          </View>
          <BottomButtons
            showButton={props.showButton}
            onDelete={props.onDelete}
            onSave={props.onSaveOrUpdate}
            //date={props.date}
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
          onChange={props.getSelectedDate}
          maximumDate={new Date()}
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
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  verticleView: {
    flex: 1,
  },
  txtDate: {
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: moderateScale(5),
  },
});

BpScreen.propTypes = {};

export default BpScreen;
