import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSideBar, Loader } from '../../components';
import { useGlobalContext } from '../../context/ContextProvider';
import { logout } from '../../api/user';

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useGlobalContext();

  const isAdmin = user && user.role === 'admin'; // Check if user exists

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!user || !isAdmin) {
      logout();
      window.location.href = '/login';
    }
  }, [isAdmin, user]);

  return (
    <>
      {!isAdmin ? (
        <Loader />
      ) : (
        <div className="flex overflow-hidden">
          {/* Sidebar */}
          <AdminSideBar isSidebarOpen={isSidebarOpen} />

          {/* Main content */}
          <main className="flex-1 flex flex-col">
            {/* Button to open sidebar */}
            <div className="md:hidden absolute top-0 right-0 p-4">
              <button
                className="text-white rounded-md p-1"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <svg
                    className="h-6 w-6 bg-gray-900 rounded-md"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 bg-gray-900 rounded-md"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col w-full overflow-x-auto md:overflow-x-hidden">
              <div className="flex-grow p-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminHome;
