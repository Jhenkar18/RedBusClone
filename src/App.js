import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './Frontend/components/Navbar';
import Footer from './Frontend/components/Footer'; // Assuming you have a Footer component
import './App.css';
import { UserProvider } from './Frontend/components/UserContext';

// Normal imports for other components
import Main from './Frontend/components/Main';
import TrendingOffers from './Frontend/components/TrendingOffers';
import BusTicketBooking from './Frontend/components/BusTicketBooking';
import GlobalPresence from './Frontend/components/GlobalPresence';
import GovernmentBuses from './Frontend/components/GovernmentBuses';
import Train from './Frontend/components/Train';
import Enjoytheapp from './Frontend/components/Enjoytheapp';
import PrimoBanner from './Frontend/components/PrimoBanner';
import Faqs from './Frontend/components/Faqs';
import BusResults from './Frontend/components/BusResults';
import PassengerDetails from './Frontend/components/PassengerDetails';
import PaymentDetails from './Frontend/components/PaymentDetails';
import Confirmation from'./Frontend/components/Confirmation'
import PrintTicket from './Frontend/components/PrintTicket';
import EmailTicket from './Frontend/components/EmailTicket';
import CancelTicket from './Frontend/components/CancelTicket';
import Login from './Frontend/components/Login';

// Lazy load the Signup component
const Signup = lazy(() => import('./Frontend/components/Signup'));

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Main />
      <TrendingOffers />
      <GovernmentBuses />
      <Train />
      <Enjoytheapp />
      <PrimoBanner />
      <GlobalPresence />
      <BusTicketBooking />
      <Faqs />
    </main>
    <Footer />
  </>
);

const AuthLayout = () => (
  <>
    <Navbar />
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />} />
         
            <Route path="/signup" element={<AuthLayout />}>
              <Route index element={<Signup />} />
            </Route>
            <Route path="/Login" element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
          
            <Route path="/bus-results" element={<AuthLayout />}>
              <Route index element={<BusResults />} />
            </Route>
            <Route path="/passenger-details" element={<AuthLayout />}>
              <Route index element={<PassengerDetails />} />
            </Route>
            <Route path="/payment" element={<AuthLayout />}>
              <Route index element={<PaymentDetails />} />
            </Route>
            <Route path="/Confirmation" element={<AuthLayout />}>
              <Route index element={<Confirmation />} />
            </Route>
            <Route path="/PrintTicket" element={<AuthLayout />}>
              <Route index element={<PrintTicket />} />
            </Route>
            <Route path="/EmailTicket" element={<AuthLayout />}>
              <Route index element={<EmailTicket />} />
            </Route>
            <Route path="/CancelTicket" element={<AuthLayout />}>
              <Route index element={<CancelTicket />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
