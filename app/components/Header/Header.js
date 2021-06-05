import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'react-native-elevated-view';
import Icon from '../../fonts/eveCareFont';
import {colors, globalStyle as gs, sizes} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';
import {PoppinsTextRegular, PoppinsTextMedium} from '../../components/Text';

const Header = props => {
  return (
    <SafeAreaView style={{backgroundColor: colors.red}}>
      <ElevatedView elevation={1}>
        <LinearGradient
          start={{x: 0.0, y: 0.5}}
          end={{x: 1, y: 1.5}}
          colors={[colors.gradient1, colors.gradient2]}
          style={styles.gradientView}>
          <View style={styles.headerWrpr}>
            {getBackButtonView(props)}
            {getTitleView(props)}
            {getRightIcon(props)}
            {getButtonView(props)}
          </View>
        </LinearGradient>
      </ElevatedView>
    </SafeAreaView>
  );
};

const getBackButtonView = props => {
  if (!props.hideBack && !props.iconTitle) {
    return (
      <TouchableWithoutFeedback onPress={props.onLeftIconClick}>
        <View style={styles.backIconWrpr}>
          <Icon
            name={props.backIcon}
            color={colors.white}
            size={props.backIconSize}
            style={{alignSelf: 'center'}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
};

const getIconTitle = props => {
  return (
    <View style={[styles.specialView]}>
      <View style={[styles.rowView, {alignItems: 'center'}]}>
        <Icon
          name={props.iconTitle.icon ? props.iconTitle.icon : 'left_arrow_tail'}
          color={colors.white}
          size={
            props.iconTitle.iconSize
              ? props.iconTitle.iconSize
              : moderateScale(35)
          }
        />
        <View style={styles.slashView} />
        <PoppinsTextRegular fontSize={14}>
          {props.iconTitle.title}
        </PoppinsTextRegular>
      </View>
    </View>
  );
};

const getTitleView = props => {
  if (props.iconTitle) {
    return getIconTitle(props);
  }
  let titleViewStyle = [];
  if (props.subTitle.length == 0) {
    titleViewStyle = [styles.titleWrpr];
  } else {
    titleViewStyle = [styles.titleWrprLeft];
  }
  if (props.title.length == 0 && props.subTitle.length == 0) {
    return null;
  }
  if (props.subTitle.length == 0) {
    return (
      <View style={[titleViewStyle]}>
        <PoppinsTextMedium
          fontSize={16}
          numberOfLines={1}
          color={1}
          //style={styles.txtTitle}
        >
          {props.title}
        </PoppinsTextMedium>
      </View>
    );
  } else {
    return (
      <View style={titleViewStyle}>
        <PoppinsTextMedium
          fontSize={14}
          numberOfLines={1}
          color={1}
          //style={styles.txtTitle}
        >
          {props.title}
        </PoppinsTextMedium>
        <PoppinsTextRegular fontSize={14} color={1} style={{opacity: 0.7}}>
          {props.subTitle}
        </PoppinsTextRegular>
      </View>
    );
  }
};

const getButtonView = props => {
  if (props.button || props.iconButton) {
    let buttonViewWrprStyle = [styles.buttonViewWrpr];
    if (props.button) {
      return (
        <TouchableWithoutFeedback onPress={props.button.onPress}>
          <View style={buttonViewWrprStyle}>
            <View style={styles.plainButtonWrpr}>
              <PoppinsTextRegular fontSize={16}>
                {props.button.title}
              </PoppinsTextRegular>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={props.iconButton.onPress}>
          <View style={buttonViewWrprStyle}>
            <View style={styles.iconButtonWrpr}>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <Icon
                  name={
                    props.iconButton.icon ? props.iconButton.icon : 'filter'
                  }
                  color={colors.white}
                  size={
                    props.iconButton.iconSize
                      ? props.iconButton.iconSize
                      : moderateScale(15)
                  }
                />
                <PoppinsTextRegular
                  fontSize={16}
                  style={{marginLeft: moderateScale(7)}}>
                  {props.iconButton.title}
                </PoppinsTextRegular>
              </View>
              {props.filterApplied ? (
                <View style={styles.indicatorView} />
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  return null;
};

const getRightIcon = props => {
  if (props.rightIcon.length > 0 || props.hasRightIcon) {
    let rightIconWrprStyle = [styles.rightIconWrpr];
    return (
      <TouchableWithoutFeedback
        onPress={props.onRightIconClick}
        //activeOpacity={0.8}
      >
        <View style={rightIconWrprStyle}>
          <Icon
            name={props.rightIcon ? props.rightIcon : 'share'}
            color={colors.white}
            size={props.rightIconSize}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  gradientView: {
    height: sizes.headerHeight,
  },
  txtTitle: {
    // width: width - moderateScale(50),
    // textAlign:'center'
  },
  headerWrpr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrpr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrprLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: moderateScale(50),
  },
  backIconWrpr: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    padding: moderateScale(5),
  },
  rightIconWrpr: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    padding: moderateScale(5),
  },
  buttonViewWrpr: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    //padding: moderateScale(5)
  },

  rowView: {
    flexDirection: 'row',
  },

  specialView: {
    paddingLeft: leftRightPadding,
    height: sizes.headerHeight,
    justifyContent: 'center',
  },
  slashView: {
    width: moderateScale(1),
    height: moderateScale(25),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(10),
    backgroundColor: colors.cherry_nine,
    transform: [{rotate: '10deg'}],
  },

  plainButtonWrpr: {
    height: moderateScale(35),
    width: moderateScale(105),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: moderateScale(35) / 2,
  },
  iconButtonWrpr: {
    flexDirection: 'row',
    height: moderateScale(35),
    width: moderateScale(105),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: moderateScale(35) / 2,
  },
  indicatorView: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderRadius: moderateScale(8 / 2),
    backgroundColor: colors.butterscotch_two,
    position: 'absolute',
    right: 12,
    top: 6,
  },
});

Header.propTypes = {};

Header.defaultProps = {
  onLeftIconClick: () => {},
  hideBack: false,
  backIcon: 'left_arrow_tail',
  backIconSize: moderateScale(18),
  title: '',
  subTitle: '',
  hasRightIcon: false,
  rightIcon: '',
  rightIconSize: moderateScale(18),
  onRightIconClick: () => {},
  button: null,
  iconButton: null,
};

export default Header;
