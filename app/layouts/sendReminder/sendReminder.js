import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
} from 'react-native';
import Icon from '../../fonts/eveCareFont';
import images from '../../config/images';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import {PoppinsTextMedium} from '../../components/Text';
import {RedButton, GradientButton} from '../../components/Button';
import {validateEmail, validateMobile} from '../../lib/validators';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import IconTextInput from '../../components/IconTextInput';
const window = Dimensions.get('window');
const {height, width} = window;

const SendReminder = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={[gs.safeArea, {backgroundColor: colors.white}]}>
      <ScrollView>
        <View style={styles.container}>
          <PoppinsTextMedium color={30} fontSize={18}>
            Add Pills
          </PoppinsTextMedium>

          <PoppinsTextMedium
            color={31}
            fontSize={15}
            style={styles.txtPillsName}>
            Pills name
          </PoppinsTextMedium>

          <View style={styles.vitaminView}>
            <PoppinsTextMedium color={30} fontSize={15} style={{flex: 1}}>
              Vitamin C
            </PoppinsTextMedium>
            <Icon name="right_arrow" color={'#1f1f1f'} size={20} />
          </View>

          <PoppinsTextMedium
            color={31}
            fontSize={15}
            style={styles.txtPillsName}>
            Amount
          </PoppinsTextMedium>

          <View style={styles.amountView}>
            <View style={styles.circleView}>
              <PoppinsTextMedium color={1} fontSize={16}>
                -
              </PoppinsTextMedium>
            </View>
            <PoppinsTextMedium color={30} fontSize={18}>
              1 Pills
            </PoppinsTextMedium>

            <View style={styles.circleView}>
              <PoppinsTextMedium color={1} fontSize={16}>
                +
              </PoppinsTextMedium>
            </View>
          </View>

          <PoppinsTextMedium
            color={31}
            fontSize={15}
            style={styles.txtPillsName}>
            Duration
          </PoppinsTextMedium>

          <View style={styles.vitaminView}>
            <PoppinsTextMedium color={30} fontSize={15} style={{flex: 1}}>
              30 Days
            </PoppinsTextMedium>
            <Icon name="right_arrow" color={'#1f1f1f'} size={20} />
          </View>

          <PoppinsTextMedium
            color={31}
            fontSize={15}
            style={styles.txtPillsName}>
            Time
          </PoppinsTextMedium>

          <View style={styles.vitaminView}>
            <PoppinsTextMedium color={30} fontSize={15} style={{flex: 1}}>
              06:30 AM
            </PoppinsTextMedium>
            <Icon name="right_arrow" color={'#1f1f1f'} size={20} />
          </View>
        </View>
        <View style={styles.buttonView}>
          <GradientButton text="Continue" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(30),
    marginTop: moderateScale(10),
  },
  txtPillsName: {
    marginTop: moderateScale(15),
  },
  vitaminView: {
    marginTop: moderateScale(14),
    height: moderateScale(52),
    borderRadius: moderateScale(15),
    backgroundColor: '#f5f5f5',
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountView: {
    marginTop: moderateScale(14),
    height: moderateScale(52),
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleView: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: '#ff2d55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: moderateScale(260),
    alignSelf: 'center',
    marginBottom: moderateScale(50),
  },
});

SendReminder.propTypes = {};

export default SendReminder;
