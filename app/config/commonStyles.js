import {StyleSheet} from 'react-native';
import {colors, globalStyle as gs, sizes} from './styles';
import {scale, verticalScale, moderateScale} from '../lib/scalingUtils';

export default StyleSheet.create({
  headerStyle: {
    shadowColor: 'rgba(255,46,86,0.24)',
    backgroundColor: colors.white,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 0},
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 46, 86, 0.2)',
  },
  txtCenter: {
    textAlign: 'center',
  },
  txtLeft: {
    textAlign: 'left',
  },
  displayFlex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  displayFlexCenterVertical: {
    flex: 1,
    justifyContent: 'center',
  },
  flexAlignCenter: {
    alignItems: 'center',
  },
  topNavView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotFloatWrpr: {
    position: 'absolute',
    right: moderateScale(20),
    top: moderateScale(40),
  },
  firstDataBottom: {
    paddingLeft: moderateScale(50),
    paddingRight: moderateScale(50),
  },
  firstDataBottomMsg: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    alignItems: 'center',
  },
  firstDataBottomTxtUnderline: {
    textDecorationLine: 'underline',
    letterSpacing: 0.14,
    opacity: 0.7,
  },
  flexRow: {
    flexDirection: 'row',
  },
  twoButtonMargin: {
    marginRight: moderateScale(10),
  },
  largetTxtWrpr: {
    //Css for big text view parent used in start
    paddingLeft: moderateScale(30),
    paddingRight: moderateScale(30),
    marginTop: scale(20),
  },
  paddedView: {
    paddingLeft: moderateScale(30),
    paddingRight: moderateScale(30),
  },
  noDataView:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: colors.white
},
dateView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      padding: moderateScale(15),
      paddingVertical: moderateScale(10),
      backgroundColor: colors.light_pink,
},
dateSubView:{
      flexDirection:'row',
}
});
