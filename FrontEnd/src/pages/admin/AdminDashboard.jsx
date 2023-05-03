import { useEffect } from 'react';
import { BoxWidget, Loader } from '../../components';
import { useGlobalContext } from '../../context/ContextProvider';
import { logout } from '../../api/user';

const AdminDashboard = () => {
  const { user } = useGlobalContext();
  const isAdmin = user && user.role === 'admin'; // Check if user exists

  const total = 25;

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 px-4 md:px-10">
          <div className="w-full md:w-auto">
            <BoxWidget
              heading={'Traffic'}
              value={total}
              icon={'fa-solid fa-arrow-trend-up'}
            />
          </div>
          <div className="w-full md:w-auto">
            <BoxWidget
              heading={'Blogs'}
              value={total}
              icon={'fa-solid fa-newspaper'}
            />
          </div>
          <div className="w-full md:w-auto">
            <BoxWidget
              heading={'Users'}
              value={total}
              icon={'fa-solid fa-users'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
