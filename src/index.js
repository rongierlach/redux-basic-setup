import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Immutable, { List } from 'immutable'

/* Initial State
** ******************* */
const initialState = []

/* Redux Middleware
** ******************* */
const thunkMiddleware = thunk
// logMiddleware example
const logMiddleware = ({ dispatch, getState }) => {
  return (next) => {
    return (action) => {
      console.log('Action Type received:', action.type)
      return next(action)
    }
  }
}

/* Action Types
** ******************* */
const types = {
  PUSH_DATA: 'PUSH_DATA',
  POP_DATA: 'POP_DATA'
}

/* Action Creators
** ******************* */
function pushDataAction(data) {
  return {
    type: types.PUSH_DATA,
    payload: data
  }
}

function popDataAction() {
  return {
    type: types.POP_DATA,
    payload: null
  }
}

/* Reducer
** ******************* */
const rootReducer = (state=initialState, action) => {
  const newState = List(state)

  switch (action.type) {
    case types.PUSH_DATA:
      return newState.push(action.payload).toJS()
    case types.POP_DATA:
      return newState.pop().toJS()
    default:
      return state
  }
}

/* Configure Store
** ******************* */
const store = compose(
  applyMiddleware(logMiddleware, thunkMiddleware)
)(createStore)(rootReducer, initialState)

store.subscribe(() => {
  console.log('Latest store state:', store.getState())
})

// Let's use it!
store.dispatch(pushDataAction("foo"))
store.dispatch(pushDataAction("bar"))
store.dispatch(popDataAction())
