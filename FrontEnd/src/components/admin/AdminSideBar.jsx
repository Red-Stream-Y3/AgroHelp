import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
              to="/admin/manage-blogs"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'manage-blogs'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('manage-blogs')}
            >
              <i className="fa-solid fa-newspaper pr-6"></i>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-users"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'manage-users'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('manage-users')}
            >
              <i className="fa-solid fa-users pr-5"></i>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-comments"
              className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                activeLink === 'manage-comments'
                  ? 'bg-primarydark'
                  : 'bg-darkbg hover:bg-secondary'
              } border-y-2 border-black`}
              onClick={() => handleLinkClick('manage-comments')}
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
