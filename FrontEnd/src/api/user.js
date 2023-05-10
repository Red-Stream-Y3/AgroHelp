import axios from 'axios';

// user login
export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/users/login', {
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
    const response = await axios.post('/api/users', {
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
    const response = await axios.get('/api/users', config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get user details
export const getUserDetails = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`/api/users/${id}`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// update profile details
export const updateProfile = async (user, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put('/api/users/profile', user, config);

    localStorage.setItem('userInfo', JSON.stringify(response.data));
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
    const response = await axios.put(`/api/users/${user._id}`, user, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// request role
export const requestRole = async (user, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(
      `/api/users/${user._id}/request`,
      user,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`/api/users/${id}`, config);
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
    const response = await axios.get('/api/visits', config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get author info
export const getAuthorInfo = async (id, token) => {
  try {
    const response = await axios.get(`/api/users/${id}/author`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
