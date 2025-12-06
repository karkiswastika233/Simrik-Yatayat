import React, { useState } from "react";
import simrikBus from "../assets/simrik.png";
import jeepImg from "../assets/jeep.png";
import hiaceImg from "../assets/hiace.png";

/* gallery / interior images */
// BUS interiors
import busSeatStandard from "../assets/seat.webp";
import busSeatDeluxe from "../assets/busSeat.jpeg";
import busSeatSleeper from "../assets/busSeat1.jpeg";

// JEEP interiors
import jeepSeat1 from "../assets/jeepSeat.jpg";
import jeepSeat2 from "../assets/jeepSeat2.jpg";

// HIACE interiors
import hiaceSeat1 from "../assets/HiaceSeat.jpg";
import hiaceSeat2 from "../assets/HiaceSeat2.webp";
import hiaceSeat3 from "../assets/HSeat.jpeg";

/* VEHICLES */
const vehicles = [
// BUSES
{
id: "deluxe",
type: "bus",
image: simrikBus,
name: "Simrik Deluxe A/C (Bus)",
departure: "7:00 AM",
arrival: "3:00 PM",
price: 1500,
features: ["A/C", "Wi-Fi", "Charging Port"],
amenities: ["Water Bottle", "Sofa Seats", "Reading Light"],
gallery: [busSeatDeluxe, busSeatStandard],
boardingPoints: ["Boudha (06:00 AM)", "Koteshwor (06:20 AM)"],
droppingPoints: ["Kakarvitta (03:00 PM)"],
},
{
id: "express",
type: "bus",
image: simrikBus,
name: "Simrik Express (Bus)",
departure: "9:30 AM",
arrival: "5:30 PM",
price: 1100,
features: ["Wi-Fi", "Charging Port"],
amenities: ["Bottle of Water", "Reclining Seats"],
gallery: [busSeatStandard],
boardingPoints: ["Kalanki (09:00 AM)"],
droppingPoints: ["Kakarvitta (05:30 PM)"],
},
{
id: "night",
type: "bus",
image: simrikBus,
name: "Simrik Night Rider (Bus)",
departure: "10:00 PM",
arrival: "6:00 AM",
price: 1080,
features: ["A/C", "Wi-Fi", "Sleeper"],
amenities: ["Blanket", "Pillow", "Charging Port"],
gallery: [busSeatSleeper, busSeatDeluxe],
boardingPoints: ["Gaushala (09:30 PM)", "Koteshwor (09:45 PM)"],
droppingPoints: ["Kakarvitta (06:00 AM)"],
},

// JEEPS
{
id: "jeep-sharing",
type: "jeep",
image: jeepImg,
name: "Simrik Shared Jeep",
departure: "6:00 AM",
arrival: "1:30 PM",
price: 900,
features: ["Non A/C", "Music", "Charging Port"],
amenities: ["Bottle of Water", "Comfortable Seats"],
gallery: [jeepSeat1, jeepSeat2],
boardingPoints: ["Koteshwor (05:30 AM)", "Jadibuti (05:45 AM)"],
droppingPoints: ["Kakarvitta (01:30 PM)"],
},
{
id: "jeep-private",
type: "jeep",
image: jeepImg,
name: "Simrik Private Jeep",
departure: "8:00 AM",
arrival: "3:00 PM",
price: 4500,
features: ["A/C", "Private Hire"],
amenities: ["Flexible Stops", "Spacious Luggage"],
gallery: [jeepSeat2, jeepSeat1],
boardingPoints: ["Thamel (07:30 AM)", "Koteshwor (07:50 AM)"],
droppingPoints: ["Kakarvitta (03:00 PM)"],
},

// HIACE
{
id: "hiace-morning",
type: "hiace",
image: hiaceImg,
name: "Simrik Hiace Morning",
departure: "5:30 AM",
arrival: "1:00 PM",
price: 1000,
features: ["A/C", "Wi-Fi"],
amenities: ["Water Bottle", "Reclining Seats"],
gallery: [hiaceSeat1, hiaceSeat2, hiaceSeat3],
boardingPoints: ["Balaju (05:00 AM)", "Sorhakhutte (05:10 AM)"],
droppingPoints: ["Kakarvitta (01:00 PM)"],
},
{
id: "hiace-night",
type: "hiace",
image: hiaceImg,
name: "Simrik Hiace Night",
departure: "8:30 PM",
arrival: "5:00 AM",
price: 950,
features: ["Non A/C", "Music System"],
amenities: ["Blanket", "Neck Pillow"],
gallery: [hiaceSeat3, hiaceSeat2, hiaceSeat1],
boardingPoints: ["Koteshwor (08:00 PM)", "Gwarko (08:15 PM)"],
droppingPoints: ["Kakarvitta (05:00 AM)"],
},
];

/* SEAT GENERATOR */
const createLayout = (rows, cols, options = {}) => {
const { occupiedIds = [], womenIds = [], allowedIds = null } = options;

const occupiedSet = new Set(occupiedIds);
const womenSet = new Set(womenIds);
const allowedSet = allowedIds ? new Set(allowedIds) : null;

const seats = [];

for (let r = 1; r <= rows; r++) {
for (const c of cols) {
    const id = `${r}${c}`;

    if (allowedSet && !allowedSet.has(id)) continue;

    seats.push({
    id,
    status: occupiedSet.has(id) ? "occupied" : "available",
    type: womenSet.has(id) ? "women" : "normal",
    });
}
}

return { rows, cols, seats };
};

/* SEAT LAYOUTS */
const seatLayouts = {
bus: createLayout(10, ["A", "B", "C", "D"], {
occupiedIds: ["1B", "2A", "2D", "4B", "4C", "5D", "6A", "7B", "9A"],
womenIds: ["3C", "5A", "7C", "8D"],
}),

jeep: createLayout(3, ["A", "B", "C", "D"], {
allowedIds: ["1A", "2A", "2B", "2C", "2D", "3A", "3B", "3C", "3D"],
occupiedIds: ["2B", "3C"],
womenIds: ["2A", "3D"],
}),

hiace: createLayout(5, ["A", "B", "C", "D", "E"], {
allowedIds: [
    "1A",
    "2A",
    "2B",
    "2C",
    "3A",
    "3B",
    "3D",
    "4A",
    "4B",
    "4D",
    "5A",
    "5B",
    "5C",
    "5D",
    "5E",
],
occupiedIds: ["2C", "3D", "4B"],
womenIds: ["1A", "3B", "5C"],
}),
};

/* MAIN COMPONENT */
const BusBookingApp = () => {
const [selectedBus, setSelectedBus] = useState(null);
const [selectedSeats, setSelectedSeats] = useState([]);
const [expandedBusId, setExpandedBusId] = useState(vehicles[0].id);
const [expandedTab, setExpandedTab] = useState("amenities");

const seatPrice = selectedBus ? selectedBus.price : 0;
const totalPrice = selectedSeats.length * seatPrice;

const handleToggleSeat = (seat) => {
if (seat.status === "occupied") return;

setSelectedSeats((prev) =>
    prev.includes(seat.id)
    ? prev.filter((s) => s !== seat.id)
    : [...prev, seat.id]
);
};

const handleSelectBus = (bus) => {
setSelectedBus(bus);
setSelectedSeats([]);
};

const closeSeatModal = () => {
setSelectedBus(null);
setSelectedSeats([]);
};

const handleConfirmSelection = () => {
if (!selectedSeats.length) {
    alert("Please select at least one seat.");
    return;
}
const seatsList = selectedSeats.join(", ");
alert(`You have selected seats: ${seatsList}. Total: Rs. ${totalPrice}`);
closeSeatModal();
};

return (
<div className="min-h-screen fixed inset-0 bg-black/50 backdrop-blur-sm bg-black/10 p-10 font-[system-ui] ">
    {/* MAIN RESULTS */}
    <main className="flex justify-center items-start px-4 pt-6 pb-8">
    <section className="w-full max-w-[960px] bg-white rounded-[24px] p-[20px] pb-[18px] shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
        <div className="flex items-center justify-between gap-3 mb-4">
        <div>
            <h2 className="m-0 text-[20px] font-bold text-slate-900">
            Available Buses, Jeeps &amp; Hiace
            </h2>
            <p className="mt-1 mb-0 text-[13px] text-gray-500">
            Choose a vehicle and then pick your preferred seats.
            </p>
        </div>

        <span className="inline-flex items-center gap-[6px] rounded-full px-3 py-[6px] text-[12px] font-medium bg-[#ecfdf5] text-[#047857]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            {vehicles.length} vehicles found
        </span>
        </div>

        {/* VEHICLE LIST */}
        <div className="flex flex-col gap-3 mt-1">
        {vehicles.map((bus) => (
            <article
            key={bus.id}
            className="rounded-[18px] border border-slate-200 px-4 py-3 transition-all duration-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.18)] hover:border-[#bae6fd] hover:-translate-y-[2px]"
            >
            <div className="flex justify-between gap-4">
                {/* LEFT: IMAGE + INFO */}
                <div className="flex flex-1 items-center gap-4">
                <div className="w-[170px] h-[120px] rounded-[14px] overflow-hidden flex-shrink-0 bg-gray-100 shadow-[0_8px_22px_rgba(15,23,42,0.18)]">
                    <img
                    src={bus.image}
                    alt={bus.name}
                    className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-[6px]">
                    <h3 className="m-0 mb-1 text-[17px] font-bold text-slate-900 tracking-[0.4px]">
                    {bus.name}
                    </h3>

                    <p className="m-0 mb-[6px] text-[13px] text-slate-600 flex flex-wrap gap-1 items-baseline tracking-[0.25px]">
                    <span className="font-semibold text-slate-700 tracking-[0.3px]">
                        Departure
                    </span>
                    <span className="font-semibold text-slate-900 tracking-[0.4px]">
                        {bus.departure}
                    </span>

                    <span className="mx-1 text-gray-400">•</span>

                    <span className="font-semibold text-slate-700 tracking-[0.3px]">
                        Arrival
                    </span>
                    <span className="font-semibold text-slate-900 tracking-[0.4px]">
                        {bus.arrival}
                    </span>
                    </p>

                    <div className="flex flex-wrap gap-[6px]">
                    {bus.features.map((f) => (
                        <span
                        key={f}
                        className="text-[11px] px-[9px] py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 tracking-[0.35px]"
                        >
                        {f}
                        </span>
                    ))}
                    </div>
                </div>
                </div>

                {/* RIGHT: PRICE + BUTTON */}
                <div className="flex flex-col items-end justify-between gap-2">
                <div className="text-right">
                    <div className="text-[18px] font-bold text-[#047857] tracking-[0.4px]">
                    Rs. {bus.price}
                    </div>
                    <div className="text-[11px] text-slate-500 tracking-[0.3px]">
                    per person
                    </div>
                </div>

                <button
                    className="border-none rounded-full px-[18px] py-2 text-[13px] font-semibold cursor-pointer bg-[#00bfa5] text-white shadow-[0_10px_25px_rgba(0,191,165,0.4)] transition-all duration-150 hover:bg-[#009f8a] hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(0,191,165,0.45)]"
                    onClick={() => handleSelectBus(bus)}
                >
                    Select Seats
                </button>
                </div>
            </div>

            {/* TABS */}
            <div className="mt-[10px] pt-[10px] border-t border-slate-200 flex flex-wrap gap-4 text-[12px]">
                {[
                { key: "amenities", label: "Amenities" },
                { key: "boarding", label: "Boarding & Dropping Point" },
                { key: "gallery", label: "Gallery" },
                ].map((tab) => {
                const active =
                    expandedBusId === bus.id && expandedTab === tab.key;

                return (
                    <button
                    key={tab.key}
                    className={`bg-transparent border-none pb-1 pt-1 px-0 text-[12px] cursor-pointer ${
                        active
                        ? "border-b-2 border-[#00bfa5] text-[#0f766e] font-semibold"
                        : "border-b-2 border-transparent text-gray-500"
                    }`}
                    onClick={() => {
                        setExpandedBusId(bus.id);
                        setExpandedTab(tab.key);
                    }}
                    >
                    {tab.label}
                    </button>
                );
                })}
            </div>

            {/* TAB CONTENT */}
            {expandedBusId === bus.id && (
                <div className="mt-2 bg-[#f9fafb] rounded-[12px] px-3 py-[10px] text-[13px] text-slate-600 tracking-[0.3px]">
                {expandedTab === "amenities" && (
                    <>
                    {bus.amenities?.length ? (
                        <ul className="m-0 pl-[18px] tracking-[0.25px] list-disc">
                        {bus.amenities.map((item) => (
                            <li key={item} className="mb-1 text-slate-600">
                            {item}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="m-0 text-[12px] text-gray-400">
                        No amenities information available.
                        </p>
                    )}
                    </>
                )}

                {expandedTab === "boarding" && (
                    <div className="flex flex-wrap gap-6">
                    <div>
                        <h4 className="m-0 mb-1 text-[13px] font-semibold">
                        Boarding Point
                        </h4>
                        <ul className="m-0 pl-[18px] tracking-[0.25px] list-disc">
                        {bus.boardingPoints.map((bp) => (
                            <li key={bp} className="mb-1 text-slate-600">
                            {bp}
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="m-0 mb-1 text-[13px] font-semibold">
                        Dropping Point
                        </h4>
                        <ul className="m-0 pl-[18px] tracking-[0.25px] list-disc">
                        {bus.droppingPoints.map((dp) => (
                            <li key={dp} className="mb-1 text-slate-600">
                            {dp}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                )}

                {expandedTab === "gallery" && (
                    <>
                    {bus.gallery?.length ? (
                        <div className="flex flex-wrap gap-3">
                        {bus.gallery.map((img, index) => (
                            <img
                            key={index}
                            src={img}
                            alt={`${bus.name} interior ${index + 1}`}
                            className="w-[120px] h-[90px] object-cover rounded-[12px] shadow-[0_6px_14px_rgba(15,23,42,0.15)] cursor-pointer transition-transform duration-200 hover:scale-[1.06]"
                            />
                        ))}
                        </div>
                    ) : (
                        <p className="m-0 text-[12px] text-gray-400">
                        No gallery available.
                        </p>
                    )}
                    </>
                )}
                </div>
            )}
            </article>
        ))}
        </div>
    </section>
    </main>

    {/* SEAT SELECT MODAL */}
    {selectedBus && (
    <div
        className=" fixed inset-0 bg-[rgba(15,23,42,0.7)] flex items-center justify-center  z-40 "
        onClick={closeSeatModal}
    >
        <div
        className="w-full max-w-[720px] max-h-[100vh] bg-white rounded-[24px] shadow-[0_26px_80px_rgba(15,23,42,0.8)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        >
        <header className="px-5 py-[14px] border-b border-slate-200 flex items-center justify-between gap-3">
            <div>
            <h3 className="m-0 text-[17px] font-bold">
                Select Seats – {selectedBus.name}
            </h3>
            <p className="mt-1 mb-0 text-[12px] text-gray-500">
                Click on available seats to select them.
            </p>
            </div>

            <button
            className="border-none bg-gray-100 w-[30px] h-[30px] rounded-full text-[18px] leading-none cursor-pointer flex items-center justify-center text-gray-600 hover:bg-gray-200"
            onClick={closeSeatModal}
            >
            ×
            </button>
        </header>

        <div className="px-5 pt-[14px] pb-1 overflow-y-auto">
            {/* driver */}
            <div className="flex justify-end mb-[10px]">
            <div className="inline-flex items-center justify-center px-[10px] py-1 rounded-full bg-gray-100 text-[11px] text-gray-600 mb-[10px] ml-auto">
                Driver
            </div>
            </div>

            {/* seat layout */}
            <div className="bg-[#f9fafb] rounded-[18px] px-4 pt-[14px] pb-4">
            {(() => {
                const layout =
                seatLayouts[selectedBus.type] || seatLayouts.bus;
                const { rows, cols, seats } = layout;

                return (
                <div className="flex flex-col items-center gap-[10px]">
                    {Array.from({ length: rows }, (_, rowIndex) => {
                    const rowNum = rowIndex + 1;

                    const leftCols = cols.slice(
                        0,
                        Math.ceil(cols.length / 2)
                    );
                    const rightCols = cols.slice(
                        Math.ceil(cols.length / 2)
                    );

                    const makeSeat = (letter) =>
                        seats.find((s) => s.id === `${rowNum}${letter}`);

                    const sides = [
                        leftCols.map(makeSeat),
                        rightCols.map(makeSeat),
                    ];

                    return (
                        <div className="flex gap-8" key={rowNum}>
                        {sides.map((pair, sideIndex) => (
                            <div className="flex" key={sideIndex}>
                            {pair.map(
                                (seat) =>
                                seat && (
                                    <button
                                    key={seat.id}
                                    className={[
                                        "relative w-10 h-10 rounded-[8px] border flex items-center justify-center text-[12px] font-semibold transition-colors duration-150",
                                        seat.status === "occupied"
                                        ? "bg-[#fb7185] border-[#fb7185] text-white cursor-not-allowed"
                                        : selectedSeats.includes(seat.id)
                                        ? "bg-[#059669] border-[#059669] text-white"
                                        : "bg-gray-100 border-slate-200 text-slate-900 hover:bg-emerald-100 hover:border-emerald-300",
                                    ].join(" ")}
                                    onClick={() =>
                                        handleToggleSeat(seat)
                                    }
                                    disabled={seat.status === "occupied"}
                                    >
                                    <span className="pointer-events-none">
                                        {seat.id}
                                    </span>

                                    {seat.type === "women" && (
                                        <span className="absolute bottom-1 right-1 w-[14px] h-[14px] rounded-full bg-[#ec4899] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                                        W
                                        </span>
                                    )}
                                    </button>
                                )
                            )}
                            </div>
                        ))}
                        </div>
                    );
                    })}

                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-3 mt-[14px] text-[11px] text-gray-600">
                    <div className="flex items-center gap-[6px]">
                        <span className="w-4 h-4 rounded-full inline-flex items-center justify-center bg-gray-200 border border-gray-300" />
                        <span>Available</span>
                    </div>

                    <div className="flex items-center gap-[6px]">
                        <span className="w-4 h-4 rounded-full inline-flex bg-[#fb7185]" />
                        <span>Occupied</span>
                    </div>

                    <div className="flex items-center gap-[6px]">
                        <span className="w-4 h-4 rounded-full inline-flex bg-[#059669]" />
                        <span>Selected</span>
                    </div>

                    <div className="flex items-center gap-[6px]">
                        <span className="w-4 h-4 rounded-full inline-flex items-center justify-center bg-[#ec4899] text-white text-[10px] font-bold">
                        W
                        </span>
                        <span>Women seat</span>
                    </div>
                    </div>
                </div>
                );
            })()}
            </div>
        </div>

        <footer className="px-5 py-[10px] pb-[14px] border-t border-slate-200 flex items-center justify-between gap-[10px] text-[13px]">
            <div className="flex flex-col gap-[2px]">
            <div>
                Selected Seats: <strong>{selectedSeats.length}</strong>
            </div>
            <div>
                Total: <strong>Rs. {totalPrice}</strong>
            </div>
            </div>

            <button
            className="border-none rounded-full px-[18px] py-2 text-[13px] font-semibold cursor-pointer bg-[#00bfa5] text-white shadow-[0_10px_25px_rgba(0,191,165,0.4)] transition-all duration-150 hover:bg-[#009f8a] hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(0,191,165,0.45)]"
            onClick={handleConfirmSelection}
            >
            Confirm Selection
            </button>
        </footer>
        </div>
    </div>
    )}
</div>
);
};

export default BusBookingApp;
