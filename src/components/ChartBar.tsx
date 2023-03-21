import { useSelector } from 'react-redux';
import { IRootState } from '../interfaces';
import { ICurrentWeather } from '../interfaces/weather';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  
const ChartBox = () => {
  const weather: ICurrentWeather = useSelector((state: IRootState) => state.currentWeather).currentWeather

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
      };

      const labels = weather.forecast.map(date => {
        const [yyyy, mm, dd] = date.date.split('-');
        const weekday = new Date(Number(yyyy), Number(mm) -1 , Number(dd))
        return weekday.toLocaleDateString('en-US', {weekday: 'long'})
      })

      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: "last week's weather",
            data: weather.forecast.map(item => item.maxTemp),
            borderColor: 'rgb(105, 115, 197)',
            backgroundColor: 'rgba(105, 115, 197, 0.5)',
          },
        ],
      };
    return (
       <Line options={options} data={data} />
    );
  };
  
  export default ChartBox;