// terms.jsx
import React, { useState, useEffect } from "react";
import mountain from "../../assets/mountain.jpg";
import esewa from "../../assets/esewa-seeklogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Terms({ initialTab = "terms" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll Animation Effect
  useEffect(() => {
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };

    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll(
        ".animate-on-scroll, .stagger-animation"
      );
      elements.forEach((element) => {
        if (isElementInViewport(element)) {
          element.classList.add("animated");
        }
      });
    };

    handleScrollAnimation();
    window.addEventListener("scroll", handleScrollAnimation);
    return () => window.removeEventListener("scroll", handleScrollAnimation);
  }, []);

  // Page Title Component
  const PageTitle = () => (
    <div className="text-center mt-8 sm:mt-10 mb-5 sm:mb-7 animate-on-scroll">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-[38px]">
        Legal &amp; Booking Information
      </h1>
      <p className="mt-2 text-sm sm:text-[16px] text-[#d1d5db] px-4 sm:px-0">
        Please review Simrik Yatayat’s booking terms, policies and consultation
        support.
      </p>
    </div>
  );

  // TERMS & CONDITIONS
  const TermsConditions = () => (
    <div className="animate-on-scroll text-black leading-[1.65] text-sm sm:text-[15px] text-left">
      <h2 className="text-[#00A3A3] mb-2">
        Simrik Yatayat – Terms &amp; Conditions
      </h2>

      <h3 className="mt-6 text-[#00A3A3]">1. Definitions</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          <strong>“Passenger”</strong> – Any person in whose name a ticket is
          issued and who is travelling in our vehicle.
        </li>
        <li>
          <strong>“Ticket”</strong> – A valid booking confirmation issued by
          Simrik Yatayat or its authorised partners.
        </li>
        <li>
          <strong>“Service”</strong> – Any bus, jeep or Hiace journey operated
          by Simrik Yatayat.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">2. Booking &amp; Ticketing</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Tickets may be booked online, via authorised agents or at Simrik
          counters.
        </li>
        <li>
          A booking is confirmed only after full payment is received and a
          ticket / confirmation SMS is issued.
        </li>
        <li>
          Passengers must ensure that passenger name, date, route, boarding
          point and contact number are correct before final payment.
        </li>
        <li>
          Simrik Yatayat is not responsible for errors entered by the passenger
          (e.g. wrong date / route / mobile number).
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">3. Reporting Time &amp; Boarding</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Passengers must report at the selected boarding point at least{" "}
          <strong>30 minutes</strong> before departure time.
        </li>
        <li>
          If a passenger fails to report on time, the seat may be released and
          no refund will be provided.
        </li>
        <li>
          Passengers must carry a valid photo identity document and show the
          SMS/online ticket when asked by staff.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">
        4. Seat Allocation &amp; “Booking for Women”
      </h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Seats are allotted as per the booking system. While we try to honour
          seat preferences, we may change seats for safety or operational
          reasons.
        </li>
        <li>
          Certain seats are marked as <strong>“Women Only”</strong>. When the
          “Booking for women” option is enabled in the UI, the system will only
          allocate seats from this section.
        </li>
        <li>
          Male passengers are not allowed to occupy women-only seats. Our staff
          may request passengers to change seats if they are occupying a
          restricted seat.
        </li>
        <li>
          Infants and small children must travel with a responsible adult.
          Unaccompanied minors may be refused boarding.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">5. Fares, Payments &amp; Taxes</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Ticket prices are dynamic and may vary based on date, demand,
          promotions or seat type (Deluxe, Sleeper, Jeep, Hiace, etc.).
        </li>
        <li>
          Fares displayed at the time of booking include basic fare and standard
          taxes. Service charges, payment gateway fees or agent commissions may
          be added separately.
        </li>
        <li>
          All payments must be made in full at the time of booking using
          accepted payment methods (cash, bank transfer, digital wallets, etc.).
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">
        6. Cancellations, Changes &amp; Refunds
      </h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          <strong>Passenger-initiated cancellation</strong>:
          <ul className="ml-5 sm:ml-[18px] list-disc mt-1">
            <li>
              ≥ 24 hours before departure – up to{" "}
              <strong>80% refund</strong> after applicable charges.
            </li>
            <li>
              12–24 hours before departure – up to{" "}
              <strong>50% refund</strong>.
            </li>
            <li>
              &lt; 12 hours before departure or no-show –{" "}
              <strong>no refund</strong>.
            </li>
          </ul>
        </li>
        <li>
          Change of date / route may be allowed subject to seat availability and
          re-booking charges. Promotional or discounted tickets may be
          non-refundable.
        </li>
        <li>
          If a journey is cancelled by Simrik Yatayat due to operational or
          safety reasons, passengers will be offered either:
          <ul className="ml-5 sm:ml-[18px] list-disc mt-1">
            <li>Full refund of base fare, or</li>
            <li>Free rescheduling on the next available service.</li>
          </ul>
        </li>
        <li>
          Refunds are processed to the original payment method within a
          reasonable processing time. Any bank / payment gateway delays are
          beyond our control.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">7. Luggage &amp; Baggage Policy</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Each passenger is generally allowed one cabin bag and one checked-in
          bag of reasonable weight (typical range 15–20 kg; the exact limit may
          vary by route and vehicle).
        </li>
        <li>
          Oversized or excess luggage may attract additional charges or be
          refused if it affects safety or comfort of other passengers.
        </li>
        <li>
          Dangerous goods (flammable, explosive, corrosive, illegal items, etc.)
          are strictly prohibited.
        </li>
        <li>
          Passengers are responsible for their personal belongings. Simrik
          Yatayat is not liable for loss or damage to laptops, jewellery,
          electronics, cash or valuables carried in baggage or on person.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">8. Conduct on Board</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Passengers must follow all reasonable instructions of the driver,
          helper and company staff.
        </li>
        <li>
          Smoking, alcohol, recreational drugs, carrying offensive items or
          disturbing other passengers is strictly prohibited.
        </li>
        <li>
          The company reserves the right to refuse boarding or off-load any
          passenger whose behaviour is abusive, unsafe or violates these terms.
          No refund will be provided in such cases.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">
        9. Delays, Route Changes &amp; Force Majeure
      </h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          While we aim to maintain the scheduled departure and arrival times,
          delays may occur due to traffic, road conditions, weather, bandhs,
          strikes or mechanical issues.
        </li>
        <li>
          In case of road closures or safety considerations, the driver may
          change the route or timing at short notice.
        </li>
        <li>
          For events beyond our reasonable control (“force majeure”), Simrik
          Yatayat is not liable for any consequential loss (missed flight,
          hotel, meeting, etc.). Our obligation is limited to providing the
          journey or an alternate arrangement where possible.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">
        10. Vehicle Type &amp; Amenities
      </h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Images of buses, jeeps, Hiace and seat layouts shown in the gallery
          are indicative. Actual interiors may differ slightly based on model
          year and configuration.
        </li>
        <li>
          Features like Wi-Fi, charging ports, blankets, snacks or entertainment
          are complimentary value-added services and may not be available on all
          trips or at all times.
        </li>
        <li>
          Failure or temporary unavailability of such amenities does not entitle
          passengers to a refund.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">
        11. Children, Seniors &amp; Special Assistance
      </h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Children below a certain age/height may be required to share seats
          with an accompanying adult based on company policy.
        </li>
        <li>
          Passengers requiring special assistance (elderly, pregnant, persons
          with disability) should inform us at the time of booking so that
          suitable seats can be allocated where possible.
        </li>
        <li>
          Our staff will try to assist but are not trained medical
          professionals. Passengers must carry their own medicines and aids.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">12. Pets &amp; Restricted Items</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          Pets and live animals are generally not allowed unless explicitly
          permitted by company policy for specific routes.
        </li>
        <li>
          Firearms, explosives, illegal drugs and any items prohibited by law or
          considered unsafe by staff will not be allowed on board.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">13. Limitation of Liability</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          To the maximum extent permitted by law, Simrik Yatayat’s total
          liability for any claim arising out of a journey is limited to the
          ticket fare actually paid by the passenger.
        </li>
        <li>
          We do not accept responsibility for indirect or consequential losses,
          including but not limited to loss of profit, business, or
          opportunities.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">14. Privacy &amp; Data</h3>
      <p>
        We collect passenger information (such as name, mobile number, gender
        and journey details) only for the purpose of processing bookings,
        providing service updates and complying with legal obligations. Data is
        handled in line with our Privacy Policy and is not sold to third
        parties.
      </p>

      <h3 className="mt-6 text-[#00A3A3]">
        15. Governing Law &amp; Dispute Resolution
      </h3>
      <p>
        These Terms are governed by the laws of Nepal. Any disputes shall
        preferably be resolved amicably. If unresolved, they may be referred to
        the competent courts / authorities within Nepal.
      </p>

      <h3 className="mt-6 text-[#00A3A3]">16. Contact &amp; Support</h3>
      <p>
        For any questions regarding these Terms, cancellations, lost items or
        feedback, please contact Simrik Yatayat customer support at:
      </p>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          <strong>Phone:</strong> +977-XXX-XXX-XXXX
        </li>
        <li>
          <strong>Email:</strong> support@simrikyatayat.com
        </li>
        <li>
          <strong>Office:</strong> Koteshwor, Kathmandu, Nepal
        </li>
      </ul>
    </div>
  );

  // Privacy Policy
  const PrivacyPolicy = () => (
    <div className="animate-on-scroll text-black leading-[1.65] text-sm sm:text-[15px] text-left">
      <h2 className="text-[#1b5d67f5] mb-2">Privacy Policy</h2>
      <p>
        Simrik Yatayat respects your privacy and is committed to protecting your
        personal information. This policy explains how we collect, use and
        safeguard the data you share with us when you book tickets or use our
        website / mobile applications.
      </p>

      <div className="mt-5 mb-5 px-4 sm:px-5 py-4 rounded-[10px] bg-[rgba(0,163,163,0.08)] border-l-4 border-[#00A3A3]">
        <p>
          <strong>Last Updated:</strong> 30 Nov 2025
        </p>
      </div>

      <h3 className="mt-6 text-[#00A3A3]">1. Information We Collect</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>
          <strong>Identity &amp; Contact:</strong> Name, phone number, email,
          gender, nationality.
        </li>
        <li>
          <strong>Booking Details:</strong> Routes, dates, seat numbers, payment
          method (masked), transaction IDs.
        </li>
        <li>
          <strong>Technical Data:</strong> IP address, browser type, device
          type, approximate location, cookies.
        </li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">2. How We Use Your Information</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>To create and manage your bookings and issue tickets.</li>
        <li>To send SMS / email updates about your trip (delays, changes).</li>
        <li>To handle customer support, refund and complaint requests.</li>
        <li>To improve our routes, services, website and safety practices.</li>
        <li>To comply with legal, tax and regulatory requirements.</li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">3. Sharing of Information</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>With payment gateways and banks to process transactions.</li>
        <li>With technology partners who host our booking systems.</li>
        <li>
          With law enforcement or regulators when legally required or to prevent
          fraud or misuse.
        </li>
      </ul>
      <p>We do not sell your personal data to third-party marketers.</p>

      <h3 className="mt-6 text-[#00A3A3]">4. Data Security &amp; Retention</h3>
      <p>
        We use reasonable technical and organisational measures to protect your
        information from unauthorized access, alteration or loss. Data is
        retained only for as long as necessary for bookings, legal obligations
        or dispute resolution.
      </p>

      <h3 className="mt-6 text-[#00A3A3]">5. Your Rights</h3>
      <ul className="ml-5 sm:ml-[18px] list-disc">
        <li>Request access to the personal information we hold about you.</li>
        <li>Request correction of inaccurate or incomplete data.</li>
        <li>
          Request deletion of your data, subject to legal / accounting
          requirements.
        </li>
        <li>Opt out of non-essential marketing SMS or emails.</li>
      </ul>

      <h3 className="mt-6 text-[#00A3A3]">6. Cookies</h3>
      <p>
        Our website uses cookies to remember your preferences, keep you logged
        in and analyse traffic. You can manage your preferences via the cookie
        banner or your browser settings.
      </p>

      <h3 className="mt-6 text-[#00A3A3]">7. Contact</h3>
      <p>
        For privacy-related queries, please email{" "}
        <strong>privacy@simrikyatayat.com</strong>.
      </p>
    </div>
  );

  // Book Consultation / Support Form
  const BookConsultation = () => {
    const [localForm, setLocalForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      condition: "",
      additionalInfo: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleLocalChange = (e) => {
      const { name, value } = e.target;
      setLocalForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleLocalSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", localForm);
      setIsSubmitted(true);
      setSubmitted(true);
    };

    if (isSubmitted || submitted) {
      return (
        <div className="mt-5">
          <div
            id="success-message"
            className="bg-white rounded-2xl p-6 shadow-md text-black"
          >
            <div className="text-green-600 text-3xl mb-2">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Thank you for contacting Simrik Support!
            </h3>
            <p className="mb-2">
              We have received your details. Our team will get back to you
              within 24 hours regarding your query or special assistance.
            </p>
            <p>
              For urgent matters, please call us at{" "}
              <strong>+977-XXX-XXX-XXXX</strong>.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-5 text-black">
        <div className="animate-on-scroll mb-4">
          <h2 className="text-[#00A3A3] mb-2">
            Support / Special Assistance Request
          </h2>
          <p className="text-sm sm:text-[15px] leading-[1.65]">
            Need help with booking, refunds, group travel, or special seating
            needs? Fill out this form and our team will contact you.
          </p>
        </div>

        <form
          onSubmit={handleLocalSubmit}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm"
        >
          <div className="flex flex-col  gap-4">
            <div className="flex-1 mb-4">
              <label
                htmlFor="first-name"
                className="block text-black font-semibold mb-1 text-left"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={localForm.firstName}
                onChange={handleLocalChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#cfd4dc] bg-white text-black placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00A3A3]"
              />
            </div>

            <div className="flex-1 mb-4">
              <label
                htmlFor="last-name"
                className="block text-black font-semibold mb-1 text-left"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={localForm.lastName}
                onChange={handleLocalChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#cfd4dc] bg-white text-black placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00A3A3]"
              />
            </div>
          </div>

          <div className="flex flex-col  gap-4">
            <div className="flex-1 mb-4">
              <label
                htmlFor="email"
                className="block text-black font-semibold mb-1 text-left"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={localForm.email}
                onChange={handleLocalChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#cfd4dc] bg-white text-black placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00A3A3]"
              />
            </div>

            <div className="flex-1 mb-4">
              <label
                htmlFor="phone"
                className="block text-black font-semibold mb-1 text-left"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={localForm.phone}
                onChange={handleLocalChange}
                required
                className="w-full mt-1 px-3 py-2 rounded-xl border border-[#cfd4dc] bg-white text-black placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00A3A3]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="condition"
              className="block text-black font-semibold mb-1 text-left"
            >
              Your Request / Question <span className="text-red-500">*</span>
            </label>
            <textarea
              id="condition"
              name="condition"
              value={localForm.condition}
              onChange={handleLocalChange}
              placeholder="Tell us about your issue, group booking, refund request or special assistance needed..."
              rows={4}
              required
              className="w-full mt-1 px-3 py-2 rounded-xl border border-[#cfd4dc] bg-white text-black placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00A3A3]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="additional-info"
              className="block text-black font-semibold mb-1 text-left"
            >
              Additional Information
            </label>
            <textarea
              id="additional-info"
              name="additionalInfo"
              value={localForm.additionalInfo}
              onChange={handleLocalChange}
              placeholder="Any extra details (preferred travel date, route, number of passengers, etc.)"
              rows={3}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-[#cfd4dc] bg-white text-black placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00A3A3]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 sm:mt-5 w-full py-3 rounded-xl bg-[#00A3A3] text-white text-[15px] sm:text-[16px] font-semibold cursor-pointer hover:bg-[#008080] transition-colors"
          >
            Submit Request
          </button>

          <p className="mt-3 text-xs sm:text-[13px] text-[#4b5563]">
            By submitting this form, you agree to our{" "}
            <button
              type="button"
              className="text-[#00A3A3] underline cursor-pointer bg-transparent border-0 p-0"
              onClick={() => setActiveTab("terms")}
            >
              Terms &amp; Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-[#00A3A3] underline cursor-pointer bg-transparent border-0 p-0"
              onClick={() => setActiveTab("privacy")}
            >
              Privacy Policy
            </button>
            .
          </p>
        </form>
      </div>
    );
  };

  // Footer Component
  const Footer = () => {
    const socialIcons = [
      { icon: <FaFacebookF />, link: "#" },
      { icon: <FaInstagram />, link: "#" },
      { icon: <FaYoutube />, link: "#" },
      { icon: <FaLinkedinIn />, link: "#" },
    ];

    const links = [
      { title: "About Us", url: "#" },
      { title: "Contact Us", url: "#" },
      { title: "Terms & Conditions", url: "#" },
    ];

    const paymentMethods = [{ name: "Esewa", img: esewa, url: "#" }];

    const techPartner = {
      name: "SINGHA TECHNE PVT. LTD.",
      description: "Software & Solutions Provider",
    };

    return (
      <footer
        className="relative bg-cover bg-center py-10 sm:py-[60px] px-5 sm:px-[50px] text-white font-sans mt-10"
        style={{ backgroundImage: `url(${mountain})` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.445)] z-10" />

        <div className="relative z-20 flex flex-col md:flex-row justify-between gap-8 md:gap-[50px] flex-wrap mt-10 sm:mt-[395px] top-0 sm:top-20 pb-5">
          {/* Left Section */}
          <div className="max-w-[260px] mt-2 sm:mt-10">
            <p className="text-[14px] sm:text-[15px] leading-normal text-[#dddddd]">
              We are dedicated to providing swift, easy, and comfortable travel
              experiences. Your journey is our priority.
            </p>
            <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] text-[#cccccc]">
              Mero Bus is committed to excellence in ground transportation.
            </p>
            <div className="mt-4 sm:mt-5 flex gap-[15px] text-[18px] sm:text-[20px] text-[#cccccc] mb-4 sm:mb-6">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Middle Column */}
          <div className="max-w-[250px] mt-2 sm:mt-10">
            <h3 className="mb-2 text-[16px] sm:text-[18px]">Mero Bus</h3>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="block text-[14px] text-[#cccccc] mt-1.5 sm:mt-2 no-underline hover:text-white"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Payment Column */}
          <div className="max-w-[250px] mt-2 sm:mt-10">
            <h3 className="mb-2 text-[16px] sm:text-[18px]">We Accept</h3>
            <div className="flex items-center">
              {paymentMethods.map((payment, index) => (
                <a key={index} href={payment.url}>
                  <img
                    src={payment.img}
                    alt={payment.name}
                    className="w-80px sm:w-[90px] mr-2.5"
                  />
                </a>
              ))}
            </div>
          </div>
          {/* Technology Partner */}
          <div className="max-w-[250px] mt-2 sm:mt-10">
            <h3 className="mb-2 text-[16px] sm:text-[18px]">
              Technology Partner
            </h3>
            <p className="font-bold mt-2 text-[14px] sm:text-[15px]">
              {techPartner.name}
            </p>
            <p className="text-[13px] sm:text-[14px] text-[#cccccc]">
              {techPartner.description}
            </p>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4 relative z-20" />

        <div className="relative z-20 text-center text-[12px] sm:text-[14px]">
          ©️ 2025 Mero Bus. All Rights Reserved. | Powered by {techPartner.name}
        </div>
      </footer>
    );
  };

  // Tab Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case "terms":
        return <TermsConditions />;
      case "privacy":
        return <PrivacyPolicy />;
      case "consultation":
        return <BookConsultation />;
      default:
        return <TermsConditions />;
    }
  };

  // MAIN RETURN
  return (
    <div className=" min-h-screen bg-[#495969] text-white font-sans">
      <div className="w-full px-3 sm:px-6 lg:px-10 py-6">


       <div className="w-full mt-6 sm:mt-10 mb-10 sm:mb-16 rounded-2xl bg-[#f7f9fc] 
shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden">

          {/* TAB BUTTONS */}
          <div className="flex flex-col sm:flex-row bg-[#f1f2f5] rounded-t-2xl">
            {/* Terms Button */}
            <button
              type="button"
              onClick={() => setActiveTab("terms")}
              className={`flex-1 text-center py-3 sm:py-4 px-4 sm:px-7 text-[14px] sm:text-[16px] font-semibold tracking-[0.02em] cursor-pointer border-b-[3px] transition ${
                activeTab === "terms"
                  ? "bg-white text-[#111827] border-b-[#1d8cf8]"
                  : "bg-[#f1f2f5] text-[#4b5563] border-b-transparent hover:bg-[#e6e9f2]"
              }`}
            >
              Terms &amp; Conditions
            </button>

            {/* Privacy Button */}
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`flex-1 text-center py-3 sm:py-4 px-4 sm:px-7 text-[14px] sm:text-[16px] font-semibold tracking-[0.02em] cursor-pointer border-b-[3px] transition ${
                activeTab === "privacy"
                  ? "bg-white text-[#111827] border-b-[#1d8cf8]"
                  : "bg-[#f1f2f5] text-[#4b5563] border-b-transparent hover:bg-[#e6e9f2]"
              }`}
            >
              Privacy Policy
            </button>

            {/* Support Button */}
            <button
              type="button"
              onClick={() => setActiveTab("consultation")}
              className={`flex-1 text-center py-3 sm:py-4 px-4 sm:px-7 text-[14px] sm:text-[16px] font-semibold tracking-[0.02em] cursor-pointer border-b-[3px] transition ${
                activeTab === "consultation"
                  ? "bg-white text-[#111827] border-b-[#1d8cf8]"
                  : "bg-[#f1f2f5] text-[#4b5563] border-b-transparent hover:bg-[#e6e9f2]"
              }`}
            >
              Support / Contact
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 bg-white rounded-b-2xl">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;
