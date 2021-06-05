import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import BirthControl from './birthControl';
import * as actionTypes from '../../redux/actions/types';

class BirthControlContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'birthControl',
      optionsArr: [
        {name: 'Implant', key: 'implant'},
        {name: 'Intrauterine Device (IUD)', key: 'iud'},
        {name: 'Vaginal Ring', key: 'vaginal_ring'},
        {name: 'Patch', key: 'patch'},
        {name: 'Shot', key: 'shot'},
        {name: 'Tubal Ligation', key: 'tubal_ligation'},
        {name: 'Diaphragm', key: 'diaphragm'},
        {name: 'Sponge', key: 'sponge'},
        {name: 'Cervical Cap', key: 'cervical_cap'},
        {name: 'Fertility awareness Method', key: 'fertility_awareness_method'},
        {name: 'Abstinence', key: 'abstinence'},
        {name: 'Pill', key: 'pill'},
        {name:"Condoms", key:"condoms"},
        {name: "Spermicide", key:"spermicide"},
        {name: "Emergency Contraception", key:"emergency_contraception"},
        {name: "Withdrawal", key:"withdrawal"},
        {name: "Internal Condom", key:"internal_condom"}
      ],
      selectedBirthControlArr: [...props.birthControl],
      infoModalState: false,
      contentKey: '',
      isHeaderModal: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  static getDerivedStateFromProps = (props, state) => {
    try {
      if (
        props.scrnInfoModal.showInfoModal &&
        !state.infoModalState &&
        !state.isHeaderModal
      ) {
        return {
          ...state,
          infoModalState: true,
          contentKey: 'birthControl',
          isHeaderModal: true,
        };
      }
    } catch (error) {}
    return null;
  };

  componentDidUpdate() {}

  onBirthControlChange = (item, index, selected) => {
    let that = this;
    try {
      let selectedBirthControlArr = [...that.state.selectedBirthControlArr];
      let itemIdx = selectedBirthControlArr.indexOf(item.name);
      if (itemIdx < 0) {
        //Push
        selectedBirthControlArr.push(item.name);
      } else {
        //Pop
        selectedBirthControlArr.splice(itemIdx, 1);
      }
      //This will avoid updating state or store if we click on reduce even if count is zero
      that.setState(
        {
          selectedBirthControlArr,
        },
        () => {
          that.saveToStore();
        },
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  saveToStore = () => {
    let that = this;
    try {
      let birthControlData = [...that.state.selectedBirthControlArr];
      that.props.saveBirthControlData(birthControlData);
    } catch (err) {
      console.log('err', err);
    }
  };

  showInfoModal = index => {
    let that = this;
    try {
      const item = that.state.optionsArr[index];
      that.setState({
        infoModalState: !that.state.infoModalState,
        contentKey: `birc_${item.key}`,
      });
    } catch (err) {}
  };

  showInfoHeaderModal = () => {
    let that = this;
    try {
      that.setState({
        infoModalState: !that.state.infoModalState,
        contentKey: 'birthControl',
      });
    } catch (err) {}
  };

  hideInfoModal = () => {
    let that = this;
    try {
      if (that.state.isHeaderModal) {
        that.props.hideHeaderInfoModal();
      }
      that.setState({
        infoModalState: !that.state.infoModalState,
        isHeaderModal: false,
      });
    } catch (err) {}
  };

  render() {
    return (
      <BirthControl
        onBirthControlChange={this.onBirthControlChange}
        showInfoHeaderModal={this.showInfoHeaderModal}
        showInfoModal={this.showInfoModal}
        hideInfoModal={this.hideInfoModal}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  birthControl: state.app.birthControl,
  scrnInfoModal: state.screens.headerInfoModal,
});

const mapDispatchToProps = dispatch => {
  return {
    saveBirthControlData: birthControlData => {
      dispatch({
        type: actionTypes.SAVE_BIRTH_CONTROL_DATA,
        payload: {
          birthControlData,
        },
      });
    },
    hideHeaderInfoModal: () => {
      dispatch({
        type: actionTypes.HIDE_HEADER_INFO_MODAL,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BirthControlContainer);
