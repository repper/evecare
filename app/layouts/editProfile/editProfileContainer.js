import React from 'react';
import {Keyboard, Platform} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import EditProfile from './editProfile';
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';
import ImagePicker from 'react-native-image-crop-picker';

class EditProfileContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'editProfile',
      first_name: props.user.first_name ? props.user.first_name : '',
      last_name: props.user.last_name ? props.user.last_name : '',
      email: props.user.email ? props.user.email : '',
      mobile: props.user.mobile ? props.user.mobile : '',
      isEmailLocked:
        props.user &&
        props.user.logged_in_by &&
        ['Google', 'Facebook', 'Email'].indexOf(props.user.logged_in_by) >= 0,
      isMobileLocked:
        props.user &&
        props.user.logged_in_by &&
        ['Mobile No.'].indexOf(props.user.logged_in_by) >= 0,
      imageUrl: '',
      imageData: '',
      cameraModalVisible: false,
      showModalView: false,
    };

    this.inputs = {
      first_name: React.createRef(),
      last_name: React.createRef(),
      email: React.createRef(),
      mobile: React.createRef(),
    };
    this.camera = null;
  }

  componentWillUnmount() {}

  componentDidMount() {}

  static getDerivedStateFromProps = (props, state) => {
    try {
    } catch (error) {}
    return null;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let that = this;
    try {
      if (prevProps.screen.showLoading !== that.props.screen.showLoading) {
        if (that.props.screen.showLoading) {
          //Means we have loading
          modalHandler.showModal(that.state.listenerKey, {
            type: 'loading',
            modal: {
              isDismissable: false,
            },
          });
        } else {
          modalHandler.hideModal(that.state.listenerKey);
          if (that.props.screen.hasError) {
            modalHandler.showModal(that.state.listenerKey, {
              type: 'alert',
              modal: {
                isDismissable: true,
              },
              alert: {
                title: 'Oops!',
                message: that.props.screen.error,
                buttons: [
                  {
                    title: 'Ok',
                  },
                ],
              },
            });
          } else {
            that.navigateToGoBack();
          }
        }
      } else if (
        prevProps.updateProfilePictureScreen.showLoading !==
        that.props.updateProfilePictureScreen.showLoading
      ) {
        if (that.props.updateProfilePictureScreen.showLoading) {
          //Means we have loading
          modalHandler.showModal(that.state.listenerKey, {
            type: 'loading',
            modal: {
              isDismissable: false,
            },
          });
        } else {
          modalHandler.hideModal(that.state.listenerKey);
          if (that.props.updateProfilePictureScreen.hasError) {
            modalHandler.showModal(that.state.listenerKey, {
              type: 'alert',
              modal: {
                isDismissable: true,
              },
              alert: {
                title: 'Oops!',
                message: that.props.updateProfilePictureScreen.error,
                buttons: [
                  {
                    title: 'Ok',
                  },
                ],
              },
            });
          }
        }
      }
    } catch (err) {
      console.error('::::::::::', err);
    }
    return null;
  }

  componentDidUpdate() {}

  navigateToGoBack = () => {
    let that = this;
    try {
      that.props.navigation.goBack();
    } catch (err) {}
  };

  clickOnUpdateProfile = () => {
    let that = this;
    try {
      let object = {
        first_name: that.state.first_name,
        last_name: that.state.last_name,
        email: that.state.email,
        mobile_number: that.state.mobile,
        height: that.props.userHeight,
        height_unit: 'cm',
      };
      that.props.updateProfileRequest(object, that.props.user.token);
    } catch (err) {}
  };

  focusNextField = name => {
    let that = this;
    try {
      if (
        that.inputs[name] &&
        that.inputs[name].current &&
        that.inputs[name].current.focus
      ) {
        if (name === 'email' && that.state.isEmailLocked) {
          that.inputs['mobile'].current.focus();
        } else if (name === 'mobile' && that.state.isMobileLocked) {
          Keyboard.dismiss();
        } else {
          that.inputs[name].current.focus();
        }
      }
    } catch (err) {}
  };

  navigateToEditHeight = () => {
    let that = this;
    try {
      that.props.navigation.navigate('HeightScreen');
    } catch (err) {}
  };

  openImagePicker = () => {
    this.setState({cameraModalVisible: !this.state.cameraModalVisible});
  };

  onCameraSelect = () => {
    let that = this;
    try {
      if (Platform.OS == 'android') {
        that.setState(
          {
            cameraModalVisible: false,
          },
          () => {
            that.openModalView();
          },
        );
      } else {
        ImagePicker.openCamera({
          useFrontCamera: true,
          cropperCircleOverlay: true,
          mediaType: 'photo',
          width: 500,
          height: 500,
          compressImageMaxWidth: 640,
          compressImageMaxHeight: 480,
          cropping: true,
        }).then(image => {
          let source = {uri: image.path};
          this.setState(
            {
              cameraModalVisible: false,
              imageUrl: image.path,
              imageData: source,
            },
            () => {
              that.updateUserImage();
            },
          );
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  onGallerySelect = () => {
    let that = this;
    try {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        cropping: true,
      }).then(image => {
        let source = {uri: image.path};
        this.setState(
          {
            cameraModalVisible: false,
            imageUrl: image.path,
            imageData: source,
          },
          () => {
            that.updateUserImage();
          },
        );
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  openModalView = () => {
    let that = this;
    try {
      that.setState({
        showModalView: !that.state.showModalView,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  closeModalView = () => {
    let that = this;
    try {
      that.setState({
        showModalView: false,
      });
    } catch (err) {}
  };

  cameraRefs = camera => {
    this.camera = camera;
  };

  _takePicture = async () => {
    let that = this;
    try {
      if (that.camera) {
        let options = {quality: 0.9, doNotSave: false, mirrorImage: false};
        const data = await that.camera.takePictureAsync(options);
        ImagePicker.openCropper({
          path: data.uri,
          width: 500,
          height: 500,
          compressImageMaxWidth: 640,
          compressImageMaxHeight: 480,
        }).then(image => {
          let source = {uri: image.path};
          that.setState(
            {
              showModalView: false,
              imageUrl: image.path,
              imageData: source,
            },
            () => {
              that.updateUserImage();
            },
          );
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  updateUserImage = () => {
    let that = this;
    let uri = that.state.imageData;
    try {
      const profilePhoto = {
        uri: uri.uri, //'file://' +
        name: 'photo.jpg',
        type: 'image/jpeg',
      };
      let imageRq = new FormData();
      imageRq.append('profilePhoto', profilePhoto);
      that.props.updateProfilePicture(imageRq, that.props.user.token);
    } catch (error) {
      //akeyAlertHandler.showErrorAlert(that.state.listenerKey, error.message);
    }
  };

  render() {
    return (
      <EditProfile
        updateState={this.setState.bind(this)}
        navigateToGoBack={this.navigateToGoBack}
        clickOnUpdateProfile={this.clickOnUpdateProfile}
        focusNextField={this.focusNextField}
        navigateToEditHeight={this.navigateToEditHeight}
        inputs={this.inputs}
        openImagePicker={this.openImagePicker}
        onCameraSelect={this.onCameraSelect}
        onGallerySelect={this.onGallerySelect}
        closeModalView={this.closeModalView}
        _takePicture={this._takePicture}
        cameraRefs={this.cameraRefs}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  userHeight: state.user.height,
  units: state.app.units,
  screen: state.screens.updateProfileScreen,
  updateProfilePictureScreen: state.screens.updateProfilePictureScreen,
});

const mapDispatchToProps = dispatch => {
  return {
    updateProfileRequest: (object, token) => {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_REQUEST,
        payload: {
          object,
          token,
        },
      });
    },
    updateProfilePicture: (object, token) => {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_PICTURE_REQUEST,
        payload: {
          object,
          token,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileContainer);
