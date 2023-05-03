import { useState, useEffect } from 'react';
import { BoxWidget, Loader, LineChart } from '../../components';
import { useGlobalContext } from '../../context/ContextProvider';
import { logout, getSiteVisits, getUsers } from '../../api/user';

const AdminDashboard = () => {
  const { user } = useGlobalContext();
  const isAdmin = user && user.role === 'admin'; // Check if user exists
  const [siteVisits, setSiteVisits] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = 25;

  const fetchSite = async () => {
    const visits = await getSiteVisits(user.token);
    const users = await getUsers(user.token);
    setSiteVisits(visits.data);
    setUsers(users.data);
    setLoading(false);
  };

  const totalVisits = siteVisits.reduce((acc, visit) => {
    return acc + visit.count;
  }, 0);

  useEffect(() => {
    if (!user || !isAdmin) {
      logout();
      window.location.href = '/login';
    }
    fetchSite();
  }, [isAdmin, user]);

  return (
    <>
      {!isAdmin && loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 px-4 md:px-10">
            <div className="w-full md:w-auto">
              <BoxWidget
                heading={'Traffic'}
                value={totalVisits}
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
                value={users.length}
                icon={'fa-solid fa-users'}
              />
            </div>
          </div>

          <LineChart siteVisits={siteVisits} loading={loading} />
        </>
      )}
    </>
  );
};

export default AdminDashboard;
