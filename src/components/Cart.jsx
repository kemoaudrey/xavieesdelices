import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';

const Cart = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  customerInfo,
  onCustomerInfoChange,
  formErrors,
  onSubmitOrder,
  total 
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Votre Panier</h2>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ajoutez des délicieux plats pour commencer
                  </p>
                  <button
                    onClick={onClose}
                    className="btn btn-primary"
                  >
                    Continuer les achats
                  </button>
                </motion.div>
              ) : (
                <div className="p-6">
                  {/* Clear Cart Button */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-600">
                      {cart.reduce((total, item) => total + item.quantity, 0)} article(s)
                    </span>
                    <motion.button
                      onClick={onClearCart}
                      className="text-sm text-error hover:text-error/80 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Vider le panier
                    </motion.button>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-8">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="bg-gray-50 rounded-xl p-4"
                        >
                          <div className="flex gap-4">
                            <img
                              src={item.image || "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=100"}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {item.name}
                              </h4>
                              <p className="text-primary font-semibold">
                                {item.price}F
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <motion.button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border hover:bg-gray-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border hover:bg-gray-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-gray-900">
                                {item.price * item.quantity}F
                              </span>
                              <motion.button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1 text-error hover:bg-error/10 rounded"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Customer Form */}
                  <motion.div
                    className="space-y-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Informations de livraison
                    </h3>

                    <div>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        value={customerInfo.name}
                        onChange={(e) => onCustomerInfoChange('name', e.target.value)}
                        className={`input ${formErrors.name ? 'error' : ''}`}
                      />
                      {formErrors.name && (
                        <p className="text-error text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Adresse de livraison"
                        value={customerInfo.location}
                        onChange={(e) => onCustomerInfoChange('location', e.target.value)}
                        className={`input ${formErrors.location ? 'error' : ''}`}
                      />
                      {formErrors.location && (
                        <p className="text-error text-sm mt-1">{formErrors.location}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Votre numéro de téléphone"
                        value={customerInfo.phone}
                        onChange={(e) => onCustomerInfoChange('phone', e.target.value)}
                        className={`input ${formErrors.phone ? 'error' : ''}`}
                      />
                      {formErrors.phone && (
                        <p className="text-error text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="date"
                        placeholder="Date de livraison"
                        value={customerInfo.deliveryDate}
                        onChange={(e) => onCustomerInfoChange('deliveryDate', e.target.value)}
                        className={`input ${formErrors.deliveryDate ? 'error' : ''}`}
                      />
                      {formErrors.deliveryDate && (
                        <p className="text-error text-sm mt-1">{formErrors.deliveryDate}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="time"
                        placeholder="Heure de livraison"
                        value={customerInfo.deliveryTime}
                        onChange={(e) => onCustomerInfoChange('deliveryTime', e.target.value)}
                        className={`input ${formErrors.deliveryTime ? 'error' : ''}`}
                      />
                      {formErrors.deliveryTime && (
                        <p className="text-error text-sm mt-1">{formErrors.deliveryTime}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">{total}F</span>
                </div>
                <motion.button
                  onClick={onSubmitOrder}
                  className="w-full btn btn-primary btn-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Commander via WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;