// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BusBookingApp from "./component/bus/book";
import Terms from "./component/bus/terms";
import FloatingWhatsappButton from "./component/bus/whatsapp";
import Bus from "./component/bus/bus";
import Jeep from "./component/bus/jeep";   
import HiaceBooking from "./component/bus/hiace"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <nav className="p-4 bg-slate-950 text-white flex gap-4">
          <Link to="/" className="hover:underline">
            Bus Booking
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms &amp; Conditions
          </Link>
          <Link to="/bus" className="hover:underline">
            Buses
          </Link>
          <Link to="/jeep" className="hover:underline">
            Jeeps
          </Link>
          <Link to="/hiace" className="hover:underline">
           Hiace
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<BusBookingApp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/jeep" element={<Jeep />} />  
          <Route path="/hiace" element={<HiaceBooking />} />  
        </Routes>

        <FloatingWhatsappButton />
      </div>
    </Router>
  );
}

export default App;
