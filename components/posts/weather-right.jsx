import WeatherCard from "./weatherCard";
import Loading from "../ui/loading";
import WeatherHighlightCard from "./weather-highlight-card";
import classes from "./weather-highlight-card.module.css";
import Image from "next/image";
import { useState } from "react";

// display today by default
// click and display which day's weather details

const WeatherRight = ({ weather }) => {
  const [todayWeather, setTodayWeather] = useState(weather[0]);

  const clickHandler = (e) => {
    console.log(e.target.id);
    const weatherDate = weather.filter((data) => {
      return data.datetime === e.target.id;
    });
    setTodayWeather(weatherDate[0]);
  };

  let sunriseDate = new Date(todayWeather?.sunrise_ts * 1000);
  let sunsetDate = new Date(todayWeather?.sunset_ts * 1000);
  const sunriseTime = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`;
  const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`;

  const renderContent =
    weather &&
    weather.map((data) => {
      return (
        <WeatherCard
          key={data.datetime}
          id={data.datetime}
          weather={data}
          clickHandler={clickHandler}
        />
      );
    });

  if (!weather) return <Loading />;

  return (
    <div className="mt-10 bg-gray-100 py-5 md:w-2/3 md:px-5">
      <div>
        <div className="mb-5 text-center text-lg font-medium underline">
          Week
        </div>
        <div className="flex space-x-2">{renderContent}</div>
      </div>
      <div className="mt-10">
        <div className="mb-5 text-center">Today&apos;s Highlight</div>
        <div className="justify-between gap-4 px-10 md:grid md:grid-cols-3">
          <WeatherHighlightCard
            key={todayWeather.datetime}
            weather={todayWeather}
          />
          <div className="relative flex h-full w-full flex-col bg-white p-3">
            <div className="pb-3 text-gray-400">Wind Status</div>
            <div className="mt-5 w-full text-4xl md:text-xl lg:text-4xl">{`${todayWeather.wind_spd}m/s`}</div>
          </div>
          <div className="relative flex h-full w-full flex-col bg-white p-3">
            <div className="pb-3 text-gray-400">Sunrise & Sunset</div>
            <div className="mt-3 flex items-center space-x-4">
              <img
                src="/images/weather/rich/c01d.png"
                className="h-[30px] w-[30px]"
              />
              <div>{sunriseTime}</div>
            </div>
            <div className="mt-3 flex items-center space-x-4">
              <img
                src="/images/weather/rich/c01d.png"
                className="h-[30px] w-[30px]"
              />
              <div>{sunsetTime}</div>
            </div>
          </div>
          <div className="relative flex h-full w-full flex-col bg-white p-3">
            <div className="pb-3 text-gray-400">Humidity</div>
            <div className="mt-5 w-full text-4xl md:text-xl lg:text-4xl">{`${todayWeather.rh}%`}</div>
          </div>
          <div className="relative flex h-full w-full flex-col bg-white p-3">
            <div className="pb-3 text-gray-400">Visibility</div>
            <div className="mt-5 w-full text-4xl md:text-xl lg:text-4xl">{`${
              Math.floor(todayWeather.vis * 10) / 10
            }km`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherRight;
