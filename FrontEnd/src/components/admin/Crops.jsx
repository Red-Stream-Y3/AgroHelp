import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Crops = ({
  theadClass,
  setCropTable,
  formatDate,
  value,
  filterData,
  tableFilter,
  crops,
  handleAccept,
  handleDelete,
}) => {
  const cropRow = (crop) => {
    return (
      <tr key={crop._id}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div className="flex">
            <img
              className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
              src={crop.cropImage}
              alt={crop.cropName}
            />
            <h2 className="pl-5 font-medium text-gray-800 dark:text-white capitalize">
              {crop.cropName}
            </h2>
          </div>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize px-5">
            {crop.cropType}
          </h2>
        </td>
        <td className="px-2 py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize">
            {crop.cropIntro.split(' ').slice(0, 8).join(' ')} ...
          </h2>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize px-5">
            {crop.author.firstName}
          </h2>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize px-5">
            {crop.isAccepted === true ? (
              <span>✅ {formatDate(crop.createdAt)}</span>
            ) : (
              <span>❌ {formatDate(crop.createdAt)}</span>
            )}
          </h2>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <div className="flex items-center mt-4 gap-x-4 sm:mt-0 justify-center">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-blue-500 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-blue-700 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
              disabled={crop.isAccepted === true}
              onClick={() => handleAccept(crop._id, 'crop')}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>

            <Link to={`/update/crop/${crop._id}`}>
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-primary dark:text-gray-200 dark:border-gray-700 dark:hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </Link>

            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-red-600 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleDelete(crop._id, 'crop')}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            CROPS
          </h2>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search"
            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={value}
            onChange={filterData}
          />
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className={`px-4 ${theadClass}`}>NAME</th>
                    <th className={`px-5 ${theadClass}`}>TYPE</th>
                    <th className={`px-2 ${theadClass}`}>DETAILS</th>
                    <th className={`px-5 ${theadClass}`}>AUTHOR</th>
                    <th className={`text-center px-5 ${theadClass}`}>DATE</th>
                    <th className={`text-center ${theadClass}`}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {value.length > 0
                    ? tableFilter.map((crop) => cropRow(crop))
                    : crops.map((crop) => cropRow(crop))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:flex sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400"></div>
        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
          <button
            className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={() => setCropTable(false)}
          >
            Diseases
            <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

Crops.propTypes = {
  theadClass: PropTypes.string,
  setCropTable: PropTypes.func,
  formatDate: PropTypes.func,
  value: PropTypes.string,
  filterData: PropTypes.func,
  tableFilter: PropTypes.array,
  crops: PropTypes.array,
  handleAccept: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Crops;
