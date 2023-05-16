import { useState, useEffect } from 'react';
import {
  getAllCrops,
  deleteCrop,
  getAllDiseases,
  deleteDisease,
  updateCropAccept,
  updateDiseaseAccept,
} from '../../api/knowlegdebase';
import { Loader } from '../../components';
import { toast } from 'react-toastify';
import { Crops, CropDiseases } from '../../components';
import Swal from 'sweetalert2';

const ManageKnowledge = () => {
  const [crops, setCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [value, setValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cropTable, setCropTable] = useState(false);

  const user = JSON.parse(localStorage.getItem('userInfo'));

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

  const handleAccept = async (id, type) => {
    if (type === 'crop') {
      await updateCropAccept(id, { _id: id, isAccepted: true }, user.token);
      const data = await getAllCrops();
      setCrops(data);
      toast.success(`Crop accepted to  publish`, {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === 'disease') {
      await updateDiseaseAccept(id, { _id: id, isAccepted: true }, user.token);
      const data = await getAllDiseases();
      setDiseases(data);
      toast.success(`Disease accepted to  publish`, {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDelete = async (id, type) => {
    if (type === 'crop') {
      await deleteCrop(id);
      getCrops();
    } else {
      await deleteDisease(id);
      getDiseases();
    }
  };

  const confirmDelete = (id, type) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      color: '#f8f9fa',
      background: '#1F2937',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id, type);
        Swal.fire({
          icon: 'success',
          title: `${type} removed successfully`,
          color: '#f8f9fa',
          background: '#1F2937',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
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
          <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-gray-900 rounded-xl overflow-x-auto">
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
                  handleAccept={handleAccept}
                  handleDelete={confirmDelete}
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
                  handleAccept={handleAccept}
                  handleDelete={confirmDelete}
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
