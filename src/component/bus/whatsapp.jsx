import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsappButton = () => {
  const whatsappNumber = "9779847210851"; // 
  const preFilledText = "Hi, I would like to know more about your bus service.";

  const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    preFilledText
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-4 right-4
        sm:bottom-6 sm:right-6
        z-50
      "
    >
      <div
        className="
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          bg-[#25D366]
          flex items-center justify-center
          shadow-[0_10px_25px_rgba(0,0,0,0.35)]
          hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]
          hover:scale-105
          active:scale-95
          transition-transform transition-shadow duration-200
        "
      >
        <FaWhatsapp className="text-white text-3xl sm:text-[34px]" />
      </div>
    </a>
  );
};

export default FloatingWhatsappButton;
