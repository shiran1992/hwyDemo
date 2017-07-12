'use strict';

var {applyMiddleware, createStore} = require('redux');
var thunk = require('redux-thunk').default;
var createLogger = require('redux-logger');
var {persistStore, autoRehydrate} = require('redux-persist');
var {AsyncStorage} = require('react-native');
var reducers = require('../reducers');
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var store;
var createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
var globalReducers = ['login'];

function getStore() {
  if (!store) {
    store = autoRehydrate()(createStoreWithMiddleware)(reducers);

    if (isDebuggingInChrome) {
      window.store = store;
    }
  }

  return store;
}

function configureGlobalStore(onComplete) {
  const _store = getStore();
  const config = {
    storage: AsyncStorage,
    keyPrefix: 'redux-global-env',
    whitelist: globalReducers,
  };

  persistStore(_store, config, onComplete);
  return _store;
}

function configureUserStore(onComplete) {
  const _store = getStore();
  const config = {
    storage: AsyncStorage,
    keyPrefix: 'redux-user-env',
    blacklist: globalReducers,
  };


  return _store;
}

module.exports = { configureGlobalStore, configureUserStore };
