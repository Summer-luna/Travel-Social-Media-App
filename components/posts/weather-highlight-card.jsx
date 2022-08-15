import classes from "./weather-highlight-card.module.css";
import { useRef } from "react";
const WeatherHighlightCard = ({ weather }) => {
  const maxUV = 15;
  const UVPercentage = Math.round((weather.uv / maxUV) * 180);

  return (
    <div className="relative flex h-full w-full flex-col bg-white p-3">
      <div className="pb-3 text-gray-400">UV Index</div>
      <div className="mt-5 w-full">
        <div className={`bg-gray-100 ${classes.gaugeBody}`}>
          <div
            className={classes.gaugeFill}
            style={{ transform: `rotate(${UVPercentage}deg)` }}
          ></div>
          <div className={`${classes.gaugeCover} text-xl lg:text-4xl`}>
            {weather.uv}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherHighlightCard;
