import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import MedicalHistory from './medicalHistory';
import * as actionTypes from '../../redux/actions/types';
import {colors} from '../../config/styles';

class MedicalHistoryContainer extends BaseComponent {
  constructor(props) {
    super(props);

    let cancerOtherTitle = 'Cancer';
    let otherHistoryTitle = 'Other History';

    let textInputs = {};
    if (props.meidcalHistory[cancerOtherTitle]) {
      textInputs[cancerOtherTitle] = props.meidcalHistory[cancerOtherTitle];
    }
    if (props.meidcalHistory[otherHistoryTitle]) {
      textInputs[otherHistoryTitle] = props.meidcalHistory[otherHistoryTitle];
    }

    this.state = {
      listenerKey: 'medicalHistory',
      medicalArr: [
        {
          name: 'Polycystic Ovarian Disease (PCOD)',
          key: 'pcod',
          iconColor: colors.walk_period_back,
          showSection: true,
          sectionTitle: 'Female Related Conditions',
        },
        {name: 'Pelvic inflammatory Disease (PID)', key: 'pid', iconColor: colors.walk_period_back},
        {
          name: 'Endometriosis',
          key: 'endometriosis',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Menorrhagia',
          key: 'menorrhagia',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Metrorrhagia',
          key: 'metrorrhagia',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Uterine Fibroid',
          key: 'uterine_fibroid',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Uterine Polyps',
          key: 'uterine_polyp',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Infertility',
          key: 'infertility',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Urinary tract infection (UTI)',
          key: 'uti',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Recurrent Vaginitis',
          key: 'vaginitis',
          iconColor: colors.walk_period_back,
        },
        {name: 'Human Papillomavirus (HPV)', key: 'hpv', iconColor: colors.walk_period_back},
        {
          name: 'Dilation & Curettage (D & C)',
          key: 'dilation_curettage',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Cervical Cancer',
          key: 'cancer_cervical',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Ovarian Cancer',
          key: 'cancer_ovarian',
          iconColor: colors.walk_period_back,
        },
        {
          name: 'Uterine Cancer',
          key: 'cancer_uterine',
          iconColor: colors.walk_period_back,
        },
        //General section
        {
          name: 'Anemia',
          key: 'anemia',
          iconColor: colors.yellow_text_color,
          showSection: true,
          sectionTitle: 'General Conditions',
        },
        {
          name: 'High Blood Pressure',
          key: 'high_blood_pressure',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Diabetes',
          key: 'diabetes',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Hyperthyroidism',
          key: 'hyperthyroidism',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Hypothyroidism',
          key: 'hypothyroidism',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Depression',
          key: 'depression',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Migraine',
          key: 'migraine',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Eating Disorder',
          key: 'eating_disorder',
          iconColor: colors.yellow_text_color,
        },
        {
          name: 'Bleeding/clotting Disorder',
          key: 'bleeding_disorder',
          iconColor: colors.yellow_text_color,
        },
        {
          name: cancerOtherTitle,
          key: 'cancer_other',
          isOther: true,
          isCancer: true,
          iconColor: colors.yellow_text_color,
        },
        {
          name: otherHistoryTitle,
          key: 'other_history',
          isOther: true,
          showSection: true,
          iconColor: colors.walk_discuss_back,
          sectionTitle: 'Others',
        },
      ],
      textInputs,
      selectedMedicalArr: [...props.meidcalHistory],
      infoModalState: false,
      contentKey: '',
      isHeaderModal: false,
    };

    this.inputs = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  static getDerivedStateFromProps = (props, state) => {
    try {
      if (props.scrnInfoModal.showInfoModal && !state.infoModalState && !state.isHeaderModal) {
        return {
          ...state,
          infoModalState: true,
          contentKey: 'medicalHistory',
          isHeaderModal: true,
        };
      }
    } catch (error) {}
    return null;
  };

  componentDidUpdate() {}

  onMedicalHistoryChange = (item, index, selected) => {
    let that = this;
    try {
      let selectedMedicalArr = [...that.state.selectedMedicalArr];
      let itemIdx = selectedMedicalArr.indexOf(item.name);
      if (itemIdx < 0) {
        //Push
        selectedMedicalArr.push(item.name);
      } else {
        //Pop
        selectedMedicalArr.splice(itemIdx, 1);
      }
      //This will avoid updating state or store if we click on reduce even if count is zero
      that.setState(
        {
          selectedMedicalArr,
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
      let medicalHistoryData = [...that.state.selectedMedicalArr];
      for (const key in that.state.textInputs) {
        medicalHistoryData[key] = that.state.textInputs[key];
      }
      that.props.saveMedicalHistoryData(medicalHistoryData);
    } catch (err) {
      console.log('err', err);
    }
  };

  showInfoModal = index => {
    let that = this;
    try {
      const item = that.state.medicalArr[index];
      that.setState({
        infoModalState: !that.state.infoModalState,
        contentKey: `med_${item.key}`,
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

  onTxtInputBlur = name => {
    let that = this;
    that.saveToStore();
  };

  updateInputState = (name, value) => {
    let that = this;
    try {
      let newState = {textInputs: {...that.state.textInputs}};
      newState.textInputs[name] = value;
      that.setState(newState);
    } catch (err) {}
  };

  render() {
    return (
      <MedicalHistory
        updateInputState={this.updateInputState}
        onMedicalHistoryChange={this.onMedicalHistoryChange}
        showInfoModal={this.showInfoModal}
        hideInfoModal={this.hideInfoModal}
        onTxtInputBlur={this.onTxtInputBlur}
        txtRefCancer={this.txtRefCancer}
        txtRefOther={this.txtRefOther}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  meidcalHistory: state.app.meidcalHistory,
  scrnInfoModal: state.screens.headerInfoModal,
});

const mapDispatchToProps = dispatch => {
  return {
    saveMedicalHistoryData: medicalHistoryData => {
      dispatch({
        type: actionTypes.SAVE_MED_HISTORY_DATA,
        payload: {
          medicalHistoryData,
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
)(MedicalHistoryContainer);
