import { useState} from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { deleteDisease } from '../../api/knowlegdebase'

const DiseaseTable = ({diseases}) => {

    const [diseaseFilter , setDiseaseFilter] = useState(diseases)

    const handleDeleteDisease = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this disease?')
        if (confirm) {
            await deleteDisease(id)
            window.location.reload()
        }
    }

    const filterdata = (e) => {
        if (e.target.value !== '') {
            const filterTable = diseases.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                )
            )
            setDiseaseFilter([...filterTable])
        } else {
            setDiseaseFilter(diseases)
        }
    }


    return (
        <div className="overflow-x-auto px-8">
            <div className="w-full md:w-5/6 mx-auto bg-darkbg text-white p-5 flex">
                <div className="flex flex-row w-full justify-between items-center">
                    <h1 className="text-2xl font-bold">Diseases</h1>
                </div>
                <div className="flex flex-row">
                    <input
                        type="text"
                        className="border-2 border-gray-300 bg-lightbg h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        placeholder="Search diseases"
                        onChange={filterdata}
                    />
                </div>
            </div>

            <table className="table-auto w-full md:w-5/6 mx-auto bg-darkbg  text-white divide-y divide-gray-700 rounded-xl shadow-xl">
                <thead>
                    <tr className="bg-secondary text-gray-200 uppercase text-md font-bold tracking-wider">
                        <th className="px-4 py-3 text-center text-md font-medium">Disease Image</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Disease ID</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Disease Name</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Disease Type</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Status</th>
                        <th className="px-4 py-3 text-center text-md font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {diseaseFilter.map((disease) => (
                    <tr key={disease._id} className="hover:bg-gray-700 border-b border-gray-600">
                        <td className="px-4 py-3 justify-center">
                           {disease.diseaseImage ? (
                                <img src={disease.diseaseImage} alt="disease" className="w-20 h-20 rounded-full" />
                            ) : (
                                <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="disease" className="w-20 h-20 rounded-full" />
                            )}
                        </td>
                        <td className="px-4 py-3 text-center w-10">{disease._id}</td>
                        <td className="px-4 py-3 text-center">{disease.diseaseName}</td>
                        <td className="px-4 py-3 text-center">{disease.diseaseType}</td>
                        <td className="px-4 py-3 text-center">
                            {disease.isAccepted ? (
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
                            <Link to={`/update/disease/${disease._id}`}>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2">
                                    <FaEdit />
                                </button>
                            </Link>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={handleDeleteDisease.bind(this, disease._id)}
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

export default DiseaseTable