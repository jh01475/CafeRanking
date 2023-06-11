/* eslint-disable */
import './App.css';
import { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SearchTab from './components/SearchTab';
import SelectDayType from './components/SelectDayType';
import RankDayResult from './components/RankDayResult';
import RankWeekResult from './components/RankWeekResult';
import RankMonthResult from './components/RankMonthResult';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fragment><Header /><SearchTab /><Home /></Fragment>} />
          <Route path="/search" element={<Fragment><Header /><SearchTab /><SelectDayType /></Fragment>} />
          <Route path="/rank/daily" element={<Fragment><Header /><SearchTab /><RankDayResult /></Fragment>} />
          <Route path="/rank/weekly" element={<Fragment><Header /><SearchTab /><RankWeekResult /></Fragment>} />
          <Route path="/rank/monthly" element={<Fragment><Header /><SearchTab /><RankMonthResult /></Fragment>} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

function PageNotFound() {
  return (
    <div className='not-found'>
      <h1><div>Page Not Found</div></h1>
      <h2>잘못된 주소입니다.</h2> 
    </div>
  )
}