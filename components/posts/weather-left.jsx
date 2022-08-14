import Image from "next/image";
import Loading from "../ui/loading";

const WeatherLeft = ({ weather, bgWidget, destination }) => {
  const todayWeather = weather && weather[0];
  console.log(todayWeather);
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
    <div className="flex w-1/3 flex-col">
      <div>Today</div>
      <div className="relative w-full">
        <Image src="/images/weather/cloud/5.png" width={300} height={200} />
      </div>
      <div>{`${todayWeather.temp}°C`}</div>
      <div>{`${weekday} ${time}`}</div>
      <hr />
      <div className="flex items-center space-x-2">
        <Image
          src={`/images/weather/minimal/${todayWeather.weather.icon}.png`}
          width={30}
          height={30}
        />
        <div>{todayWeather.weather.description}</div>
      </div>
      <div className="grid h-full w-full items-center justify-start">
        <div className="relative z-10 col-start-1 col-start-2 row-start-1 row-end-2 h-[100px] w-[300px] overflow-hidden rounded-2xl">
          <Image src={bgWidget} width={500} height={400} objectFit={"cover"} />
        </div>
        <div className="z-20 col-start-1 col-start-2 row-start-1 row-end-2 text-center font-bold text-white">
          {destination}
        </div>
      </div>
    </div>
  );
};

export default WeatherLeft;
