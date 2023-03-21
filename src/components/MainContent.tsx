import { useSelector } from "react-redux";
import { ICurrentWeather, IWeatherForecast } from "../interfaces/weather";
import { IRootState } from "../interfaces";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import ChartBox from "./ChartBar";

interface MainContent{
  onChangeUnit: (unit: string) => void, 
  units: string
}

const MainContent: React.FC<MainContent> = ({onChangeUnit, units}) => {
  const weather: ICurrentWeather = useSelector((state: IRootState) => state.currentWeather).currentWeather

  return (
    <div className="text-gray-150 md:p-10 p-3 flex-grow">
      <div className="space-x-3 text-right">
        <button
          className={`${
            units === "C"
              ? "bg-gray-150 text-darkblue"
              : "bg-[#585676] text-gray-150"
          } rounded-full w-10 h-10 font-bold text-xl`}
          onClick={() => onChangeUnit("C")}
        >
          &deg;C
        </button>
        <button
          className={`${
            units === "F"
              ? "bg-gray-150 text-darkblue"
              : "bg-[#585676] text-gray-150"
          } rounded-full w-10 h-10 font-bold text-xl`}
          onClick={() => onChangeUnit("F")}
        >
          &deg;F
        </button>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-5 gap-10 justify-center">
      { weather.forecast.map((item: IWeatherForecast, i: number) => (
          <SmallCard
            key={i}
            dayTitle={item.date}
            img={item.icon}
            max={item.maxTemp}
            min={item.minTemp}
            temp={units}
          />
        )) }
      </div>

      <div className="my-10">
        <h3 className="text-2xl font-bold mb-5">Today's Highlights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center mb-5">
          <LargeCard title="Wind Status" num={weather.weather.wind.speed} desc="mph">
            <div className="flex justify-between space-x-5 items-center">
              <div className="bg-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                <i className="fas fa-location-arrow"></i>
              </div>
              <p className="text-gray-150 text-sm">WSW</p>
            </div>
          </LargeCard>

          <LargeCard title="Humidity" num={weather.weather.main.humidity} desc="%">
            <div className="self-stretch text-gray-250 text-xs space-y-1">
              <div className="flex justify-between space-x-5 items-center px-1">
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden">
                <div
                  className="bg-[#FFEC65] h-2"
                  style={{ width: `${weather.weather.main.humidity}%` }}
                ></div>
              </div>
              <p className="text-right">%</p>
            </div>
          </LargeCard>

          <LargeCard title="Visibility" num={weather.weather.visibility} desc="">
          </LargeCard>

          <LargeCard title="Air Pressure" num={weather.weather.main.pressure} desc=" mb">
          </LargeCard>
        </div>
        <ChartBox/> 
      </div>
    </div>
  );
};

export default MainContent;