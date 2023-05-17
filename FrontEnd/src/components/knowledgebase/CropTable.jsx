import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { FaEdit, FaLeaf } from 'react-icons/fa'
import { deleteCrop } from '../../api/knowlegdebase'

const CropTable = ({crops}) => {

    const [cropFilter , setCropFilter] = useState(crops)
    const user = JSON.parse(localStorage.getItem('userInfo'))

    const handleDeleteCrop = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this crop?')
        if (confirm) {
            await deleteCrop(id, user.token)
            window.location.reload()
        }
    }

    const filterdata = (e) => {
        if (e.target.value !== '') {
            const filterTable = crops.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                )
            )
            setCropFilter([...filterTable])
        } else {
            setCropFilter(crops)
        }
    }

    useEffect(() => {
        setCropFilter(crops)
    }, [crops])

    return (
        <div className="overflow-x-auto px-8">
            <div className="w-full md:w-5/6 mx-auto bg-darkbg text-white p-5 flex">
                <div className="flex flex-row w-full justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <FaLeaf className="inline-block mr-5 text-4xl" />
                        Crops
                    </h1>
                </div>
                <div className="flex flex-row">
                    <input
                        type="text"
                        className="border-2 border-gray-300 bg-lightbg h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        placeholder="Search crops"
                        onChange={filterdata}
                    />
                </div>
            </div>
            <table className="table-auto w-full md:w-5/6 mx-auto bg-darkbg  text-white divide-y divide-gray-700 rounded-xl shadow-xl"> 
                <thead>
                    <tr className="bg-secondary text-gray-200 uppercase text-md font-bold tracking-wider">
                        <th className="px-4 py-3 text-center text-md font-medium">Crop Image</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Crop ID</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Crop Name</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Scientific Name</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Status</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {cropFilter.map((crop) => (
                    <tr key={crop._id} className="hover:bg-gray-700 border-b border-gray-600">
                        <td className="px-4 py-3 justify-center">
                            <img
                                src={crop.cropImage}
                                alt="crop"
                                className="mx-auto w-20 h-20 object-cover rounded-full md:w-24 md:h-24 lg:w-28 lg:h-28"
                            />
                        </td>
                        <td className="px-4 py-3 text-center w-10">{crop._id}</td>
                        <td className="px-4 py-3 text-center">{crop.cropName}</td>
                        <td className="px-4 py-3 text-center">{crop.scientificName}</td>
                        <td className="px-4 py-3 text-center">
                            {crop.isAccepted ? (
                                <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-600 text-white">
                                    Accepted
                                </span>
                            ) : (
                                <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-500 text-white">
                                    Pending
                                </span>
                            )}
                        </td>
                        <td className="px-4 py-3 flex my-10 justify-center">
                            <Link to={`/update/crop/${crop._id}`}>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2">
                                    <FaEdit />
                                </button>
                            </Link>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={handleDeleteCrop.bind(this, crop._id)}
                            >
                                <MdDelete />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default CropTable