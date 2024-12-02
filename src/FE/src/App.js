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
import './assets/styles/responsives.css';

import AdminLayout from './components/admin/layout/AdminLayout';
import AdminDashboard from './components/admin/pages/dashboard/AdminDashboard';
import AdminAircrafts from './components/admin/pages/aircrafts/AdminAircrafts';
import AdminFlights from './components/admin/pages/flights/AdminFlights';
import AdminAdvertisements from './components/admin/pages/advertisements/AdminAdvertisements';
import AdminBookings from './components/admin/pages/bookings/AdminBookings';

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

          <rd.Route path="/admin" element={<AdminLayout />}>
            <rd.Route index element={<rd.Navigate to="/admin/dashboard" replace />} />
            <rd.Route path="dashboard" element={<AdminDashboard />}></rd.Route>
            <rd.Route path="aircrafts" element={<AdminAircrafts />}></rd.Route>
            <rd.Route path="flights" element={<AdminFlights />}></rd.Route>
            <rd.Route path="advertisements" element={<AdminAdvertisements />}></rd.Route>
            <rd.Route path="bookings" element={<AdminBookings />}></rd.Route>
          </rd.Route>
        </rd.Routes>
        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
