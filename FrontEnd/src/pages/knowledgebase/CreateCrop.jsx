import { useState, useEffect } from 'react'
import { createCrop } from '../../api/knowlegdebase'

const CreateCrop = () => {

  const user = JSON.parse(localStorage.getItem('userInfo'))
  const userId = user._id

  const [crop, setCrop] = useState({
    cropName: '',
    scientificName: '',
    cropFamily: '',
    cropType: '',
    cropIntro: '',
    // cropImage: [],
    cropInfo: {
      climate: '',
      season: '',
      seedType: '',
      soil: '',
      fieldPreparation: '',
      fertilizer: '',
      irrigation: '',
      weedControl: '',
      pestControl: '',
      harvesting: '',
      yield: '',
      storage: '',
    },
    otherInfo: '',
    author: userId,
  })

  const handleChange = (e) => {
    setCrop({
      ...crop,
      [e.target.name]: e.target.value,
      cropInfo: {
        ...crop.cropInfo,
        [e.target.name]: e.target.value
      }
    })

    console.log('crop', crop)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newCrop = await createCrop(crop)
      console.log('newCrop', newCrop)
    } catch (error) {
      console.log('error', error)
      setError(error.response.data.msg)
    }
  }

  const handleCancel = () => {
    setCrop({
      cropName: '',
      scientificName: '',
      cropFamily: '',
      cropType: '',
      cropIntro: '',
      // cropImage: [],
      cropInfo: {
        climate: '',
        season: '',
        seedType: '',
        soil: '',
        fieldPreparation: '',
        fertilizer: '',
        irrigation: '',
        weedControl: '',
        pestControl: '',
        harvesting: '',
        yield: '',
        storage: '',
      },
      otherInfo: '',
    })
  }



  return (
    <div>
      <div className="bg-darkbg text-white overflow-hidden shadow-xl mx-auto px-10 md:my-20 md:mx-20 lg:mx-60 rounded-xl ">
        <div className="py-4 px-6">
          <h1 className="text-3xl font-semibold mb-3">Create Crop</h1>
          <hr className="border-gray-500 border-1 w-full mb-5" />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cropName" className="block mb-1">Crop Name</label>
              <input
                type="text"
                name="cropName"
                id="cropName"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropName}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="scientificName" className="block mb-1">Scientific Name</label>
              <input
                type="text"
                name="scientificName"
                id="scientificName"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.scientificName}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cropFamily" className="block mb-1">Crop Family</label>
              <input
                type="text"
                name="cropFamily"
                id="cropFamily"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropFamily}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cropType" className="block mb-1">Crop Type</label>
              <input
                type="text"
                name="cropType"
                id="cropType"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropType}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cropIntro" className="block mb-1">Crop Introduction</label>
              <textarea
                name="cropIntro"
                id="cropIntro"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropIntro}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="cropImage" className="block mb-1">Crop Image</label>
              <input
                type="file"
                name="cropImage"
                id="cropImage"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropImage}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div> */}

            <div className="mb-3">
              <label htmlFor="climate" className="block mb-1">Climate</label>
              <textarea
                name="climate"
                id="climate"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.climate}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="season" className="block mb-1">Crop Season</label>
              <textarea
                name="season"
                id="season"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.season}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="seedType" className="block mb-1">Seed Type</label>
              <textarea
                name="seedType"
                id="seedType"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.seedType}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="soil" className="block mb-1">Soil Type</label>
              <textarea
                name="soil"
                id="soil"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.soil}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fieldPreparation" className="block mb-1">Field Preparation</label>
              <textarea
                name="fieldPreparation"
                id="fieldPreparation"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.fieldPreparation}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fertilizer" className="block mb-1">Fertilizer</label>
              <textarea
                name="fertilizer"
                id="fertilizer"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.fertilizer}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="irrigation" className="block mb-1">Irrigation</label>
              <textarea
                name="irrigation"
                id="irrigation"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.irrigation}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="weedControl" className="block mb-1">Weed Control</label>
              <textarea
                name="weedControl"
                id="weedControl"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.weedControl}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pestControl" className="block mb-1">Pest Control</label>
              <textarea
                name="pestControl"
                id="pestControl"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.pestControl}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="harvesting" className="block mb-1">Harvesting</label>
              <textarea
                name="harvesting"
                id="harvesting"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.harvesting}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="yield" className="block mb-1">Yield</label>
              <textarea
                name="yield"
                id="yield"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.yield}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="storage" className="block mb-1">Storage</label>
              <textarea
                name="storage"
                id="storage"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.cropInfo.storage}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="otherInfo" className="block mb-1">Other Info</label>
              <textarea
                name="otherInfo"
                id="otherInfo"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primarylight bg-lightbg text-white"
                value={crop.otherInfo}
                onChange={handleChange}
                pattern='[A-Za-z0-9]+'
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

export default CreateCrop