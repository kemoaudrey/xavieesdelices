import React, { useState } from 'react';
import { ShoppingCart, Phone, X, Plus, Minus, Send, Link } from 'react-feather';
import './Home.css';

const menuItems = [
  { id: 1, name: 'Crepes nature', price: 100, category: 'Crepes', image: 'assets/crepesnature.jpg'},
  { id: 2, name: 'Crepes Gourmandes', price: 500, category: 'Crepes', image: 'assets/crepesgourmandes.jpg' },
  { id: 3, name: 'Crepes chocolat', price: 150, category: 'Crepes', image: 'assets/crepeschocolat.jpg' },
  { id: 4, name: 'Crepes Saucisson Fromage', price: 150, category: 'Crepes', image: 'assets/crepessaucissonfromage.jpg' },
  { id: 5, name: 'Crepes Viande Hachée', price: 500, category: 'Crepes', image: 'assets/Crepesfarciesalaviandehachée.jpg' },
  { id: 6, name: 'Crepes Viande Hachée Fromage', price: 500, category: 'Crepes', image: 'assets/crepesviandehachefromages.jpg' },
  { id: 7, name: 'Gaufres Nature', price: 150, category: 'Gaufres', image: 'assets/gaufrenature.jpg' },
  { id: 8, name: 'Gaufres chocolat', price: 400, category: 'Gaufres', image: 'assets/close-up-waffles-with-chocolate-raspberries.jpg' },
  { id: 9, name: 'Gaufres Saucisson', price: 500, category: 'Gaufres', image: 'assets/gaufresaucisson.jpg' },
  { id: 10, name: 'Gaufres Saucisson Fromage', price: 500, category: 'Gaufres', image: 'assets/gaufresaucissonfromages.jpg' },
];

function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    location: '',
    deliveryTime: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = 'Le nom est requis';
    if (!customerInfo.location.trim()) errors.location = 'L\'adresse de livraison est requise';
    if (!customerInfo.deliveryTime.trim()) errors.deliveryTime = 'L\'heure de livraison est requise';
    if (!customerInfo.phone.trim()) errors.phone = 'Le numéro de téléphone est requis';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatOrderForWhatsApp = () => {
    const orderDetails = `
🛍️ *NOUVELLE COMMANDE - Xaviee's Delices*
--------------------------
👤 *Client*: ${customerInfo.name}
📍 *Livraison*: ${customerInfo.location}
⏰ *Heure souhaitée*: ${customerInfo.deliveryTime}
📱 *Téléphone*: ${customerInfo.phone}

🍽️ *COMMANDE*:
${cart.map(item => `- ${item.name} x${item.quantity} (${item.price * item.quantity}F)`).join('\n')}

💰 *Total*: ${total}F
--------------------------
`;
    return encodeURIComponent(orderDetails);
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) {
      setIsCartOpen(true);
      return;
    }
    
    const whatsappNumber = '237697458130';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formatOrderForWhatsApp()}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img 
            src="assets/7.png" 
            alt="Xaviee's Delices Logo" 
            className="logo"
          />
          {/* <h1>Xaviee's Delices</h1> */}
          {/* <p className="tagline">Served with passion</p> */}
        </div>
        <button className="cart-button" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </button>
        <button className="checkout-button">
        <Link to='/flyer'>View Flyer</Link>
                   
                </button>
      </header>

      <main>
        <section className="hero">
          <h2>Craquez... avant qu'il ne reste plus rien! 🥞</h2>
          <p>100% FAIT MAISON AVEC DES INGRÉDIENTS LOCAUX ET FRAIS 🌱</p>
        </section>

        <section className="menu-section">
          <div className="category-filters">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''} 
              onClick={() => setSelectedCategory('all')}
            >
              Tous
            </button>
            <button 
              className={selectedCategory === 'Crepes' ? 'active' : ''} 
              onClick={() => setSelectedCategory('Crepes')}
            >
              Crêpes
            </button>
            <button 
              className={selectedCategory === 'Gaufres' ? 'active' : ''} 
              onClick={() => setSelectedCategory('Gaufres')}
            >
              Gaufres
            </button>
          </div>

          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="menu-item-image" />
                <h3>{item.name}</h3>
                <p className="price">{item.price}F</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(item)}
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-info">
          <h2>Commander</h2>
          <p>DISPONIBLE SUR COMMANDE DE LUNDI A SAMEDI</p>
          <p>PAIEMENT PAR MOMO, OM, CASH</p>
          <a href="tel:+23769745830" className="phone-link">
            <Phone /> +237 697458130 / +237 650783313
          </a>
        </section>
      </main>

      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-content">
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>
              <X />
            </button>
            <h2>Votre Panier</h2>
            {cart.length === 0 ? (
              <p>Votre panier est vide</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <span>{item.name}</span>
                        <span>{item.price}F</span>
                      </div>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="customer-form">
                  <h3>Informations de livraison</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className={formErrors.name ? 'error' : ''}
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Adresse de livraison"
                      value={customerInfo.location}
                      onChange={(e) => setCustomerInfo({...customerInfo, location: e.target.value})}
                      className={formErrors.location ? 'error' : ''}
                    />
                    {formErrors.location && <span className="error-message">{formErrors.location}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="time"
                      placeholder="Heure de livraison"
                      value={customerInfo.deliveryTime}
                      onChange={(e) => setCustomerInfo({...customerInfo, deliveryTime: e.target.value})}
                      className={formErrors.deliveryTime ? 'error' : ''}
                    />
                    {formErrors.deliveryTime && <span className="error-message">{formErrors.deliveryTime}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Votre numéro de téléphone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className={formErrors.phone ? 'error' : ''}
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                </div>

                <div className="cart-total">
                  <strong>Total:</strong> {total}F
                </div>
                <button className="checkout-button" onClick={handleSubmitOrder}>
                  <Send size={18} /> Commander via WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;