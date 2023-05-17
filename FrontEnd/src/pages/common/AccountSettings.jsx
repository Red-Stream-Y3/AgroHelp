import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../context/ContextProvider';
import { updateProfile, requestRole } from '../../api/user';
import { Loader } from '../../components';

function AccountSettings() {
  const { user, setUser } = useGlobalContext();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const isAdmin = user && user.role === 'admin';
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      updateProfile(
        {
          id: user._id,
          firstName,
          lastName,
          profilePic,
          username,
          email,
          password,
        },
        user.token
      );

      setUser({
        id: user._id,
        firstName,
        lastName,
        profilePic,
        username,
        email,
        password,
      });

      toast.success('Profile Updated Successfully', {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/home');
    }
  };

  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dqyue23nj',
        uploadPreset: 'agrohelp',
        upload_single: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setProfilePic(result.info.url);
        }
      }
    );
    myWidget.open();
  };

  const handleRequestRole = async (id, role) => {
    await requestRole({ _id: id, request: role }, user.token);
    toast.success(`Requested ${role} Successfully`, {
      hideProgressBar: false,
      closeOnClick: true,
      autoClose: 1500,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className="bg-lightbg w-3/4 rounded-lg mx-auto my-10 md:bg-darkbg md:p-10"
      data-testid="accountSettings"
    >
      <div>
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10">
              <h2 className=" text-3xl font-semibold leading-7 text-white">
                Account Settings
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Change your account settings here.
              </p>
              <hr className="border-primarylight mt-3" />

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primarylight sm:max-w-md">
                      <span className="flex pr-3 select-none items-center pl-3 text-gray-400 sm:text-sm">
                        agrohelp.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                        placeholder="username"
                        value={username}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {!isAdmin && (
                    <div className="sm:col-span-3 mt-5">
                      <button
                        type="button"
                        className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primarylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          if (user.role === 'regular') {
                            handleRequestRole(user._id, 'contributor');
                          } else if (user.role === 'contributor') {
                            handleRequestRole(user._id, 'moderator');
                          } else if (user.role === 'moderator') {
                            handleRequestRole(user._id, 'admin');
                          }
                        }}
                        disabled={user.role === 'admin'}
                      >
                        {user.role === 'regular' && 'Request Contributor'}
                        {user.role === 'contributor' && 'Request Moderator'}
                        {user.role === 'moderator' && 'Request Admin'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Profile Image
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <img
                      className="h-20 w-20 rounded-full bg-slate-300"
                      src={profilePic}
                      alt="Profile"
                    />
                    <div className="flex flex-col gap-y-2">
                      <input type="file" name="photo" className="sr-only" />
                      <label
                        htmlFor="photo"
                        className="cursor-pointer relative bg-gray-900/10 rounded-md py-2 px-3 flex items-center text-sm font-medium text-white hover:bg-gray-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <i className="fa-regular fa-image"></i>
                        <span
                          className="ml-2"
                          id="upload-widget"
                          onClick={handleOpenWidget}
                        >
                          Change
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Change your personal information here.
              </p>
              <hr className="border-primarylight mt-3" />
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="first name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      placeholder="last name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    New password
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      className="px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to="/home">
              <button
                type="button"
                className="rounded-md bg-lightbg px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primarylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={submitHandler}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;
