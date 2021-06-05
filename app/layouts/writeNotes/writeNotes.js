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
import {PoppinsTextMedium} from '../../components/Text';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import GradientHeader from '../../components/GradientHeader';
import {moderateScale} from '../../lib/scalingUtils';
import BottomButtons from '../../components/BottomButtons';
import TextInput from '../../components/TextInput';

const WriteNotes = props => {
  const {updateState} = props;

  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Add Notes"
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={[cs.flexGrow]}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={true}
          extraScrollHeight={moderateScale(20)}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={cs.displayFlex}>
              <View style={[cs.displayFlex, styles.topView]}>
                <View style={styles.inputWrpr}>
                  <PoppinsTextMedium
                    color={3}
                    fontSize={15}>{`Write Notes`}</PoppinsTextMedium>
                  <TextInput
                    onChangeText={inputVal => updateState({notes: inputVal})}
                    placeholder={'Anything you wish to add notes for'}
                    placeholderColor={28}
                    fontColor={3}
                    fontType={1}
                    fontSize={16}
                    autoFocus={true}
                    multiline={true}
                    defaultValue={props.notes}
                  />
                </View>
              </View>

              <BottomButtons
                showButton={props.showButton}
                onDelete={props.onDelete}
                onSave={props.clickOnSaveNotes}
                date={props.date}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </BackgroundWaveView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {},
  inputWrpr: {
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    marginTop: moderateScale(15),
    borderBottomWidth: moderateScale(1),
    borderColor: colors.pinkish_grey,
  },
});

WriteNotes.propTypes = {};

export default WriteNotes;
