import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {combineReducers,createStore} from 'redux';
import reducer from './store/reducer.js';
import cartreducer from './store/cartreducer.js';
const rootReducer=combineReducers({
  titleReducer:reducer,
  cart:cartreducer
})
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
