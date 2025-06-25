import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'equipment' | 'supplements';
}
//this file is to show that we can collaborate with brands to show on our website 
const products: Product[] = [
  {
    id: 1,
    name: "Premium Yoga Mat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "equipment"
  },
  {
    id: 2,
    name: "Resistance Bands Set",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1598971639058-b11fb6f8c641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "equipment"
  },
  {
    id: 3,
    name: "Whey Protein",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "supplements"
  },
  {
    id: 4,
    name: "Pre-Workout",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "supplements"
  }
];
function Shop() {
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'equipment' | 'supplements'>('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Fitness Shop</h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('equipment')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'equipment' ? 'bg-teal-600 text-white' : 'bg-gray-200'
            }`}
          >
            Equipment
          </button>
          <button
            onClick={() => setActiveCategory('supplements')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'supplements' ? 'bg-teal-600 text-white' : 'bg-gray-200'
            }`}
          >
            Supplements
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-teal-600 font-bold">${product.price}</span>
                  <button className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;