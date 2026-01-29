'use client';

import { Award, Building2, CheckCircle, ChevronDown, Clock, Filter, Laptop, Mail, Menu, Microscope, Monitor, Package, Phone, Search, Shield, ShoppingCart, Star, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const DentalEcommerce = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [orderStep, setOrderStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('best-match');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const products = [
    { id: 1, name: "DentaScan Pro 3000", price: 2499, image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop", rating: 4.8, reviews: 124, description: "Professional-grade 3D dental scanner" },
    { id: 2, name: "MouldMaster Elite", price: 3999, image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=300&fit=crop", rating: 4.9, reviews: 89, description: "Advanced 3D mould printing system" },
    { id: 3, name: "ScanPro Lite", price: 1299, image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=400&h=300&fit=crop", rating: 4.6, reviews: 203, description: "Compact 3D scanner for dental clinics" }
  ];

  const [mobileDropdown, setMobileDropdown] = useState(null);

  const sortOptions = [
    { value: 'best-match', label: 'Best match' },
    { value: 'best-sellers', label: 'Best sellers' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Best rated' },
    { value: 'trending', label: 'Trending' },
    { value: 'price', label: 'Price' }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'scanners', name: '3D Scanners', count: products.filter(p => p.category === 'scanners').length },
    { id: 'printers', name: '3D Printers', count: products.filter(p => p.category === 'printers').length },
    { id: 'maintenance', name: 'Maintenance', count: products.filter(p => p.category === 'maintenance').length },
  ];

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const handleFileUpload = (e) => { if (e.target.files[0]) setUploadedFile(e.target.files[0]); };

  const handleSearch = () => {
    setCurrentPage('search');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Sort products
    switch (sortBy) {
      case 'best-sellers':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // best-match - keep original order
        break;
    }

    return filtered;
  };

  // This runs every time currentPage changes (e.g., navigating to 'order' or 'shop')
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => setCurrentPage('home')} className="text-xl font-light text-green-800 tracking-wide cursor-pointer">
              Ecodentech
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {/* Home */}
              <button 
                onClick={() => setCurrentPage('home')}
                className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${currentPage === 'home' ? 'border-green-600' : 'border-transparent'}`}
              >
                Home
              </button>

              {/* Job Careers with Dropdown */}
              <div className="relative group">
                <button className="text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide flex items-center gap-1 py-2 cursor-pointer">
                  Job Careers
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-green-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button onClick={() => setCurrentPage('careers-engineering')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Engineering Positions
                    </button>
                    <button onClick={() => setCurrentPage('careers-sales')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Sales & Marketing
                    </button>
                    <button onClick={() => setCurrentPage('careers-production')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Production Roles
                    </button>
                    <button onClick={() => setCurrentPage('careers-admin')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Administrative
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${currentPage === 'contact' ? 'border-green-600' : 'border-transparent'}`}
              >
                Contact Us
              </button>

              {/* About Us with Dropdown */}
              <div className="relative group">
                <button className="text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide flex items-center gap-1 py-2 cursor-pointer">
                  About Us
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-green-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button onClick={() => setCurrentPage('about-history')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      History Times
                    </button>
                    <button onClick={() => setCurrentPage('about-board')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Board Members
                    </button>
                    <button onClick={() => setCurrentPage('about-values')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Our Core Values
                    </button>
                  </div>
                </div>
              </div>

              {/* Our Missions with Dropdown */}
              <div className="relative group">
                <button className="text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide flex items-center gap-1 py-2 cursor-pointer">
                  Our Missions
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-green-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button onClick={() => setCurrentPage('mission-statement')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Our Missions
                    </button>
                    <button onClick={() => setCurrentPage('mission-actions')} className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-green-50 cursor-pointer">
                      Our Actions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Search className="w-5 h-5 text-green-800 cursor-pointer hover:text-green-600" strokeWidth={1.5} />
              <div className="relative cursor-pointer">
                <ShoppingCart className="w-5 h-5 text-green-800 cursor-pointer hover:text-green-600" strokeWidth={1.5} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-green-600 cursor-pointer">
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-green-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Home Mobile */}
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-3 py-3 text-green-700 hover:bg-green-50 font-light cursor-pointer"
              >
                Home
              </button>

              {/* Job Careers Mobile */}
              <div>
                <button 
                  onClick={() => setMobileDropdown(mobileDropdown === 'careers' ? null : 'careers')}
                  className="flex items-center justify-between w-full px-3 py-3 text-green-700 hover:bg-green-50 font-light cursor-pointer"
                >
                  Job Careers
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'careers' ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                {mobileDropdown === 'careers' && (
                  <div className="pl-6 space-y-1">
                    <button onClick={() => { setCurrentPage('careers-engineering'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Engineering Positions
                    </button>
                    <button onClick={() => { setCurrentPage('careers-sales'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Sales & Marketing
                    </button>
                    <button onClick={() => { setCurrentPage('careers-production'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Production Roles
                    </button>
                    <button onClick={() => { setCurrentPage('careers-admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Administrative
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Us Mobile */}
              <button 
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-3 py-3 text-green-700 hover:bg-green-50 font-light cursor-pointer"
              >
                Contact Us
              </button>

              {/* About Us Mobile */}
              <div>
                <button 
                  onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                  className="flex items-center justify-between w-full px-3 py-3 text-green-700 hover:bg-green-50 font-light cursor-pointer"
                >
                  About Us
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'about' ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                {mobileDropdown === 'about' && (
                  <div className="pl-6 space-y-1">
                    <button onClick={() => { setCurrentPage('about-history'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Company History
                    </button>
                    <button onClick={() => { setCurrentPage('about-timeline'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Timeline
                    </button>
                    <button onClick={() => { setCurrentPage('about-board'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Board Members
                    </button>
                    <button onClick={() => { setCurrentPage('about-values'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Our Core Values
                    </button>
                  </div>
                )}
              </div>

              {/* Our Missions Mobile */}
              <div>
                <button 
                  onClick={() => setMobileDropdown(mobileDropdown === 'missions' ? null : 'missions')}
                  className="flex items-center justify-between w-full px-3 py-3 text-green-700 hover:bg-green-50 font-light cursor-pointer"
                >
                  Our Missions
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'missions' ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                {mobileDropdown === 'missions' && (
                  <div className="pl-6 space-y-1">
                    <button onClick={() => { setCurrentPage('mission-statement'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Mission Statement
                    </button>
                    <button onClick={() => { setCurrentPage('mission-actions'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 cursor-pointer">
                      Our Actions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div>
          <div className="relative bg-blue-50 bg-cover bg-center bg-no-repeat"
            style={{backgroundImage:"url('/images/cover_image.png')",}}>
    
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-light mb-8 text-green-700 leading-tight">Ecodent Dental Technology Solutions</h1>
                <p className="text-xl mb-12 text-green-700 font-light leading-relaxed">
                  Ecodent Dental Technology Solutions is a leading tech-driven facility in Cambodia, specializing in high-precision zirconium frameworks and implant restorations.
                </p>
                <div className="max-w-2xl">
                <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                  <div className="pl-6 pr-3">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ecodent Search..."
                    className="flex-1 py-4 px-2 text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  <button 
                  onClick={handleSearch}
                  className="bg-green-600 rounded-full text-white px-10 py-4 font-semibold hover:bg-green-700 transition">
                    Search
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button onClick={() => setCurrentPage('shop')} className="text-white text-sm border border-white/50 rounded-full px-6 py-2 hover:border-white hover:text-green-700 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Browse Devices →
                  </button>
                  <button onClick={() => setCurrentPage('custom')} className="text-white text-sm border border-white/50 rounded-full px-6 py-2 hover:border-white hover:text-green-700  hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Order Custom Mould →
                  </button>
                  <button onClick={() => setCurrentPage('maintenance')} className="text-white text-sm border border-white/50 rounded-full px-6 py-2 hover:border-white hover:text-green-700 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Maintenance products →
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white border-t border-b border-green-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[{n:'5K+',l:'Our Revenues'},{n:'40+',l:'Our Employees'},{n:'1+',l:'Dental Clinics'},{n:'10 Years',l:'Experience'}].map((stat,i) => (
                  <div key={i}><div className="text-4xl font-light text-green-600 mb-2">{stat.n}</div><div className="text-green-800 text-sm tracking-wide uppercase">{stat.l}</div></div>
                ))}
              </div>
            </div>
          </div>

          {/* OUR SERVICES SECTION */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-22">
            <h2 className="text-4xl font-bold text-center mb-20 text-green-600 tracking-tight uppercase">OUR SERVICES</h2>
            
            {/* First 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[
                {
                  icon: Microscope,
                  title: 'Ecodent Dental Technology Solutions',
                  desc: (
                    <>
                      + Crown & Bridge
                      <br />
                      + Implant
                      <br />
                      + Removable
                      <br />
                      + Orthodontic
                    </>
                  ),
                  link: 'shop', 
                },
                {
                  icon: Package,
                  title: 'Raksmey Medent Supply',
                  desc: (
                    <>
                      + Clinical Supplies 
                      <br />
                      + Lab Supplies
                      <br />
                      + Repair & Maintenance
                      <br />
                      + Dental Care Financing
                    </>
                  ),
                  link: 'custom',
                },
                {
                  icon: Monitor,
                  title: 'Ecodentech Digital Dental Solution',
                  desc: (
                    <>
                      + ecoDent Planning Center 
                      <br />
                      + ecoDent Imaging Center
                      <br />
                      + CAD/CAM Service Center
                    </>
                  ),
                  link: 'maintenance',
                }
              ].map((service, i) => (
                <div 
                  key={i} 
                  className="group relative bg-white border-green-500 p-8 rounded-2xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden border"
                >
                  {/* Green Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-green-500 via-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Wrapper */}
                  <div className="relative z-10 flex flex-col items-center h-full w-full">
                    {/* Icon Container */}
                    <div className="w-20 h-20 rounded-full border-2 border-green-300 flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10">
                      <service.icon 
                        className="w-10 h-10 text-green-700 transition-colors duration-500 group-hover:text-white" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    {/* Text Content */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 transition-colors duration-500 group-hover:text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed mb-8 transition-colors duration-500 group-hover:text-white/90">
                      {service.desc}
                    </p>
                    
                    {/* Button at the bottom (mt-auto pushes it down) */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => setCurrentPage(service.link)} 
                        className="w-full bg-green-600 text-white px-8 py-2 rounded-full font-light transition-all duration-300 group-hover:bg-white group-hover:text-green-700 shadow-sm"
                      >
                        More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Last 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  icon: Laptop,
                  title: 'Ecodent Technology Solution',
                  desc: (
                    <>
                      + Practice & Lab Management Software 
                      <br />
                      + Dental IT Solution
                      <br />
                      + Education
                      <br />
                      + Dental Business Management
                    </>
                  ),
                  link: 'maintenance',
                },
                {
                  icon: Building2,
                  title: 'Ecodent Hospital',
                  desc: 'Multi Location Dental Clinic/ Network',
                  link: 'maintenance',
                }
              ].map((service, i) => (
                <div 
                  key={i} 
                  className="group relative bg-white border-green-500 p-8 rounded-2xl shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden border"
                >
                  {/* Green Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-green-500 via-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Wrapper */}
                  <div className="relative z-10 flex flex-col items-center h-full w-full">
                    {/* Icon Container */}
                    <div className="w-20 h-20 rounded-full border-2 border-green-300 flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10">
                      <service.icon 
                        className="w-10 h-10 text-green-700 transition-colors duration-500 group-hover:text-white" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    {/* Text Content */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 transition-colors duration-500 group-hover:text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed mb-8 transition-colors duration-500 group-hover:text-white/90">
                      {service.desc}
                    </p>
                    
                    {/* Button at the bottom (mt-auto pushes it down) */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => setCurrentPage(service.link)} 
                        className="w-full bg-green-600 text-white px-8 py-2 rounded-full font-light transition-all duration-300 group-hover:bg-white group-hover:text-green-700 shadow-sm"
                      >
                        More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Partnership Section */}
          <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-20">
              <h2 className="text-4xl font-bold text-center mb-20 text-white">OUR PARTNERSHIPS</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  '/images/logo1.png',
                  '/images/logo2.png',
                  '/images/logo3.png',
                  '/images/logo4.png',
                  '/images/logo5.png',
                  '/images/logo6.png',
                  '/images/logo7.png',
                  '/images/logo8.png',
                  '/images/logo9.png',
                  '/images/logo10.png'
                ].map((logo, index) => (
                  <div 
                    key={index} 
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center hover:bg-white/40 transition-all duration-300 aspect-square border border-white/10"
                  >
                    <div className="text-center w-full">
                      <img 
                        src={logo} 
                        alt={`${index + 1}`} 
                        className="w-full h-16 object-contain mx-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-4xl font-bold text-center mb-12 text-green-600 tracking-tight uppercase">Overview of Production Process</h2>
            
            {/* Fixed Prosthetic Devices */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-4 border-green-600 inline-block pb-2">Fixed Prosthetic Devices</h3>
              
              {/* Process Flow */}
              <div className="overflow-x-auto lg:overflow-x-visible">
              <div className="flex items-center mb-8 w-full min-w-225 lg:min-w-0">
                {[
                  { title: '1) Impression/\n2) Intra-oral Scanner' },
                  { title: 'Model' },
                  { title: 'Framework' },
                  { title: 'Ceramic' },
                  { title: 'QA' },
                  { title: 'Installation' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className={`bg-linear-to-r from-green-600 to-green-700 text-white px-4 py-4 w-full text-center relative h-15 flex items-center justify-center ${i === 0 ? 'rounded-l-lg' : ''} ${i === 5 ? 'rounded-r-lg' : ''}`}>
                      {i < 5 && (
                        <div className="absolute right-0 top-0 w-0 h-0 border-t-30 border-t-transparent border-b-30 border-b-transparent border-l-20 border-l-green-700 translate-x-full z-10"></div>
                      )}
                      <span className="text-sm font-semibold whitespace-pre-line">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Details and Images Grid */}
              <div className="flex gap-4 min-w-225 lg:min-w-0 lg:grid lg:grid-cols-6">
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Provide technical support when dentists take impressions and shading samples</li>
                    <li>• Provide intra-oral scanner to dentists and design treatment plan</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/69/05/20/690520eac20a2b372e3cfac08f6eb156.jpg" alt="Impression and Scanner" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Produce reference model manually or by 3D printer</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/0f/fd/01/0ffd01d5459649db9758123481da3cbf.jpg" alt="Model Production" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Product design</li>
                    <li>• Metal framework: wax and casting or direct fabrication</li>
                    <li>• Ceramic framework: direct fabrication</li>
                  </ul>
                  <img src="https://i.pinimg.com/1200x/83/78/25/83782577160836f1f91ab424104b86db.jpg" alt="Framework Design" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Additional porcelain layer to enhance aesthetics</li>
                  </ul>
                  <img src="https://i.pinimg.com/1200x/64/f9/3b/64f93bf49c9cabbef02a2980d05649b0.jpg" alt="Ceramic Layer" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Quality checks prior to shipment</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/ad/08/58/ad0858f8e857e4d11fc715999e5f1b02.jpg" alt="Quality Assurance" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Provide technical support when dentists install our pros these in the end-user's mouth</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/12/0f/2c/120f2c1d90d83725d34ed0e2bd14d85e.jpg" alt="Installation Support" className="w-full h-32 object-cover rounded" />
                </div>
              </div>
            </div>
            </div>
            
            {/* Removable Prosthetic Devices */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-4 border-green-600 inline-block pb-2">Removable Prosthetic Devices</h3>
              
              {/* Process Flow */}
              <div className="overflow-x-auto lg:overflow-x-visible">
              <div className="flex items-center mb-8 w-full min-w-225 lg:min-w-0">
                {[
                  { title: '1) Impression/\n2) Intra-oral Scanner' },
                  { title: 'Model' },
                  { title: 'Framework' },
                  { title: 'Ceramic' },
                  { title: 'QA' },
                  { title: 'Installation' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className={`bg-linear-to-r from-green-600 to-green-700 text-white px-4 py-4 w-full text-center relative h-15 flex items-center justify-center ${i === 0 ? 'rounded-l-lg' : ''} ${i === 5 ? 'rounded-r-lg' : ''}`}>
                      {i < 5 && (
                        <div className="absolute right-0 top-0 w-0 h-0 border-t-30 border-t-transparent border-b-30 border-b-transparent border-l-20 border-l-green-700 translate-x-full z-10"></div>
                      )}
                      <span className="text-sm font-semibold whitespace-pre-line">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Details and Images Grid */}
              <div className="flex gap-4 min-w-225 lg:min-w-0 lg:grid lg:grid-cols-6">
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Provide technical support when dentists take impressions and shading samples</li>
                    <li>• Provide intra-oral scanner to dentists and design treatment plan</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/4f/47/7a/4f477aa14f35271bfc9d42835c576472.jpg" alt="Impression and Scanner" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Produce reference model manually or by 3D printer</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/00/8a/ea/008aead2b90b04a4c1c8cba73ceb7dee.jpg" alt="Model Production" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Product design</li>
                    <li>• Optional metal framework: wax and casting or direct fabrication</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/31/90/91/319091f27f456524a5e4ce5349f387f9.jpg" alt="Framework Design" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Make a prototype with wax and stock teeth</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/b0/88/03/b08803e6dd8cfc8ab8b71f8925cc7e88.jpg" alt="Prototype Creation" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Optional end-user tests and confirms the prototype</li>
                    <li>• Finalize dentures via plastic injection</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/20/02/bd/2002bde06ed3312a3827e81a76798906.jpg" alt="Completion Process" className="w-full h-32 object-cover rounded" />
                </div>
                
                <div className="flex-1 lg:w-auto">
                  <ul className="text-xs text-gray-700 space-y-1 mb-4 h-24">
                    <li>• Quality checks prior to shipment</li>
                  </ul>
                  <img src="https://i.pinimg.com/736x/ea/d3/72/ead37246de0e22ce26e26301b30e9d7c.jpg" alt="Quality Assurance" className="w-full h-32 object-cover rounded" />
                </div>
              </div>
            </div>
            </div>
          </div>
          </div>
          )}

      {/* Search Results Page */}
      {currentPage === 'search' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden border border-green-200">
              <div className="pl-6 pr-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ecodent Search..."
                className="flex-1 py-4 px-2 text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mr-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Filters and Results */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 shrink-0">
              <div className="bg-white border border-green-200 rounded-lg p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-700">Filters</h3>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          selectedCategory === cat.id 
                            ? 'bg-green-600 text-white' 
                            : 'hover:bg-green-50 text-green-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{cat.name}</span>
                          <span className="text-xs opacity-75">({cat.count})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: '0-1000', label: 'Under $1,000' },
                      { id: '1000-2500', label: '$1,000 - $2,500' },
                      { id: '2500-4000', label: '$2,500 - $4,000' },
                      { id: '4000-999999', label: 'Over $4,000' },
                    ].map(range => (
                      <button
                        key={range.id}
                        onClick={() => setPriceRange(range.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          priceRange === range.id 
                            ? 'bg-green-600 text-white' 
                            : 'hover:bg-green-50 text-green-700'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setSearchQuery('');
                  }}
                  className="w-full border border-green-300 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Results Area */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-green-700">
                    {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {getFilteredProducts().length} products found
                  </p>
                </div>

                {/* Sort Dropdown */}
                <div className="flex gap-2 flex-wrap">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        sortBy === option.value
                          ? 'bg-green-600 text-white'
                          : 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              {getFilteredProducts().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredProducts().map(product => (
                    <div key={product.id} className="bg-white border border-green-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                      <div className="overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-green-700">{product.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-2 text-sm font-medium">{product.rating}</span>
                          </div>
                          <span className="text-gray-500 text-sm ml-3">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-green-100 pt-4">
                          <span className="text-2xl font-bold text-green-700">${product.price}</span>
                          <button 
                            onClick={() => addToCart(product)} 
                            className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Package className="w-16 h-16 mx-auto mb-4" strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange('all');
                      setSearchQuery('');
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shop Page */}
      {currentPage === 'shop' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light mb-8 text-green-700">Shop Devices</h1>
          <div className="grid md:grid-cols-3 gap-12">
            {products.map(product => (
              <div key={product.id} className="bg-green-600 overflow-hidden group">
                <div className="overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light mb-2 text-blue-50">{product.name}</h3>
                  <p className="text-blue-50 mb-6 text-sm">{product.description}</p>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-2 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-blue-50 text-sm ml-3">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-green-200 pt-6">
                    <span className="text-2xl font-light text-blue-50">${product.price}</span>
                    <button onClick={() => addToCart(product)} className="border border-white text-white px-6 py-3 font-light hover:bg-white hover:text-green-600 hover:border-blue-900 transition text-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Mould Page */}
      {currentPage === 'custom' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light mb-4 text-green-700">Order Custom 3D Mould</h1>
          <p className="text-green-700 mb-8 font-light">Upload your 3D scan files and we'll create a precision mould for you</p>
          <div className="flex items-center justify-between mb-12">
            {[1,2,3].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 flex items-center justify-center border ${orderStep >= step ? 'bg-green-600text-green-600 text-green-700 border-blue-900text-green-600' : 'border-green-300 text-green-300'}`}>{step}</div>
                <span className="ml-3 font-light text-green-600 text-sm">{['Upload Files','Details','Confirm'][step-1]}</span>
                {step < 3 && <div className="flex-1 h-px bg-green-300 border-green-300 mx-4"></div>}
              </div>
            ))}
          </div>
          <div className="bg-white border border-green-200 p-8">
            {orderStep === 1 && (
              <div>
                <h2 className="text-2xl font-light mb-6 text-green-600">Upload Your 3D Scan Files</h2>
                <div className="border-2 border-dashed border-green-300 p-12 text-center hover:border-green-400 text-green-200 transition cursor-pointer">
                  <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" accept=".stl,.obj,.ply" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-16 h-16 text-green-600 mx-auto mb-4" strokeWidth={1} />
                    <p className="text-lg font-light mb-2 text-green-700">{uploadedFile ? uploadedFile.name : 'Drag and drop your files here'}</p>
                    <p className="text-green-800 text-sm">or click to browse</p>
                    <p className="text-sm text-green-400 mt-4">Supported formats: STL, OBJ, PLY (Max 50MB)</p>
                  </label>
                </div>
                {uploadedFile && (
                  <div className="mt-6 bg-blue-50 border border-green-200 p-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-light text-green-600">File uploaded successfully</p>
                      <p className="text-sm text-green-700">{uploadedFile.name}</p>
                    </div>
                  </div>
                )}
                <div className="mt-8 bg-blue-50 border border-green-200 p-4">
                  <h3 className="font-light text-green-600 mb-2">Don't have a 3D scan?</h3>
                  <p className="text-green-700 text-sm">We can help you get started. Contact us to schedule a scan or learn about our scanning services.</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setOrderStep(2)} disabled={!uploadedFile} className="bg-green-600 text-white px-8 py-3 font-light hover:bg-green-600 transition disabled:bg-green-300 border-green-500 disabled:cursor-not-allowed">Continue to Details</button>
                </div>
              </div>
            )}
            {orderStep === 2 && (
              <div>
                <h2 className="text-2xl font-light mb-6 text-green-700">Mould Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light mb-2 text-green-600">Mould Type</label>
                    <select className="w-full border border-green-600 px-4 py-3 text-green-600 bg-white font-light">
                      {['Standard Dental Mould','Orthodontic Mould','Implant Guide','Custom Design'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2 text-green-600">Material Preference</label>
                    <select className="w-full border border-green-600 px-4 py-3 text-green-600 bg-white font-light">
                      {['Standard Resin','Biocompatible Resin','Flexible Material','High-Strength Composite'].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2 text-green-600">Quantity</label>
                    <input type="number" defaultValue="1" min="1" className="w-full border border-green-600 px-4 py-3 text-green-600 bg-white font-light" />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2 text-green-600">Special Instructions (Optional)</label>
                    <textarea rows="4" className="w-full border border-green-600 px-4 py-3 text-green-600 bg-white font-light" placeholder="Any specific requirements or notes..."></textarea>
                  </div>
                  <div className="bg-green-50 p-4">
                    <div className="flex justify-between mb-2 text-green-600 font-light"><span>Base Price:</span><span>$149.00</span></div>
                    <div className="flex justify-between mb-2 text-green-600 font-light"><span>Processing:</span><span>$25.00</span></div>
                    <div className="border-t border-green-200 pt-2 mt-2">
                      <div className="flex justify-between text-lg text-green-600"><span className="font-light">Total:</span><span className="font-light">$174.00</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setOrderStep(1)} className="text-green-700 border border-green-500 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Back</button>
                  <button onClick={() => setOrderStep(3)} className="bg-green-50 text-green-700 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Review Order</button>
                </div>
              </div>
            )}
            {orderStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" strokeWidth={1} />
                  <h2 className="text-2xl font-light mb-2 text-green-600">Order Summary</h2>
                  <p className="text-green-700 font-light">Review your custom mould order before submitting</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="border border-green-700 p-4">
                    <h3 className="font-light mb-2 text-green-600">Uploaded File</h3>
                    <p className="text-green-700 text-sm">{uploadedFile?.name}</p>
                  </div>
                  <div className="border border-green-700 p-4">
                    <h3 className="font-light mb-2 text-green-600">Mould Details</h3>
                    <p className="text-green-700 text-sm">Type: Standard Dental Mould</p>
                    <p className="text-green-700 text-sm">Material: Standard Resin</p>
                    <p className="text-green-700 text-sm">Quantity: 1</p>
                  </div>
                  <div className="border border-green-700 p-4">
                    <h3 className="font-light mb-2 text-green-600">Timeline</h3>
                    <div className="flex items-center text-green-700 text-sm">
                      <Clock className="w-5 h-5 mr-2" strokeWidth={1.5} />
                      <span>Estimated delivery: 5-7 business days</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4">
                    <div className="flex justify-between text-xl">
                      <span className="font-light text-green-600">Total Amount:</span>
                      <span className="font-light text-green-600">$174.00</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setOrderStep(2)} className="text-green-700 border border-green-500 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Back</button>
                  <button onClick={() => alert('Order submitted successfully! You will receive a confirmation email shortly.')} className="bg-green-50 text-green-700 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Submit Order</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Maintenance Mould Page */}
      {currentPage === 'maintenance' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light mb-4 text-green-700">Device Maintenance Services</h1>
          <p className="text-green-700 mb-12 font-light">Keep your equipment running at peak performance</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {icon:Shield,title:'Standard Maintenance',price:199,features:['Complete system diagnostic','Calibration and alignment','Software updates','Cleaning and lubrication']},
              {icon:Award,title:'Premium Maintenance',price:399,features:['All Standard features included','Parts replacement (if needed)','24/7 priority support','Free shipping both ways','1-year extended warranty']}
            ].map((pkg,i) => (
              <div key={i} className="bg-white border border-green-200 p-8">
                <pkg.icon className="w-12 h-12 text-green-600 mb-4" strokeWidth={1} />
                <h2 className="text-2xl font-light mb-4 text-green-600">{pkg.title}</h2>
                <p className="text-green-700 mb-6 font-light">{i===0?'Regular check-up and calibration for optimal performance':'Comprehensive care with priority support and extended warranty'}</p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((f,j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" strokeWidth={1.5} />
                      <span className="text-green-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-green-200 pt-4">
                  <div className="text-3xl font-light text-green-600 mb-4">${pkg.price}</div>
                  <button className="w-full bg-green-600 text-white px-8 py-2 font-light transition-all duration-300 group-hover:bg-white group-hover:text-green-700 shadow-sm">Schedule Service</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 p-8 mb-12">
            <h2 className="text-2xl font-light mb-4 text-green-700">Emergency Repair Service</h2>
            <p className="text-green-700 mb-6 font-light">Device not working? We offer fast-track repair services with 24-48 hour turnaround.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-600text-green-600 text-white px-6 py-3 font-light hover:bg-green-600 transition">Request Emergency Repair</button>
              <button className="border border-blue-900text-green-600 text-green-600 px-6 py-3 font-light hover:bg-green-600 hover:text-white transition">Contact Support</button>
            </div>
          </div>
          <div className="bg-white border border-green-200 p-8">
            <h2 className="text-2xl font-light mb-6 text-green-700">Book a Maintenance Appointment</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light mb-2 text-green-600">Full Name</label>
                  <input type="text" className="w-full border border-green-600 px-4 py-3 text-green-600 font-light" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-light mb-2 text-green-600">Email</label>
                  <input type="email" className="w-full border border-green-600 px-4 py-3 text-green-600 font-light" placeholder="john@clinic.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light mb-2 text-green-600">Phone</label>
                  <input type="tel" className="w-full border border-green-600 px-4 py-3 text-green-600 font-light" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-light mb-2 text-green-600">Device Model</label>
                  <select className="w-full border border-green-600 px-4 py-3 text-green-600 font-light">
                    <option>Select your device</option>
                    {products.map(p => <option key={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-green-600">Service Type</label>
                <select className="w-full border border-green-600 px-4 py-3 text-green-600 font-light">
                  <option>Standard Maintenance - $199</option>
                  <option>Premium Maintenance - $399</option>
                  <option>Emergency Repair - Contact for pricing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-green-600">Preferred Date</label>
                <input type="date" className="w-full border border-green-600 px-4 py-3 text-green-600 font-light" />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 text-green-600">Issue Description (Optional)</label>
                <textarea rows="4" className="w-full border border-green-600 px-4 py-3 text-green-600 font-light" placeholder="Describe any issues you're experiencing..."></textarea>
              </div>
              <button type="submit" className="w-full text-green-600 border border-green-300 px-6 py-4 font-light hover:bg-green-600 transition hover:text-white hover:border-green-600 text-lg">Book Appointment</button>
            </form>
          </div>
        </div>
      )}

      {/* How it works Page */}
      {currentPage === 'about' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light mb-4 text-green-700">How It Works</h1>
          <p className="text-green-700 mb-12 font-light">Understanding our process from start to finish</p>
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-light mb-8 text-green-600">Custom Mould Creation Process</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {n:'1',t:'Upload Files',d:'Submit your 3D dental scan files through our secure upload system. We accept STL, OBJ, and PLY formats.'},
                  {n:'2',t:'Expert Review',d:'Our dental technicians review your scan for accuracy and optimal mould design within 24 hours.'},
                  {n:'3',t:'3D Printing',d:'We manufacture your custom mould using state-of-the-art 3D printing technology with medical-grade materials.'},
                  {n:'4',t:'Quality Check & Ship',d:'Each mould undergoes rigorous quality control before being carefully packaged and shipped to your clinic.'}
                ].map((step,i) => (
                  <div key={i}>
                    <div className="bg-green-600 text-white w-16 h-16 flex items-center justify-center mb-4 text-2xl font-light">{step.n}</div>
                    <h3 className="text-xl font-light mb-3 text-green-600">{step.t}</h3>
                    <p className="text-green-700 text-sm leading-relaxed">{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 p-12">
              <h2 className="text-3xl font-light mb-8 text-center text-green-600">Why Choose DentaMould?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {icon:Clock,title:'Fast Turnaround',desc:'5-7 day delivery on custom moulds with express options available for urgent cases.'},
                  {icon:Shield,title:'Quality Guaranteed',desc:'All moulds come with our satisfaction guarantee and are made with FDA-approved materials.'},
                  {icon:Award,title:'Expert Support',desc:'Our team of dental professionals is available to assist you throughout the entire process.'}
                ].map((benefit,i) => (
                  <div key={i} className="text-center">
                    <benefit.icon className="w-12 h-12 text-green-600 mx-auto mb-4" strokeWidth={1} />
                    <h3 className="text-xl font-light mb-3 text-green-600">{benefit.title}</h3>
                    <p className="text-green-700 text-sm">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-8 text-green-600">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {q:'What file formats do you accept?',a:'We accept STL, OBJ, and PLY file formats. These are the most common formats from dental scanning equipment. If you have a different format, please contact us.'},
                  {q:'How long does it take to receive my custom mould?',a:'Standard turnaround is 5-7 business days from the time we receive and approve your scan files. Express service (2-3 days) is available for an additional fee.'},
                  {q:'What if my scan file is rejected?',a:"If your scan doesn't meet our quality standards, we'll contact you within 24 hours with specific feedback and suggestions for obtaining a better scan."},
                  {q:'Do you offer warranties on devices?',a:'Yes, all devices come with a standard 1-year manufacturer warranty. Extended warranties and maintenance packages are available for purchase.'},
                  {q:'Can I track my order?',a:"Absolutely! You'll receive email updates at each stage of production, and you can track your order status through your account dashboard."}
                ].map((faq,i) => (
                  <details key={i} className="bg-white border border-green-200 p-6 cursor-pointer">
                    <summary className="font-light text-lg text-green-600">{faq.q}</summary>
                    <p className="mt-4 text-green-700 text-sm">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-600 text-white border-green-300 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-light mb-6 text-white">DentaMould</h3>
              <p className="text-white text-sm leading-relaxed">Professional 3D dental solutions for modern practices.</p>
            </div>
            <div>
              <h4 className="font-light mb-6 text-white text-sm tracking-wide uppercase">Quick Links</h4>
              <ul className="space-y-3">
                {[{p:'shop',l:'Shop'},{p:'custom',l:'Custom Moulds'},{p:'maintenance',l:'Maintenance'},{p:'about',l:'How It Works'}].map(link => (
                  <li key={link.p}><button onClick={() => setCurrentPage(link.p)} className="text-white hover:text-white transition text-sm">{link.l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-light mb-6 text-white text-sm tracking-wide uppercase">Support</h4>
              <ul className="space-y-3">
                {['FAQ','Shipping Info','Returns','Warranty'].map(item => (
                  <li key={item}><a href="#" className="text-white hover:text-white transition text-sm">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-light mb-6 text-white text-sm tracking-wide uppercase">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-blue-white text-sm">
                  <Phone className="w-4 h-4 mr-3" strokeWidth={1.5} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-white text-sm">
                  <Mail className="w-4 h-4 mr-3" strokeWidth={1.5} />
                  <span>support@dentamould.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-200 mt-12 pt-8 text-center text-white text-sm">
            <p>&copy; 2026 DentaMould. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DentalEcommerce;