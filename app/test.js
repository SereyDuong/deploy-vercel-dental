import { ArrowLeft, Briefcase, ChevronDown, Clock, DollarSign, MapPin, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

const EcodentechCareers = () => {
  const [currentPage, setCurrentPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'remote') return matchesSearch && job.workType === 'remote';
    if (filterType === 'onsite') return matchesSearch && job.workType === 'onsite';
    if (filterType === 'entry') return matchesSearch && job.category === 'entry';
    if (filterType === 'senior') return matchesSearch && job.category === 'senior';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="text-2xl font-light text-emerald-800 tracking-wide cursor-pointer hover:text-emerald-600 transition"
            >
              Ecodentech
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`text-emerald-800 hover:text-emerald-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-emerald-600 cursor-pointer ${
                  currentPage === 'home' ? 'border-emerald-600' : 'border-transparent'
                }`}
              >
                Home
              </button>

              {/* Job Careers with Dropdown */}
              <div className="relative group">
                <button className="text-emerald-800 hover:text-emerald-600 transition font-light text-sm tracking-wide flex items-center gap-1 py-2 cursor-pointer">
                  Job Careers
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-emerald-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        setCurrentPage('careers-engineering');
                        setSelectedJob(jobs[0]);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Senior Mechanical Engineer
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('careers-engineering');
                        setSelectedJob(jobs[1]);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Electrical Engineer
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('careers-engineering');
                        setSelectedJob(jobs[2]);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Software Engineer - IoT
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('careers-engineering');
                        setSelectedJob(jobs[3]);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Junior Design Engineer
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('careers-engineering');
                        setSelectedJob(jobs[4]);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Robotics Engineer
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`text-emerald-800 hover:text-emerald-600 transition font-light text-sm tracking-wide py-2 border-b-2 hover:border-emerald-600 cursor-pointer ${
                  currentPage === 'contact' ? 'border-emerald-600' : 'border-transparent'
                }`}
              >
                Contact Us
              </button>

              {/* About Us with Dropdown */}
              <div className="relative group">
                <button className="text-emerald-800 hover:text-emerald-600 transition font-light text-sm tracking-wide flex items-center gap-1 py-2 cursor-pointer">
                  About Us
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-emerald-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button 
                      onClick={() => setCurrentPage('about-history')} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      History Times
                    </button>
                    <button 
                      onClick={() => setCurrentPage('about-board')} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Board Members
                    </button>
                    <button 
                      onClick={() => setCurrentPage('about-values')} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Our Core Values
                    </button>
                  </div>
                </div>
              </div>

              {/* Our Missions with Dropdown */}
              <div className="relative group">
                <button className="text-emerald-800 hover:text-emerald-600 transition font-light text-sm tracking-wide flex items-center gap-1 py-2 cursor-pointer">
                  Our Missions
                  <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-emerald-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button 
                      onClick={() => setCurrentPage('mission-statement')} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Our Missions
                    </button>
                    <button 
                      onClick={() => setCurrentPage('mission-actions')} 
                      className="block w-full text-left px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      Our Actions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Search className="w-5 h-5 text-emerald-800 cursor-pointer hover:text-emerald-600" strokeWidth={1.5} />
              <div className="relative cursor-pointer">
                <ShoppingCart className="w-5 h-5 text-emerald-800 cursor-pointer hover:text-emerald-600" strokeWidth={1.5} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-emerald-600 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Home Mobile */}
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-3 py-3 text-emerald-700 hover:bg-emerald-50 font-light cursor-pointer"
              >
                Home
              </button>

              {/* Job Careers Mobile */}
              <div>
                <button 
                  onClick={() => setMobileDropdown(mobileDropdown === 'careers' ? null : 'careers')}
                  className="flex items-center justify-between w-full px-3 py-3 text-emerald-700 hover:bg-emerald-50 font-light cursor-pointer"
                >
                  Job Careers
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'careers' ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                {mobileDropdown === 'careers' && (
                  <div className="pl-6 space-y-1">
                    <button 
                      onClick={() => { 
                        setCurrentPage('careers-engineering'); 
                        setSelectedJob(jobs[0]);
                        setMobileMenuOpen(false); 
                      }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Senior Mechanical Engineer
                    </button>
                    <button 
                      onClick={() => { 
                        setCurrentPage('careers-engineering'); 
                        setSelectedJob(jobs[1]);
                        setMobileMenuOpen(false); 
                      }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Electrical Engineer
                    </button>
                    <button 
                      onClick={() => { 
                        setCurrentPage('careers-engineering'); 
                        setSelectedJob(jobs[2]);
                        setMobileMenuOpen(false); 
                      }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Software Engineer - IoT
                    </button>
                    <button 
                      onClick={() => { 
                        setCurrentPage('careers-engineering'); 
                        setSelectedJob(jobs[3]);
                        setMobileMenuOpen(false); 
                      }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Junior Design Engineer
                    </button>
                    <button 
                      onClick={() => { 
                        setCurrentPage('careers-engineering'); 
                        setSelectedJob(jobs[4]);
                        setMobileMenuOpen(false); 
                      }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Robotics Engineer
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Us Mobile */}
              <button 
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-3 py-3 text-emerald-700 hover:bg-emerald-50 font-light cursor-pointer"
              >
                Contact Us
              </button>

              {/* About Us Mobile */}
              <div>
                <button 
                  onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                  className="flex items-center justify-between w-full px-3 py-3 text-emerald-700 hover:bg-emerald-50 font-light cursor-pointer"
                >
                  About Us
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'about' ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                {mobileDropdown === 'about' && (
                  <div className="pl-6 space-y-1">
                    <button 
                      onClick={() => { setCurrentPage('about-history'); setMobileMenuOpen(false); }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      History Times
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('about-board'); setMobileMenuOpen(false); }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Board Members
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('about-values'); setMobileMenuOpen(false); }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Our Core Values
                    </button>
                  </div>
                )}
              </div>

              {/* Our Missions Mobile */}
              <div>
                <button 
                  onClick={() => setMobileDropdown(mobileDropdown === 'missions' ? null : 'missions')}
                  className="flex items-center justify-between w-full px-3 py-3 text-emerald-700 hover:bg-emerald-50 font-light cursor-pointer"
                >
                  Our Missions
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'missions' ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                {mobileDropdown === 'missions' && (
                  <div className="pl-6 space-y-1">
                    <button 
                      onClick={() => { setCurrentPage('mission-statement'); setMobileMenuOpen(false); }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Our Missions
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('mission-actions'); setMobileMenuOpen(false); }} 
                      className="block w-full text-left px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      Our Actions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {currentPage === 'careers-engineering' && (
        <>
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white py-20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-emerald-200 hover:text-white mb-6 flex items-center gap-2 transition group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>
              <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight">Engineering Careers</h1>
              <p className="text-xl text-emerald-100 max-w-2xl leading-relaxed">
                Join our team of innovators shaping the future of agriculture through cutting-edge engineering solutions
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white border-b border-emerald-100 sticky top-20 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search positions by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-5 py-3 rounded-lg transition font-medium ${
                      filterType === 'all' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    All Positions
                  </button>
                  <button
                    onClick={() => setFilterType('remote')}
                    className={`px-5 py-3 rounded-lg transition font-medium ${
                      filterType === 'remote' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    Remote
                  </button>
                  <button
                    onClick={() => setFilterType('onsite')}
                    className={`px-5 py-3 rounded-lg transition font-medium ${
                      filterType === 'onsite' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    On-site
                  </button>
                  <button
                    onClick={() => setFilterType('entry')}
                    className={`px-5 py-3 rounded-lg transition font-medium ${
                      filterType === 'entry' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    Entry Level
                  </button>
                  <button
                    onClick={() => setFilterType('senior')}
                    className={`px-5 py-3 rounded-lg transition font-medium ${
                      filterType === 'senior' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
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
                <h2 className="text-2xl font-light text-emerald-900 mb-6">
                  {filteredJobs.length} Position{filteredJobs.length !== 1 ? 's' : ''} Available
                </h2>
                {filteredJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                      selectedJob?.id === job.id 
                        ? 'border-emerald-500 shadow-md ring-2 ring-emerald-200' 
                        : 'border-emerald-200'
                    }`}
                  >
                    <h3 className="text-lg font-medium text-emerald-900 mb-3">{job.title}</h3>
                    <div className="space-y-2 text-sm text-emerald-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 flex-shrink-0" />
                        <span>{job.type} • {job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 flex-shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-emerald-600">Posted {job.posted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Job Details */}
              <div className="md:col-span-3">
                {selectedJob ? (
                  <div className="bg-white border border-emerald-200 rounded-xl p-8 shadow-md sticky top-36">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-light text-emerald-900 mb-3">{selectedJob.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-emerald-700">
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
                        className="md:hidden text-emerald-600 hover:text-emerald-800 transition"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-8 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                      <div>
                        <h3 className="text-xl font-medium text-emerald-900 mb-3">About the Role</h3>
                        <p className="text-emerald-800 leading-relaxed">{selectedJob.description}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium text-emerald-900 mb-3">Key Responsibilities</h3>
                        <ul className="space-y-3">
                          {selectedJob.responsibilities.map((item, index) => (
                            <li key={index} className="flex gap-3 text-emerald-800">
                              <span className="text-emerald-600 mt-1 font-bold">•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium text-emerald-900 mb-3">Requirements</h3>
                        <ul className="space-y-3">
                          {selectedJob.requirements.map((item, index) => (
                            <li key={index} className="flex gap-3 text-emerald-800">
                              <span className="text-emerald-600 mt-1 font-bold">•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium text-emerald-900 mb-3">Benefits & Perks</h3>
                        <ul className="space-y-3">
                          {selectedJob.benefits.map((item, index) => (
                            <li key={index} className="flex gap-3 text-emerald-800">
                              <span className="text-emerald-600 mt-1 font-bold">•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-emerald-200">
                      <button className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition font-medium text-lg shadow-md hover:shadow-lg">
                        Apply for This Position
                      </button>
                      <p className="text-center text-sm text-emerald-600 mt-4">
                        Applications are reviewed on a rolling basis
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl p-16 text-center">
                    <Briefcase className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl text-emerald-900 font-light mb-3">Select a Position</h3>
                    <p className="text-emerald-700 text-lg">
                      Click on any job listing to view full details and apply
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Why Join Us Section */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-20 mt-20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-light mb-12 text-center">Why Join Our Engineering Team?</h2>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center group">
                  <div className="bg-emerald-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">Innovation First</h3>
                  <p className="text-emerald-100 text-lg leading-relaxed">
                    Work on cutting-edge projects that impact millions of farmers worldwide
                  </p>
                </div>
                <div className="text-center group">
                  <div className="bg-emerald-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">Growth Opportunities</h3>
                  <p className="text-emerald-100 text-lg leading-relaxed">
                    Continuous learning with mentorship programs and professional development
                  </p>
                </div>
                <div className="text-center group">
                  <div className="bg-emerald-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl">🤝</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-3">Collaborative Culture</h3>
                  <p className="text-emerald-100 text-lg leading-relaxed">
                    Join a diverse team of passionate engineers solving real-world problems
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-light text-emerald-900 mb-4">
                Don't See the Right Fit?
              </h2>
              <p className="text-lg text-emerald-700 mb-8">
                We're always looking for talented engineers. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition font-medium text-lg shadow-md hover:shadow-lg">
                Submit General Application
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EcodentechCareers;