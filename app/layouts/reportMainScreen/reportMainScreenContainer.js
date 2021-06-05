import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import ReportMainScreen from './reportMainScreen';

class ReportMainScreenContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      listenerKey: 'reportMain',
      optionaArray: [
        {empty: true},
        {
          title: 'Cycle Analysis',
          icon: 'AnalysisSvgIcon',
          screenName: 'ReportCycleAnalysis',
          hasDivider: true
        },
        {
          title: 'Predictions & History',
          icon: 'PredictionSvgIcon',
          screenName: 'ReportPredictions',
        },
        {empty: true},
        {
          title: 'Weight & BMI',
          icon: 'WightSvgIcon',
          screenName: 'ReportWeightBmi',
          hasDivider: true
        },
        {
          title: 'Blood Pressure',
          icon: 'BloodPressureSvgIcon',
          screenName: 'ReportBloodPressure',
        },
        {empty: true},
        {
          title: 'Sugar Report',
          icon: 'SugarSvgIcon',
          screenName: 'ReportSugar',
          hasDivider: true
        },
        {
          title: 'Temperature Report',
          icon: 'TemperatureSvgIcon',
          screenName: 'ReportTemperature',
        },
        {empty: true},
        {
          title: 'Health Profile',
          icon: 'HealthProfileSvgIcon',
          screenName: 'HealthProfile',
        },
      ],
    };
  }


  componentWillUnmount() {}

  componentDidMount() {
    let that = this;
  }

  componentDidUpdate() {}

  navigationFunction = item => {
    let that = this;
    try {
      that.props.navigation.navigate(item.screenName);
    } catch (err) {}
  };

  render() {
    return (
      <ReportMainScreen
        navigationFunction={this.navigationFunction}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportMainScreenContainer);
