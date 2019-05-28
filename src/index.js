import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      < Route 
        path='/'
        component={ App }
      />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);

