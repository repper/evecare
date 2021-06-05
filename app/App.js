//Libraries
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {reducer as network, createNetworkMiddleware, ReduxNetworkProvider} from 'react-native-offline';
//Own code
import reducers from './redux/reducers';
import AppWithNavigationState from './redux/navigators/root/navigator';
import rootSaga from './redux/sagas/sagas';
import {NavigationContainer} from '@react-navigation/native';

const sagaMiddleware = createSagaMiddleware();

const networkMiddleware = createNetworkMiddleware({
  regexActionType: /.*_REQUEST/,
  actionTypes: ['LOAD_APP_ASSET'],
});

const middlewares = [networkMiddleware, sagaMiddleware];

if (__DEV__) {
  middlewares.push(logger);
}

const appReducer = combineReducers({
  ...reducers,
  network,
});

const store = createStore(appReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <ReduxNetworkProvider>
            <AppWithNavigationState />
          </ReduxNetworkProvider>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
