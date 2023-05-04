import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ImLeaf } from 'react-icons/im';

const Footer = () => {
  return (
    <footer className="bg-darkbg text-gray-300 py-5 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <ImLeaf className="h-8 w-8 text-white" />
            <span className="text-white font-extrabold ml-2 text-3xl">
              AgroHelp
            </span>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center pt-5 md:pt-0">
          <a href="https://facebook.com" className="mx-2 hover:text-white">
            <FaFacebookF className="text-2xl" />
          </a>
          <a href="https://instagram.com" className="mx-2 hover:text-white">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://twitter.com" className="mx-2 hover:text-white">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://youtube.com" className="mx-2 hover:text-white">
            <FaYoutube className="text-2xl" />
          </a>
        </div>
        <div className="flex items-center pt-5 md:pt-0">
          <Link to="/about" className="mx-3  md:my-0 hover:text-white">
            About
          </Link>
          <Link to="/contact" className="mx-3  md:my-0 hover:text-white">
            Contact
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center pt-5 md:pt-0">
          <div className="flex items-center">
            <span className="text-white font-light">© 2023 AgroHelp</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
