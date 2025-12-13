// src/components/bus/HiaceBooking.jsx
import React, { useState } from "react";
import hiaceImg from "../../assets/hiace.png";

// HIACE interiors
import hiaceSeat1 from "../../assets/HiaceSeat.jpg";
import hiaceSeat2 from "../../assets/HiaceSeat2.webp";
import hiaceSeat3 from "../../assets/HSeat.jpeg";

/*  HIACE VEHICLES  */
const hiaces = [
  {
    id: "hiace-morning",
    type: "hiace",
    image: hiaceImg,
    name: "Simrik Hiace Morning",
    departure: "5:30 AM",
    arrival: "1:00 PM",
    price: 1000,
    timeOfDay: "day", // NEW
    features: ["A/C", "Wi-Fi"],
    amenities: ["Water Bottle", "Reclining Seats"],
    gallery: [hiaceSeat1, hiaceSeat2, hiaceSeat3],
    boardingPoints: ["Balaju (05:00 AM)", "Sorhakhutte (05:10 AM)"],
    droppingPoints: ["Kakarvitta (01:00 PM)"],
  },
  {
    id: "hiace-ev",
    type: "hiace",
    image: hiaceImg,
    name: "Simrik Hiace Electric (EV)",
    departure: "8:00 AM",
    arrival: "3:00 PM",
    price: 1200,
    timeOfDay: "day", // NEW
    features: ["Electric EV", "Silent Cabin", "A/C", "Wi-Fi", "USB Charging Ports"],
    amenities: ["Water Bottle", "Comfort Reclining Seats", "Eco-Friendly Ride"],
    gallery: [hiaceSeat1, hiaceSeat2],
    boardingPoints: ["Balaju (07:40 AM)", "Sorhakhutte (07:50 AM)"],
    droppingPoints: ["Kakarvitta (03:00 PM)"],
  },
  {
    id: "hiace-night",
    type: "hiace",
    image: hiaceImg,
    name: "Simrik Hiace Night",
    departure: "8:30 PM",
    arrival: "5:00 AM",
    price: 950,
    timeOfDay: "night", // NEW
    features: ["Non A/C", "Music System"],
    amenities: ["Blanket", "Neck Pillow"],
    gallery: [hiaceSeat3, hiaceSeat2, hiaceSeat1],
    boardingPoints: ["Koteshwor (08:00 PM)", "Gwarko (08:15 PM)"],
    droppingPoints: ["Kakarvitta (05:00 AM)"],
  },
];

const HiaceBooking = () => {
  const [expandedHiaceId, setExpandedHiaceId] = useState(hiaces[0].id);
  const [expandedTab, setExpandedTab] = useState("amenities");
  const [expandedImage, setExpandedImage] = useState(null);

  // filters (time of day + price + features)
  const [timeFilter, setTimeFilter] = useState("both"); // NEW: both / day / night
  const [priceFilter, setPriceFilter] = useState("any"); // any / under1000 / 1000-1500 / above1500
  const [featureFilters, setFeatureFilters] = useState({
    ac: false,
    wifi: false,
    electric: false,
  });

  // BOOKING MODAL STATE
  const [bookingHiace, setBookingHiace] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    days: "",
    pickupDate: "",
    pickupLocation: "",
    specialRequests: "",
  });

  const clearForm = () =>
    setForm({
      fullName: "",
      email: "",
      phone: "",
      days: "",
      pickupDate: "",
      pickupLocation: "",
      specialRequests: "",
    });

  const openBooking = (hiace) => {
    setBookingHiace(hiace);
    setShowBooking(true);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setBookingHiace(null);
    clearForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingHiace) return;

    const daysNumber = Number(form.days) > 0 ? Number(form.days) : 1;
    const total = bookingHiace.price * daysNumber;

    alert(
      `Booking confirmed!\n\n` +
        `Vehicle: ${bookingHiace.name}\n` +
        `Name: ${form.fullName}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `Days: ${daysNumber}\n` +
        `Pickup: ${form.pickupDate || "N/A"} from ${
          form.pickupLocation || "N/A"
        }\n\n` +
        `Total: Rs. ${total}`
    );

    closeBooking();
  };

  const toggleFeature = (key) => {
    setFeatureFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAllFilters = () => {
    setTimeFilter("both"); // reset NEW filter
    setPriceFilter("any");
    setFeatureFilters({ ac: false, wifi: false, electric: false });
  };

  const filteredHiaces = hiaces.filter((v) => {
    // time of day filter
    if (timeFilter !== "both" && v.timeOfDay !== timeFilter) return false;

    // price filter
    if (priceFilter === "under1000" && v.price >= 1000) return false;
    if (priceFilter === "1000-1500" && (v.price < 1000 || v.price > 1500))
      return false;
    if (priceFilter === "above1500" && v.price <= 1500) return false;

    // feature filters
    if (featureFilters.ac && !v.features.some((f) => f.includes("A/C")))
      return false;
    if (
      featureFilters.wifi &&
      !v.features.some((f) => f.toLowerCase().includes("wi-fi"))
    )
      return false;
    if (
      featureFilters.electric &&
      !v.features.some((f) => f.toLowerCase().includes("electric"))
    )
      return false;

    return true;
  });

  return (
    <div className='max-w-full min-h-screen bg-[#ffffffd7] text-[#0f172a] font-[system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif]'>
      <div className="max-w-full min-h-screen bg-[rgba(255,255,255,0.4)] backdrop-blur-sm px-3 py-6 sm:px-4 md:px-8 lg:px-12">
        {/* TITLE */}
        <div className="max-w-5xl mx-auto mb-5">
          <h1 className="text-center text-xl sm:text-2xl font-semibold text-[#0f172a]">
            Hiace Booking
          </h1>
        </div>

        {/* LAYOUT: FILTERS + RESULTS */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-4 md:gap-6">
          {/* FILTERS */}
          <aside className="w-full lg:w-64 xl:w-72 self-start bg-white rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.12)] p-4 sm:p-5 mb-4 lg:mb-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#111827] m-0">
                Filters
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#059669] hover:text-[#047857] bg-transparent border-0 p-0 cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* TIME OF DAY – NEW */}
            <div className="border-t border-[#e5e7eb] pt-3 mt-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280] mb-1">
                Time of Day
              </p>
              <div className="space-y-1 text-[13px] text-[#111827]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    className="accent-[#059669]"
                    value="both"
                    checked={timeFilter === "both"}
                    onChange={() => setTimeFilter("both")}
                  />
                  <span>Both</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    className="accent-[#059669]"
                    value="day"
                    checked={timeFilter === "day"}
                    onChange={() => setTimeFilter("day")}
                  />
                  <span>Day</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    className="accent-[#059669]"
                    value="night"
                    checked={timeFilter === "night"}
                    onChange={() => setTimeFilter("night")}
                  />
                  <span>Night</span>
                </label>
              </div>
            </div>

            {/* PRICE */}
            <div className="border-t border-[#e5e7eb] pt-3 mt-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280] mb-1">
                Price (per person)
              </p>
              <div className="space-y-1 text-[13px] text-[#111827]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="accent-[#059669]"
                    value="any"
                    checked={priceFilter === "any"}
                    onChange={() => setPriceFilter("any")}
                  />
                  <span>Any price</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="accent-[#059669]"
                    value="under1000"
                    checked={priceFilter === "under1000"}
                    onChange={() => setPriceFilter("under1000")}
                  />
                  <span>Under Rs. 1000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="accent-[#059669]"
                    value="1000-1500"
                    checked={priceFilter === "1000-1500"}
                    onChange={() => setPriceFilter("1000-1500")}
                  />
                  <span>Rs. 1000 – 1500</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="accent-[#059669]"
                    value="above1500"
                    checked={priceFilter === "above1500"}
                    onChange={() => setPriceFilter("above1500")}
                  />
                  <span>Above Rs. 1500</span>
                </label>
              </div>
            </div>

            {/* FEATURES */}
            <div className="border-t border-[#e5e7eb] pt-3 mt-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280] mb-1">
                Features
              </p>
              <div className="space-y-1 text-[13px] text-[#111827]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#059669]"
                    checked={featureFilters.ac}
                    onChange={() => toggleFeature("ac")}
                  />
                  <span>A/C</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#059669]"
                    checked={featureFilters.wifi}
                    onChange={() => toggleFeature("wifi")}
                  />
                  <span>Wi-Fi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#059669]"
                    checked={featureFilters.electric}
                    onChange={() => toggleFeature("electric")}
                  />
                  <span>Electric (EV)</span>
                </label>
              </div>
            </div>
          </aside>

          {/* RESULTS – RIGHT */}
          <main className="flex-1 flex justify-center items-start">
            <section
              className="w-full max-w-3xl xl:max-w-[960px] bg-white rounded-3xl
                         pt-5 pb-[18px] px-[14px] sm:px-[18px] md:px-[22px]
                         shadow-[0_20px_50px_rgba(15,23,42,0.15)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="m-0 text-[18px] sm:text-[20px] font-bold text-[#0f172a]">
                    Available Hiace
                  </h2>
                  <p className="mt-1 mb-0 text-[12px] sm:text-[13px] text-[#6b7280]">
                    Choose a hiace and then book your seats.
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full
                             px-3 py-1 text-[11px] sm:text-[12px] font-medium
                             bg-[#ecfdf5] text-[#047857] self-start sm:self-auto"
                >
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  {filteredHiaces.length} hiace found
                </span>
              </div>

              <div className="flex flex-col gap-3 mt-1">
                {filteredHiaces.map((hiace) => (
                  <article
                    key={hiace.id}
                    className="rounded-[18px] border border-[#e5e7eb]
                               pt-3.5 pb-3 px-3 sm:px-4
                               transition-all duration-200
                               hover:shadow-[0_12px_30px_rgba(15,23,42,0.18)]
                               hover:border-[#bae6fd]
                               hover:-translate-y-0.5 bg-white"
                  >
                    {/* TOP ROW */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      {/* IMAGE + INFO */}
                      <div className="flex flex-1 items-center gap-3 sm:gap-4 min-w-[240px]">
                        <div
                          className="w-[140px] h-[100px] sm:w-[170px] sm:h-[120px] rounded-[14px]
                                     overflow-hidden shrink-0 bg-[#f3f4f6]
                                     shadow-[0_8px_22px_rgba(15,23,42,0.18)]"
                        >
                          <img
                            src={hiace.image}
                            alt={hiace.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <h3 className="m-0 text-[15px] sm:text-[17px] font-bold text-[#0f172a] tracking-[0.4px]">
                            {hiace.name}
                          </h3>
                          <p
                            className="m-0 text-[12px] sm:text-[13px] text-[#475569]
                                       flex flex-wrap gap-1 items-baseline
                                       tracking-[0.25px]"
                          >
                            <span className="font-semibold text-[#334155] tracking-[0.3px]">
                              Departure
                            </span>
                            <span className="font-semibold text-[#0f172a] tracking-[0.4px]">
                              {hiace.departure}
                            </span>
                            <span className="mx-1 text-[#9ca3af]">•</span>
                            <span className="font-semibold text-[#334155] tracking-[0.3px]">
                              Arrival
                            </span>
                            <span className="font-semibold text-[#0f172a] tracking-[0.4px]">
                              {hiace.arrival}
                            </span>
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {hiace.features.map((f) => (
                              <span
                                key={f}
                                className="text-[11px] px-[9px] py-1 rounded-full
                                           border border-[#e5e7eb]
                                           bg-[#f8fafc] text-[#475569]
                                           tracking-[0.35px]"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* PRICE + BUTTON */}
                      <div className="flex flex-row md:flex-col items-end justify-between gap-2 min-w-[120px]">
                        <div className="text-right">
                          <div className="text-[16px] sm:text-[18px] font-bold text-[#047857] tracking-[0.4px]">
                            Rs. {hiace.price}
                          </div>
                          <div className="text-[11px] text-[#64748b] tracking-[0.3px]">
                            per person
                          </div>
                        </div>
                        <button
                          type="button"
                          className="border-none rounded-full px-[14px] sm:px-[18px] py-2
                                     text-[12px] sm:text-[13px] font-semibold cursor-pointer
                                     bg-[#00bfa5] text-white
                                     shadow-[0_10px_25px_rgba(0,191,165,0.4)]
                                     transition-all duration-200
                                     hover:bg-[#009f8a]
                                     hover:-translate-y-px
                                     hover:shadow-[0_14px_30px_rgba(0,191,165,0.45)]"
                          onClick={() => openBooking(hiace)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>

                    {/* TABS */}
                    <div
                      className="mt-3 pt-2.5 border-t border-[#e5e7eb]
                                 flex flex-wrap gap-2.5 text-[12px]"
                    >
                      {[
                        { key: "amenities", label: "Amenities" },
                        { key: "boarding", label: "Boarding & Dropping Point" },
                        { key: "gallery", label: "Gallery" },
                      ].map((tab) => {
                        const active =
                          expandedHiaceId === hiace.id && expandedTab === tab.key;
                        return (
                          <button
                            key={tab.key}
                            className={`bg-transparent border-none pb-1
                                        text-[12px] cursor-pointer
                                        border-b-2
                                        ${
                                          active
                                            ? "border-b-[#00bfa5] text-[#0f766e] font-semibold"
                                            : "border-b-transparent text-[#6b7280]"
                                        }`}
                            onClick={() => {
                              setExpandedHiaceId(hiace.id);
                              setExpandedTab(tab.key);
                            }}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* TAB CONTENT */}
                    {expandedHiaceId === hiace.id && (
                      <div
                        key={expandedTab}
                        className="mt-2 bg-[#f9fafb] rounded-xl
                                   px-3 py-2.5 text-[13px] text-[#475569]
                                   tracking-[0.3px]"
                      >
                        {expandedTab === "amenities" &&
                          (hiace.amenities && hiace.amenities.length ? (
                            <ul className="m-0 pl-[18px] tracking-[0.25px] list-disc text-left">
                              {hiace.amenities.map((item) => (
                                <li key={item} className="mb-1 text-[#475569]">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="m-0 text-[12px] text-[#9ca3af]">
                              No amenities information available.
                            </p>
                          ))}

                        {expandedTab === "boarding" && (
                          <div className="flex flex-wrap gap-6">
                            <div>
                              <h4 className="m-0 mb-1 text-[13px] font-semibold">
                                Boarding Point
                              </h4>
                              <ul className="m-0 pl-[18px] tracking-[0.25px] list-disc">
                                {hiace.boardingPoints.map((bp) => (
                                  <li key={bp} className="mb-1 text-[#475569]">
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
                                {hiace.droppingPoints.map((dp) => (
                                  <li key={dp} className="mb-1 text-[#475569]">
                                    {dp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {expandedTab === "gallery" &&
                          (hiace.gallery && hiace.gallery.length ? (
                            <>
                              {expandedImage &&
                                expandedImage.vehicleId === hiace.id && (
                                  <div
                                    className="w-full mb-2 p-2 rounded-2xl
                                               bg-white
                                               shadow-[0_10px_26px_rgba(15,23,42,0.18)]"
                                  >
                                    <img
                                      src={expandedImage.src}
                                      alt={expandedImage.alt}
                                      className="w-full max-h-[260px] object-cover rounded-xl"
                                    />
                                  </div>
                                )}

                              <div className="flex flex-wrap gap-3">
                                {hiace.gallery.map((img, index) => (
                                  <img
                                    key={index}
                                    src={img}
                                    alt={`${hiace.name} interior ${index + 1}`}
                                    className="w-[110px] h-[80px] sm:w-[120px] sm:h-[90px] object-cover rounded-xl
                                               shadow-[0_6px_14px_rgba(15,23,42,0.15)]
                                               cursor-pointer transition-transform duration-200
                                               hover:scale-[1.06]"
                                    onClick={() =>
                                      setExpandedImage({
                                        vehicleId: hiace.id,
                                        src: img,
                                        alt: `${hiace.name} interior ${
                                          index + 1
                                        }`,
                                      })
                                    }
                                  />
                                ))}
                              </div>
                            </>
                          ) : (
                            <p className="m-0 text-[12px] text-[#9ca3af]">
                              No gallery available.
                            </p>
                          ))}
                      </div>
                    )}
                  </article>
                ))}

                {!filteredHiaces.length && (
                  <div className="text-center text-sm text-[#6b7280] py-10">
                    No hiace match your filters. Try changing your options.
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showBooking && bookingHiace && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(15,23,42,0.55)] px-3">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_24px_70px_rgba(15,23,42,0.4)] p-5 sm:p-7 relative">
            <button
              type="button"
              className="absolute right-4 top-4 text-xl leading-none text-[#9ca3af] hover:text-[#4b5563]"
              onClick={closeBooking}
            >
              ×
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold text-[#0f172a] mb-1">
              Book {bookingHiace.name}
            </h2>
            <p className="text-[13px] text-[#6b7280] mb-4">
              Fill in the details to book your vehicle.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#6b7280] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-[#6b7280] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-[#6b7280] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-[#6b7280] mb-1">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="days"
                    value={form.days}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-[#6b7280] mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={form.pickupDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-[#6b7280] mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={form.pickupLocation}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  rows={3}
                  value={form.specialRequests}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 text-sm">
                <div className="text-[#374151]">
                  <div>
                    Vehicle: <strong>{bookingHiace.name}</strong>
                  </div>
                  <div>
                    Price per person: <strong>Rs. {bookingHiace.price}</strong>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto border-none rounded-full px-6 py-2.5
                             text-[13px] font-semibold cursor-pointer
                             bg-[#00bfa5] text-white
                             shadow-[0_10px_25px_rgba(0,191,165,0.4)]
                             hover:bg-[#009f8a]
                             hover:-translate-y-px
                             hover:shadow-[0_14px_30px_rgba(0,191,165,0.45)]
                             transition-all duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiaceBooking;
