import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerate = () => {
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "xaviees-delices-qrcode.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Xaviee's Delices QR Code</h1>
      <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-md">
        <QRCodeCanvas
          value="https://xavieesdelices.vercel.app/"
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerate;
