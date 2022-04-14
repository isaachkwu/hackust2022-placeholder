import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'

// import TestPage from './routes/TestPage'
import Home from 'routes/Home'
import WordBank from 'routes/WordBank'
import Setting from 'routes/Setting'
import Tutorial from 'routes/Tutorial'
import CommingSoon from 'routes/CommingSoon'
import ErrorPage from 'routes/ErrorPage'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="darkmode" element={<CommingSoon />} />
            <Route path="word" element={<CommingSoon />}>
              <Route path=":wordId" element={<CommingSoon />} />
            </Route>
            <Route path="setting" element={<CommingSoon />}/>
            <Route path="tutorial" element={<CommingSoon/>}/>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
