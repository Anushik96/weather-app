export const useDailyForecastReducer = (data: any) => {

  // Group the data by day
  const groupedData = data.list.reduce((acc: any, item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  
  // Extract the relevant information for each day
  const dailyForecast = Object.keys(groupedData).map((date) => {
    
    const items = groupedData[date];  
    const minTemp = Math.min(...items.map((item: any) => item.main.temp_min));
    const maxTemp = Math.max(...items.map((item: any) => item.main.temp_max));
    const weatherDescription = items[0].weather[0].description;
    const icon = items[0].weather[0].main;    
    return {
      date: date,
      minTemp: minTemp,
      maxTemp: maxTemp,
      weatherDescription: weatherDescription,
      icon: icon
    };
  });
  
  return dailyForecast.splice(1, dailyForecast.length);
};