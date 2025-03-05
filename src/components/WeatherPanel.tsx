import React from 'react';
import { WeatherCondition } from '../types';
import { format } from 'date-fns';

interface WeatherPanelProps {
  weather: WeatherCondition;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ weather }) => {
  const getWeatherIcon = (conditions: string) => {
    switch (conditions.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rain':
      case 'rainy':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
      case 'snowy':
        return '❄️';
      case 'fog':
      case 'foggy':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Weather Conditions</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg flex items-center mb-4">
        <div className="text-5xl mr-4">
          {getWeatherIcon(weather.conditions)}
        </div>
        <div>
          <div className="text-3xl font-medium">{weather.temperature}°F</div>
          <div className="text-gray-700">{weather.conditions}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <div className="text-sm text-gray-600">Wind</div>
          <div>{weather.windSpeed} mph</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Visibility</div>
          <div>{weather.visibility || 'N/A'} miles</div>
        </div>
      </div>
      
      <h3 className="font-medium mb-2">Forecast</h3>
      <div className="grid grid-cols-4 gap-2">
        {weather.forecast?.map((item: any, index: number) => (
          <div key={index} className="text-center">
            <div className="text-sm">{format(new Date(item.time), 'h a')}</div>
            <div className="text-xl my-1">{getWeatherIcon(item.conditions)}</div>
            <div className="font-medium">{item.temperature}°F</div>
            <div className="text-xs text-gray-600">{item.windSpeed} mph</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm">
        <p className="text-gray-700">
          Weather conditions may affect flight operations. Check with operations officer for any mission impacts.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 text-yellow-800">
        {/* Weather warnings content */}
      </div>
    </div>
  );
};

export default WeatherPanel; 