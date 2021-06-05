import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import WriteNotes from './writeNotes';
import * as actionTypes from '../../redux/actions/types';

class WriteNotesContainer extends BaseComponent {
  constructor(props) {
    super(props);

    const {params} = this.props.route;
    let showButton = false;
    let notes = '';

    //Check if we have log in the state
    if (
      props.healthLog.dates.indexOf(params.date) >= 0 &&
      props.healthLog.dayLog[params.date] &&
      props.healthLog.dayLog[params.date].notes &&
      props.healthLog.dayLog[params.date].notes.length > 0
    ) {
      notes = props.healthLog.dayLog[params.date].notes;
      showButton = true;
    }

    this.state = {
      date: params && params.date ? params.date : '',
      notes: notes,
      showButton,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  clickOnSaveNotes = () => {
    let that = this;
    try {
      let notesTxt = that.state.notes.trim();
      if (notesTxt.length > 0) {
        that.props.saveNotesData(that.state.date, notesTxt);
      }
      that.props.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  onDelete = () => {
    let that = this;
    try {
      that.props.deleteNotesData(that.state.date);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  render() {
    return (
      <WriteNotes
        updateState={this.setState.bind(this)}
        onDelete={this.onDelete}
        clickOnSaveNotes={this.clickOnSaveNotes}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  healthLog: state.app.healthLog,
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    saveNotesData: (date, notes) => {
      dispatch({
        type: actionTypes.SAVE_NOTES_DATA,
        payload: {
          date,
          notes,
        },
      });
    },
    deleteNotesData: date => {
      dispatch({
        type: actionTypes.DELETE_NOTES_DATA,
        payload: {
          date,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteNotesContainer);
