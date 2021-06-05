import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles, { lessPer, titleFontSize } from "./styles";
import { colors, globalStyle as gs } from "../../config/styles";
import Icon from "../../fonts/eveCareFont";
import { PoppinsTextMedium, PoppinsTextLight } from "../../components/Text";
import { scale, verticalScale, moderateScale } from "../../lib/scalingUtils";

import Modal from "react-native-modal";

class CameraModal extends Component {
  static defaultProps = {
    backdropOpacity: 0.8,
    title: "Click or Select!"
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.isOpen
    };
  }

  // Handle isOpen changes to either open or close popup
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.isOpen });    
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    let activeOpacity = 0.7;
    return (
      <Modal
        isVisible={this.state.visible}
        backdropOpacity={this.props.backdropOpacity}
        onBackButtonPress={this.hideModal.bind(this)}
        onBackdropPress={this.hideModal.bind(this)}
        animationIn="fadeIn"
        animationInTiming={300}
        animationOut="fadeOut"
        useNativeDriver={true}
        animationOutTiming={300}
      >
        <View style={styles.overlayWrpr}>
          {this.getTitleView()}
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={this.props.onCameraPress}
          >
            <View style={styles.cameraOptionView}>
              <Icon name="camera" color={colors.purpley_grey} size={scale(20)} />
              <PoppinsTextMedium color={3} style={styles.optionText}>Camera</PoppinsTextMedium>
              <PoppinsTextLight color={3}>Take a Selfie</PoppinsTextLight>
            </View>
            <View style={styles.dividerView} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={this.props.onGalleryPress}
          >
            <View style={styles.cameraOptionView}>
              <Icon name="gallery" color={colors.purpley_grey} size={scale(20)} />
              <PoppinsTextMedium color={3} style={styles.optionText}>Gallery</PoppinsTextMedium>
              <PoppinsTextLight color={3}>Choose an existing photo</PoppinsTextLight>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  getTitleView() {
    if (this.props.titleView && typeof this.props.titleView == "function") {
      return this.props.titleView();
    }
    if (
      this.props.title &&
      typeof this.props.title == "string" &&
      this.props.title.length > 0
    ) {
      return (
        <View style={styles.modalTitleView}>
          <PoppinsTextMedium color={2} fontSize={titleFontSize}>
            {this.props.title}
          </PoppinsTextMedium>
          <View style={styles.dividerView} />
        </View>
      );
    }
    return null;
  }
}
export default CameraModal;
