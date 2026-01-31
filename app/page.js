'use client';

import { Award, Briefcase, Building2, CheckCircle, Clock, DollarSign, Filter, Laptop, Mail, MapPin, Menu, Microscope, Monitor, Package, Phone, Search, Shield, ShoppingCart, Star, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const DentalEcommerce = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterType, setFilterType] = useState('all');
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

  // Job data
  const jobs = [
    {
      id: 1,
      title: 'Senior Mechanical Engineer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Senior Level',
      salary: '$120k - $160k',
      posted: '2 days ago',
      category: 'senior',
      workType: 'onsite',
      description: 'Lead the design and development of next-generation agricultural machinery and automated systems. You\'ll work at the intersection of precision agriculture and mechanical innovation, creating solutions that transform how food is grown globally.',
      responsibilities: [
        'Design and optimize mechanical systems for autonomous farming equipment',
        'Lead cross-functional engineering teams in product development cycles',
        'Conduct field testing and iterate on designs based on real-world agricultural conditions',
        'Collaborate with software and electrical teams to integrate smart sensors and IoT systems',
        'Mentor junior engineers and contribute to engineering best practices',
        'Interface with farmers and agricultural experts to understand pain points and requirements'
      ],
      requirements: [
        '7+ years of experience in mechanical engineering, preferably in agricultural or heavy machinery',
        'Bachelor\'s or Master\'s degree in Mechanical Engineering or related field',
        'Proficiency in CAD software (SolidWorks, CATIA, or similar)',
        'Strong understanding of materials science, thermodynamics, and fluid mechanics',
        'Experience with prototyping, testing, and manufacturing processes',
        'Excellent problem-solving skills and ability to work in ambiguous environments'
      ],
      benefits: [
        'Comprehensive health, dental, and vision insurance',
        'Equity compensation package',
        '401(k) matching up to 6%',
        'Unlimited PTO policy',
        'Professional development budget of $5,000 annually',
        'State-of-the-art engineering lab and testing facilities',
        'Relocation assistance available'
      ]
    },
    {
      id: 2,
      title: 'Electrical Engineer',
      location: 'Austin, TX',
      type: 'Full-time',
      experience: 'Mid Level',
      salary: '$95k - $130k',
      posted: '1 week ago',
      category: 'mid',
      workType: 'hybrid',
      description: 'Design and implement electrical systems for precision agriculture equipment. Work on cutting-edge sensor integration, power management, and control systems that enable smart farming solutions.',
      responsibilities: [
        'Design electrical schematics and PCB layouts for agricultural IoT devices',
        'Develop power management systems for solar and battery-powered field equipment',
        'Integrate sensors and actuators into autonomous farming machinery',
        'Conduct electrical testing, debugging, and validation of prototypes',
        'Ensure compliance with safety standards and environmental regulations',
        'Collaborate with mechanical and software teams on system integration'
      ],
      requirements: [
        '4+ years of experience in electrical engineering',
        'Bachelor\'s degree in Electrical Engineering or related field',
        'Experience with circuit design, PCB layout, and embedded systems',
        'Knowledge of power electronics, motor control, and sensor technologies',
        'Proficiency with electrical design tools (Altium, Eagle, or similar)',
        'Strong analytical and troubleshooting skills'
      ],
      benefits: [
        'Comprehensive health, dental, and vision insurance',
        'Equity compensation package',
        '401(k) matching up to 6%',
        'Flexible hybrid work arrangement',
        'Annual conference and training budget',
        'Gym membership reimbursement',
        'Commuter benefits'
      ]
    },
    {
      id: 3,
      title: 'Software Engineer - IoT',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid Level',
      salary: '$105k - $145k',
      posted: '3 days ago',
      category: 'mid',
      workType: 'remote',
      description: 'Build the software infrastructure that connects millions of sensors in the field to actionable insights for farmers. You\'ll work on distributed systems, real-time data processing, and cloud-based analytics platforms.',
      responsibilities: [
        'Develop firmware for IoT devices deployed in agricultural environments',
        'Build scalable backend systems for processing sensor data from thousands of devices',
        'Design and implement APIs for mobile and web applications',
        'Create data pipelines for real-time monitoring and predictive analytics',
        'Optimize system performance for low-power, low-bandwidth field conditions',
        'Implement security best practices for device authentication and data encryption'
      ],
      requirements: [
        '3+ years of experience in software development with IoT focus',
        'Proficiency in Python, Go, or C++ for embedded systems',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Knowledge of MQTT, CoAP, or other IoT protocols',
        'Understanding of edge computing and distributed systems',
        'Strong debugging and system optimization skills'
      ],
      benefits: [
        'Comprehensive health, dental, and vision insurance',
        'Equity compensation package',
        '401(k) matching up to 6%',
        'Fully remote position with flexible hours',
        'Home office setup stipend of $2,000',
        'Annual team retreats and offsites',
        'Professional development opportunities'
      ]
    },
    {
      id: 4,
      title: 'Junior Design Engineer',
      location: 'Portland, OR',
      type: 'Full-time',
      experience: 'Entry Level',
      salary: '$70k - $90k',
      posted: '5 days ago',
      category: 'entry',
      workType: 'onsite',
      description: 'Start your engineering career working on innovative agricultural technology. You\'ll learn from experienced engineers while contributing to the design and testing of sustainable farming solutions.',
      responsibilities: [
        'Assist in the design of mechanical and electrical components for agricultural equipment',
        'Create 3D models and technical drawings using CAD software',
        'Support prototyping and testing activities in our innovation lab',
        'Document design decisions, test results, and technical specifications',
        'Participate in design reviews and brainstorming sessions',
        'Help maintain design libraries and engineering documentation'
      ],
      requirements: [
        'Bachelor\'s degree in Mechanical, Electrical, or Agricultural Engineering',
        '0-2 years of professional experience (internships count)',
        'Familiarity with CAD software (SolidWorks, Fusion 360, or similar)',
        'Basic understanding of engineering principles and design methodologies',
        'Strong communication skills and eagerness to learn',
        'Passion for sustainable agriculture and environmental impact'
      ],
      benefits: [
        'Comprehensive health, dental, and vision insurance',
        'Equity compensation package',
        '401(k) matching up to 4%',
        'Structured mentorship program',
        'Tuition reimbursement for continued education',
        'Casual work environment with free snacks and beverages',
        'Monthly team building activities'
      ]
    },
    {
      id: 5,
      title: 'Robotics Engineer',
      location: 'Boston, MA',
      type: 'Full-time',
      experience: 'Senior Level',
      salary: '$130k - $170k',
      posted: '4 days ago',
      category: 'senior',
      workType: 'onsite',
      description: 'Pioneer autonomous systems for precision agriculture. Design and develop robotic platforms that navigate fields, identify crops, and perform targeted interventions with minimal human oversight.',
      responsibilities: [
        'Design and implement autonomous navigation systems for agricultural robots',
        'Develop computer vision algorithms for crop detection and health assessment',
        'Integrate sensors, actuators, and control systems for robotic platforms',
        'Conduct field trials and iterate on robot performance in diverse environments',
        'Collaborate with ML engineers on perception and decision-making systems',
        'Lead technical architecture discussions and roadmap planning'
      ],
      requirements: [
        '5+ years of experience in robotics or autonomous systems',
        'Master\'s or PhD in Robotics, Computer Science, or related field preferred',
        'Strong background in SLAM, path planning, and control systems',
        'Experience with ROS, OpenCV, and robotics simulation tools',
        'Programming proficiency in C++ and Python',
        'Track record of shipping robotic products or research publications'
      ],
      benefits: [
        'Comprehensive health, dental, and vision insurance',
        'Equity compensation package',
        '401(k) matching up to 6%',
        'Unlimited PTO policy',
        'Access to cutting-edge robotics lab and field testing sites',
        'Conference travel and research budget',
        'Relocation assistance and visa sponsorship available'
      ]
    }
  ];

  // Filter jobs based on search and filter
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'remote' && job.location === 'Remote') ||
                         (filterType === 'onsite' && job.location !== 'Remote') ||
                         (filterType === 'entry' && job.experience.includes('Entry Level')) ||
                         (filterType === 'senior' && job.experience.includes('Senior Level'));
    return matchesSearch && matchesFilter;
  });

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

  useEffect(() => {
  if (jobs.length > 0 && !selectedJob) {
    setSelectedJob(jobs[0]);
  }
}, [jobs]);

  return (
      <div className="min-h-screen bg-stone-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-green-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <button 
                onClick={() => setCurrentPage('home')} 
                className="text-2xl font-light text-green-800 tracking-wide cursor-pointer hover:text-green-600 transition"
              >
                Ecodentech
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${
                    currentPage === 'home' ? 'border-green-600' : 'border-transparent'
                  }`}
                >
                  Home
                </button>

                {/* Job Careers */}
                <button 
                  onClick={() => setCurrentPage('job-careers')}
                  className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${
                    currentPage === 'job-careers' ? 'border-green-600' : 'border-transparent'
                  }`}
                >
                  Job Careers
                </button>

                {/* Contact Us */}
                <button 
                  onClick={() => setCurrentPage('contact-us')}
                  className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${
                    currentPage === 'contact-us' ? 'border-green-600' : 'border-transparent'
                  }`}
                >
                  Contact Us
                </button>

                {/* About Us*/}
                <button 
                  onClick={() => setCurrentPage('about-us')}
                  className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${
                    currentPage === 'about-us' ? 'border-green-600' : 'border-transparent'
                  }`}
                >
                  About Us
                </button>

                {/* Our Missions with Dropdown */}
                <button 
                  onClick={() => setCurrentPage('missions')}
                  className={`text-green-800 hover:text-green-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-green-600 cursor-pointer ${
                    currentPage === 'missions' ? 'border-green-600' : 'border-transparent'
                  }`}
                >
                  Our Missions
                </button>
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
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="md:hidden text-green-600 cursor-pointer"
              >
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
                  className="block w-full text-left px-3 py-3 text-green-900 hover:bg-green-50 font-light cursor-pointer"
                >
                  Home
                </button>

                {/* Job Careers Mobile */}
                <div>
                  <button 
                    onClick={() => setMobileDropdown(mobileDropdown === 'careers' ? null : 'careers')}
                    className="flex items-center justify-between w-full px-3 py-3 text-green-900 hover:bg-green-50 font-light cursor-pointer"
                  >
                    Job Careers
                  </button>
                </div>

                {/* Contact Us Mobile */}
                <button 
                  onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} 
                  className="block w-full text-left px-3 py-3 text-green-900 hover:bg-green-50 font-light cursor-pointer"
                >
                  Contact Us
                </button>

                {/* About Us Mobile */}
                <div>
                  <button 
                    onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                    className="flex items-center justify-between w-full px-3 py-3 text-green-900 hover:bg-green-50 font-light cursor-pointer"
                  >
                    About Us
                  </button>
                </div>

                {/* Our Missions Mobile */}
                <div>
                  <button 
                    onClick={() => setMobileDropdown(mobileDropdown === 'missions' ? null : 'missions')}
                    className="flex items-center justify-between w-full px-3 py-3 text-green-900 hover:bg-green-50 font-light cursor-pointer"
                  >
                    Our Missions
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Page Content */}
        {currentPage === 'job-careers' && (
          <>
            {/* Header */}
            <div className="bg-linear-to-br from-green-700 via-green-600 to-green-500 text-white py-20 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-green-200 hover:text-white mb-6 flex items-center gap-2 transition group"
                >
                </button>
                <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight">Engineering Careers</h1>
                <p className="text-xl text-green-100 max-w-2xl leading-relaxed">
                  Join our team of innovators shaping the future of agriculture through cutting-edge engineering solutions
                </p>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white border-b border-green-100 text-gray-500 sticky top-20 z-40 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search positions by title or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-5 py-3 rounded-lg transition font-medium ${
                        filterType === 'all' 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'bg-green-50 text-green-800 hover:bg-green-100'
                      }`}
                    >
                      All Positions
                    </button>
                    <button
                      onClick={() => setFilterType('remote')}
                      className={`px-5 py-3 rounded-lg transition font-medium ${
                        filterType === 'remote' 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'bg-green-50 text-green-800 hover:bg-green-100'
                      }`}
                    >
                      Remote
                    </button>
                    <button
                      onClick={() => setFilterType('onsite')}
                      className={`px-5 py-3 rounded-lg transition font-medium ${
                        filterType === 'onsite' 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'bg-green-50 text-green-800 hover:bg-green-100'
                      }`}
                    >
                      On-site
                    </button>
                    <button
                      onClick={() => setFilterType('entry')}
                      className={`px-5 py-3 rounded-lg transition font-medium ${
                        filterType === 'entry' 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'bg-green-50 text-green-800 hover:bg-green-100'
                      }`}
                    >
                      Entry Level
                    </button>
                    <button
                      onClick={() => setFilterType('senior')}
                      className={`px-5 py-3 rounded-lg transition font-medium ${
                        filterType === 'senior' 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'bg-green-50 text-green-800 hover:bg-green-100'
                      }`}
                    >
                      Senior
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid md:grid-cols-5 gap-8">
                {/* Job Listings */}
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-2xl font-light text-green-900 mb-6">
                    {filteredJobs.length} Position{filteredJobs.length !== 1 ? 's' : ''} Available
                  </h2>
                  {filteredJobs.map(job => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`bg-white border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                        selectedJob?.id === job.id 
                          ? 'border-green-500 shadow-md ring-2 ring-green-200' 
                          : 'border-green-200'
                      }`}
                    >
                      <h3 className="text-lg font-medium text-green-900 mb-3">{job.title}</h3>
                      <div className="space-y-2 text-sm text-green-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 shrink-0" />
                          <span>{job.type} • {job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 shrink-0" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span className="text-green-600">Posted {job.posted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Job Details */}
                <div className="md:col-span-3">
                  {selectedJob ? (
                    <div className="bg-white border border-green-200 rounded-xl p-8 shadow-md sticky top-36">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-3xl font-light text-green-900 mb-3">{selectedJob.title}</h2>
                          <div className="flex flex-wrap gap-4 text-sm text-green-900">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {selectedJob.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {selectedJob.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {selectedJob.salary}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedJob(null)}
                          className="md:hidden text-green-600 hover:text-green-800 transition"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="space-y-8 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                        <div>
                          <h3 className="text-xl font-medium text-green-900 mb-3">About the Role</h3>
                          <p className="text-green-800 leading-relaxed">{selectedJob.description}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-medium text-green-900 mb-3">Key Responsibilities</h3>
                          <ul className="space-y-3">
                            {selectedJob.responsibilities.map((item, index) => (
                              <li key={index} className="flex gap-3 text-green-800">
                                <span className="text-green-600 mt-1 font-bold">•</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-medium text-green-900 mb-3">Requirements</h3>
                          <ul className="space-y-3">
                            {selectedJob.requirements.map((item, index) => (
                              <li key={index} className="flex gap-3 text-green-800">
                                <span className="text-green-600 mt-1 font-bold">•</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-medium text-green-900 mb-3">Benefits & Perks</h3>
                          <ul className="space-y-3">
                            {selectedJob.benefits.map((item, index) => (
                              <li key={index} className="flex gap-3 text-green-800">
                                <span className="text-green-600 mt-1 font-bold">•</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-green-200">
                        <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-medium text-lg shadow-md hover:shadow-lg">
                          Apply for This Position
                        </button>
                        <p className="text-center text-sm text-green-600 mt-4">
                          Applications are reviewed on a rolling basis
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border-2 border-dashed border-green-300 rounded-xl p-16 text-center">
                      <Briefcase className="w-20 h-20 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl text-green-900 font-light mb-3">Select a Position</h3>
                      <p className="text-green-900 text-lg">
                        Click on any job listing to view full details and apply
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Why Join Us Section */}
            <div className=" text-green-900 py-20 mt-5 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-light mb-12 text-center">Joining an Adventure</h2>
                <div className="grid md:grid-cols-3 gap-10">
                  <div className="text-center group">
                    <div className="bg-green-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-medium mb-3">Innovation Dental Digital</h3>
                    <p className="text-green-800 text-lg leading-relaxed">
                      Work on cutting-edge projects that impact millions of farmers worldwide
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-green-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-4xl">🌱</span>
                    </div>
                    <h3 className="text-2xl font-medium mb-3">Growth Opportunities</h3>
                    <p className="text-green-800 text-lg leading-relaxed">
                      Continuous learning with mentorship programs and professional development
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="bg-green-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-4xl">🤝</span>
                    </div>
                    <h3 className="text-2xl font-medium mb-3">Tech-Forward</h3>
                    <p className="text-green-800 text-lg leading-relaxed">
                      Join a diverse team of passionate engineers solving real-world problems
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </>
        )}

        {/* Contact Us Page */}
        {currentPage === 'contact-us' && (
          <>
            <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-light text-green-900 mb-8">Contact Us</h1>
                
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-light text-green-800 mb-6">Get in Touch</h2>
                  <p className="text-green-700 mb-8">
                    We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    // Handle form submission
                    const formData = new FormData(e.target);
                    console.log('Form submitted:', Object.fromEntries(formData));
                    // Add your submission logic here
                  }}>
                    <div>
                      <label htmlFor="name" className="block text-green-900 font-light mb-2">Name</label>
                      <input 
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-green-900 font-light mb-2">Email</label>
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900" 
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-green-900 font-light mb-2">Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows="5"
                        required
                        className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-light"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Map Section */}
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/images/map-image.svg" 
                    alt="Khema Digital Dental Solution Location Map"
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-light text-green-900 mb-3">Email</h3>
                    <a href="mailto:info@company.com" className="text-green-700 hover:text-green-900">
                      Sale@ecodentech.com
                    </a>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-light text-green-900 mb-3">Phone</h3>
                    <a href="tel:+15551234567" className="text-green-700 hover:text-green-900">
                      +855 88 928 5555
                    </a>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-light text-green-900 mb-3">Address</h3>
                    <p className="text-green-700">Phumi Tmey, Sangkat Porchentong, Khan Por Senchey, Phnom Penh</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      {/* About Us Page */}
      {currentPage === 'about-us' && (
        <>
          <div className="min-h-screen bg-linear-to-b from-green-50 to-white border border-green-200 py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-light text-green-900 mb-8">About Us</h1>
              
              {/* Profile Cover Image */}
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/cover-company.svg" 
                  alt="Company Cover"
                  className="w-full h-auto"
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-light text-green-800 mb-4">History</h2>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Founded in 2020, we've been dedicated to making a positive impact on our community 
                  and the environment. Our journey began with a simple idea: to create sustainable 
                  solutions that benefit both people and the planet.
                </p>
                
                <p className="text-green-700 mb-6 leading-relaxed">
                  Today, we're proud to serve thousands of customers worldwide, helping them achieve 
                  their goals while maintaining our commitment to sustainability and social responsibility.
                </p>
              </div>
              
              {/* Timeline Section */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-light text-green-800 mb-8">Our Journey</h2>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-300"></div>
                  
                  <div className="space-y-8">
                    {/* 2022 */}
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="text-lg font-medium text-green-900 mb-2">2022</div>
                        <h3 className="text-xl font-light text-green-800 mb-2">Foundation & Vision</h3>
                        <p className="text-green-700">
                          Established ecoDentech with a vision to revolutionize dental care through 
                          sustainable practices and cutting-edge technology.
                        </p>
                      </div>
                    </div>
                    
                    {/* 2023 */}
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="text-lg font-medium text-green-900 mb-2">2023</div>
                        <h3 className="text-xl font-light text-green-800 mb-2">Growth & Innovation</h3>
                        <p className="text-green-700">
                          Expanded our services and integrated advanced digital solutions to enhance 
                          dental practice efficiency while maintaining eco-friendly standards.
                        </p>
                      </div>
                    </div>
                    
                    {/* 2024 */}
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="text-lg font-medium text-green-900 mb-2">2024</div>
                        <h3 className="text-xl font-light text-green-800 mb-2">Excellence in Practice</h3>
                        <p className="text-green-700">
                          Achieved milestone of serving over 500 dental practices, setting new standards 
                          for precision and quality in dental care technology.
                        </p>
                      </div>
                    </div>
                    
                    {/* 2025 */}
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="text-lg font-medium text-green-900 mb-2">2025</div>
                        <h3 className="text-xl font-light text-green-800 mb-2">Community Impact</h3>
                        <p className="text-green-700">
                          Strengthened our commitment to community collaboration and environmental 
                          responsibility, reaching 10,000+ satisfied customers.
                        </p>
                      </div>
                    </div>
                    
                    {/* 2026 */}
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="text-lg font-medium text-green-900 mb-2">2026</div>
                        <h3 className="text-xl font-light text-green-800 mb-2">Future Forward</h3>
                        <p className="text-green-700">
                          Continuing to innovate and transform dental care with AI-powered solutions 
                          and sustainable technologies for the next generation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-light text-green-800 mb-4">Our Core Values</h2>
                <p className="text-green-700 mb-6 leading-relaxed">
                  We are ecoDentech, where everyone can grow unlimited.
                </p>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Eco-friendly</h3>
                    <p className="text-green-700">
                      Empower dental practice with high-tech approach that reduces the environmental impact.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Collaborate</h3>
                    <p className="text-green-700">
                      Enhance your practice while delivering financial security.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Optimize</h3>
                    <p className="text-green-700">
                      Optimize all administrative and support services.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Dignity</h3>
                    <p className="text-green-700">
                      Respect the practice you have created and your vision for the road ahead.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Excellence</h3>
                    <p className="text-green-700">
                      Set the standard for excellence, precision, and high quality dental care.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Nimble</h3>
                    <p className="text-green-700">
                      Learn and grow constantly, and speed up execution.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-light text-green-900 mb-2">Technology</h3>
                    <p className="text-green-700">
                      Use technology as a core in transforming dental care.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Terms & Policy Section */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-light text-green-800 mb-6">Terms & Policy</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-light text-green-900 mb-3">Privacy Policy</h3>
                    <p className="text-green-700 leading-relaxed mb-4">
                      We are committed to protecting your privacy and ensuring the security of your 
                      personal information. We collect and use data only as necessary to provide our 
                      services and improve your experience.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-light text-green-900 mb-3">Terms of Service</h3>
                    <p className="text-green-700 leading-relaxed mb-4">
                      By using our services, you agree to comply with our terms and conditions. We 
                      strive to provide the highest quality dental solutions while maintaining 
                      transparency and ethical practices.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-light text-green-900 mb-3">Data Protection</h3>
                    <p className="text-green-700 leading-relaxed">
                      Your data is protected with industry-standard security measures. We adhere to 
                      all applicable data protection regulations and maintain strict confidentiality 
                      of all patient and practice information.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-600 text-white p-8 rounded-lg text-center">
                  <div className="text-4xl font-light mb-2">500+</div>
                  <div className="font-light">Projects Completed</div>
                </div>
                
                <div className="bg-green-600 text-white p-8 rounded-lg text-center">
                  <div className="text-4xl font-light mb-2">50+</div>
                  <div className="font-light">Team Members</div>
                </div>
                
                <div className="bg-green-600 text-white p-8 rounded-lg text-center">
                  <div className="text-4xl font-light mb-2">10K+</div>
                  <div className="font-light">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* our missions page*/}
      {currentPage === 'missions' && (
        <>
          <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-light text-green-900 mb-8">Our Missions</h1>
              
              <div className="space-y-8">
                {/* Goal Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-linear-to-r from-green-600 to-green-700 p-6">
                    <h3 className="text-2xl font-light text-white">Goal</h3>
                  </div>
                  <div className="p-8">
                    <p className="text-green-700 leading-relaxed text-center">
                      To create lasting positive change and build a sustainable future through 
                      innovative solutions, environmental stewardship, and community empowerment. 
                      We aim to be a catalyst for transformation that benefits both people and planet.
                    </p>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-linear-to-r from-green-600 to-green-700 p-6">
                    <h3 className="text-2xl font-light text-white">Mission</h3>
                  </div>
                  <div className="p-8">
                    <p className="text-green-700 leading-relaxed text-center">
                      We are dedicated to protecting our environment, strengthening communities, 
                      and driving innovation through research and collaboration. By working together 
                      with partners, stakeholders, and communities worldwide, we deliver impactful 
                      programs that create measurable, sustainable outcomes.
                    </p>
                  </div>
                </div>

                {/* Actions Card with Timeline */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-linear-to-r from-green-600 to-green-700 p-6">
                    <h3 className="text-2xl font-light text-white">Actions</h3>
                  </div>
                  <div className="p-8">
                    <p className="text-green-700 mb-10 leading-relaxed text-center">
                      Our strategic roadmap outlines key initiatives and milestones over the coming years.
                    </p>
                    
                    {/* Timeline */}
                    <div className="relative">
                      {/* Vertical Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-300"></div>
                      
                      <div className="space-y-12">
                        {/* 2024 */}
                        <div className="relative pl-20">
                          {/* Timeline Dot */}
                          <div className="absolute left-5 top-2 w-7 h-7 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                          
                          <div className="bg-linear-to-r from-green-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                            <h4 className="text-2xl font-semibold text-green-800 mb-3">2024</h4>
                            <p className="text-green-700 leading-relaxed mb-4">
                              Foundation year - Launch environmental conservation programs and establish 
                              community partnerships across 10 regions.
                            </p>
                            <button 
                              onClick={() => setCurrentPage('actions-2024')}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>

                        {/* 2025 */}
                        <div className="relative pl-20">
                          {/* Timeline Dot */}
                          <div className="absolute left-5 top-2 w-7 h-7 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                          
                          <div className="bg-linear-to-r from-green-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                            <h4 className="text-2xl font-semibold text-green-800 mb-3">2025</h4>
                            <p className="text-green-700 leading-relaxed mb-4">
                              Expansion phase - Scale tree planting initiative to 1 million trees and 
                              launch 500 scholarship programs.
                            </p>
                            <button 
                              onClick={() => setCurrentPage('actions-2025')}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>

                        {/* 2026 */}
                        <div className="relative pl-20">
                          {/* Timeline Dot */}
                          <div className="absolute left-5 top-2 w-7 h-7 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                          
                          <div className="bg-linear-to-r from-green-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                            <h4 className="text-2xl font-semibold text-green-800 mb-3">2026</h4>
                            <p className="text-green-700 leading-relaxed mb-4">
                              Innovation focus - Achieve carbon neutrality in operations and invest 15% 
                              of revenue in research & development.
                            </p>
                            <button 
                              onClick={() => setCurrentPage('actions-2026')}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Detail Pages */}
      {currentPage === 'actions-2024' && (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setCurrentPage('missions')}
              className="text-green-600 hover:text-green-700 mb-8 flex items-center gap-2 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Missions
            </button>
            
            <div className="text-center mb-12">
              <h1 className="text-5xl font-light text-green-900 mb-4">2024 Actions</h1>
              <p className="text-xl text-green-700">Foundation year initiatives</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Environmental Conservation Launch</h3>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Establish baseline environmental programs and partnerships with conservation organizations.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Plant 100,000 trees across 10 regions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Conduct environmental impact assessments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Partner with 15 local conservation groups</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Community Partnerships</h3>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Build relationships with community leaders and establish presence in key areas.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Open 5 regional offices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Award 100 initial scholarships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Host 20 community engagement events</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Research Infrastructure</h3>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Set up research facilities and initiate collaboration with academic institutions.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Establish research lab facilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Partner with 5 universities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>Allocate initial R&D budget of 10%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'actions-2025' && (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setCurrentPage('missions')}
              className="text-green-600 hover:text-green-700 mb-8 flex items-center gap-2 font-medium transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Missions
            </button>
            
            <div className="text-center mb-12">
              <h1 className="text-5xl font-light text-green-900 mb-4">2025 Actions</h1>
              <p className="text-xl text-green-700">Expansion phase initiatives</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Million Tree Initiative</h3>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Scale up tree planting operations to reach 1 million trees by year end.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Plant 900,000 additional trees</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Expand to 25 regions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Engage 10,000 volunteers</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Scholarship Program Expansion</h3>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Increase scholarship opportunities to 500 students annually.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Award 500 scholarships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Launch mentorship program</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Create online learning platform</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Renewable Energy Projects</h3>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Implement renewable energy solutions across all facilities.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Install solar panels on 50% of buildings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Reduce carbon emissions by 40%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 text-xl shrink-0">○</span>
                      <span>Partner with renewable energy providers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'actions-2026' && (
      <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentPage('missions')}
            className="text-green-600 hover:text-green-700 mb-8 flex items-center gap-2 font-medium transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Missions
          </button>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light text-green-900 mb-4">2026 Actions</h1>
            <p className="text-xl text-green-700">Innovation focus initiatives</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Carbon Neutrality Achievement</h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Achieve complete carbon neutrality across all operations through renewable energy adoption and carbon offset programs.
              </p>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Complete solar panel installation on 100% of facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Offset remaining emissions through verified carbon credits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Implement zero-waste policies in all operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Transition entire vehicle fleet to electric</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Research & Development Expansion</h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Invest 15% of revenue in cutting-edge research and development for sustainable technologies.
              </p>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Establish 3 new innovation labs focused on clean technology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Partner with 10 additional universities for joint research</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Launch innovation grant program for sustainable solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Develop proprietary green building materials</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Smart Agriculture Technology</h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Deploy innovative agricultural technologies to improve sustainability and food security.
              </p>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Implement precision farming systems in 50 communities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Introduce water conservation technologies reducing usage by 60%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Train 5,000 farmers in sustainable agriculture practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Create mobile app for real-time crop monitoring</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Digital Education Platform</h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Launch comprehensive digital learning platform to expand educational access globally.
              </p>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Develop 200+ courses in sustainability and technology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Provide free access to 100,000 students worldwide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Create AI-powered personalized learning paths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Offer certification programs recognized by industry partners</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Circular Economy Initiatives</h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Implement circular economy principles to eliminate waste and maximize resource efficiency.
              </p>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Launch product take-back and recycling program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Design all new products for 100% recyclability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Partner with 30 recycling facilities for material recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl shrink-0">○</span>
                    <span>Reduce virgin material usage by 70%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* Home Page */}
      {currentPage === 'home' && (
        <div>
          <div className="relative bg-blue-50 bg-cover bg-center bg-no-repeat"
            style={{backgroundImage:"url('/images/cover_image.png')",}}>
    
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-light mb-8 text-green-900 leading-tight">Ecodent Dental Technology Solutions</h1>
                <p className="text-xl mb-12 text-green-800 font-light leading-relaxed">
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
                  <button onClick={() => setCurrentPage('shop')} className="text-white text-sm border border-white/50 rounded-full px-6 py-2 hover:border-white hover:text-green-900 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Browse Devices →
                  </button>
                  <button onClick={() => setCurrentPage('custom')} className="text-white text-sm border border-white/50 rounded-full px-6 py-2 hover:border-white hover:text-green-900  hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Order Custom Mould →
                  </button>
                  <button onClick={() => setCurrentPage('maintenance')} className="text-white text-sm border border-white/50 rounded-full px-6 py-2 hover:border-white hover:text-green-900 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
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
                        className="w-10 h-10 text-green-900 transition-colors duration-500 group-hover:text-white" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    {/* Text Content */}
                    <h3 className="text-2xl font-bold mb-4 text-green-800 transition-colors duration-500 group-hover:text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed mb-8 transition-colors duration-500 group-hover:text-white/90">
                      {service.desc}
                    </p>
                    
                    {/* Button at the bottom (mt-auto pushes it down) */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => setCurrentPage(service.link)} 
                        className="w-full bg-green-600 text-white px-8 py-2 rounded-full font-light transition-all duration-300 group-hover:bg-white group-hover:text-green-900 shadow-sm"
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
                        className="w-10 h-10 text-green-900 transition-colors duration-500 group-hover:text-white" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    {/* Text Content */}
                    <h3 className="text-2xl font-bold mb-4 text-green-800 transition-colors duration-500 group-hover:text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed mb-8 transition-colors duration-500 group-hover:text-white/90">
                      {service.desc}
                    </p>
                    
                    {/* Button at the bottom (mt-auto pushes it down) */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => setCurrentPage(service.link)} 
                        className="w-full bg-green-600 text-white px-8 py-2 rounded-full font-light transition-all duration-300 group-hover:bg-white group-hover:text-green-900 shadow-sm"
                      >
                        More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          

          {/* How It Works Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-4xl font-bold text-center mb-10 text-green-600 tracking-tight uppercase">Overview of Production Process</h2>
            
            {/* Fixed Prosthetic Devices */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-green-800 border-b-4 border-green-600 inline-block pb-2">Fixed Prosthetic Devices</h3>
              
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
              <h3 className="text-2xl font-bold mb-6 text-green-800 border-b-4 border-green-600 inline-block pb-2">Removable Prosthetic Devices</h3>
              
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
          
          {/* Partnership Section */}
            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-20">
              <h2 className="text-4xl font-bold text-center mb-20 text-green-600">OUR PARTNERSHIPS</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  '/images/logo1.svg',
                  '/images/logo2.svg',
                  '/images/logo3.svg',
                  '/images/logo4.svg',
                  '/images/logo5.svg',
                  '/images/logo6.svg',
                  '/images/logo7.svg',
                  '/images/logo8.svg',
                  '/images/logo9.svg',
                  '/images/logo10.svg'
                ].map((logo, index) => (
                  <div 
                    key={index} 
                    className="bg-green-100 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center hover:bg-green-200 transition-all duration-300 aspect-square"
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
                  <h3 className="font-semibold text-green-900">Filters</h3>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          selectedCategory === cat.id 
                            ? 'bg-green-600 text-white' 
                            : 'hover:bg-green-50 text-green-900'
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
                  <h4 className="text-sm font-semibold text-green-900 mb-3">Price Range</h4>
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
                            : 'hover:bg-green-50 text-green-900'
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
                  className="w-full border border-green-300 text-green-900 px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition"
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
                  <h2 className="text-2xl font-bold text-green-900">
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
                          : 'bg-white border border-green-300 text-green-900 hover:bg-green-50'
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
                        <h3 className="text-lg font-semibold mb-2 text-green-900">{product.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-2 text-sm font-medium">{product.rating}</span>
                          </div>
                          <span className="text-gray-500 text-sm ml-3">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-green-100 pt-4">
                          <span className="text-2xl font-bold text-green-900">${product.price}</span>
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
          <h1 className="text-4xl font-light mb-8 text-green-900">Shop Devices</h1>
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
          <h1 className="text-4xl font-light mb-4 text-green-900">Order Custom 3D Mould</h1>
          <p className="text-green-900 mb-8 font-light">Upload your 3D scan files and we'll create a precision mould for you</p>
          <div className="flex items-center justify-between mb-12">
            {[1,2,3].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 flex items-center justify-center border ${orderStep >= step ? 'bg-green-600text-green-600 text-green-900 border-blue-900text-green-600' : 'border-green-300 text-green-300'}`}>{step}</div>
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
                    <p className="text-lg font-light mb-2 text-green-900">{uploadedFile ? uploadedFile.name : 'Drag and drop your files here'}</p>
                    <p className="text-green-800 text-sm">or click to browse</p>
                    <p className="text-sm text-green-400 mt-4">Supported formats: STL, OBJ, PLY (Max 50MB)</p>
                  </label>
                </div>
                {uploadedFile && (
                  <div className="mt-6 bg-blue-50 border border-green-200 p-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-light text-green-600">File uploaded successfully</p>
                      <p className="text-sm text-green-900">{uploadedFile.name}</p>
                    </div>
                  </div>
                )}
                <div className="mt-8 bg-blue-50 border border-green-200 p-4">
                  <h3 className="font-light text-green-600 mb-2">Don't have a 3D scan?</h3>
                  <p className="text-green-900 text-sm">We can help you get started. Contact us to schedule a scan or learn about our scanning services.</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setOrderStep(2)} disabled={!uploadedFile} className="bg-green-600 text-white px-8 py-3 font-light hover:bg-green-600 transition disabled:bg-green-300 border-green-500 disabled:cursor-not-allowed">Continue to Details</button>
                </div>
              </div>
            )}
            {orderStep === 2 && (
              <div>
                <h2 className="text-2xl font-light mb-6 text-green-900">Mould Details</h2>
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
                  <button onClick={() => setOrderStep(1)} className="text-green-900 border border-green-500 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Back</button>
                  <button onClick={() => setOrderStep(3)} className="bg-green-50 text-green-900 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Review Order</button>
                </div>
              </div>
            )}
            {orderStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" strokeWidth={1} />
                  <h2 className="text-2xl font-light mb-2 text-green-600">Order Summary</h2>
                  <p className="text-green-900 font-light">Review your custom mould order before submitting</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="border border-green-700 p-4">
                    <h3 className="font-light mb-2 text-green-600">Uploaded File</h3>
                    <p className="text-green-900 text-sm">{uploadedFile?.name}</p>
                  </div>
                  <div className="border border-green-700 p-4">
                    <h3 className="font-light mb-2 text-green-600">Mould Details</h3>
                    <p className="text-green-900 text-sm">Type: Standard Dental Mould</p>
                    <p className="text-green-900 text-sm">Material: Standard Resin</p>
                    <p className="text-green-900 text-sm">Quantity: 1</p>
                  </div>
                  <div className="border border-green-700 p-4">
                    <h3 className="font-light mb-2 text-green-600">Timeline</h3>
                    <div className="flex items-center text-green-900 text-sm">
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
                  <button onClick={() => setOrderStep(2)} className="text-green-900 border border-green-500 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Back</button>
                  <button onClick={() => alert('Order submitted successfully! You will receive a confirmation email shortly.')} className="bg-green-50 text-green-900 px-8 py-3 font-light hover:bg-green-600 hover:text-white transition">Submit Order</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Maintenance Mould Page */}
      {currentPage === 'maintenance' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light mb-4 text-green-900">Device Maintenance Services</h1>
          <p className="text-green-900 mb-12 font-light">Keep your equipment running at peak performance</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {icon:Shield,title:'Standard Maintenance',price:199,features:['Complete system diagnostic','Calibration and alignment','Software updates','Cleaning and lubrication']},
              {icon:Award,title:'Premium Maintenance',price:399,features:['All Standard features included','Parts replacement (if needed)','24/7 priority support','Free shipping both ways','1-year extended warranty']}
            ].map((pkg,i) => (
              <div key={i} className="bg-white border border-green-200 p-8">
                <pkg.icon className="w-12 h-12 text-green-600 mb-4" strokeWidth={1} />
                <h2 className="text-2xl font-light mb-4 text-green-600">{pkg.title}</h2>
                <p className="text-green-900 mb-6 font-light">{i===0?'Regular check-up and calibration for optimal performance':'Comprehensive care with priority support and extended warranty'}</p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((f,j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" strokeWidth={1.5} />
                      <span className="text-green-900 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-green-200 pt-4">
                  <div className="text-3xl font-light text-green-600 mb-4">${pkg.price}</div>
                  <button className="w-full bg-green-600 text-white px-8 py-2 font-light transition-all duration-300 group-hover:bg-white group-hover:text-green-900 shadow-sm">Schedule Service</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 p-8 mb-12">
            <h2 className="text-2xl font-light mb-4 text-green-900">Emergency Repair Service</h2>
            <p className="text-green-900 mb-6 font-light">Device not working? We offer fast-track repair services with 24-48 hour turnaround.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-600text-green-600 text-white px-6 py-3 font-light hover:bg-green-600 transition">Request Emergency Repair</button>
              <button className="border border-blue-900text-green-600 text-green-600 px-6 py-3 font-light hover:bg-green-600 hover:text-white transition">Contact Support</button>
            </div>
          </div>
          <div className="bg-white border border-green-200 p-8">
            <h2 className="text-2xl font-light mb-6 text-green-900">Book a Maintenance Appointment</h2>
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
          <h1 className="text-4xl font-light mb-4 text-green-900">How It Works</h1>
          <p className="text-green-900 mb-12 font-light">Understanding our process from start to finish</p>
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
                    <p className="text-green-900 text-sm leading-relaxed">{step.d}</p>
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
                    <p className="text-green-900 text-sm">{benefit.desc}</p>
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
                    <p className="mt-4 text-green-900 text-sm">{faq.a}</p>
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
              <h3 className="text-xl font-light mb-6 text-white">Ecodentech</h3>
              <p className="text-white text-sm leading-relaxed">Ecodent Dental Technology Solutions is a leading tech-driven facility in Cambodia, specializing in high-precision zirconium frameworks and implant restorations.</p>
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
                  <span>+855 88 928 5555</span>
                </li>
                <li className="flex items-center text-white text-sm">
                  <Mail className="w-4 h-4 mr-3" strokeWidth={1.5} />
                  <span>Sale@ecodentech.com</span>
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