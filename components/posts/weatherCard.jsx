import Image from "next/image";
import Loading from "../ui/loading";

const WeatherCard = ({ weather, clickHandler, id }) => {
  const day = new Date(weather.datetime + "T00:00:00");
  const weekName = day.toLocaleString("default", { weekday: "short" });

  return (
    <div
      className="flex w-28 cursor-pointer flex-col items-center justify-center rounded-xl bg-white py-2 hover:bg-amber-200"
      onClick={clickHandler}
      id={id}
    >
      <div className="pointer-events-none mb-3">{weekName}</div>
      <div className="pointer-events-none relative mb-3">
        <Image
          src={`/images/weather/rich/${weather.weather.icon}.png`}
          width={50}
          height={40}
        />
      </div>
      <div className="pointer-events-none text-sm">
        {`${Math.round(weather.max_temp)}° `}
        <span className="text-gray-400">{`${Math.round(
          weather.low_temp
        )}°`}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
