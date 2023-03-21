import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getCitiesActionCreator } from "../store/actions/citiesAction";
import type {} from 'redux-thunk/extend-redux'
import { searchData } from "../interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SearchLocationProps {
  onClose: () => void;
  onSearchChange: (searchData : searchData) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onClose, onSearchChange }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [citiInfo, setCitiInfo] = useState({
    value: '',
    label: '',
  })

const handleSearch = () => {
  if(search){
    return dispatch(getCitiesActionCreator(search))
      .then((city) => {
        const searchData = {
          value: `${city.cities.lat} ${city.cities.lon}`,
          label: `${city.cities.name}, ${city.cities.country}`,
        }
        setCitiInfo(searchData);
        onSearchChange(searchData)
    }).catch(() => {
      toast.error("Please type correct city name")
    })
  }
}

  return (
    <div className="text-gray-150">
      <div className="text-right">
        <button className="text-2xl" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="flex justify-between my-5 space-x-4">
           <input
              className="px-3 text-gray-800"
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search city"
            />
        <button onClick={handleSearch} className="bg-[#3C47E9] py-3 px-5 hover:bg-[#3C47E9]/70">
          Search
        </button>
      </div>
      { citiInfo.label &&
          <div className="mt-20">
            <button onClick={onClose} className="hover:border border-gray-250 px-4 py-6 w-full flex justify-between">
              <p>{citiInfo.label}</p>
              <i className="fas fa-chevron-right text-gray-350"></i>
            </button>
          </div>
      }
        <ToastContainer />
    </div>
  );
};

export default SearchLocation;