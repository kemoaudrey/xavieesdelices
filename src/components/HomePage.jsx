import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import MenuSection from './MenuSection';
import Cart from './Cart';
import Footer from './Footer';
import '../styles/globals.css';

const menuItems = [
  {
    id: 1,
    name: "Crêpes nature",
    price: 100,
    category: "Crepes",
    image: "assets/crepesnature.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Crêpes Gourmandes",
    price: 500,
    category: "Crepes",
    image: "assets/crepesgourmandes.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Crêpes chocolat",
    price: 150,
    category: "Crepes",
    image: "assets/crepeschocolat.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Crêpes Saucisson Fromage",
    price: 500,
    category: "Crepes",
    image: "assets/crepessaucissonfromage.jpg",
    available: true,
  },
  {
    id: 5,
    name: "Crêpes Viande Hachée",
    price: 500,
    category: "Crepes",
    image: "assets/Crepesfarciesalaviandehachée.jpg",
    available: true,
  },
  {
    id: 6,
    name: "Crêpes Viande Hachée Fromage",
    price: 1000,
    category: "Crepes",
    image: "assets/crepesviandehachefromages.jpg",
    available: true,
  },
  {
    id: 7,
    name: "Crêpes au citron",
    price: 150,
    category: "Crepes",
    image: "assets/crepes citron.jpg",
    available: true,
  },
  {
    id: 8,
    name: "Crêpes à la banane",
    price: 150,
    category: "Crepes",
    image: "assets/crepes bananes.png",
    available: false,
  },
  {
    id: 9,
    name: "Gaufres Nature",
    price: 150,
    category: "Gaufres",
    image: "assets/gaufrenature.jpg",
    available: false,
  },
  {
    id: 10,
    name: "Gaufres chocolat",
    price: 400,
    category: "Gaufres",
    image: "assets/close-up-waffles-with-chocolate-raspberries.jpg",
    available: false,
  },
  {
    id: 11,
    name: "Gaufres Saucisson Fromage",
    price: 700,
    category: "Gaufres",
    image: "assets/gaufresaucissonfromages.jpg",
    available: false,
  },
  {
    id: 12,
    name: "Nems",
    price: 100,
    category: "Nems/Pastel/Samoussa",
    image: "assets/nems.png",
    available: true,
  },
  {
    id: 13,
    name: "Pastel",
    price: 150,
    category: "Nems/Pastel/Samoussa",
    image: "assets/pastel.png",
    available: true,
  },
  {
    id: 14,
    name: "Samoussa",
    price: 100,
    category: "Nems/Pastel/Samoussa",
    image: "assets/samoussa.png",
    available: true,
  },
  {
    id: 15,
    name: "Flan nature",
    price: 500,
    category: "Flan",
    image: "assets/flan nature.jpg",
    available: false,
  },
  {
    id: 16,
    name: "5 Crêpes à la Viande Hachée Fromage",
    price: 3500,
    category: "Packs",
    image: "assets/crepesviandehachefromages.jpg",
    available: true,
  },
  {
    id: 17,
    name: "Pack 12 Nems",
    price: 1000,
    category: "Packs",
    image: "assets/nems.png",
    available: true,
  },
  {
    id: 18,
    name: "Pack 12 Samoussa",
    price: 1000,
    category: "Packs",
    image: "assets/samoussa.png",
    available: true,
  },
];

function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    location: '',
    deliveryTime: '',
    phone: '',
    deliveryDate: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Add to cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  // Handle customer info change
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = 'Le nom est requis';
    if (!customerInfo.location.trim()) errors.location = "L'adresse de livraison est requise";
    if (!customerInfo.deliveryTime.trim()) errors.deliveryTime = "L'heure de livraison est requise";
    if (!customerInfo.phone.trim()) errors.phone = 'Le numéro de téléphone est requis';
    if (!customerInfo.deliveryDate.trim()) errors.deliveryDate = 'La date de livraison est requise';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Format order for WhatsApp
  const formatOrderForWhatsApp = () => {
    const orderDetails = `
🛍️ *NOUVELLE COMMANDE - Xaviee's Delices*
--------------------------
👤 *Client*: ${customerInfo.name}
📍 *Livraison*: ${customerInfo.location}
⏰ *Heure souhaitée*: ${customerInfo.deliveryTime}
📱 *Téléphone*: ${customerInfo.phone}
📅 *Date de livraison*: ${customerInfo.deliveryDate}

🍽️ *COMMANDE*:
${cart.map((item) => `- ${item.name} x${item.quantity} (${item.price * item.quantity}F)`).join('\n')}

💰 *Total*: ${total}F
--------------------------
    `;
    return encodeURIComponent(orderDetails);
  };

  // Handle order submission
  const handleSubmitOrder = () => {
    if (!validateForm()) {
      return;
    }

    const whatsappNumber = '237697458130';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formatOrderForWhatsApp()}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header 
        cart={cart} 
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        <MenuSection
          menuItems={menuItems}
          onAddToCart={addToCart}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        customerInfo={customerInfo}
        onCustomerInfoChange={handleCustomerInfoChange}
        formErrors={formErrors}
        onSubmitOrder={handleSubmitOrder}
        total={total}
      />
    </div>
  );
}

export default HomePage;