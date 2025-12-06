import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import womanbook from "../assets/womanbook.jpg";
import { FaTimes } from "react-icons/fa";
import BookingForWomenModal from "./BookingForWomen";
import { useNavigate } from "react-router-dom";

export default function NavbarBooking() {
// dynamic data
const cities = ["Kathmandu", "Biratnagar", "Dharan", "Kakarvitta"];

const [showMobileBooking, setShowMobileBooking] = useState(false);
const [openWomenModal, setOpenWomenModal] = useState(false);
const navigate=useNavigate();


// controlled form state
const [from, setFrom] = useState(cities[0]);
const [to, setTo] = useState("");
const [date, setDate] = useState("");
const [adults, setAdults] = useState(1);

// dropdown visibility
const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
const [showMobilePassengerDropdown, setShowMobilePassengerDropdown] = useState(false);

// refs for click-outside detection
const desktopDropdownRef = useRef(null);
const mobileDropdownRef = useRef(null);

// derived text
const passengerText = `${adults} Passenger${adults > 1 ? "s" : ""}`;

// close dropdowns when clicking outside
useEffect(() => {
function onDocClick(e) {
    if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target)) {
    setShowPassengerDropdown(false);
    }
    if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
    setShowMobilePassengerDropdown(false);
    }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
}, []);

  // handlers
function handleSearch(e) {
    e?.preventDefault?.();
    const payload = {
    from,
    to,
    date,
    passengers: { adults },
    };
    // Replace with API call / navigation
    console.log("Search payload:", payload);
    return payload;
}

function swapFromTo() {
setFrom((prevFrom) => {
    const oldFrom = prevFrom;
    setTo(oldFrom === to ? "" : oldFrom); // if to equals from, keep it simple
    return to || prevFrom;
});
}

return (
<header className=" navbar w-full  text-white bg-[#0A1420]">
    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        {/* Logo */}
        <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-16 md:h-20 rounded-lg" />


            {/* MOBILE NAVBAR */}
            <div className="flex md:hidden w-full bg-[#0A1420] px-4 py-3 items-center justify-between ">
                <button
                    onClick={() => setShowMobileBooking(true)}
                    className="text-white text-xl "
                >
                    ☰
                </button>
            </div>
        </div>


        {/* Desktop Booking Form */}
        <div className="hidden md:flex flex-1 max-w-5xl  bg-gray-700/50 p-3 rounded-full border border-gray-600 items-center space-x-2">
            {/* From */}
            <div className="flex w-full md:w-auto flex-col items-center p-2 rounded-full hover:bg-gray-600/50 transition relative group">
            <span className="text-teal-600 text-xs uppercase font-semibold">From</span>
            <select
                id="fromDestination"
                className="header-input w-32 text-center font-bold bg-transparent cursor-pointer pr-8"
                value={from}
                onChange={(e) => {
                setFrom(e.target.value);
                // If user picks same as 'to', clear to
                if (e.target.value === to) setTo("");
                }}
            >
                {cities.map((c) => (
                <option key={c} value={c} className="bg-gray-800 text-white">
                    {c}
                </option>
                ))}
            </select>
            <span className="text-gray-400 text-xs">Origin</span>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-white pointer-events-none"></i>
            </div>

            <i className="fas fa-exchange-alt text-gray-400 text-sm hidden md:block" title="Swap from & to" />

            {/* To */}
            <div className="flex w-full md:w-auto flex-col items-center p-2 rounded-full hover:bg-gray-600/20 transition relative group">
            <span className="text-teal-600 text-xs uppercase font-semibold">To</span>
            <select
                id="toDestination"
                className="header-input w-32 text-center font-bold bg-transparent cursor-pointer pr-8"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            >
                <option value="" disabled className="bg-gray-800 text-white">
                Select Destination
                </option>
                {cities.map((c) => (
                <option key={c} value={c} className="bg-gray-800 text-white">
                    {c}
                </option>
                ))}
            </select>
            <span className="text-gray-400 text-xs">Destination</span>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-white pointer-events-none"></i>
        </div>

        <div className="hidden sm:block border-l border-gray-600 h-8 mx-2"></div>

        {/* Date */}
        <div className="flex w-full md:w-auto flex-col items-center p-2 rounded-full hover:bg-gray-600/20 transition">
            <span className="text-teal-600 text-xs uppercase font-semibold">Date</span>
                <input
                    id="departDate"
                    type="date"
                    className="header-input w-32 text-center font-bold cursor-pointer"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            <span className="text-gray-400 text-xs">Depart</span>
        </div>

        {/* Passengers */}
        <div
            id="passengerInputContainer"
            className="flex w-full md:w-auto flex-col items-center p-2 rounded-full hover:bg-gray-600/20 transition passenger-counter-container"
            onClick={(e) => {
                e.stopPropagation();
                setShowPassengerDropdown((s) => !s);
            }}
            ref={desktopDropdownRef}
            >
            <span className="text-teal-600 text-xs uppercase font-semibold">Passengers</span>
                    <input
                        id="passengerCountDisplay"
                        type="text"
                        value={passengerText}
                        readOnly
                        className="header-input w-32 text-center font-bold cursor-pointer"
                        />
            <span className="text-gray-400 text-xs">Total</span>

            <div id="passengerDropdown" className={`passenger-dropdown dropdown-animate ${showPassengerDropdown ? "show" : ""}`} aria-hidden={!showPassengerDropdown}>
                <div className="passenger-control">
                    <span className="text-gray-800 font-medium">Adults</span>
                        <div className="flex items-center space-x-2">
                            <button 
                                type="button"
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    setAdults((a) => Math.max(1, a - 1));
                                }}
                                aria-label="Decrease adults"
                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                >-
                            </button>
                            <span id="adultCount" className="text-gray-800 font-bold w-6 text-center">{adults}</span>
                            <button
                            type="button"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                setAdults((a) => a + 1);
                            }}
                            aria-label="Increase adults"
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            >
                            +
                            </button>
                        </div>
                </div>
            </div>
        </div>

        <div className="hidden sm:block border-l border-gray-600 h-8 mx-2"></div>

            {/* Women Booking */}
            <div className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-600/20 transition cursor-pointer" id="womenBookingButton">
                <img src={womanbook} alt="Women Icon" className="w-6 h-6 custom-logo-radius1" />
                <div className="flex flex-col text-left">
                    <span className="text-white text-sm font-semibold">Booking for women</span>
                    <button
                        type="button"
                        onClick={() => setOpenWomenModal(true)}
                        className="text-blue-900 text-xs hover:underline"
                    >
                        Know more
                    </button>
                </div>
                <label className="toggle-switch">
                <input
                    type="checkbox"
                    id="womenBookingToggle"
                    onChange={(e) => setOpenWomenModal(e.target.checked)}
                />
                <span className="slider"></span>
                </label>
            </div>

            <button
            id="searchBusButton"
            className="bg-[#1b5d67f5] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-simrik-teal transition duration-300 w-full md:w-auto mt-2 md:mt-0"
                onClick={()=> navigate("/search-details")}
            >
            SEARCH BUS
            </button>
        </div>
        
        {/* MOBILE BOOKING FORM */}
        {showMobileBooking && (
        <div
            id="mobileBookingContainer"
            className="md:hidden w-full mobile-booking-container bg-gray-700/50 p-4 rounded-2xl relative">
            
            {/* CLOSE BUTTON */}
            <button
            className="absolute top-1 right-3 text-white text-lg z-50"
            type="button"
            onClick={() => setShowMobileBooking(false)}
            >
            <FaTimes />
            </button>

            {/* ROW 1 — FROM + TO */}
            <div className="mobile-booking-row grid grid-cols-2 gap-3 mb-3">
                <div className="mobile-booking-item">
                    <span className="text-teal-600 text-xs uppercase font-semibold">From</span>
                        <select
                        className="header-input w-full text-center font-bold bg-transparent cursor-pointer"
                        value={from}
                        onChange={(e) => {
                            setFrom(e.target.value);
                            if (e.target.value === to) setTo("");
                        }}
                        >
                        {cities.map((c) => (
                            <option key={c} value={c} className="bg-gray-800 text-white">
                            {c}
                            </option>
                        ))}
                        </select>
                    <span className="text-gray-400 text-xs">Origin</span>
                </div>

                <div className="mobile-booking-item">
                    <span className="text-teal-600 text-xs uppercase font-semibold">To</span>
                        <select
                            className="header-input w-full text-center font-bold bg-transparent cursor-pointer"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            >
                            <option value="" disabled className="bg-gray-800 text-white">
                                Destination
                            </option>
                            {cities.map((c) => (
                                <option key={c} value={c} className="bg-gray-800 text-white">
                                {c}
                                </option>
                                ))}
                        </select>
                    <span className="text-gray-400 text-xs">Destination</span>
                </div>
            </div>

            {/* ROW 2 — DATE + PASSENGERS */}
                <div className="mobile-booking-row grid grid-cols-2 gap-3 mb-3">
                    <div className="mobile-booking-item">
                        <span className="text-teal-600 text-xs uppercase font-semibold">Date</span>
                            <input
                            type="date"
                            className="header-input w-full text-center font-bold cursor-pointer"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            />
                        <span className="text-gray-400 text-xs">Depart</span>
                    </div>

                    <div className="mobile-booking-item mobile-passenger-counter-container"
                        ref={mobileDropdownRef}>
                        <span className="text-teal-600 text-xs uppercase font-semibold">Passengers</span>
                            <input
                            type="text"
                            value={passengerText}
                            readOnly
                            className="header-input w-full text-center font-bold cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMobilePassengerDropdown((s) => !s);
                            }}
                            />
                        <span className="text-gray-400 text-xs">Total</span>

                        {showMobilePassengerDropdown && (
                        <div className="mobile-passenger-dropdown dropdown-animate show">
                            <div className="passenger-control">
                            <span className="text-gray-800 font-medium">Adults</span>
                            <div className="flex items-center space-x-2">
                                    <button
                                    type="button"
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        setAdults((a) => Math.max(1, a - 1));
                                    }}
                                    >
                                    -
                                    </button>
                                <span className="text-gray-800 font-bold w-6 text-center">{adults}</span>
                                <button
                                type="button"
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    setAdults((a) => a + 1);
                                }}
                                >
                                +
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>

            {/* WOMEN BOOKING */}
            <div className="mobile-booking-row mb-3">
                <div className="mobile-booking-item flex items-center justify-center">
                    <img src={womanbook} alt="" className="w-5 h-5 mr-2" />
                    <div className="flex flex-col text-left">
                    <span className="text-white text-xs font-semibold">Women Booking</span>
                    <button
                        type="button"
                        onClick={() => setOpenWomenModal(true)}
                        className="text-blue-300 text-xs hover:underline"
                    >
                        Know more
                    </button>
                    </div>
                    <input
                    type="checkbox"
                    onChange={(e) => setOpenWomenModal(e.target.checked)}
                    />
                </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
            className="bg-[#1b5d67f5] text-white mobile-search-button font-semibold shadow-lg hover:bg-simrik-teal transition w-full"
            onClick={()=> navigate("/search-details")}
            >
            SEARCH BUS
            </button>
        </div>
        )}

        {/*  FIXED → MUST BE SELF-CLOSED  */}
        <BookingForWomenModal
        open={openWomenModal}
        onClose={() => setOpenWomenModal(false)}
        />
    </div>
</header>
);
}
