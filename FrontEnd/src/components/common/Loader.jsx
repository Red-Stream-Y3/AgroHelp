import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-2xl text-white" />
      <span className="ml-4 text-primarylight">Loading...</span>
    </div>
  );
};

export default Loader;
