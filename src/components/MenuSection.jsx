import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Plus, Filter } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const MenuSection = ({ menuItems, onAddToCart, favorites, onToggleFavorite }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    { id: 'all', name: 'Tous', count: menuItems.length },
    { id: 'Crepes', name: 'Crêpes', count: menuItems.filter(item => item.category === 'Crepes').length },
    { id: 'Gaufres', name: 'Gaufres', count: menuItems.filter(item => item.category === 'Gaufres').length },
    { id: 'Nems/Pastel/Samoussa', name: 'Nems & Co', count: menuItems.filter(item => item.category === 'Nems/Pastel/Samoussa').length },
    { id: 'Packs', name: 'Packs', count: menuItems.filter(item => item.category === 'Packs').length },
    { id: 'Flan', name: 'Flan', count: menuItems.filter(item => item.category === 'Flan').length },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre <span className="text-primary">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de plats préparés avec passion et des ingrédients de qualité
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 pr-4 py-4 text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <div className={`card relative overflow-hidden ${!item.available ? 'opacity-60' : ''}`}>
                  {/* Unavailable Badge */}
                  {!item.available && (
                    <div className="absolute top-0 left-0 right-0 bg-error text-white text-center py-2 text-sm font-medium z-10">
                      Indisponible
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.image || "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400"}
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Favorite Button */}
                    <motion.button
                      onClick={() => onToggleFavorite(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(item.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    </motion.button>

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {item.price}F
                      </span>
                      {item.available && (
                        <span className="text-sm text-green-600 font-medium">
                          Disponible
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      onClick={() => item.available && onAddToCart(item)}
                      disabled={!item.available}
                      className={`w-full btn ${
                        item.available
                          ? 'btn-primary'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      whileHover={item.available ? { scale: 1.02 } : {}}
                      whileTap={item.available ? { scale: 0.98 } : {}}
                    >
                      <Plus className="w-4 h-4" />
                      {item.available ? 'Ajouter au panier' : 'Indisponible'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;