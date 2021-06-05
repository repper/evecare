import React from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import ObstetricsHistory from './obstetricsHistory';
import * as actionTypes from '../../redux/actions/types';
import {modalHandler} from '../../components/AppModal';
import {colors} from '../../config/styles';

class ObstetricsHistoryContainer extends BaseComponent {
  constructor(props) {
    super(props);

    let obstetricsArr = [
      {
        name: 'Number of Deliveries',
        isSection: true,
      },
      {
        name: 'Total Number of Normal Delivery',
        key: 'normal_delivery',
        count: 0,
        iconColor: colors.walk_period_back,
      },
      {
        name: 'Total Number of Forceps Delivery',
        key: 'forceps_delivery',
        count: 0,
        iconColor: colors.walk_period_back,
      },
      {
        name: 'Total Number of Vaccum Delivery',
        key: 'vaccum_delivery',
        count: 0,
        iconColor: colors.walk_period_back,
      },
      {
        name: 'Total Number of Cesarean Delivery(LSCS)',
        key: 'cesarean_delivery',
        count: 0,
        iconColor: colors.walk_period_back,
      },
      {
        name: 'Number of Abortions',
        isSection: true,
      },
      {
        name: 'Total Number of Abortion (Termination)',
        key: 'abortion_termination',
        count: 0,
        iconColor: colors.yellow_text_color,
      },
      {
        name: 'Total Number of Abortion (Misscarraige)',
        key: 'abortion_misscarraige',
        count: 0,
        iconColor: colors.yellow_text_color,
      },
      {
        name: 'Total Number of Pregnancy',
        key: 'total_pregnancy',
        count: 0,
        noIncrement: true,
        iconColor: colors.txt_header_color,
      },
      {
        name: 'Number of Births',
        isSection: true,
      },
      {
        name: 'Total Number of Live Birth',
        key: 'live_birth',
        count: 0,
        excludeTotal: true,
        iconColor: colors.walk_discuss_back,
      },
      {
        name: 'Total Number of Still Birth',
        key: 'still_birth',
        count: 0,
        excludeTotal: true,
        iconColor: colors.walk_discuss_back,
      },

      {
        name: 'Number of Ectopic Pregnancies',
        isSection: true,
      },
      {
        name: 'Ectopic Pregnancies',
        key: 'ectopic_pregnancy',
        count: 0,
        excludeTotal: true,
        iconColor: colors.seafoam_blue,
      },
    ];

    //Loop over obstetricsArr to set data from store
    obstetricsArr.forEach(item => {
      item.count = props.obstetricsHistory[item.key];
    });

    this.state = {
      listenerKey: 'obstetricsHistory',
      obstetricsArr,
      infoModalState: false,
      contentKey: '',
      isHeaderModal: false,
    };
  }

  componentWillUnmount() {
    try {
      this.props.navigation.removeListener('beforeRemove');
      this.backHandler.remove();
    } catch (err) {}
  }

  componentDidMount() {
    const that = this;
    try {
      this.props.navigation.addListener('beforeRemove', e => {
        if (that.isDeliveryAndBirthCountMatch()) {
          e.preventDefault();
        }
      });
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.backAction,
      );
    } catch (err) {}
  }

  isDeliveryAndBirthCountMatch = () => {
    const that = this;
    try {
      let deliveryCount = 0;
      let birthCount = 0;
      this.state.obstetricsArr.forEach(el => {
        if (
          el.key &&
          [
            'normal_delivery',
            'forceps_delivery',
            'vaccum_delivery',
            'cesarean_delivery',
          ].indexOf(el.key) !== -1
        ) {
          deliveryCount += el.count;
        }
        if (el.key && ['live_birth', 'still_birth'].indexOf(el.key) !== -1) {
          birthCount += el.count;
        }
      });
      const doNotMatch = deliveryCount !== birthCount;
      if (doNotMatch) {
        modalHandler.showModal(that.state.listenerKey, {
          type: 'alert',
          modal: {
            isDismissable: true,
          },
          alert: {
            title: 'Oops!',
            message: 'Delivery count does not match number of birth count.',
            buttons: [
              {
                title: 'Ok',
              },
            ],
          },
        });
      }
      return doNotMatch;
    } catch (err) {}
    return true;
  };

  backAction = () => {
    return this.isDeliveryAndBirthCountMatch();
  };

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
          contentKey: 'obstetricsHistory',
          isHeaderModal: true,
        };
      }
    } catch (error) {}
    return null;
  };

  componentDidUpdate() {}

  getSelectedObstrtics = (increase, index) => {
    let that = this;
    try {
      let obstetricsArr = [...that.state.obstetricsArr];
      let operated = false;
      if (increase) {
        if (!obstetricsArr[index].excludeTotal) {
          obstetricsArr[8].count++;
        }
        obstetricsArr[index].count++;
        operated = true;
      } else {
        if (obstetricsArr[index].count > 0) {
          if (!obstetricsArr[index].excludeTotal) {
            obstetricsArr[8].count--;
          }
          obstetricsArr[index].count--;
          operated = true;
        }
      }
      if (operated) {
        //This will avoid updating state or store if we click on reduce even if count is zero
        that.setState(
          {
            obstetricsArr,
          },
          () => {
            that.saveToStore();
          },
        );
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  saveToStore = () => {
    let that = this;
    try {
      let obstetricsData = {};
      that.state.obstetricsArr.forEach(
        obs => (obstetricsData[obs.key] = obs.count),
      );
      that.props.saveObstetricsData(obstetricsData);
    } catch (err) {
      console.log('err', err);
    }
  };

  showInfoModal = index => {
    let that = this;
    try {
      const item = that.state.obstetricsArr[index];
      that.setState({
        infoModalState: !that.state.infoModalState,
        contentKey: `obs_${item.key}`,
      });
    } catch (err) {}
  };

  showInfoHeaderModal = () => {
    let that = this;
    try {
      that.setState({
        infoModalState: !that.state.infoModalState,
        contentKey: 'obstetricsHistory',
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
      <ObstetricsHistory
        getSelectedObstrtics={this.getSelectedObstrtics}
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
  obstetricsHistory: state.app.obstetricsHistory,
  scrnInfoModal: state.screens.headerInfoModal,
});

const mapDispatchToProps = dispatch => {
  return {
    saveObstetricsData: obstetricsData => {
      dispatch({
        type: actionTypes.SAVE_OBSTETRICS_DATA,
        payload: {
          obstetricsData,
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
)(ObstetricsHistoryContainer);
