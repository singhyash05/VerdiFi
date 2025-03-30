import React, { useState } from 'react';
import { ShoppingBag, Factory, Recycle, Cpu, Leaf, Package } from 'lucide-react';

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    // Carbon Credits
    {
      id: 1,
      category: 'carbon',
      name: "Verified Carbon Credits",
      price: "5000 VRFI",
      description: "Certified carbon offset credits for industrial compliance",
      carbonReduction: "10,000 tons CO2 equivalent",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      category: 'carbon',
      name: "Green Energy Credits",
      price: "3500 VRFI",
      description: "Renewable energy certificates for industrial use",
      carbonReduction: "7,500 tons CO2 equivalent",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400"
    },
    // Raw Materials
    {
      id: 3,
      category: 'materials',
      name: "Recycled Steel Bundles",
      price: "2500 VRFI",
      description: "High-grade recycled steel for manufacturing",
      carbonReduction: "5.2 tons CO2/batch",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 4,
      category: 'materials',
      name: "Industrial Polymer Mix",
      price: "1800 VRFI",
      description: "Sorted and processed recycled polymers",
      carbonReduction: "3.8 tons CO2/ton",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400"
    },
    // IoT Subscriptions
    {
      id: 5,
      category: 'iot',
      name: "Smart Waste Analytics",
      price: "1000 VRFI/month",
      description: "Real-time waste monitoring and analytics platform",
      feature: "24/7 monitoring & reporting",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 6,
      category: 'iot',
      name: "Carbon Tracking Suite",
      price: "1500 VRFI/month",
      description: "IoT-based carbon emissions tracking system",
      feature: "Real-time emissions data",
      image: "https://images.unsplash.com/photo-1580584126903-c17d41830450?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: ShoppingBag },
    { id: 'carbon', name: 'Carbon Credits', icon: Leaf },
    { id: 'materials', name: 'Raw Materials', icon: Package },
    { id: 'iot', name: 'IoT Solutions', icon: Cpu }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8 animate-fade-in">
        <ShoppingBag className="h-8 w-8 text-green-400 mr-3" />
        <h1 className="text-3xl font-bold text-white">VerdiFi Industrial Marketplace</h1>
      </div>

      <div className="bg-green-950/30 p-6 rounded-lg shadow-xl mb-8 animate-slide-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Factory className="h-6 w-6 text-green-400 mr-2" />
            <p className="text-green-100">Available Credits: <span className="text-green-400 font-bold">25000 VRFI</span></p>
          </div>
          <div className="flex items-center">
            <Recycle className="h-6 w-6 text-green-400 mr-2" />
            <p className="text-green-100">Total Carbon Reduced: <span className="text-green-400 font-bold">1,255.5 tons CO2</span></p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              activeCategory === category.id 
                ? 'bg-green-600 text-white' 
                : 'bg-green-950/50 text-green-200 hover:bg-green-950'
            }`}
          >
            <category.icon className="h-5 w-5 mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="bg-green-950 rounded-lg shadow-xl overflow-hidden card-hover animate-fade-in"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-green-200 mb-4">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-bold text-xl">{product.price}</span>
                <span className="text-green-200 text-sm">
                  {product.carbonReduction || product.feature}
                </span>
              </div>
              <button className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                {product.category === 'iot' ? 'Subscribe Now' : 'Purchase Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;