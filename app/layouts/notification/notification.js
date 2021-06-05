import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Icon from '../../fonts/eveCareFont';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import NotificationPermissionIcon from '../../components/SvgIcon/notificationPermissionIcon';
import {
  PoppinsTextRegular,
  PoppinsTextMedium,
  PoppinsTextLight,
} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import Button from '../../components/Button';

const window = Dimensions.get('window');
const {width, height} = window;

const Notification = props => {
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.white}]}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {props.statusText == 'blocked' ? (
          <View>
            <NotificationPermissionIcon />
            <View style={styles.locationModalView}>
              <PoppinsTextMedium fontSize={16}>
                Want reminders?
              </PoppinsTextMedium>
              <PoppinsTextRegular
                fontSize={12}
                color={1}
                style={{marginTop: moderateScale(0), opacity: 1}}>
                Turn on notifications in your phone settings to get your EveCare
                reminders.
              </PoppinsTextRegular>
              <View style={styles.locationButtonView}>
                <Button
                  backColor={colors.white}
                  text="Go To Settings"
                  textColor={2}
                  onPress={props.clickOnOpenSetting}
                />
              </View>
            </View>
          </View>
        ) : null}

        <View style={styles.container}>
        <View style={{display:"none"}}>
          <View style={styles.sectionView}>
            <PoppinsTextMedium color={3} fontSize={17}>
              Notification Settings
            </PoppinsTextMedium>
          </View>
          <TouchableOpacity onPress={props.clickOnOpenSetting}>
          <View style={[styles.settingView, {marginTop: moderateScale(10)}]}>
            <PoppinsTextMedium color={3} fontSize={16}>
              Sound{" "}
              <PoppinsTextLight
              color={3}
              fontSize={12}
              style={{width: width - moderateScale(70)}}>
              (Normal/Silent)
            </PoppinsTextLight>
            </PoppinsTextMedium>
          </View>
          </TouchableOpacity>
          <View style={[styles.separator]} />
          <TouchableOpacity onPress={props.clickOnOpenSetting}>
          <View style={[styles.settingView, {marginTop: moderateScale(10)}]}>
            <PoppinsTextMedium color={3} fontSize={16}>
              Vibration{" "}
              <PoppinsTextLight
              color={3}
              fontSize={12}
              style={{width: width - moderateScale(70)}}>
              (On/Off)
            </PoppinsTextLight>
            </PoppinsTextMedium>
          </View>
          </TouchableOpacity>
          </View>

          {props.activeArr.length > 0 ? (
            <View>
              <View style={styles.sectionView}>
                <PoppinsTextMedium color={3} fontSize={17}>
                  Active Reminders
                </PoppinsTextMedium>
              </View>
              {props.activeArr.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`active_${index}`}
                    activeOpacity={0.5}
                    onPress={() => props.navigateToNoticationDetails(item)}>
                    <View>
                      <View style={styles.rowView}>
                        <View>
                          <PoppinsTextMedium color={3} fontSize={16}>
                            {item.title}
                          </PoppinsTextMedium>
                          <PoppinsTextLight
                            color={3}
                            fontSize={12}
                            style={{width: width - moderateScale(70)}}>
                            {item.message}
                          </PoppinsTextLight>
                        </View>

                        <Icon
                          name="right_arrow"
                          size={20}
                          color={
                            item.isActive ? '#ff598e' : colors.grey_border_color
                          }
                        />
                      </View>
                      <View style={[styles.separator]} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
          {props.inactiveArr.length > 0 ? (
            <View>
              <View style={[styles.sectionView,{opacity:0.4}]}>
                <PoppinsTextMedium color={3} fontSize={17}>
                  Inactive Reminders
                </PoppinsTextMedium>
              </View>
              {props.inactiveArr.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`inactive_${index}`}
                    activeOpacity={0.5}
                    onPress={() => props.navigateToNoticationDetails(item)}>
                    <View>
                      <View style={styles.rowView}>
                        <View>
                          <PoppinsTextMedium color={3} fontSize={16} style={{opacity:0.4}}>
                            {item.title}
                          </PoppinsTextMedium>
                          <PoppinsTextLight
                            color={3}
                            fontSize={12}
                            style={{width: width - moderateScale(70), opacity:0.4}}>
                            {item.message}
                          </PoppinsTextLight>
                        </View>

                        <Icon
                          name="right_arrow"
                          size={20}
                          color={colors.grey_border_color}
                        />
                      </View>
                      <View style={[styles.separator]} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionView: {
    backgroundColor: colors.light_pink,
    padding: moderateScale(10),
    alignItems: 'center',
  },
  settingView: {
    //backgroundColor: colors.light_pink,
    padding: moderateScale(10),
  },
  rowView: {
    flexDirection: 'row',
    padding: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    backgroundColor: colors.pinkish_grey,
    height: moderateScale(1),
    opacity: 0.5,
  },
  locationModalView: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  locationButtonView: {
    marginTop: moderateScale(10),
    width: moderateScale(210),
  },
});

Notification.propTypes = {};

export default Notification;
