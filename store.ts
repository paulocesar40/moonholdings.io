import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { IinitialState } from './shared/types'
import { AssetsReducer, defaultAssetsState } from './reducers/assets'
import { BoardReducer } from './reducers/board'

const rootReducer = combineReducers({
  AssetsReducer,
  BoardReducer
});

export const defaultInitialState: IinitialState = {
  AssetsReducer: defaultAssetsState,
  BoardReducer: { overlay: false },
}

export function initializeStore(initialState: IinitialState = defaultInitialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
