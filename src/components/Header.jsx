import { useState } from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiYoutube, FiDisc } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-gray-900 border-b border-gray-700 shadow-xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent transition-transform group-hover:scale-105">
            Melora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/support">Support</NavLink>
          <NavLink to="/faqs">FAQs</NavLink>
          <NavLink to="/beta-signup" className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all">
            Beta Signup
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute md:hidden top-16 left-0 right-0 bg-gray-850 border-b border-gray-700 z-50 p-6 space-y-4 shadow-xl">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/leaderboard" onClick={() => setIsMenuOpen(false)}>
              Leaderboard
            </MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setIsMenuOpen(false)}>
              Shop
            </MobileNavLink>
            <MobileNavLink to="/support" onClick={() => setIsMenuOpen(false)}>
              Support
            </MobileNavLink>
            <MobileNavLink to="/faqs" onClick={() => setIsMenuOpen(false)}>
              FAQs
            </MobileNavLink>
            <MobileNavLink to="/beta-signup" onClick={() => setIsMenuOpen(false)}>
              Beta Signup
            </MobileNavLink>

            {/* Social Links */}
            <div className="pt-6 border-t border-gray-700 flex justify-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FiInstagram size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FiYoutube size={24} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiDisc size={24} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Reusable NavLink component
function NavLink({ to, children, className }) {
  return (
    <Link
      to={to}
      className={`relative text-gray-300 hover:text-emerald-400 transition-colors font-medium ${className}`}
    >
      <span className="relative group">
        {children}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-500 transition-all group-hover:w-full" />
      </span>
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-3 px-4 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors text-lg hover:text-emerald-400"
    >
      {children}
    </Link>
  );
}