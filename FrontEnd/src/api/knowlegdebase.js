import axios from 'axios';

// get all crops
export const getAllCrops = async () => {
  try {
    const response = await axios.get('http://localhost:9120/api/crops');
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get all crops in short form
export const getAllCropsShort = async () => {
  try {
    const response = await axios.get('http://localhost:9120/api/crops/short');
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get crop by id
export const getCropById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:9120/api/crops/${id}`);
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// create crop 
export const createCrop = async (crop,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      'http://localhost:9120/api/crops',
      crop,
      config
    );
    return response;
  }
  catch (error) {
    console.log(error);
  }
};

// update crop
export const updateCrop = async (id, crop, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `http://localhost:9120/api/crops/${id}`,
      crop, config
    );
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// delete crop
export const deleteCrop = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `http://localhost:9120/api/crops/${id}`,
      config
    );
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// search crop
export const searchCrop = async (name) => {
  try {
    const response = await axios.get(
      `http://localhost:9120/api/crops/search/q=${name}`
    );

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// update crop as accept
export const updateCropAccept = async (id, crop, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `http://localhost:9120/api/crops/${id}/accept`,
      crop, config
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get crops by author
export const getCropsByAuthor = async (id) => {
  try {
    const response = await axios.get(
      'http://localhost:9120/api/crops/author/' + id
    );
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get all diseases
export const getAllDiseases = async () => {
  try {
    const response = await axios.get('http://localhost:9120/api/diseases');
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get random diseases
export const getRandomDiseases = async () => {
  try {
    const response = await axios.get(
      'http://localhost:9120/api/diseases/random'
    );
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get disease by id
export const getDiseaseById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:9120/api/diseases/${id}`
    );
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// create disease
export const createDisease = async (disease, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      'http://localhost:9120/api/diseases',
      disease, config
    );
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// update disease
export const updateDisease = async (id, disease, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `http://localhost:9120/api/diseases/${id}`,
      disease, config
    );
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// delete disease
export const deleteDisease = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `http://localhost:9120/api/diseases/${id}`,
      config
    );
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// search disease
export const searchDisease = async (name) => {
  try {
    const response = await axios.get(
      `http://localhost:9120/api/diseases/search/q=${name}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// update disease as accept
export const updateDiseaseAccept = async (id, crop, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `http://localhost:9120/api/diseases/${id}/accept`,
      crop, config
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get diseases by author
export const getDiseasesByAuthor = async (id) => {
  try {
    const response = await axios.get(
      'http://localhost:9120/api/diseases/author/' + id
    );
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addRemoveCropBookmarks = async (id, userId) => {
  try {
    const response = await axios.put(
      `http://localhost:9120/api/crops/${id}/bookmark`,
      userId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addRemoveDiseaseBookmarks = async (id, userId) => {
  try {
    const response = await axios.put(
      `http://localhost:9120/api/diseases/${id}/bookmark`,
      userId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getCropBookmarksByUser = async (id) => {
  try {
    const response = await axios.get('http://localhost:9120/api/crops/bookmarks/' + id);
    console.log('crop', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getDiseaseBookmarksByUser = async (id) => {
  try {
    const response = await axios.get('http://localhost:9120/api/diseases/bookmarks/' + id);
    console.log('disease', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
