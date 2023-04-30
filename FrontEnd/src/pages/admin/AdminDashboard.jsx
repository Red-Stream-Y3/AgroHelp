import { BoxWidget } from '../../components';

const AdminDashboard = () => {
  const total = 25;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 px-4 md:px-10">
      <BoxWidget
        heading={'Total'}
        value={total}
        icon={'fa-solid fa-arrow-trend-up'}
      />
      <BoxWidget
        heading={'Articles'}
        value={total}
        icon={'fa-solid fa-newspaper'}
      />
      <BoxWidget heading={'Users'} value={total} icon={'fa-solid fa-users'} />
    </div>
  );
};

export default AdminDashboard;
