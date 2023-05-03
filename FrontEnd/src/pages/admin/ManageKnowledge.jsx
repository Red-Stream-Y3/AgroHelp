import { useState, useEffect } from 'react';
import {
  getAllCrops,
  deleteCrop,
  getAllDiseases,
  deleteDisease,
} from '../../api/knowlegdebase';
import { Loader } from '../../components';
import { toast } from 'react-toastify';
import { Crops, CropDiseases } from '../../components';

const ManageKnowledge = () => {
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [value, setValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cropTable, setCropTable] = useState(false);

  const getCrops = async () => {
    const data = await getAllCrops();
    setCrops(data);
    setLoading(false);
    setCropTable(true);
  };

  const getDiseases = async () => {
    const data = await getAllDiseases();
    setDiseases(data);
    setLoading(false);
  };

  useEffect(() => {
    getCrops();
    getDiseases();
  }, []);

  const filterData = (e) => {
    if (e.target.value !== '') {
      setValue(e.target.value);
      if (cropTable) {
        const filterTable = crops.filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        setTableFilter([...filterTable]);
      } else {
        const filterTable = diseases.filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        setTableFilter([...filterTable]);
      }
    } else {
      setValue(e.target.value);
    }
  };

  const handleDelete = async (id, type) => {
    if (type === 'crop') {
      const data = await deleteCrop(id);
      if (data) {
        toast.success(`Crop Deleted Successfully`, {
          hideProgressBar: false,
          closeOnClick: true,
          autoClose: 1500,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getCrops();
      }
    } else {
      const data = await deleteDisease(id);
      if (data) {
        toast.success(`Disease Deleted Successfully`, {
          hideProgressBar: false,
          closeOnClick: true,
          autoClose: 1500,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getDiseases();
      }
    }
  };

  // format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const theadClass =
    'py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-500 dark:text-white';

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-gray-900 rounded-xl">
            <section className="container px-4 mx-auto">
              {cropTable ? (
                <Crops
                  theadClass={theadClass}
                  setCropTable={setCropTable}
                  formatDate={formatDate}
                  value={value}
                  filterData={filterData}
                  tableFilter={tableFilter}
                  crops={crops}
                  handleDelete={handleDelete}
                />
              ) : (
                <CropDiseases
                  theadClass={theadClass}
                  setCropTable={setCropTable}
                  formatDate={formatDate}
                  value={value}
                  filterData={filterData}
                  tableFilter={tableFilter}
                  diseases={diseases}
                  handleDelete={handleDelete}
                />
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default ManageKnowledge;
