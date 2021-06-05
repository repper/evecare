import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fontSize, generalStyle } from "../../config/styles";
import { scale, verticalScale, moderateScale } from "../../lib/scalingUtils";

const window = Dimensions.get("window");

const {width, height} = window;
const deviceWidthRef = 375;
const dividerHeight = 1;
let itemHeight = 64;
let titleFontSize = 18;
let itemFontSize = 16;
let leftPadding = 21;
const borderRadius = 3;
let lessPer = 1;

if(width < deviceWidthRef){
  lessPer = width/deviceWidthRef;
  itemHeight = lessPer * itemHeight;
  titleFontSize = lessPer * titleFontSize;
  itemFontSize = lessPer * itemFontSize;
  leftPadding = lessPer * leftPadding;
}
export { dividerHeight, itemHeight, borderRadius, lessPer, titleFontSize };

export default StyleSheet.create({
  modalTitleView: {
    alignItems: "center",
    justifyContent: "center",
    height: itemHeight,
    borderBottomWidth: dividerHeight,
    borderColor: colors.grey,
    opacity: 0.5
  },
  modalTitleText: {
    fontFamily: "Roboto-Medium",
    color: colors.coral_pink,
    fontSize: titleFontSize
  },
  dividerView: {
    height: dividerHeight,
    backgroundColor: colors.grey,
    opacity: 0.2
  },
  overlayWrpr: {
    backgroundColor: colors.white,
    borderRadius: borderRadius
  },
  cameraOptionView: {
    paddingLeft: scale(15),
    paddingRight: scale(15),
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionText: {
    marginLeft: scale(5),
    marginRight: scale(10),
  }
});
