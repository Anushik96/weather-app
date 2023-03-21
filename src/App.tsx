import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentWeatherActionCreator } from "./store/actions/weatherActions";
import { searchData } from "./interfaces";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] =  useState(true)
  const [searchData, setSearchData] = useState({} as searchData)
  const [units, setUnits] = useState('C')

  const onChangeUnit = (unit: string) => {
      setUnits(unit);      
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>{
        const currentPos = { 
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              units: units === 'C' ? 'metric' : 'imperial'
         };
        dispatch(getCurrentWeatherActionCreator(currentPos)).then(() => {
          setIsLoading(false)
        }).catch(() => {
          setIsLoading(true)
        })
   }, (err) => {
        console.log(err);
   });
  }, [units])

  useEffect(() => {
    if(searchData.value){
    const position = searchData.value.split(' ');
    const searchedPos = {
      lat: position[0],
      lon: position[1],
      units: units === 'C' ? 'metric' : 'imperial'
    }
    dispatch(getCurrentWeatherActionCreator(searchedPos))
  }
  }, [searchData, units])

  if(isLoading){
    return (
      <div className="grid h-screen place-items-center">
        <img src="/images/loading.gif" alt="" />    
      </div>
    )
  }else{
    return (   
      <div className="bg-[#100E1D] flex flex-col lg:flex-row">
        <SideBar 
            onSearchDataChange={(searchData) => setSearchData(searchData)}
            units={units}
        />
        <MainContent  onChangeUnit={onChangeUnit} units={units}/>
    </div>
    );
  }
  
}

export default App;
