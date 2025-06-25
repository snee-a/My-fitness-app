import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">FitLife</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600">Home</Link>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-teal-600">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-teal-600">Contact</button>
            <Link to="/shop" className="text-gray-700 hover:text-teal-600">Shop</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:inline text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                <Link
                  to="/profile"
                  className="text-teal-600 font-medium hover:underline hover:text-teal-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-teal-600 font-medium hover:text-teal-700">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
