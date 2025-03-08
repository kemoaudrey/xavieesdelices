import React, { useState, useEffect } from "react";
import { ShoppingCart, Phone, X, Plus, Minus, Send } from "react-feather";
import "./Home.css";

const menuItems = [
  {
    id: 1,
    name: "Crepes nature",
    price: 100,
    category: "Crepes",
    image: "assets/crepesnature.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Crepes Gourmandes",
    price: 500,
    category: "Crepes",
    image: "assets/crepesgourmandes.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Crepes chocolat",
    price: 150,
    category: "Crepes",
    image: "assets/crepeschocolat.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Crepes Saucisson Fromage",
    price: 500,
    category: "Crepes",
    image: "assets/crepessaucissonfromage.jpg",
    available: true,
  },
  {
    id: 5,
    name: "Crepes Viande Hachée",
    price: 500,
    category: "Crepes",
    image: "assets/Crepesfarciesalaviandehachée.jpg",
    available: true,
  },
  {
    id: 6,
    name: "Crepes Viande Hachée Fromage",
    price: 1000,
    category: "Crepes",
    image: "assets/crepesviandehachefromages.jpg",
    available: true,
  },
  {
    id: 7,
    name: "Crepes au citron",
    price: 150,
    category: "Crepes",
    image: "assets/crepes citron.jpg",
    available: true,
  },
  {
    id: 8,
    name: "Crepes à la banane",
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
  // { id: 9, name: 'Gaufres Saucisson', price: 500, category: 'Gaufres', image: 'assets/gaufresaucisson.jpg', available: false },
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
    name: "pack 10 Nems",
    price: 500,
    category: "Nems/Pastel/Samoussa",
    image: "assets/nems.png",
    available: true,
  },
  {
    id: 13,
    name: "Pastel",
    price: 100,
    category: "Nems/Pastel/Samoussa",
    image: "assets/pastel.png",
    available: false,
  },
  {
    id: 14,
    name: "Samoussa",
    price: 100,
    category: "Nems/Pastel/Samoussa",
    image: "assets/samoussa.png",
    available: false,
  },

  {
    id: 15,
    name: "Flan nature",
    price: 200,
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
  // { id: 17, name: 'Flan coco', price: 250, category: 'Flan', image: 'assets/flancoco.jpg', available: false },

  // { id: 18, name: 'Yaourt nature', price: 100, category: 'Accompagnement', image: 'assets/yaourtnature.jpg', available: false },
  // { id: 19, name: 'Yaourt sucré', price: 150, category: 'Accompagnement', image: 'assets/yaourtsucre.jpg', available: false },
];

function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    location: "",
    deliveryTime: "",
    phone: "",
    deliveryDate: "",
  });
  const [formErrors, setFormErrors] = useState({});
  // const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  // Filter items by category and search query
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || item.category === selectedCategory)
  );

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = "Le nom est requis";
    if (!customerInfo.location.trim())
      errors.location = "L'adresse de livraison est requise";
    if (!customerInfo.deliveryTime.trim())
      errors.deliveryTime = "L'heure de livraison est requise";
    if (!customerInfo.phone.trim())
      errors.phone = "Le numéro de téléphone est requis";
    if (!customerInfo.deliveryDate.trim())
      errors.deliveryDate = "La date de livraison est requis";
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
      setIsCartOpen(true);
      return;
    }

    const whatsappNumber = "237697458130";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formatOrderForWhatsApp()}`;
    window.open(whatsappUrl, "_blank");
    // setIsOrderConfirmed(true);
  };

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  // Scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <div className="logo-container">
          <img
            src="assets/7.png"
            alt="Xaviee's Delices Logo"
            className="logo"
          />
        </div>
        <div className="header-actions">
          <button
            className="dark-mode-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <h2>Craquez... avant qu'il ne reste plus rien! 🥞</h2>
          <p>100% FAIT MAISON AVEC DES INGRÉDIENTS LOCAUX ET FRAIS 🌱</p>
        </section>

        <section className="menu-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filters">
            <button
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              Tous
            </button>
            <button
              className={selectedCategory === "Crepes" ? "active" : ""}
              onClick={() => setSelectedCategory("Crepes")}
            >
              Crêpes
            </button>
            <button
              className={selectedCategory === "Gaufres" ? "active" : ""}
              onClick={() => setSelectedCategory("Gaufres")}
            >
              Gaufres
            </button>
            <button
              className={
                selectedCategory === "Nems/Pastel/Samoussa" ? "active" : ""
              }
              onClick={() => setSelectedCategory("Nems/Pastel/Samoussa")}
            >
              Nems/Pastel/Samoussa
            </button>
            <button
              className={selectedCategory === "Flan" ? "active" : ""}
              onClick={() => setSelectedCategory("Flan")}
            >
              Flan
            </button>
            <button
              className={selectedCategory === "Accompagnement" ? "active" : ""}
              onClick={() => setSelectedCategory("Accompagnement")}
            >
              Accompagnement
            </button>
            <button
    className={selectedCategory === 'Packs' ? 'active' : ''}
    onClick={() => setSelectedCategory('Packs')}
  >
    Packs
  </button>
          </div>

          <div className="menu-grid">
            {/* <span></span> */}
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`menu-item ${!item.available ? "unavailable" : ""}`}
              >
                {/* <div key={item.id} className={`menu-item ${!item.available ? 'unavailable' : ''}`}> */}
                {!item.available && <span></span>}
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="menu-item-image"
                  loading="lazy" // Lazy loading for better performance
                />
                <h3>{item.name}</h3>
                <p className="price">{item.price}F</p>
                <div className="item-actions">
                  <button
                    className="favorite-button"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    {favorites.includes(item.id) ? "❤️" : "🤍"}
                  </button>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                  >
                    {item.available ? "Ajouter au panier" : "Indisponible"}
                  </button>
                </div>
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
                  <button className="clear-cart" onClick={() => setCart([])}>
                    Vider le panier
                  </button>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <span>{item.name}</span>
                        <span>{item.price}F</span>
                      </div>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
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
                      onChange={(e) => {
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        });
                        if (formErrors.name)
                          setFormErrors({ ...formErrors, name: "" });
                      }}
                      className={formErrors.name ? "error" : ""}
                    />
                    {formErrors.name && (
                      <span className="error-message">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Adresse de livraison"
                      value={customerInfo.location}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          location: e.target.value,
                        })
                      }
                      className={formErrors.location ? "error" : ""}
                    />
                    {formErrors.location && (
                      <span className="error-message">
                        {formErrors.location}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="time"
                      placeholder="Heure de livraison"
                      value={customerInfo.deliveryTime}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          deliveryTime: e.target.value,
                        })
                      }
                      className={formErrors.deliveryTime ? "error" : ""}
                    />
                    {formErrors.deliveryTime && (
                      <span className="error-message">
                        {formErrors.deliveryTime}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Votre numéro de téléphone"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      className={formErrors.phone ? "error" : ""}
                    />
                    {formErrors.phone && (
                      <span className="error-message">{formErrors.phone}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      placeholder="Date de livraison"
                      value={customerInfo.deliveryDate}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          deliveryDate: e.target.value,
                        })
                      }
                      className={formErrors.deliveryDate ? "error" : ""}
                    />
                    {formErrors.deliveryDate && (
                      <span className="error-message">
                        {formErrors.deliveryDate}
                      </span>
                    )}
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

      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default HomePage;
