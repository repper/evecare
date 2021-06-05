import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import merge from 'deepmerge';
import moment from 'moment';

import * as actionTypes from '../actions/types';

const INITIAL = {
  walkthroughSkipped: false,
  updatedTime: null,
  goal: null,
  showOvulation: false,
  userGetNotification: false,
  units: {
    weight: 'kg',
    height: 'cm',
    temp: 'fahrenheit',
  },
  menstrual: {
    useAverageCycleLength: false,
    avgCycleLengthTime: -1,
    useAveragePeriodLength: false,
    avgPeriodLengthTime: -1,
    cycleLength: -1,
    cycleLengthDefault: -1,
    periodLength: -1,
    periodLengthDefault: -1,
    ovulationLength: 14,
    periods: {},
    periodDays: [],
  },
  obstetricsHistory: {
    total_pregnancy: 0,
    normal_delivery: 0,
    vaccum_delivery: 0,
    forceps_delivery: 0,
    cesarean_delivery: 0,
    abortion_termination: 0,
    abortion_misscarraige: 0,
    live_birth: 0,
    still_birth: 0,
    ectopic_pregnancy: 0,
  },
  meidcalHistory: [],
  birthControl: [],
  healthLog: {
    dates: [],
    dayLog: {},
  },
  notificationData: [],
};

export default (state = INITIAL, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case actionTypes.DEREGISTER_DEVICE_SUCCESS:
      newState = {
        ...INITIAL,
      };
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.INITIATE_AUTH_APP_STATE:
      if (action.payload.appState) {
        newState = {...action.payload.appState};
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.WALTHROUGH_SKIP:
      newState.walkthroughSkipped = true;
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.INITIATE_MENSTRUAL_DATE:
      newState.menstrual.cycleLength = action.payload.days;
      newState.menstrual.cycleLengthDefault = action.payload.days;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.INITIATE_PERIOD_DAYS:
      newState.menstrual.periodLength = action.payload.days;
      newState.menstrual.periodLengthDefault = action.payload.days;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.INITIATE_OVULATION_DAYS:
      newState.menstrual.ovulationLength = action.payload.days;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SAVE_PERIOD_DATA:
      newState.menstrual.periods[action.payload.start] = {
        start: action.payload.start,
        end: action.payload.end,
        isEnded: true,
      };
      if (newState.menstrual.periodDays.indexOf(action.payload.start) < 0) {
        newState.menstrual.periodDays.push(action.payload.start);
      }
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SET_MENSTRUAL_GOAL:
      newState.goal = action.payload.goal;
      newState.showOvulation = action.payload.showOvulation;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SAVE_OBSTETRICS_DATA:
      newState.obstetricsHistory = action.payload.obstetricsData;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SAVE_MED_HISTORY_DATA:
      newState.meidcalHistory = action.payload.medicalHistoryData;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SAVE_BIRTH_CONTROL_DATA:
      newState.birthControl = [...action.payload.birthControlData];
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SAVE_SUGAR_DATA:
      if (action.payload.date && action.payload.sugar) {
        newState = checkHealthLogDateAndInit(newState, action.payload.date);

        newState = checkHealthLogDayItemAndInit(newState, action.payload.date, 'sugar');

        //Delete all the entries as this will be handled later for time
        newState.healthLog.dayLog[action.payload.date].sugar.items = {};

        //Add log
        newState.healthLog.dayLog[action.payload.date].sugar.items[moment().format('HH:mm')] = Number(
          action.payload.sugar,
        );

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.DELETE_SUGAR_DATA:
      if (action.payload.date) {
        newState = checkHealthLogDayItemAndDelete(newState, action.payload.date, 'sugar', '');

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_BLOOD_PRESSURE_DATA:
      if (action.payload.date && action.payload.sys && action.payload.dia) {
        newState = checkHealthLogDateAndInit(newState, action.payload.date);

        newState = checkHealthLogDayItemAndInit(newState, action.payload.date, 'blood_pressure');

        //Delete all the entries as this will be handled later for time
        newState.healthLog.dayLog[action.payload.date].blood_pressure.items = {};

        //Add log
        newState.healthLog.dayLog[action.payload.date].blood_pressure.items[moment().format('HH:mm')] = {
          sys: Number(action.payload.sys),
          dia: Number(action.payload.dia),
        };

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.DELETE_BLOOD_PRESSURE_DATA:
      if (action.payload.date) {
        newState = checkHealthLogDayItemAndDelete(newState, action.payload.date, 'blood_pressure', '');

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_TEMPERATURE_UNIT:
      if (action.payload.unit) {
        newState.units.temp = action.payload.unit;
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_WEIGHT_HEIGHT_UNIT:
      if (action.payload.weight && action.payload.height) {
        newState.units.weight = action.payload.weight;
        newState.units.height = action.payload.height;
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_TEMPERATURE_DATA:
      if (action.payload.date && action.payload.temp) {
        newState = checkHealthLogDateAndInit(newState, action.payload.date);

        newState = checkHealthLogDayItemAndInit(newState, action.payload.date, 'bb_temperature');

        //Delete all the entries as this will be handled later for time
        newState.healthLog.dayLog[action.payload.date].bb_temperature.items = {};

        //Add log
        newState.healthLog.dayLog[action.payload.date].bb_temperature.items[moment().format('HH:mm')] =
          action.payload.temp;

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.DELETE_TEMPERATURE_DATA:
      if (action.payload.date) {
        newState = checkHealthLogDayItemAndDelete(newState, action.payload.date, 'bb_temperature', '');

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_WEIGHT_DATA:
      if (action.payload.date && action.payload.weight) {
        newState = checkHealthLogDateAndInit(newState, action.payload.date);
        newState = checkHealthLogDayItemAndInit(newState, action.payload.date, 'weight');

        //Delete all the entries as this will be handled later for time
        newState.healthLog.dayLog[action.payload.date].weight.items = {};

        //Add log
        newState.healthLog.dayLog[action.payload.date].weight.items[moment().format('HH:mm')] =
          action.payload.weight;

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.DELETE_WEIGHT_DATA:
      if (action.payload.date) {
        newState = checkHealthLogDayItemAndDelete(newState, action.payload.date, 'weight', '');

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_HEALTH_LOG_DATA:
      if (action.payload.date && action.payload.section) {
        newState = checkHealthLogDateAndInit(newState, action.payload.date);
        newState = checkHealthLogDayItemAndInit(newState, action.payload.date, action.payload.section);

        //Check if it is fluid
        if (action.payload.section === 'fluid') {
          if (action.payload.item.key === 'no_fluid') {
            newState.healthLog.dayLog[action.payload.date][action.payload.section].type =
              action.payload.item.key;
            newState.healthLog.dayLog[action.payload.date][action.payload.section].color = '';
          } else if (
            newState.healthLog.dayLog[action.payload.date][action.payload.section].type === 'no_fluid' &&
            action.payload.item.borderColor
          ) {
            //Do nothing if no_fluid is selected and color is being selected
          } else {
            if (action.payload.item.borderColor) {
              //Means it is with color
              newState.healthLog.dayLog[action.payload.date][action.payload.section].color =
                action.payload.item.key;
            } else {
              newState.healthLog.dayLog[action.payload.date][action.payload.section].type =
                action.payload.item.key;
            }
          }
        } else if (action.payload.section === 'bleeding') {
          //Check if it is bleeding
          if (
            Array.isArray(
              newState.healthLog.dayLog[action.payload.date][action.payload.section][
                action.payload.item.info
              ],
            )
          ) {
            newState.healthLog.dayLog[action.payload.date][action.payload.section][
              action.payload.item.info
            ].push(action.payload.item.key);
          } else {
            newState.healthLog.dayLog[action.payload.date][action.payload.section][action.payload.item.info] =
              action.payload.item.key;
          }
        } else if (action.payload.section === 'intercourse') {
          //Check if it is intercourse
          if (
            action.payload.item.info === 'type' &&
            newState.healthLog.dayLog[action.payload.date][action.payload.section].type !==
              action.payload.item.info
          ) {
            //Reset state as the method was changed
            newState.healthLog.dayLog[action.payload.date][action.payload.section].unprotected = '';
            newState.healthLog.dayLog[action.payload.date][action.payload.section].protected = '';
          }
          newState.healthLog.dayLog[action.payload.date][action.payload.section][action.payload.item.info] =
            action.payload.item.key;
        } else if (action.payload.section === 'testMonitor') {
          //Check if it is Test Monitor
          newState.healthLog.dayLog[action.payload.date][action.payload.section][action.payload.item.info] =
            action.payload.item.key;
        } else {
          if (
            newState.healthLog.dayLog[action.payload.date][action.payload.section].items.indexOf(
              action.payload.item.key,
            ) < 0
          ) {
            newState.healthLog.dayLog[action.payload.date][action.payload.section].items.push(
              action.payload.item.key,
            );
          }
        }

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.DELETE_HEALTH_LOG_DATA:
      if (action.payload.date && action.payload.section) {
        //Check if it is fluid
        if (action.payload.section === 'fluid' && action.payload.item.borderColor) {
          newState.healthLog.dayLog[action.payload.date][action.payload.section].color = '';
        } else if (action.payload.section === 'bleeding') {
          //Check if it is bleeding
          if (action.payload.item.info === 'flow') {
            newState = checkHealthLogDayItemAndDelete(
              newState,
              action.payload.date,
              action.payload.section,
              action.payload.item.key,
            );
          } else {
            if (
              Array.isArray(
                newState.healthLog.dayLog[action.payload.date][action.payload.section][
                  action.payload.item.info
                ],
              )
            ) {
              const bleedModalIdx = newState.healthLog.dayLog[action.payload.date][action.payload.section][
                action.payload.item.info
              ].indexOf(action.payload.item.key);
              newState.healthLog.dayLog[action.payload.date][action.payload.section][
                action.payload.item.info
              ].splice(bleedModalIdx, 1);
            } else {
              newState.healthLog.dayLog[action.payload.date][action.payload.section][
                action.payload.item.info
              ] = '';
            }
          }
        } else if (action.payload.section === 'intercourse') {
          //Check if it is intercourse
          if (action.payload.item.info === 'type') {
            newState = checkHealthLogDayItemAndDelete(
              newState,
              action.payload.date,
              action.payload.section,
              action.payload.item.key,
            );
          } else {
            newState.healthLog.dayLog[action.payload.date][action.payload.section][action.payload.item.info] =
              '';
          }
        } else if (action.payload.section === 'testMonitor') {
          //Check if it is Test Monitor
          newState.healthLog.dayLog[action.payload.date][action.payload.section][action.payload.item.info] =
            '';
          if (
            !newState.healthLog.dayLog[action.payload.date][action.payload.section].ovulation &&
            !newState.healthLog.dayLog[action.payload.date][action.payload.section].pregnancy &&
            !newState.healthLog.dayLog[action.payload.date][action.payload.section].fertile
          ) {
            newState = checkHealthLogDayItemAndDelete(newState, action.payload.date, action.payload.section);
          }
        } else {
          newState = checkHealthLogDayItemAndDelete(
            newState,
            action.payload.date,
            action.payload.section,
            action.payload.item.key,
          );
        }

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.SAVE_NOTES_DATA:
      if (action.payload.date && action.payload.notes) {
        newState = checkHealthLogDateAndInit(newState, action.payload.date);
        newState = checkHealthLogDayItemAndInit(newState, action.payload.date, 'notes');

        //Add log
        newState.healthLog.dayLog[action.payload.date].notes = action.payload.notes;

        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.DELETE_NOTES_DATA:
      if (action.payload.date) {
        newState = checkHealthLogDayItemAndDelete(newState, action.payload.date, 'notes', '');
        newState.updatedTime = moment().valueOf();
        AsyncStorage.setItem('appData', JSON.stringify(newState));
      }
      return newState;
    case actionTypes.INITIATE_NOTIFICATION_DATA:
      newState.notificationData = action.payload.object;
      newState.userGetNotification = true;
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.SAVE_NOTIFICATION_DATA:
      let notiftnObj = action.payload.notificationData;
      let notKey = action.payload.key;
      const itmIndx = newState.notificationData
        .map(function(e) {
          return e.key;
        })
        .indexOf(notKey);

      for (let index = 0; index < newState.notificationData.length; index++) {
        if (
          newState.notificationData[index] &&
          newState.notificationData[index].key == notKey &&
          !notiftnObj.isActive
        ) {
          newState.notificationData.splice(itmIndx, 1);
          break;
        } else if (itmIndx < 0 && notiftnObj.isActive) {
          newState.notificationData.push(notiftnObj);
          break;
        }
      }
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.ADD_PERIOD_DATA:
      newState.menstrual.periods[action.payload.start] = {
        start: action.payload.start,
        end: action.payload.end,
        isEnded: false,
      };
      if (newState.menstrual.periodDays.indexOf(action.payload.start) < 0) {
        newState.menstrual.periodDays.push(action.payload.start);
      }
      newState.menstrual.periodDays = newState.menstrual.periodDays.sort();

      //Logic to calculate cycle and period length average
      newState = findCyclePeriodAverageLength(newState);
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.DELETE_PERIOD_DATA:
      if (newState.menstrual.periodDays.indexOf(action.payload.periodDate) >= 0) {
        newState.menstrual.periodDays.splice(
          newState.menstrual.periodDays.indexOf(action.payload.periodDate),
          1,
        );
      }
      newState.menstrual.periodDays = newState.menstrual.periodDays.sort();
      delete newState.menstrual.periods[action.payload.periodDate];

      //Logic to calculate cycle and period length average
      newState = findCyclePeriodAverageLength(newState);
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    case actionTypes.MODIFY_PERIOD_DATA:
      //Remove old from array
      if (newState.menstrual.periodDays.indexOf(action.payload.periodDate) >= 0) {
        newState.menstrual.periodDays.splice(
          newState.menstrual.periodDays.indexOf(action.payload.periodDate),
          1,
        );
      }
      //Delete period record
      delete newState.menstrual.periods[action.payload.periodDate];

      newState.menstrual.periods[action.payload.start] = {
        start: action.payload.start,
        end: action.payload.end,
        isEnded: true,
      };
      newState.menstrual.periodDays.push(action.payload.start);
      newState.menstrual.periodDays = newState.menstrual.periodDays.sort();

      //Logic to calculate cycle and period length average
      newState = findCyclePeriodAverageLength(newState);
      newState.updatedTime = moment().valueOf();
      AsyncStorage.setItem('appData', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

const findCyclePeriodAverageLength = newState => {
  let cycleLength = 0;
  let periodLength = 0;

  let periodDays = [...newState.menstrual.periodDays].reverse();
  const periodsCount = periodDays.length;
  if (periodsCount > 1) {
    for (let indexer = 0; indexer < periodsCount - 1; indexer++) {
      if (indexer > 2) {
        break;
      }
      const startDt = periodDays[indexer];
      const endDt = periodDays[indexer + 1];
      cycleLength += moment(startDt).diff(endDt, 'days');

      const sp = newState.menstrual.periods[endDt];
      const ep = newState.menstrual.periods[startDt];

      periodLength += moment(sp.end).diff(sp.start, 'days') + 1;
      if (indexer + 1 === periodsCount - 1) {
        periodLength += moment(ep.end).diff(ep.start, 'days') + 1;
      }
    }

    newState.menstrual.cycleLength = Math.round(cycleLength / (periodsCount - 1));
    newState.menstrual.periodLength = Math.round(periodLength / periodsCount);
  } else {
    newState.menstrual.cycleLength = newState.menstrual.cycleLengthDefault;
    newState.menstrual.periodLength = newState.menstrual.periodLengthDefault;
  }
  return newState;
};

const checkHealthLogDateAndInit = (state, date) => {
  //Check if we have date in the health log state
  if (state.healthLog.dates.indexOf(date) < 0) {
    //Push the date
    state.healthLog.dates.push(date);
  }
  return state;
};

const checkHealthLogDayItemAndInit = (state, date, type) => {
  if (!state.healthLog.dayLog[date]) {
    state.healthLog.dayLog[date] = {};
  }
  switch (type) {
    case 'sugar':
      state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
        sugar: {items: {}},
      });
      break;
    case 'blood_pressure':
      state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
        blood_pressure: {items: {}},
      });
      break;
    case 'bb_temperature':
      state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
        bb_temperature: {items: {}},
      });
      break;
    case 'weight':
      state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
        weight: {items: {}},
      });
      break;
    case 'notes':
      state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
        notes: '',
      });
      break;
    case 'fluid':
      if (
        state.healthLog.dayLog[date].fluid &&
        (state.healthLog.dayLog[date].fluid.type || state.healthLog.dayLog[date].fluid.color)
      ) {
      } else {
        state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
          fluid: {type: '', color: ''},
        });
      }
      break;
    case 'bleeding':
      if (state.healthLog.dayLog[date].bleeding && state.healthLog.dayLog[date].bleeding.flow) {
      } else {
        state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
          bleeding: {flow: '', type: '', color: '', smell: '', modality: []},
        });
      }
      break;
    case 'intercourse':
      if (state.healthLog.dayLog[date].intercourse && state.healthLog.dayLog[date].intercourse.type) {
      } else {
        state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
          intercourse: {
            type: '',
            unprotected: '',
            protected: '',
            female_orgasm: '',
          },
        });
      }
      break;
    case 'testMonitor':
      if (
        state.healthLog.dayLog[date].testMonitor &&
        (state.healthLog.dayLog[date].testMonitor.ovulation ||
          state.healthLog.dayLog[date].testMonitor.pregnancy ||
          state.healthLog.dayLog[date].testMonitor.fertile)
      ) {
      } else {
        state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], {
          testMonitor: {ovulation: '', pregnancy: '', fertile: ''},
        });
      }
      break;
    default:
      const log = {};
      log[type] = {items: []};
      state.healthLog.dayLog[date] = merge(state.healthLog.dayLog[date], log);
      break;
  }
  return state;
};

const checkHealthLogDayItemAndDelete = (state, date, type, key) => {
  if (state.healthLog.dayLog[date]) {
    switch (type) {
      case 'sugar':
        //Delete the sugar entry
        delete state.healthLog.dayLog[date].sugar;
        break;
      case 'blood_pressure':
        //Delete the blood_pressure entry
        delete state.healthLog.dayLog[date].blood_pressure;
        break;
      case 'bb_temperature':
        //Delete the bb_temperature entry
        delete state.healthLog.dayLog[date].bb_temperature;
        break;
      case 'weight':
        //Delete the weight entry
        delete state.healthLog.dayLog[date].weight;
        break;
      case 'notes':
        //Delete the notes entry
        delete state.healthLog.dayLog[date].notes;
        break;
      case 'fluid':
        //Delete the fluid entry
        delete state.healthLog.dayLog[date].fluid;
        break;
      case 'bleeding':
        //Delete the bleeding entry
        delete state.healthLog.dayLog[date].bleeding;
        break;
      case 'intercourse':
        //Delete the intercourse entry
        delete state.healthLog.dayLog[date].intercourse;
        break;
      case 'testMonitor':
        //Delete the testMonitor entry
        delete state.healthLog.dayLog[date].testMonitor;
        break;
      default:
        if (key) {
          if (
            typeof state.healthLog.dayLog[date][type] !== 'undefined' &&
            Array.isArray(state.healthLog.dayLog[date][type].items)
          ) {
            const keyIdx = state.healthLog.dayLog[date][type].items.indexOf(key);
            if (keyIdx >= 0) {
              state.healthLog.dayLog[date][type].items.splice(keyIdx, 1);
            }

            if (state.healthLog.dayLog[date][type].items.length === 0) {
              delete state.healthLog.dayLog[date][type];
            }
          }
        }
        break;
    }
  }

  //Check if we have any log left for the day
  if (Object.keys(state.healthLog.dayLog[date]).length === 0) {
    //Delete the dayLog and pop from days array as well
    delete state.healthLog.dayLog[date];
    const dayIdx = state.healthLog.dates.indexOf(date);
    state.healthLog.dates.splice(dayIdx, 1);
  }

  return state;
};
