import { useState, useEffect } from 'react';
import { getAllBlogs, deleteBlog, updateBlogAccept } from '../../api/blog';
import { useGlobalContext } from '../../context/ContextProvider';
import { Loader } from '../../components';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageBlogs = () => {
  const { user } = useGlobalContext();
  const [blogs, setBlogs] = useState([]);
  const [value, setValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlogs = async () => {
    const data = await getAllBlogs();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const filterData = (e) => {
    if (e.target.value !== '') {
      setValue(e.target.value);

      const filterTable = blogs.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
    }
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);

    getBlogs();
  };

  const confirmDelete = (id) => {
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
        handleDelete(id);
        Swal.fire({
          icon: 'success',
          title: 'Blog deleted successfully',
          color: '#f8f9fa',
          background: '#1F2937',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleAccept = async (id) => {
    const data = await updateBlogAccept(id, { _id: id, isAccepted: true });
    if (data) {
      toast.success(`Blog accepted to publish`, {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getBlogs();
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

  const blogRow = (blog) => {
    return (
      <tr key={blog._id}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize">
            {blog.title.split(' ').slice(0, 5).join(' ')} ...
          </h2>
        </td>
        {/* <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.body.split(' ').slice(0, 8).join(' ') + ' ...',
              }}
            />
          </h2>
        </td> */}
        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize">
            {blog.author.firstName}
          </h2>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="text-center font-medium text-gray-800 dark:text-white capitalize">
            <span>{formatDate(blog.createdAt)}</span>
          </h2>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="text-center font-medium text-gray-800 dark:text-white capitalize">
            {blog.isAccepted === true ? (
              <span>✅ Accepted </span>
            ) : (
              <span>❌ Not Accepted </span>
            )}
          </h2>
        </td>
        <td className="py-4 text-sm whitespace-nowrap">
          <div className="flex items-center mt-4 gap-x-4 sm:mt-0 justify-center">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-blue-500 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-blue-700 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
              disabled={blog.isAccepted === true}
              onClick={() => handleAccept(blog._id)}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>

            <Link to={`/editblog/${blog._id}`}>
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-primary dark:text-gray-200 dark:border-gray-700 dark:hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </Link>

            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-red-600 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => confirmDelete(blog._id)}
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-gray-900 rounded-xl overflow-x-auto">
            <section className="container px-4 mx-auto">
              <div className="mt-6 md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    BLOGS
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
                            <th className={`px-4 ${theadClass}`}>TITLE</th>
                            {/* <th className={theadClass}>CONTENT</th> */}
                            <th className={theadClass}>AUTHOR</th>
                            <th className={`text-center ${theadClass}`}>
                              DATE
                            </th>
                            <th className={`text-center ${theadClass}`}>
                              STATUS
                            </th>
                            <th className={`text-center ${theadClass}`}>
                              ACTIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {value.length > 0
                            ? tableFilter.map((blog) => blogRow(blog))
                            : blogs.map((blog) => blogRow(blog))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default ManageBlogs;
