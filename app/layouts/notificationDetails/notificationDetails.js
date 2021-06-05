import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import TextInput from '../../components/TextInput';
import GradientHeader from '../../components/GradientHeader';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import ToggleButton from '../../components/ToggleButton';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs} from '../../config/styles';
import {
  PoppinsTextMedium,
  PoppinsTextSemiBold,
  PoppinsTextRegular,
} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import DropDownPicker from '../../components/DropDownPicker';
import {TouchableOpacity} from 'react-native-gesture-handler';

const window = Dimensions.get('window');
const {height, width} = window;

const NotificationDetails = props => {
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.white}]}>
      <GradientHeader
        backIcon="left_arrow"
        title={props.currentItem.title}
        onLeftIconClick={() => props.handleBackButtonClick()}
      />
      <BackgroundWaveView
        topViewHeightPercent={40}
        bottomViewHeightPercent={60}>
        <View style={styles.notificationView}>
          <PoppinsTextMedium color={29} fontSize={16}>
            NOTIFICATION
          </PoppinsTextMedium>
          <ToggleButton
            onToggle={isOn => props.clickOnToggle(isOn)}
            isOn={props.isActive}
            //onColor={item.iconColor}
          />
        </View>

        <View>
          {props.isActive ? null : <View style={styles.overlayView} />}
          <View style={styles.detailsView}>
            <Icon
              name="message"
              size={25}
              color={colors.grey_popino}
              style={{marginTop: moderateScale(3)}}
            />
            <View style={styles.detailsSubView}>
              <PoppinsTextSemiBold color={3} fontSize={18}>
                Message
              </PoppinsTextSemiBold>
              <TextInput
                onChangeText={message => props.updateState({message: message})}
                fontType={1}
                fontSize={14}
                fontColor={3}
                //onKeyPress={"Enter"}
                multiline={true}
                style={styles.textInput}
                value={props.message}
              />
            </View>
          </View>
          <View style={styles.detailsView}>
            <Icon
              name="calendar_fill"
              size={25}
              color={colors.grey_popino}
              style={{marginTop: moderateScale(3)}}
            />
            <View style={styles.detailsSubView}>
              <PoppinsTextSemiBold color={3} fontSize={18}>
                Delivery
              </PoppinsTextSemiBold>
              <View style={styles.deliveryView}>
                {props.daysArr.length == 0 ? null : (
                  <DropDownPicker
                    items={props.daysArr}
                    defaultValue={props.selectedDay}
                    containerStyle={styles.dropContainerStyle}
                    style={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      paddingRight: moderateScale(5),
                    }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      paddingLeft: moderateScale(5),
                    }}
                    labelStyle={{color: colors.black}}
                    onChangeItem={item => props.setSelectedDays(item)}
                  />
                )}
                {props.daysArr.length == 0 ? null : (
                  <Icon name="minus" style={styles.minusIcon} />
                )}

                <TouchableOpacity onPress={props.openTimePicker}>
                  <View style={styles.timeView}>
                    <PoppinsTextRegular color={3} fontSize={16}>
                      {moment(props.selectedTime, 'hh:mm A').format('hh:mm A')}
                    </PoppinsTextRegular>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </BackgroundWaveView>
      {props.isTimePickerVisible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'time'}
          is24Hour={false}
          display="spinner"
          onChange={props.getSelectedTime}
          style={{backgroundColor:'white'}}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationView: {
    padding: moderateScale(15),
    paddingLeft: moderateScale(20),
    backgroundColor: colors.light_pink,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsView: {
    flexDirection: 'row',
    padding: moderateScale(15),
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(10),
  },
  detailsSubView: {
    marginLeft: moderateScale(15),
    height: moderateScale(130),
  },
  textInput: {
    borderBottomWidth: moderateScale(1),
    borderColor: colors.black_light1,
    width: width - moderateScale(100),
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropContainerStyle: {
    height: moderateScale(40),
    width: moderateScale(120),
    borderBottomWidth: moderateScale(2),
  },
  minusIcon: {
    paddingHorizontal: moderateScale(20),
    color: colors.grey_popino,
  },
  timeView: {
    borderBottomWidth: moderateScale(2),
    height: moderateScale(40),
    width: moderateScale(80),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  overlayView: {
    height: height,
    width: width,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

NotificationDetails.propTypes = {};

export default NotificationDetails;
