import { FiInstagram, FiYoutube, FiDisc, FiMail, FiArrowUp, FiHeart } from "react-icons/fi";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Quick Link References for Development */}
        {/*
          <Link href="/leaderboard" />
          <Link href="/tournaments" />
          <Link href="/guilds" />
          <Link href="/midi-library" />
          <Link href="/faq" />
          <Link href="/contact" />
          <Link href="/feedback" />
          <Link href="/community" />
          <Link href="/terms" />
          <Link href="/privacy" />
          <Link href="/cookies" />
          <Link href="/eula" />
        */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Melora
            </h3>
            <p className="text-gray-400 text-sm">
              Redefining piano rhythm gaming with precision and passion
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <FaGooglePlay className="text-teal-400 text-xl" />
                <span className="text-gray-300 text-sm">Google Play</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <FaAppStore className="text-teal-400 text-xl" />
                <span className="text-gray-300 text-sm">App Store</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-gray-300 font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/leaderboard">Leaderboards</FooterLink>
              <FooterLink href="/tournaments">Tournaments</FooterLink>
              <FooterLink href="/guilds">Guilds</FooterLink>
              <FooterLink href="/midi-library">MIDI Library</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-gray-300 font-semibold text-lg">Support</h4>
            <ul className="space-y-3">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/feedback">Feedback</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-gray-300 font-semibold text-lg">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
              <FooterLink href="/eula">EULA</FooterLink>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-gray-300 font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <SocialIcon href="https://instagram.com" icon={<FiInstagram />} color="hover:text-emerald-400" />
              <SocialIcon href="https://youtube.com" icon={<FiYoutube />} color="hover:text-red-400" />
              <SocialIcon href="https://discord.com" icon={<FiDisc />} color="hover:text-blue-400" />
              <SocialIcon href="mailto:support@melora.com" icon={<FiMail />} color="hover:text-teal-400" />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-800 p-6 rounded-xl mb-12">
          <h4 className="text-lg text-white font-semibold mb-3">Subscribe to our Newsletter</h4>
          <form className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-700"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 rounded-lg text-gray-100 font-medium hover:from-emerald-700 hover:to-teal-700 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors group mb-4 md:mb-0"
          >
            Back to Top
            <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Melora • NxT LvL Studios
            </p>
            <p className="text-gray-600 text-xs mt-1 flex items-center justify-center md:justify-end">
              Crafted with <FiHeart className="mx-1 text-red-400" /> by our team and community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center gap-1 group"
    >
      {children}
      <span className="inline-block w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300" />
    </Link>
  </li>
);

const SocialIcon = ({ href, icon, color }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-400 text-xl p-2 rounded-full bg-gray-800 hover:bg-gray-700 ${color} transition-all`}
  >
    {icon}
  </Link>
);

export default Footer;
