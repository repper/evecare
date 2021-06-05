import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import {colors} from '../../config/styles';
import ArticleScreen from './articleScreen';
import * as actionTypes from '../../redux/actions/types';
import moment from 'moment';

class ArticleScreenContainer extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			listenerKey: 'article',
		};
	}


	componentWillUnmount() {}

	componentDidMount() {
		let that = this;
	}

	componentDidUpdate() {}

	render() {
		return (
			<ArticleScreen
				updateState={this.setState.bind(this)}
				{...this.state}
				{...this.props}
			/>
		);
	}
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
	return {
		// initiateStartDate: object => {
		// 	dispatch({
		// 		type: actionTypes.INITIATE_START_PERIOD_DATE,
		// 		payload: {
		// 			object,
		// 		},
		// 	});
		// },
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ArticleScreenContainer);
