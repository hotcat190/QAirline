import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as rd from 'react-router-dom'
import './assets/styles/reset.css';
import Header from './components/Header/Header';
import ActionForm from './components/ActionForm/ActionForm';
import MobileHeader from './components/Header/MobileHeader';
import Home from './components/pages/Home';
import News from './components/pages/News';
import Destination from './components/pages/Destination';
import MyFlight from './components/pages/MyFlights';
import SearchFlight from './components/SearchFlight/SearchFlight';
import Passenger from './components/Passenger/Passenger';
import './assets/styles/responsives.css';
import Footer from './components/Footer/Footer';


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
            <rd.Route path="/news" element={<News />}></rd.Route>
            <rd.Route path="/destination" element={<Destination />}></rd.Route>
            <rd.Route path="/searchflights" element={<SearchFlight />}></rd.Route>
            <rd.Route path="/passenger" element={<Passenger />}></rd.Route>
          </rd.Routes>
          <Footer />
        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
