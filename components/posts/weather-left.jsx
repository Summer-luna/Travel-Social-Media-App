import Image from "next/image";
import Loading from "../ui/loading";

const WeatherLeft = ({ weather, bgWidget, destination }) => {
  const todayWeather = weather && weather[0];
  const day = new Date();
  const weekday = day.toLocaleString("default", { weekday: "long" });
  const time = day.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  if (todayWeather === undefined) {
    return <Loading />;
  }

  return (
    //flex w-1/3 flex-col pr-10
    <div className="flex flex-col items-center sm:flex-row sm:justify-between md:ml-10 md:w-1/3 md:flex-col md:pr-10">
      <div className="flex flex-col items-center ">
        <div className="relative mt-10 h-[80px] w-[80px] md:h-[200px] md:w-[200px]">
          <Image
            src={`/images/weather/rich/${todayWeather.weather.icon}.png`}
            width={1700}
            height={1300}
          />
        </div>
        <div className="mt-10 text-5xl md:text-6xl">{`${todayWeather.temp}°C`}</div>
        <div className="mt-10">
          {`${weekday}, `}
          <span className="text-gray-400">{`${time}`}</span>
        </div>
      </div>
      <hr className="mt-10 hidden w-5/6 md:block" />
      <div className="mt-10 flex flex-col items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={`/images/weather/minimal/${todayWeather.weather.icon}.png`}
            width={30}
            height={30}
          />
          <div>{todayWeather.weather.description}</div>
        </div>
        <div className="mt-10 grid h-full w-full items-center justify-start">
          <div className="relative z-10 col-start-1 col-start-2 row-start-1 row-end-2 rounded-2xl">
            <Image
              src={bgWidget}
              width={250}
              height={100}
              objectFit={"cover"}
              className="rounded-2xl"
            />
          </div>
          <div className="z-20 col-start-1 col-start-2 row-start-1 row-end-2 text-center font-bold text-white">
            {destination}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLeft;
