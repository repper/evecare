import AppModal from './AppModal';
import {DeviceEventEmitter} from 'react-native';
import merge from 'deepmerge';

const modalHandler = {
  hideModal(listenerKey, modObj = {}) {
    let nmod = {type: 'loading'};
    nmod = merge(nmod, modObj);
    let mstate = merge({modal: {visible: false}}, nmod);
    DeviceEventEmitter.emit(`appModalManage_${listenerKey}`, mstate);
  },
  showModal(listenerKey, modObj) {
    let mstate = merge({modal: {visible: true}}, modObj);
    if (
      mstate.type !== 'loading' &&
      mstate.modal &&
      typeof mstate.modal.isDismissable == 'undefined'
    ) {
      mstate.modal.isDismissable = true;
    }
    DeviceEventEmitter.emit(`appModalManage_${listenerKey}`, mstate);
  },
};

export {modalHandler};
export default AppModal;
