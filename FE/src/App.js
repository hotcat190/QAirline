import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as rd from 'react-router-dom'
import './assets/styles/reset.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Clients from './components/Clients/Clients';
import TravelEase from './components/TravelEase/TravelEase';
import Featured from './components/Featured/Featured';
import Statinfo from './components/Statistic/Statinfo';
import SlideShow from './components/SlideShow/SlideShow';
import FAQ from './components/FAQ/FAQ';
import Subscription from './components/Subscription/Subscription';
import ActionForm from './components/ActionForm/ActionForm';
import MobileHeader from './components/Header/MobileHeader';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Destination from './components/pages/Destination';
import MyFlight from './components/pages/MyFlights';
import './assets/styles/responsives.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ActionForm />
          <MobileHeader />
          <Header />
       
          <rd.Routes>
          <rd.Route path="/" element={<Home />}></rd.Route>
          <rd.Route path="/myflights" element={<MyFlight />}></rd.Route>
          <rd.Route path="/about" element={<About />}></rd.Route>
          <rd.Route path="/destination" element={<Destination />}></rd.Route>
        </rd.Routes>
        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
