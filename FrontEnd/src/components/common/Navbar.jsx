import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaBookOpen,
  FaQuestion,
  FaPenNib,
  FaSearch,
  FaSignOutAlt,
  FaCog,
  FaSignInAlt,
  FaUserPlus,
  FaLock,
  FaPen,
} from 'react-icons/fa';
import { ImLeaf } from 'react-icons/im';
import { HiMenu, HiOutlineX } from 'react-icons/hi';
import { useGlobalContext } from '../../context/ContextProvider';
import { logout } from '../../api/user';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [search, setSearch] = useState('');

  const { user } = useGlobalContext();
  const isAccess = user && (user.role === 'admin' || user.role === 'moderator');
  const isContributor = user && user.role === 'contributor';
  const isAdmin = user && user.role === 'admin';
  const userImage = user && user.profilePic;

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate('/home');
    }
  };

  const navigation = [
    {
      name: 'Home',
      link: '/home',
      icon: <FaHome className="h-6 w-6 text-white" />,
    },
    {
      name: 'Knowledge',
      link: '/knowledge-base',
      icon: <FaBookOpen className="h-6 w-6 text-white" />,
    },
    {
      name: 'Forum',
      link: '/forum',
      icon: <FaQuestion className="h-6 w-6 text-white" />,
    },
    {
      name: 'Blog',
      link: '/blog',
      icon: <FaPenNib className="h-6 w-6 text-white" />,
    },
  ];

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    }
  }, [user]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsSearchOpen(false);
    setIsProfilePopupOpen(false);
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsOpen(false);
    setIsProfilePopupOpen(false);
  };
  const toggleProfile = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
    setIsOpen(false);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsLogged(false);
    setIsProfilePopupOpen(false);
  };

  return (
    <nav className=" bg-primary">
      <div className=" max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0 flex items-center">
              <ImLeaf className="h-8 w-8 text-white" />
              <span className="text-white font-extrabold ml-2 text-3xl">
                AgroHelp
              </span>
            </Link>
          </div>

          {/* mobile search icon */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleSearch}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Search"
            >
              {isSearchOpen ? (
                <HiOutlineX className="h-6 w-6 text-white" />
              ) : (
                <FaSearch className="h-6 w-6 text-white" />
              )}
            </button>

            {/* mobile profile icon, only visible when logged in */}
            {user && isLogged && (
              <div className="ml-4 relative flex items-center">
                <button
                  onClick={toggleProfile}
                  className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                  aria-label="Profile"
                >
                  {isProfilePopupOpen ? (
                    <HiOutlineX className="h-6 w-6 text-white" />
                  ) : (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={userImage}
                      alt="Profile"
                    />
                  )}
                </button>
              </div>
            )}

            {/* mobile menu button */}
            <button
              onClick={toggleMenu}
              className="ml-4 text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Menu"
            >
              {isOpen ? (
                <HiOutlineX className="h-6 w-6 text-white" />
              ) : (
                <HiMenu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* desktop menu */}
          {/* if current tab is active, add bg-secondary to the link */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`${
                  location.pathname === item.link
                    ? 'bg-primarydark hover:bg-secondary'
                    : ''
                } px-3 py-2 hover:bg-secondary text-white rounded-md flex items-center mx-1`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}

            {/* desktop icon */}
            <div className="lg:hidden ml-4 relative flex items-center">
              <button
                onClick={toggleSearch}
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                aria-label="Search"
              >
                {isSearchOpen ? (
                  <HiOutlineX className="h-6 w-6 text-white" />
                ) : (
                  <FaSearch className="h-6 w-6 text-white" />
                )}
              </button>
            </div>

            {/* desktop search bar */}
            <div className="hidden lg:block ml-4 relative items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch
                    className="h-5 w-5 text-gray-100"
                    aria-hidden="true"
                  />
                </div>
                <form onChange={handleSearch}>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="bg-secondary rounded-full w-full px-4 pl-10 py-2 focus:outline-none focus:shadow-outline focus:bg-primarydark focus:ring-2 focus:ring-primarylight placeholder:text-gray-200 focus:text-white"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>

            {/* desktop profile */}
            {isLogged ? (
              <div className="ml-4 relative flex items-center">
                <button
                  onClick={toggleProfile}
                  className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                  aria-label="Profile"
                >
                  {isProfilePopupOpen ? (
                    <HiOutlineX className="h-6 w-6 text-white" />
                  ) : (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={userImage}
                      alt="Profile"
                    />
                  )}
                </button>
              </div>
            ) : (
              <div className="ml-4 relative flex items-center">
                {/* buttons */}
                <Link
                  to="/login"
                  className="bg-primarydark text-white hover:bg-secondary rounded-md px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primarydark text-white hover:bg-secondary rounded-md px-4 py-2 ml-4"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-primarydark">
            <Link
              to="/"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={toggleMenu}
            >
              <FaHome className="h-6 w-6" />
              <span className="ml-2">Home</span>
            </Link>
            <Link
              to="/knowledge-base"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={toggleMenu}
            >
              <FaBookOpen className="h-6 w-6" />
              <span className="ml-2">Knowledge Base</span>
            </Link>
            <Link
              to="/forum"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={toggleMenu}
            >
              <FaQuestion className="h-6 w-6" />
              <span className="ml-2">Forum</span>
            </Link>
            <Link
              to="/blog"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={toggleMenu}
            >
              <FaPenNib className="h-6 w-6" />
              <span className="ml-2">Blog</span>
            </Link>
            {/* not logged in */}
            {!isLogged && (
              <Link
                to="/login"
                className="flex bg-secondary px-3 py-2 text-base font-medium text-white hover:bg-primary rounded-md items-center"
                onClick={toggleMenu}
              >
                <FaSignInAlt className="h-6 w-6" />
                <span className="ml-2">Login</span>
              </Link>
            )}
            {!isLogged && (
              <Link
                to="/register"
                className="flex bg-secondary px-3 py-2 text-base font-medium text-white hover:bg-primary rounded-md items-center"
                onClick={toggleMenu}
              >
                <FaUserPlus className="h-6 w-6" />
                <span className="ml-2">Register</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="lg:hidden">
          <div className="px-2 py-4 bg-primarydark">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch
                  className="h-5 w-5 text-gray-100"
                  aria-hidden="true"
                />
              </div>
              <form onChange={handleSearch}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="bg-secondary rounded-full w-full px-4 pl-10 py-2 focus:outline-none focus:shadow-outline focus:bg-primarydark focus:ring-2 focus:ring-primary placeholder:text-gray-200 focus:text-white"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      )}

      {isProfilePopupOpen && (
        <div className="lg w-56 absolute right-0 rounded-xl z-10">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-primarydark rounded-b-xl">
            <Link
              to="/profile"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={() => setIsProfilePopupOpen(false)}
            >
              <img
                className="h-6 w-6 rounded-full object-cover"
                src = {userImage}
                alt="Profile"
              />
              <span className="ml-2">Profile</span>
            </Link>
            {isAccess && (
              <Link
                to="/admin/dashboard"
                className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
                onClick={() => setIsProfilePopupOpen(false)}
              >
                <FaLock className="h-6 w-6" />
                <span className="ml-2">Admin Panel</span>
              </Link>
            )}
            {(isAdmin || isContributor) && (
              <Link
                to="/contributor/dashboard"
                className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
                onClick={() => setIsProfilePopupOpen(false)}
              >
                <FaPen className="h-6 w-6" />
                <span className="ml-2">Contributor Panel</span>
              </Link>
            )}
            <Link
              to="/settings"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={() => setIsProfilePopupOpen(false)}
            >
              <FaCog className="h-6 w-6" />
              <span className="ml-2">Settings</span>
            </Link>
            <Link
              to="/"
              className="flex px-3 py-2 text-base font-medium text-white hover:bg-secondary rounded-md items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-6 w-6" />
              <span
                className="ml-2"
                onClick={() => setIsProfilePopupOpen(false)}
              >
                Logout
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
