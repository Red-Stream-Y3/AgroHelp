import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaBookOpen, FaQuestion, FaPenNib } from 'react-icons/fa';

const AdminSideBar = ({ isSidebarOpen }) => {
  const [activeLink, setActiveLink] = useState('dashboard');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className={`bg-darkbg w-64 flex-shrink-0 ${
        isSidebarOpen ? 'block' : 'hidden'
      } md:block`}
      style={{
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <div className="sidebar-links">
        <ul className="text-gray-500 text-sm font-medium">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'dashboard'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('dashboard')}
            >
              <i className="fa-solid fa-house pr-5"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/knowledge"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'knowledge'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('knowledge')}
            >
              <FaBookOpen className="h-6 w-6" />
              <span className="ml-4">Knowledge Base</span>
            </NavLink>
          </li>{' '}
          <li>
            <NavLink
              to="/admin/forum"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'forum'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('forum')}
            >
              <FaQuestion className="h-6 w-6" />
              <span className="ml-4">Forum</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/blogs"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'blogs'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('blogs')}
            >
              <FaPenNib className="h-6 w-6" />
              <span className="ml-4">Blogs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'users'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('users')}
            >
              <i className="fa-solid fa-users pr-5"></i>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/comments"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'comments'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('comments')}
            >
              <i className="fa-solid fa-comments pr-5"></i>
              Comments
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

AdminSideBar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default AdminSideBar;
