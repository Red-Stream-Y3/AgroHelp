import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [server, setServer] = useState("http://localhost:9120");

  //toast methods
  const notify = (type, message) => {
		switch (type) {
		case "success":
			toast.success(message);
			break;
		case "error":
			toast.error(message);
			break;
		case "info":
			toast.info(message);
			break;
		case "warning":
			toast.warn(message);
			break;
		default:
			toast(message);
			break;
		}
	};

  useEffect(() => {
    //set server url in local storage
    localStorage.setItem('agroServer', server);

    // Get user info from local storage
    const userInfoFromStorage = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    if (userInfoFromStorage) {
      setUser(userInfoFromStorage);
    }
  }, []);

  return (
    <Context.Provider value={{ user, setUser, server, setServer, notify }}>
        {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => useContext(Context);
