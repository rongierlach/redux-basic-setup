'use strict';

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Initial State
** ******************* */
var initialState = [];

/* Redux Middleware
** ******************* */
var thunkMiddleware = _reduxThunk2.default;
// logMiddleware example
var logMiddleware = function logMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      console.log('Action Type received:', action.type);
      return next(action);
    };
  };
};

/* Action Types
** ******************* */
var types = {
  PUSH_DATA: 'PUSH_DATA',
  POP_DATA: 'POP_DATA'
};

/* Action Creators
** ******************* */
function pushDataAction(data) {
  return {
    type: types.PUSH_DATA,
    payload: data
  };
}

function popDataAction() {
  return {
    type: types.POP_DATA,
    payload: null
  };
}

/* Reducer
** ******************* */
var rootReducer = function rootReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  var newState = (0, _immutable.List)(state);

  switch (action.type) {
    case types.PUSH_DATA:
      return newState.push(action.payload).toJS();
    case types.POP_DATA:
      return newState.pop().toJS();
    default:
      return state;
  }
};

/* Configure Store
** ******************* */
var store = (0, _redux.compose)((0, _redux.applyMiddleware)(logMiddleware, thunkMiddleware))(_redux.createStore)(rootReducer, initialState);

store.subscribe(function () {
  console.log('Latest store state:', store.getState());
});

// Let's use it!
store.dispatch(pushDataAction("foo"));
store.dispatch(pushDataAction("bar"));
store.dispatch(popDataAction());