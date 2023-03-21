import { useState } from "react";
import SearchLocation from "./SearchLocation";
import { searchData, IRootState } from "../interfaces";
import { IWeather } from "../interfaces/weather";
import { useSelector } from "react-redux";

interface SideBarProps {
  onSearchDataChange: (searchData : searchData) => void;
  units: string
}

const SideBar: React.FC<SideBarProps> = ({onSearchDataChange, units}) => {
  const [isOpen, setIsOpen] = useState(false);
  const weather: IWeather = useSelector((state: IRootState) => state.currentWeather).currentWeather.weather
  
  return (
    <div className="flex flex-col min-h-screen bg-darkblue w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-10 overflow-x-hidden">
      {isOpen ? (
        <SearchLocation 
            onClose={() => setIsOpen(false)} 
            onSearchChange={(searchData) => onSearchDataChange(searchData)} 
            />
      ) : (
        <>
          <div className="relative flex justify-between mb-10">
            <button
              className="static z-10 px-4 py-2 text bg-[#6E707A] hover:bg-[#6E707A]/70 text-gray-150 shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              Search for places
            </button>
           
          </div>

          <div className="relative -mx-36 flex justify-center items-center max-h-40">
            <img
              src="/images/Cloud-background.png"
              alt="bg"
              className="opacity-10 absolute max-w-52"
            />
            <img src={`/images/${weather.weather[0].main}.png`} alt="weather" className="max-h-48" />
          </div>

          <div className="flex flex-col items-center flex-grow pt-6">
            <h1 className="text-gray-150 text-[144px] font-medium">
              {weather.main.temp.toFixed(0)}
              <span className="text-5xl text-gray-250">&deg;{units}</span>
            </h1>
            <h4 className="font-semibold text-3xl text-gray-250 mb-5"><i className="fas fa-map-marker-alt"></i> {weather.name}</h4>
            <div className="flex flex-col items-center text-center text-gray-350 text-lg space-y-5">
              <p>Today &bull; {new Date().toString().slice(0, 10)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;