import axios from 'axios';

// full route

// get all crops
export const getAllCrops = async () => {
   await axios.get('http://localhost:9120/api/crops')
    .then(res => {
        console.log('crops', res.data);
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// get crop by id
export const getCropById = async (id) => {
    await axios.get(`http://localhost:9120/api/crops/${id}`)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// create crop
export const createCrop = async (crop) => {
    await axios.post('http://localhost:9120/api/crops', crop)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// update crop
export const updateCrop = async (id, crop) => {
    await axios.put(`http://localhost:9120/api/crops/${id}`, crop)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// delete crop
export const deleteCrop = async (id) => {
    await axios.delete(`http://localhost:9120/api/crops/${id}`)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// search crop
export const searchCrop = async (name) => {
    await axios.get(`http://localhost:9120/api/crops/search/${name}`)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// get all diseases
export const getAllDiseases = async () => {
    await axios.get('http://localhost:9120/api/diseases')
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// get disease by id
export const getDiseaseById = async (id) => {
    await axios.get(`http://localhost:9120/api/diseases/${id}`)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// create disease
export const createDisease = async (disease) => {
    await axios.post('http://localhost:9120/api/diseases', disease)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// update disease
export const updateDisease = async (id, disease) => {
    await axios.put(`http://localhost:9120/api/diseases/${id}`, disease)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// delete disease
export const deleteDisease = async (id) => {
    await axios.delete(`http://localhost:9120/api/diseases/${id}`)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}

// search disease
export const searchDisease = async (name) => {
    await axios.get(`http://localhost:9120/api/diseases/search/${name}`)
    .then(res => {
        return res.data;
    }
    )
    .catch(err => {
        console.log(err);
    }
    )
}