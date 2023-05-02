import axios from 'axios';

// full route

// get all crops
export const getAllCrops = async () => {
   try {
        const response = await axios.get('http://localhost:9120/api/crops');
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// get all crops in short form
export const getAllCropsShort = async () => {
    try {
        const response = await axios.get('http://localhost:9120/api/crops/short');
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    } 
}

// get crop by id
export const getCropById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:9120/api/crops/${id}`);
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// create crop
export const createCrop = async (crop) => {
    try {
        const response = await axios.post('http://localhost:9120/api/crops', crop);
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }

}

// update crop
export const updateCrop = async (id, crop) => {
    try {
        const response = await axios.put(`http://localhost:9120/api/crops/${id}`, crop);
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// delete crop
export const deleteCrop = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:9120/api/crops/${id}`);
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// search crop
export const searchCrop = async (name) => {
    try {
        const response = await axios.get(`http://localhost:9120/api/crops/search/${name}`);
        console.log('crop', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// get all diseases
export const getAllDiseases = async () => {
    try {
        const response = await axios.get('http://localhost:9120/api/diseases');
        console.log('disease', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// get random diseases
export const getRandomDiseases = async () => {
    try {
        const response = await axios.get('http://localhost:9120/api/diseases/random');
        console.log('disease', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

// get disease by id
export const getDiseaseById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:9120/api/diseases/${id}`);
        console.log('disease', response.data);
        return response.data;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

// create disease
export const createDisease = async (disease) => {
    try {
        const response = await axios.post('http://localhost:9120/api/diseases', disease);
        console.log('disease', response.data);
        return response.data;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

// update disease
export const updateDisease = async (id, disease) => {
    try {
        const response = await axios.put(`http://localhost:9120/api/diseases/${id}`, disease);
        console.log('disease', response.data);
        return response.data;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

// delete disease
export const deleteDisease = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:9120/api/diseases/${id}`);
        console.log('disease', response.data);
        return response.data;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

// search disease
export const searchDisease = async (name) => {
    try {
        const response = await axios.get(`http://localhost:9120/api/diseases/search/${name}`);
        console.log('disease', response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }
}