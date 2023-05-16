import { useState, useEffect } from 'react';
import { BoxWidget, Loader, LineChart } from '../../components';
import { useGlobalContext } from '../../context/ContextProvider';
import { logout, getSiteVisits, getUsers } from '../../api/user';
import { getAllBlogs } from '../../api/blog';
import { getAllCrops, getAllDiseases } from '../../api/knowlegdebase';

const AdminDashboard = () => {
  const { user } = useGlobalContext();
  const isAccess = (user && user.role === 'admin') || user.role === 'moderator';
  const [siteVisits, setSiteVisits] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSite = async () => {
    const visits = await getSiteVisits(user.token);
    const users = await getUsers(user.token);
    const blogs = await getAllBlogs();
    const crops = await getAllCrops();
    const diseases = await getAllDiseases();
    setSiteVisits(visits.data);
    setUsers(users.data);
    setBlogs(blogs);
    setCrops(crops);
    setDiseases(diseases);
    setLoading(false);
  };

  useEffect(() => {
    if (!user || !isAccess) {
      logout();
      window.location.href = '/login';
    }
    fetchSite();
  }, [isAccess, user]);

  const totalVisits = siteVisits.reduce((acc, visit) => {
    return acc + visit.count;
  }, 0);

  const formatVisits =
    totalVisits >= 1000
      ? (totalVisits / 1000).toLocaleString('en', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }) + 'K'
      : totalVisits;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <>
      {!isAccess && loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mt-8 px-4 md:px-10">
            <div className="w-full">
              <BoxWidget
                heading={'Traffic'}
                value={formatVisits}
                icon={'fa-solid fa-arrow-trend-up'}
              />
            </div>
            <div className="w-full">
              <BoxWidget
                heading={'Articles'}
                value={crops.length + diseases.length}
                icon={'fa-solid fa-book-open'}
              />
            </div>
            <div className="w-full">
              <BoxWidget
                heading={'Blogs'}
                value={blogs.length}
                icon={'fa-solid fa-newspaper'}
              />
            </div>
            <div className="w-full">
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
