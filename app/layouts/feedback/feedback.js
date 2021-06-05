import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';
import {ShadowFlex} from 'react-native-neomorph-shadows';
import {colors, globalStyle as gs} from '../../config/styles';
import {PoppinsTextMedium, PoppinsTextRegular} from '../../components/Text';
import cs from '../../config/commonStyles';
import Button, {GradientButton} from '../../components/Button';
import GradientHeader from '../../components/GradientHeader';
import {moderateScale} from '../../lib/scalingUtils';
import TextInput from '../../components/TextInput';
import AppModal from '../../components/AppModal';
import RoundedShapeSwitchButtonIcon from '../../components/SvgIcon/roundedShapeSwitchButtonIcon';

const window = Dimensions.get('window');
const {height, width} = window;

const Feedback = props => {
  const {updateState} = props;

  return (
    <SafeAreaView style={gs.safeArea}>
      <GradientHeader
        backIcon="left_arrow"
        title="Feedback"
        onLeftIconClick={() => props.navigation.goBack()}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[cs.flexGrow]}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        behavior="padding"
        extraScrollHeight={moderateScale(20)}
      >
        <View style={styles.container}>
          <ShadowFlex style={styles.shadowView}>
            <PoppinsTextMedium color={25} fontSize={22}>
              How do you rate this app ?
            </PoppinsTextMedium>
            <View style={styles.feedBackRowArr}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={props.starCount}
                emptyStar={'md-star'}
                fullStar={'md-star'}
                halfStar={'md-star-half'}
                iconSet={'Ionicons'}
                starSize={50}
                starStyle={{padding: moderateScale(10), marginTop: 10}}
                selectedStar={rating => props.clickOnRatings(rating)}
                fullStarColor={'#ffc700'}
                emptyStarColor={'#dad9e2'}
              />
            </View>
            <PoppinsTextRegular color={26} fontSize={14} style={{marginTop: moderateScale(30)}}>
              Your opinion is important for us. Your feedback would help us server you better
            </PoppinsTextRegular>
          </ShadowFlex>

          {props.isFormShown ? _getBelowForm(props) : null}
        </View>
      </KeyboardAwareScrollView>
      <AppModal listenerKey={props.listenerKey} />
    </SafeAreaView>
  );
};

const _getBelowForm = props => {
  let placeholder = 'Write your suggestion here';
  if (props.keyValue === 'feedback') {
    placeholder = 'Write your feedback here';
  } else if (props.keyValue === 'others') {
    placeholder = 'Write your other feedback here';
  }
  return (
    <View style={styles.sugetionView}>
      <View style={styles.titleRowView}>
        {props.titlesArr.map((item, index) => {
          return (
            <TouchableOpacity
              key={`rating_title_${index}`}
              style={styles.rowSubView}
              activeOpacity={1}
              onPress={() => props.clickOnTitles(item)}
            >
              <View style={styles.rowSubView}>
                <View
                  style={[
                    styles.tabOptionView,
                    {
                      backgroundColor: props.keyValue == item.key ? colors.bg_pink : 'transparent',
                    },
                  ]}
                >
                  <PoppinsTextRegular fontSize={12} color={26}>
                    {item.title}
                  </PoppinsTextRegular>
                </View>
                <RoundedShapeSwitchButtonIcon
                  color={props.keyValue == item.key ? colors.bg_pink : 'transparent'}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.textInputView}>
        <TextInput
          onChangeText={txtFeedback => updateState({txtFeedback: txtFeedback})}
          placeholder={placeholder}
          placeholderColor={28}
          fontColor={3}
          fontType={1}
          fontSize={14}
          autoFocus={true}
          multiline={true}
          style={styles.textInput}
          defaultValue={props.txtFeedback}
        />
      </View>
      <View style={styles.userDetailsView}>
        <View style={styles.nameView}>
          <TextInput
            onChangeText={txtEmail => updateState({txtEmail: txtEmail})}
            placeholder={'Your Email Id i.e. name@xyz.com'}
            placeholderColor={28}
            fontColor={3}
            fontType={1}
            fontSize={14}
            defaultValue={props.txtEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.nameView}>
          <TextInput
            onChangeText={txtNumber => updateState({txtNumber: txtNumber})}
            placeholder={'Your Mobile Number i.e. +9198********'}
            placeholderColor={28}
            fontColor={3}
            fontType={1}
            fontSize={14}
            keyboardType="numeric"
            defaultValue={`${props.txtNumber}`}
            maxLength={10}
          />
        </View>
      </View>
      <View style={styles.buttonView}>
        <GradientButton
          textColor={1}
          text={`Send`}
          width={moderateScale(217)}
          onPress={props.clickOnSendBtn}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(15),
  },
  shadowView: {
    width: width - moderateScale(30),
    borderRadius: moderateScale(9),
    backgroundColor: colors.white,
    shadowOpacity: 5,
    shadowRadius: 10,
    shadowColor: '#e8c5d8',
    shadowOffset: {width: 0, height: 0},
    padding: moderateScale(20),
    alignItems: 'center',
  },
  feedBackRowArr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startView: {
    margin: moderateScale(8),
    marginTop: moderateScale(30),
  },
  sugetionView: {
    marginTop: moderateScale(40),
    width: width - moderateScale(30),
    borderRadius: 12,
    backgroundColor: '#fceff6',
    paddingTop: moderateScale(4),
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(30),
  },
  titleRowView: {
    flexDirection: 'row',
  },
  rowSubView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabOptionView: {
    backgroundColor: '#e8c5d8',
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    height: moderateScale(47),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: moderateScale(-2),
  },
  textInputView: {
    height: moderateScale(158),
    borderRadius: moderateScale(12),
    backgroundColor: colors.white,
    marginTop: moderateScale(20),
    padding: moderateScale(15),
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#e8c5d8',
    textAlignVertical: 'top',
  },
  buttonView: {
    marginTop: moderateScale(15),
    alignItems: 'center',
  },
  nameView: {
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginTop: moderateScale(14),
    paddingLeft: moderateScale(14),
  },
});

Feedback.propTypes = {};

export default Feedback;
