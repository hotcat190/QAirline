import React, { Component } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
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

import AdminLayout from './components/admin/layout/AdminLayout';
import AdminDashboard from './components/admin/pages/dashboard/AdminDashboard';
import AdminAircrafts from './components/admin/pages/aircrafts/AdminAircrafts';
import AdminFlights from './components/admin/pages/flights/AdminFlights';
import AdminAdvertisements from './components/admin/pages/advertisements/AdminAdvertisements';
import AdminBookings from './components/admin/pages/bookings/AdminBookings';
import { AuthProvider } from 'contexts/AuthContext';
import Footer from 'components/Footer/Footer';

const DefaultLayout = () => {
  const location = useLocation();
  
  if (location.pathname.includes('/searchflights') || location.pathname.includes('/passenger')) {
    return (
      <>
        <ActionForm />
        <MobileHeader />
        <Header />
        <rd.Outlet />
      </> 
    );
  } else {
    return (
      <>
        <ActionForm />
        <MobileHeader />
        <Header />
        <rd.Outlet />
        <Footer />
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <rd.Routes>
              <rd.Route path="/" element={<DefaultLayout />}>
                <rd.Route index element={<Home />}></rd.Route>
                <rd.Route path="/myflights" element={<MyFlight />}></rd.Route>
                <rd.Route path="/news" element={<News />}></rd.Route>
                <rd.Route path="/destination" element={<Destination />}></rd.Route>
                <rd.Route path="/searchflights" element={<SearchFlight />}></rd.Route>
                <rd.Route path="/passenger" element={<Passenger />}></rd.Route>
              </rd.Route>
              
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
      </AuthProvider>
    );
  }
}

export default App;
