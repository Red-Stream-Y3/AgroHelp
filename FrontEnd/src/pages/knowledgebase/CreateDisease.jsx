import { useState, useEffect } from 'react'
import { createDisease } from '../../api/knowlegdebase'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const CreateDisease = () => {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('userInfo'))
  const userId = user._id

  const [disease, setDisease] = useState({
    diseaseName: '',
    diseaseImage: [],
    diseaseSymptoms: '',
    diseaseCause: '',
    diseasePrevention: '',
    diseaseTreatment: '',
    diseaseCrops: [],
    diseaseType: '',
    diseaseStatus: '',
    author: userId,
  })

  const handleChange = (e) => {
    setDisease({
      ...disease,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await createDisease(disease, user.token)
      alert('Disease created successfully')
      navigate('/contributor/dashboard')
    } catch (error) {
      console.log(error)
      alert('Disease creation failed')
    }
  }

  const handleCancel = () => {
    setDisease({
      diseaseName: '',
      diseaseImage: [],
      diseaseSymptoms: '',
      diseaseCause: '',
      diseasePrevention: '',
      diseaseTreatment: '',
      diseaseCrops: [],
      diseaseType: '',
      diseaseStatus: '',

    })
  }

  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dqyue23nj',
        uploadPreset: 'agrohelp',
        upload_single: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info.url)
          setDisease({
            ...disease,
            diseaseImage: [...disease.diseaseImage, result.info.url]
          })
        }
      }
    )
    myWidget.open()
  }

  const handleDeleteImage = (index) => {
    const newImages = disease.diseaseImage.filter((image, i) => i !== index)
    setDisease({
      ...disease,
      diseaseImage: newImages
    })
  }

  const handleMock = () => {
    setDisease({
      diseaseName: 'Cottony Rot',
      diseaseSymptoms: 'The disease is characterized by the appearance of a white, cottony growth on the surface of the infected plant parts. The growth is composed of the mycelium of the fungus and the spores. The disease is most common on the fruit, but it may also occur on the leaves, stems, and flowers. The fungus may also infect the fruit through the stem.',
      diseaseCause: 'The fungus survives in the soil and on infected plant debris. The spores are spread by wind and splashing water. The disease is favored by warm, wet weather. The fungus can infect the fruit through the stem.',
      diseasePrevention: 'The disease can be controlled by planting resistant varieties and by using a 3- to 4-year crop rotation. The fungus can survive in the soil for several years, so it is important to rotate with non-host crops. The disease can also be controlled by applying a fungicide to the fruit.',
      diseaseTreatment: 'The disease can be controlled by planting resistant varieties and by using a 3- to 4-year crop rotation. The fungus can survive in the soil for several years, so it is important to rotate with non-host crops. The disease can also be controlled by applying a fungicide to the fruit.',
      diseaseCrops: ['Apple', 'Grape', 'Peach', 'Pear', 'Plum'],
      diseaseType: 'Fungal',
      diseaseStatus: 'Active',
      author: userId,
      diseaseImage: [],
    })
  }

  return (
    <div>
      <div className="bg-darkbg text-white overflow-hidden shadow-xl mx-auto px-10 md:my-20 md:mx-20 lg:mx-60 rounded-xl ">
        <div className="py-4 px-6">
          <h1 className="text-3xl font-semibold mb-3">Create Disease</h1>
          <hr className="border-gray-500 border-1 w-full mb-5" />
          <button
            className="bg-primarylight text-white px-4 py-2 rounded-md mb-5"
            onClick={handleMock}
          >
            Mock Data
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="diseaseName" className="form-label">Disease Name</label>
              <input
                type="text"
                name="diseaseName"
                id="diseaseName"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseName}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cropImage" className="block mb-1">Crop Image</label>
              <button
                type="button"
                className="bg-primary hover:bg-secondary text-white px-3 py-1 rounded"
                onClick={handleOpenWidget}
              >
                Upload Image
              </button>
              <br />
              <div className="flex flex-wrap">
                {disease.diseaseImage && disease.diseaseImage.map((image, index) => (
                  <div key={index} className="relative m-2">
                    <img src={image} alt="crop" className="w-44 h-36 object-cover rounded-xl" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                ))}
              </div>
            </div>


            <div className="mb-3">
              <label htmlFor="diseaseSymptoms" className="form-label">Disease Symptoms</label>
              <textarea
                type="text"
                name="diseaseSymptoms"
                id="diseaseSymptoms"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseSymptoms}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diseaseCause" className="form-label">Disease Cause</label>
              <textarea
                type="text" 
                name="diseaseCause"
                id="diseaseCause"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseCause}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diseasePrevention" className="form-label">Disease Prevention</label>
              <textarea
                type="text"
                name="diseasePrevention"
                id="diseasePrevention"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseasePrevention}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diseaseTreatment" className="form-label">Disease Treatment</label>
              <textarea
                type="text"
                name="diseaseTreatment"
                id="diseaseTreatment"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseTreatment}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diseaseCrops" className="form-label">Disease Crops</label>
              <input
                type="text"
                name="diseaseCrops"
                id="diseaseCrops"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseCrops}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diseaseType" className="form-label">Disease Type</label>
              <input
                type="text"
                name="diseaseType"
                id="diseaseType"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseType}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diseaseStatus" className="form-label">Disease Status</label>
              <input
                type="text"
                name="diseaseStatus"
                id="diseaseStatus"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={disease.diseaseStatus}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9 ]+"
                required
              />
            </div>

            {/* buttons */}
            <div className="flex justify-end space-x-2 mt-10">
              <button
                type="button"
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <hr className="md:hidden mt-3" />
      </div>
    </div>
  )
}

export default CreateDisease