import { useState, useEffect } from 'react';
import { CropCard, DiseaseCard, Loader } from '../../components';
import { useParams } from 'react-router-dom';
import { searchCrop, searchDisease } from '../../api/knowlegdebase';

const Search = () => {
  const { searchTerm } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([searchDisease(searchTerm), searchCrop(searchTerm)])
      .then(([diseaseRes, cropRes]) => {
        setSearchResults([...diseaseRes.data, ...cropRes.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchTerm]);
  console.log(searchResults);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div data-testid="search">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start place-items-start py-5 px-8 ml-0 mr-auto w-full">
          <h1 className="text-3xl text-left text-white font-bold pt-5 pl-5">
            Search Results for : {searchTerm}
          </h1>

          <hr className="border-gray-500 border-1 w-full mt-4" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start md:pl-3">
          {searchResults.map((item) => (
            <div key={item._id} className="m-4">
              {item.cropName ? (
                <CropCard crop={item} />
              ) : (
                <DiseaseCard disease={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Search;
