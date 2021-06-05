import Alert from './Alert';
import {DeviceEventEmitter} from 'react-native';

const akeyAlertHandler = {
  hideAlert(listenerKey, modObj) {
    let message = '';
    let alertObj = getAlertObj('success', message, modObj);
    alertObj.visible = false;
    DeviceEventEmitter.emit(`akeyManageAlert_${listenerKey}`, alertObj);
  },
  showSuccessAlert(listenerKey, message, modObj) {
    let alertObj = getAlertObj('success', message, modObj);
    DeviceEventEmitter.emit(`akeyManageAlert_${listenerKey}`, {
      title,
      isVisible: true,
    });
  },
  showErrorAlert(listenerKey, message, modObj) {
    let alertObj = getAlertObj('error', message, modObj);
    DeviceEventEmitter.emit(`akeyManageAlert_${listenerKey}`, alertObj);
  },
  showTwoButtonAlert(
    listenerKey,
    message,
    cancelTitle,
    actionTitle,
    onActionPress,
    modObj,
  ) {
    let alertObj = getTwoButtonAlertObj(
      'error',
      message,
      cancelTitle,
      actionTitle,
      onActionPress,
      modObj,
    );
    DeviceEventEmitter.emit(`akeyManageAlert_${listenerKey}`, alertObj);
  },
};

const getAlertObj = (alertType, message, modObj) => {
  let alert = {
    visible: true,
    isDismissable: true,
    buttons: [],
    topMsg: '',
    message: 'Default alert',
    onDismissed: () => {},
  };
  alert.topMsg = alertType === 'success' ? 'Hey' : 'Oops!';
  alert.message = message;
  if (modObj && typeof modObj === 'object') {
    if (modObj.isTwoButtonAlert) {
      alert.isDismissable = false;
    }
    Object.assign(alert, modObj);
  }
  return alert;
};

const getTwoButtonAlertObj = (
  alertType,
  message,
  cancelTitle,
  actionTitle,
  onActionPress,
  modObj,
) => {
  if (!modObj) {
    modObj = {};
  }
  modObj.isTwoButtonAlert = true;
  let alert = getAlertObj(alertType, message, modObj);
  if (alert.buttons.length == 0) {
    alert.buttons = [
      {
        title: cancelTitle ? cancelTitle : 'Cancel',
        cancelButton: true,
      },
      {
        title: actionTitle ? actionTitle : 'Confirm',
        isAction: true,
        onPress: onActionPress,
      },
    ];
  }

  return alert;
};

export {akeyAlertHandler};
export default Alert;
