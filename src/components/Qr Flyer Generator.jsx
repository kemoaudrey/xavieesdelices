import React from "react";
import { saveAs } from "file-saver";
import "./Style.css";
const QRCodeGenerator = () => {
  const flyerUrl = "assets/Xaviee's-Delices-Flyer.png"; // Change to your flyer URL
  const whatsappNumber = "+237697458130";
  const whatsappMessage = encodeURIComponent("Hello, I would like to order from your flyer.");

  const handleDownload = () => {
    saveAs(flyerUrl, "flyer.jpg");
  };

  const handleWhatsAppOrder = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  return (
    <div className="qr-container">
      <img src={flyerUrl} alt="Flyer" className="qr-image" />
      <div className="qr-buttons">
        <button onClick={handleDownload} className="qr-button download-btn">
          Download Flyer
        </button>
        <button onClick={handleWhatsAppOrder} className="qr-button whatsapp-btn">
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
