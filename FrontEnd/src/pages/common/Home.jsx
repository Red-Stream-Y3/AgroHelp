import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCrops } from '../../api/knowlegdebase'

const Home = () => {

  const [crops, setCrops] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCrops = async () => {
      const crops = await getAllCrops()
      setCrops(crops)
      setIsLoading(false)
    }
    fetchCrops()
  }, [])
  

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {crops.map(crop => (
          <li key={crop.id}>
            <Link to={`/crops/${crop.id}`}>{crop.name}</Link>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Home