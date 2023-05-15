import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/ContextProvider';
import { getUsers, updateUser, deleteUser } from '../../api/user';
import { toast } from 'react-toastify';
import { Loader } from '../../components';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const { user } = useGlobalContext();
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user && user.role === 'admin';
  const isMod = user && user.role === 'moderator';

  const getAllUsers = async () => {
    const { data } = await getUsers(user.token);
    const filteredUsers = data.filter((u) => u._id !== user._id); // exclude current user
    setUsers(filteredUsers);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id, user.token);

    getAllUsers();
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
          title: 'User removed successfully',
          color: '#f8f9fa',
          background: '#1F2937',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const filterData = (e) => {
    if (e.target.value !== '') {
      setValue(e.target.value);
      const filterTable = users.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
    }
  };

  const handleRole = async (id, role, type) => {
    let toastMsg;

    if (type === 'promote') {
      toastMsg = `Promoted to ${role}`;
    } else if (type === 'demote') {
      toastMsg = `Demoted to ${role}`;
    }

    await updateUser({ _id: id, role: role }, user.token);

    toast.success(toastMsg, {
      hideProgressBar: false,
      closeOnClick: true,
      autoClose: 1500,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    getAllUsers();
  };

  const theadClass =
    'py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-500 dark:text-white';

  const privilegeBtn =
    'flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-primary dark:text-gray-200 dark:border-gray-700 dark:hover:bg-green-700 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed';

  const userRow = (user) => {
    return (
      <tr key={user._id}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div>
            <h2 className="font-medium text-gray-800 dark:text-white capitalize">
              {user.firstName} {user.lastName}
            </h2>
          </div>
        </td>
        <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white">
            {user.email}
          </h2>
        </td>
        <td className="px-2 py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize">
            {user.role}
          </h2>
        </td>
        <td className="px-2 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center mt-4 gap-x-4 sm:mt-0 justify-center">
            {isAdmin && (
              <button
                className={privilegeBtn}
                disabled={user.role === 'admin'}
                onClick={() => {
                  if (user.role === 'regular') {
                    handleRole(user._id, 'contributor', 'promote');
                  } else if (user.role === 'contributor') {
                    handleRole(user._id, 'moderator', 'promote');
                  } else if (user.role === 'moderator') {
                    handleRole(user._id, 'admin', 'promote');
                  }
                }}
              >
                <span>Promote</span>
              </button>
            )}
            {isMod && (
              <button
                className={privilegeBtn}
                disabled={user.role === 'admin' || user.role === 'moderator'}
                onClick={() => {
                  if (user.role === 'regular') {
                    handleRole(user._id, 'contributor', 'promote');
                  } else if (user.role === 'contributor') {
                    handleRole(user._id, 'moderator', 'promote');
                  }
                }}
              >
                <span>Promote</span>
              </button>
            )}

            {isAdmin && (
              <button
                className={privilegeBtn}
                disabled={user.role === 'regular'}
                onClick={() => {
                  if (user.role === 'contributor') {
                    handleRole(user._id, 'regular', 'demote');
                  } else if (user.role === 'moderator') {
                    handleRole(user._id, 'contributor', 'demote');
                  } else if (user.role === 'admin') {
                    handleRole(user._id, 'moderator', 'demote');
                  }
                }}
              >
                <span>Demote</span>
              </button>
            )}

            {isMod && (
              <button
                className={privilegeBtn}
                disabled={user.role === 'regular' || user.role === 'admin'}
                onClick={() => {
                  if (user.role === 'contributor') {
                    handleRole(user._id, 'regular', 'demote');
                  } else if (user.role === 'moderator') {
                    handleRole(user._id, 'contributor', 'demote');
                  }
                }}
              >
                <span>Demote</span>
              </button>
            )}
          </div>
        </td>

        <td className="py-4 text-sm whitespace-nowrap">
          <h2 className="font-medium text-gray-800 dark:text-white capitalize text-center">
            {user.request ? (
              user.request === user.role ? (
                <i className="fa-solid fa-circle-check text-xl text-green-500"></i>
              ) : (
                user.request
              )
            ) : (
              <i className="fa-solid fa-bell-slash text-lg text-yellow-400"></i>
            )}
          </h2>
        </td>

        {isAdmin && (
          <td className="py-4 text-sm whitespace-nowrap">
            <div className="flex items-center mt-4 gap-x-4 sm:mt-0 justify-center">
              <button
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-red-600 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-red-700 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
                disabled={user.email === 'admin@admin.com'}
                onClick={() => confirmDelete(user._id)}
              >
                <i className="fa-solid fa-user-slash"></i>
              </button>
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-gray-900 rounded-xl overflow-x-auto">
          <section className="container px-4 mx-auto">
            <div className="mt-6 md:flex md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    USERS
                  </h2>
                </div>
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
                          <th className={`px-2 ${theadClass}`}>EMAIL</th>
                          <th className={`px-2 ${theadClass}`}>ROLE</th>
                          <th className={`text-center ${theadClass}`}>
                            PRIVILEGES
                          </th>
                          <th className={`text-center ${theadClass}`}>
                            REQUEST
                          </th>
                          {isAdmin && (
                            <th className={`text-center ${theadClass}`}>
                              MANAGE
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {value.length > 0
                          ? tableFilter.map((user) => userRow(user))
                          : users.map((user) => userRow(user))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
