import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Heart, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Téléphone",
      details: ["+237 697 458 130", "+237 650 783 313"]
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Livraison",
      details: ["Toute la ville", "Frais de livraison gratuits"]
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Horaires",
      details: ["Lundi - Samedi", "Sur commande uniquement"]
    }
  ];

  const paymentMethods = ["Mobile Money", "Orange Money", "Espèces"];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="assets/7.png"
              alt="Xaviee's Delices"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 mb-6">
              Votre destination gourmande pour des crêpes et gaufres artisanales, 
              préparées avec amour et des ingrédients 100% frais.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  {info.icon}
                </div>
                <h3 className="font-semibold">{info.title}</h3>
              </div>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-400">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Moyens de Paiement</h3>
            <div className="space-y-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-400">{method}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © 2024 Xaviee's Delices. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>au Cameroun</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;