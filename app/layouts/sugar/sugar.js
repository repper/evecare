import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors, globalStyle as gs} from '../../config/styles';
import GradientHeader from '../../components/GradientHeader';
import cs from '../../config/commonStyles';
import Icon from '../../fonts/eveCareFont';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import ScrollCountPicker from '../../components/ScrollCountPicker';
import BottomButtons from '../../components/BottomButtons';
import DateTimePickerModal from '../../components/DateTimePickerModal';

const window = Dimensions.get('window');
const {height, width} = window;

const Sugar = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Sugar"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <TouchableWithoutFeedback
          onPress={
            Platform.OS === 'ios' ? props.openModalReq : props.clickOnDatePicker
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
            <View style={styles.verticleView}>
              <View style={{height: moderateScale(300)}}>
                <PoppinsTextMedium
                  color={34}
                  fontSize={26}
                  style={{
                    position: 'absolute',
                    right: moderateScale(60),
                    top: moderateScale(112),
                    alignSelf: 'center',
                    zIndex: 1,
                  }}>
                  mg/dL
                </PoppinsTextMedium>
                <ScrollCountPicker
                  dataSource={props.sugarArray}
                  selectedIndex={props.sugarIndex}
                  onValueChange={(data, selectedIndex) =>
                    props.setSelectedSugar(data, selectedIndex)
                  }
                  wrapperHeight={280}
                  wrapperWidth={width}
                  wrapperBackground={'transparent'}
                  itemHeight={60}
                  highlightColor={colors.bg_pink}
                  highlightBorderWidth={1}
                  key={props.sugarIndex}
                />
              </View>
            </View>
          </View>
        </View>
        <BottomButtons
          showButton={props.showButton}
          onDelete={props.onSugarDelete}
          onSave={props.onSaveOrUpdate}
          //date={props.date}
        />
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
  container: {
    flex: 1,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  verticleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(100),
  },
  txtDate: {
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: moderateScale(5),
  },
});

Sugar.propTypes = {};

export default Sugar;
