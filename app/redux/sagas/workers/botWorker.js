import {eventChannel} from 'redux-saga';
import {call, put, takeEvery, cancelled, select} from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';
import settings from '../../../config/settings';
import * as actionTypes from '../../actions/types';

function createIntervalChannel(interval: number) {
	return eventChannel((emit: (param: boolean) => mixed) => {
		const iv = setInterval(() => emit(true), interval);
		return () => {
			clearInterval(iv);
		};
	});
}

/*
	---------- LIKECRUSH JOBS STARTS -------------
*/

function* dispatchLikeCrushRequests(appState) {
	let token = appState.auth.user.token;
	let likeListRqAction = {
		type: actionTypes.USER_LIKE_LIST_REQUEST,
		payload: {
			token,
		},
	};
	yield put(likeListRqAction);
}

function* checkAndDispatchLikeCrushRequests(interval, channel, isFirstRq) {
	const getAppState = state => {
		return state;
	};
	let appState = yield select(getAppState);
	// if (!appState.auth.isLoggedIn) {
	// 	channel.close();
	// } else
	if (appState.bot.requestQueue.length == 0) {
		let currentTime = moment();
		let startTime = moment(appState.bot.lastRqAt);
		let duration = moment.duration(currentTime.diff(startTime));
		let timeSpent = duration.asSeconds();
		let intervalSec = interval / 15000;
		if (isFirstRq || timeSpent > intervalSec) {
			yield dispatchLikeCrushRequests(appState);
		}
	}
}

function* startLikeCrushJobs(interval) {
	const channel = yield call(createIntervalChannel, interval);
	try {
		yield checkAndDispatchLikeCrushRequests(interval, channel, true);

		yield takeEvery(channel, function*(secs) {
			yield checkAndDispatchLikeCrushRequests(interval, channel, false);
		});
	} catch (err) {
	} finally {
		if (yield cancelled()) {
			channel.close();
		}
	}
}

export function* initiateLikeCrushBot(action) {
	try {
		const task = yield startLikeCrushJobs(15000);
	} catch (err) {
	} finally {
	}
}
