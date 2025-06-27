import React from 'react';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QRCodeGenerator = () => {
  const flyerUrl = 'assets/Xaviee\'s-Delices-Flyer.png';
  const navigate = useNavigate();

  const handleDownload = () => {
    saveAs(flyerUrl, 'xaviees-delices-flyer.png');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center"
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
          Notre Flyer
        </motion.h1>
        
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Téléchargez et partagez notre flyer promotionnel
        </motion.p>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <img
            src={flyerUrl}
            alt="Flyer Xaviee's Delices"
            className="w-full max-w-md mx-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </motion.div>

        <motion.button
          onClick={handleDownload}
          className="btn btn-primary btn-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-5 h-5" />
          Télécharger le Flyer
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QRCodeGenerator;