import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QRCodeGenerate = () => {
  const qrRef = useRef();
  const navigate = useNavigate();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'xaviees-delices-qrcode.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          Retour
        </motion.button>

        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          QR Code
        </motion.h1>
        
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Scannez pour accéder à notre menu
        </motion.p>

        <motion.div
          ref={qrRef}
          className="bg-gray-50 p-6 rounded-xl mb-6 inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <QRCodeCanvas
            value="https://xavieesdelices.vercel.app/"
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </motion.div>

        <motion.button
          onClick={handleDownload}
          className="btn btn-primary btn-lg w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-5 h-5" />
          Télécharger le QR Code
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QRCodeGenerate;