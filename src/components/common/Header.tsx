import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, X, User, Home, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch(user.role) {
      case 'resident': return '/resident-dashboard';
      case 'owner': return '/owner-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/';
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="bg-blue-700 text-white p-2 rounded-md">
                <Home size={24} />
              </div>
              <span className="ml-2 text-xl font-bold text-blue-700">UrbanEase</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-700 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 transition-colors">
              About
            </Link>
          </nav>

          {/* Authentication Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center text-gray-700 hover:text-blue-700 focus:outline-none"
                >
                  <User size={20} className="mr-1" />
                  <span>{user?.name}</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <Home size={16} className="mr-2" />
                        Dashboard
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-blue-700 hover:text-blue-800 font-medium rounded-md transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="border-l border-gray-300 h-8 mx-2"></div>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/admin-login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium rounded-md transition-colors"
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/owner-login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-700 font-medium rounded-md transition-colors"
                  >
                    Owner Login
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            {isAuthenticated ? (
              <div className="border-t border-gray-200 pt-4 flex flex-col space-y-3">
                <Link
                  to={getDashboardLink()}
                  className="text-gray-700 hover:text-blue-700 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-blue-700 transition-colors flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/admin-login"
                  className="text-gray-700 hover:text-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
                <Link
                  to="/owner-login"
                  className="text-gray-700 hover:text-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Owner Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;