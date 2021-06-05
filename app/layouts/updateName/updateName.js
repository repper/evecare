import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors, textStyles, globalStyle as gs} from '../../config/styles';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import {scale, verticalScale, moderateScale} from '../../lib/scalingUtils';
import IconTextInput from '../../components/IconTextInput';
import AppModal from '../../components/AppModal';
import ImageBackgroundView from '../../components/ImageBackgroundView';
import DotVertical from '../../components/DotVertical';
import Button, {GradientButton} from '../../components/Button';

const UpdateName = props => {
  const {updateState} = props;
  return (
    <SafeAreaView style={gs.safeArea}>
      <ImageBackgroundView>
        <KeyboardAwareScrollView
          contentContainerStyle={[cs.flexGrow]}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={true}
          behavior="padding"
          extraScrollHeight={moderateScale(20)}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={cs.displayFlex}>
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
                  <DotVertical dots={2} active={1} />
                </View>
                <View style={cs.largetTxtWrpr}>
                  <PoppinsTextMedium color={2} fontSize={30} style={cs.txtLeft}>
                    What is your {'\n'}name?
                  </PoppinsTextMedium>
                </View>
              </View>
              <View style={[cs.paddedView, styles.loginView]}>
                <PoppinsTextMedium color={10} fontSize={20}>
                  First Name
                </PoppinsTextMedium>
                <IconTextInput
                  onChangeText={firstName =>
                    updateState({firstName: firstName})
                  }
                  value={props.firstName}
                  placeholder="e.g. Maria"
                  placeholderColor={28}
                  color={2}
                  fontType={10}
                  autoFocus={true}
                  fontSize={22}
                  blurOnSubmit={false}
                  returnKeyType={'next'}
                  selectTextOnFocus={true}
                  textRef={input => props.setInputRef('firstName', input)}
                  onSubmitEditing={() => props.focusNextField('lastName')}
                />

                <View style={{marginTop: moderateScale(20)}}>
                  <PoppinsTextMedium color={10} fontSize={20}>
                    Last Name
                  </PoppinsTextMedium>
                  <IconTextInput
                    onChangeText={lastName => updateState({lastName: lastName})}
                    value={props.lastName}
                    placeholder="e.g. Joseph"
                    placeholderColor={28}
                    color={2}
                    fontType={10}
                    fontSize={22}
                    blurOnSubmit={true}
                    returnKeyType={'done'}
                    selectTextOnFocus={true}
                    textRef={input => props.setInputRef('lastName', input)}
                  />
                </View>
              </View>
              <View style={cs.firstDataBottom}>
                <GradientButton
                  text="Continue"
                  onPress={props.clickOnUpdateName}
                />
                <View style={cs.firstDataBottomMsg}>
                  <PoppinsTextRegular
                    color={26}
                    fontSize={12}
                    style={cs.txtCenter}>
                    (We will need this to help with your statistics better.)
                  </PoppinsTextRegular>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </ImageBackgroundView>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    marginTop: moderateScale(50),
    marginBottom: moderateScale(100),
  },
});

UpdateName.propTypes = {};

export default UpdateName;
