import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  Home,
  Briefcase,
  Calculator,
  Calendar,
  DollarSign,
  Users,
  BarChart2,
  List,
  Edit,
  Mail,
  X,
  Menu,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for properties and analytics
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Modern Family Home',
    price: 450000,
    location: 'Sunnyvale, CA',
    size: 2200,
    beds: 4,
    baths: 3,
    imageUrl: 'https://placehold.co/600x400/29B6F6/FFFFFF?text=Modern+Home',
  },
  {
    id: 2,
    title: 'Cozy Downtown Apartment',
    price: 320000,
    location: 'San Francisco, CA',
    size: 1100,
    beds: 2,
    baths: 2,
    imageUrl: 'https://placehold.co/600x400/26A69A/FFFFFF?text=Apartment',
  },
  {
    id: 3,
    title: 'Spacious Suburban Villa',
    price: 850000,
    location: 'Palo Alto, CA',
    size: 3500,
    beds: 5,
    baths: 4,
    imageUrl: 'https://placehold.co/600x400/66BB6A/FFFFFF?text=Suburban+Villa',
  },
  {
    id: 4,
    title: 'Historic Charm Residence',
    price: 675000,
    location: 'Oakland, CA',
    size: 2800,
    beds: 4,
    baths: 3,
    imageUrl: 'https://placehold.co/600x400/FF7043/FFFFFF?text=Historic+Residence',
  },
];

// Mock data for realtor leads and analytics
const MOCK_LEADS = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', inquiry: 'Interested in property #1', status: 'New' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', inquiry: 'Wants to schedule a visit', status: 'Contacted' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', inquiry: 'Asking about mortgage options', status: 'New' },
];

const ANALYTICS_DATA = [
  { name: 'Jan', leads: 4000, sales: 2400 },
  { name: 'Feb', leads: 3000, sales: 1398 },
  { name: 'Mar', leads: 2000, sales: 9800 },
  { name: 'Apr', leads: 2780, sales: 3908 },
  { name: 'May', leads: 1890, sales: 4800 },
  { name: 'Jun', leads: 2390, sales: 3800 },
  { name: 'Jul', leads: 3490, sales: 4300 },
];

// Reusable Tailwind CSS classes for consistent styling
const containerClasses = "min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8";
const cardClasses = "bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full";
const inputClasses = "w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
const buttonClasses = "py-3 px-6 rounded-xl font-semibold transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95";
const primaryButtonClasses = `${buttonClasses} bg-blue-600 text-white hover:bg-blue-700 shadow-md`;
const secondaryButtonClasses = `${buttonClasses} bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm`;

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 py-2 px-4 rounded-xl transition-colors duration-200 ${
      isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

// Component for the Mortgage Calculator
const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Calculate mortgage payment on component mount and state change
    const calculatePayment = () => {
      const principal = parseFloat(loanAmount);
      const interest = parseFloat(interestRate) / 100 / 12;
      const payments = parseFloat(loanTerm) * 12;

      if (principal > 0 && interest > 0 && payments > 0) {
        const monthly = principal * (interest * Math.pow(1 + interest, payments)) / (Math.pow(1 + interest, payments) - 1);
        setMonthlyPayment(monthly.toFixed(2));
      } else {
        setMonthlyPayment(0);
      }
    };
    calculatePayment();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-gray-900">
        <Calculator className="w-6 h-6 text-blue-600" />
        <span>Mortgage Calculator</span>
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className={inputClasses}
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className={inputClasses}
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className={inputClasses}
            min="1"
          />
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
          <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">${monthlyPayment}</p>
        </div>
      </div>
    </div>
  );
};

// Component for a single Property Card
const PropertyCard = ({ property, onToggleFavorite, isFavorite }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative group">
    <img
      src={property.imageUrl}
      alt={property.title}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <button
      onClick={() => onToggleFavorite(property)}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500 hover:text-red-500'
      }`}
    >
      <Heart className="w-5 h-5" />
    </button>
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
      <p className="text-lg font-semibold text-blue-600 mb-1">${property.price.toLocaleString()}</p>
      <p className="text-sm text-gray-500 mb-4">{property.location}</p>
      <div className="flex items-center text-sm text-gray-600 space-x-4">
        <div className="flex items-center space-x-1">
          <Home className="w-4 h-4 text-gray-400" />
          <span>{property.size} sqft</span>
        </div>
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4 text-gray-400" />
          <span>{property.beds} beds</span>
        </div>
        <div className="flex items-center space-x-1">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span>{property.baths} baths</span>
        </div>
      </div>
    </div>
  </div>
);

// Home Buyer Portal component
const HomeBuyerPortal = ({ properties, favorites, setFavorites, onScheduleVisit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
  });

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
    return matchesSearch && matchesPrice;
  });

  const handleToggleFavorite = (property) => {
    if (favorites.some(fav => fav.id === property.id)) {
      setFavorites(favorites.filter(fav => fav.id !== property.id));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Search className="w-6 h-6 text-blue-600" />
            <span>Find Your Dream Home</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClasses}
            />
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className={inputClasses}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.some(fav => fav.id === property.id)}
              />
            ))
          ) : (
            <div className="col-span-full p-10 text-center text-gray-500 bg-white rounded-2xl">
              <p>No properties match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <MortgageCalculator />
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-gray-900">
            <Heart className="w-6 h-6 text-red-500" />
            <span>Saved Listings</span>
          </h2>
          {favorites.length > 0 ? (
            <ul className="space-y-3">
              {favorites.map(fav => (
                <li key={fav.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold">{fav.title}</h4>
                    <p className="text-sm text-gray-500">${fav.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => handleToggleFavorite(fav)}>
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven't saved any listings yet.</p>
          )}
        </div>
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-gray-900">
            <Calendar className="w-6 h-6 text-green-600" />
            <span>Schedule a Visit</span>
          </h2>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            onScheduleVisit(e.target.propertyId.value);
            e.target.reset();
          }}>
            <div>
              <label className="block text-sm font-medium mb-1">Property</label>
              <select name="propertyId" className={inputClasses} required>
                <option value="">Select a property...</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.title} - ${p.price.toLocaleString()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Date</label>
              <input type="date" className={inputClasses} required />
            </div>
            <button type="submit" className={primaryButtonClasses}>
              Request Showing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Realtor Dashboard component
const RealtorDashboard = ({ properties, leads, onAddProperty }) => {
  const [newProperty, setNewProperty] = useState({ title: '', price: '', location: '', size: '', beds: '', baths: '' });
  const [showAddProperty, setShowAddProperty] = useState(false);

  const handleAddProperty = (e) => {
    e.preventDefault();
    if (newProperty.title) {
      onAddProperty({
        id: Math.random(),
        ...newProperty,
        price: Number(newProperty.price),
        size: Number(newProperty.size),
        beds: Number(newProperty.beds),
        baths: Number(newProperty.baths),
        imageUrl: `https://placehold.co/600x400/9C27B0/FFFFFF?text=${newProperty.title.replace(/\s/g, '+')}`,
      });
      setNewProperty({ title: '', price: '', location: '', size: '', beds: '', baths: '' });
      setShowAddProperty(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <BarChart2 className="w-6 h-6 text-blue-600" />
            <span>Analytics Dashboard</span>
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ANALYTICS_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" name="Client Inquiries" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" name="Properties Sold" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <List className="w-6 h-6 text-green-600" />
            <span>My Listings</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {properties.map(p => (
              <div key={p.id} className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4">
                <img src={p.imageUrl} alt={p.title} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-grow">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-500">${p.price.toLocaleString()}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setShowAddProperty(true)}
              className="bg-blue-50 text-blue-600 border-2 border-dashed border-blue-200 hover:bg-blue-100 transition-colors rounded-xl p-4 flex items-center justify-center space-x-2 font-medium"
            >
              <Home className="w-5 h-5" />
              <span>Add New Listing</span>
            </button>
          </div>
        </div>

        {showAddProperty && (
          <div className={`${cardClasses} fixed inset-0 z-50 p-8 m-auto max-w-lg overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Property</h3>
              <button onClick={() => setShowAddProperty(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleAddProperty}>
              <input type="text" placeholder="Title" value={newProperty.title} onChange={e => setNewProperty({...newProperty, title: e.target.value})} className={inputClasses} required />
              <input type="number" placeholder="Price" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} className={inputClasses} required />
              <input type="text" placeholder="Location" value={newProperty.location} onChange={e => setNewProperty({...newProperty, location: e.target.value})} className={inputClasses} required />
              <input type="number" placeholder="Size (sqft)" value={newProperty.size} onChange={e => setNewProperty({...newProperty, size: e.target.value})} className={inputClasses} required />
              <input type="number" placeholder="Beds" value={newProperty.beds} onChange={e => setNewProperty({...newProperty, beds: e.target.value})} className={inputClasses} required />
              <input type="number" placeholder="Baths" value={newProperty.baths} onChange={e => setNewProperty({...newProperty, baths: e.target.value})} className={inputClasses} required />
              <button type="submit" className={primaryButtonClasses}>Add Property</button>
            </form>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className={cardClasses}>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-600" />
            <span>Client Leads</span>
          </h2>
          <ul className="space-y-3">
            {leads.map(lead => (
              <li key={lead.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{lead.name}</h4>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    lead.status === 'New' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{lead.inquiry}</p>
                <div className="flex mt-3 space-x-2">
                  <button className={secondaryButtonClasses.replace('py-3 px-6', 'py-1.5 px-3')}>
                    <Mail className="w-4 h-4 mr-1 inline-block" />
                    Contact
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [role, setRole] = useState(null); // 'buyer', 'realtor', or null
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [favorites, setFavorites] = useState([]);
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
    setFavorites([]);
  };

  const handleAddProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  const handleScheduleVisit = (propertyId) => {
    const property = properties.find(p => p.id === Number(propertyId));
    if (property) {
      const newLead = {
        id: leads.length + 1,
        name: 'Verified Buyer', // Mock user name
        email: 'buyer@example.com', // Mock user email
        inquiry: `Scheduled a visit for ${property.title}`,
        status: 'New',
      };
      setLeads([...leads, newLead]);
      alert('Visit requested successfully! A realtor will be in touch shortly.');
    }
  };

  // Login/Role Selection Screen
  if (!role) {
    return (
      <div className={`${containerClasses} flex items-center justify-center p-4`}>
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome to PropVivo</h1>
          <p className="text-gray-500 mb-8">Please select your role to continue.</p>
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('buyer')}
              className={`${primaryButtonClasses} w-full flex items-center justify-center space-x-2`}
            >
              <Home className="w-5 h-5" />
              <span>Continue as Home Buyer</span>
            </button>
            <button
              onClick={() => handleLogin('realtor')}
              className={`${secondaryButtonClasses} w-full flex items-center justify-center space-x-2`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Continue as Realtor</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center space-x-2">
          <h1 className="text-3xl font-extrabold text-blue-600">
            Prop<span className="text-gray-900">Vivo</span>
          </h1>
        </div>
        <nav className="mt-6 p-2 space-y-2">
          {role === 'buyer' && (
            <>
              <NavItem icon={Search} label="Search Properties" isActive={true} />
              <NavItem icon={Heart} label="Saved Listings" isActive={false} />
              <NavItem icon={Calculator} label="Mortgage Calculator" isActive={false} />
            </>
          )}
          {role === 'realtor' && (
            <>
              <NavItem icon={BarChart2} label="Dashboard" isActive={true} />
              <NavItem icon={Users} label="Client Leads" isActive={false} />
              <NavItem icon={List} label="My Listings" isActive={false} />
            </>
          )}
        </nav>
        <div className="p-6 mt-auto">
          <button onClick={handleLogout} className={`${secondaryButtonClasses} w-full`}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto transition-all duration-300 lg:ml-64">
        {/* Top Bar for mobile */}
        <header className="sticky top-0 bg-white shadow-md p-4 flex items-center justify-between lg:hidden z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-extrabold text-blue-600">Prop<span className="text-gray-900">Vivo</span></h1>
        </header>

        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <main className={containerClasses}>
          {role === 'buyer' && (
            <HomeBuyerPortal
              properties={properties}
              favorites={favorites}
              setFavorites={setFavorites}
              onScheduleVisit={handleScheduleVisit}
            />
          )}
          {role === 'realtor' && (
            <RealtorDashboard
              properties={properties}
              leads={leads}
              onAddProperty={handleAddProperty}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
