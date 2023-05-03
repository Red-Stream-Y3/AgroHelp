import axios from 'axios';

// user login
export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:9120/api/users/login', {
      email,
      password,
    });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.log(error);
  }
};

// user register
export const register = async (
  username,
  firstName,
  lastName,
  email,
  password
) => {
  try {
    const response = await axios.post('http://localhost:9120/api/users', {
      username,
      firstName,
      lastName,
      email,
      password,
    });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.log(error);
  }
};

// user logout
export const logout = async () => {
  localStorage.removeItem('userInfo');
  document.location.href = '/';
};

// get users
export const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get('http://localhost:9120/api/users', config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// update user
export const updateUser = async (user, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      `http://localhost:9120/api/users/${user._id}`,
      user,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get site visits
export const getSiteVisits = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      'http://localhost:9120/api/visits',
      config
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
