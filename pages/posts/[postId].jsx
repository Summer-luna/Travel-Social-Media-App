import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSinglePostDocument } from "../../utils/firebase.util";
import { useUser } from "../../context/userContext";
import Image from "next/image";
import Button from "../../components/ui/button";
import axios from "axios";
import WeatherLeft from "../../components/posts/weather-left";
import Loading from "../../components/ui/loading";
import WeatherRight from "../../components/posts/weather-right";

const SinglePost = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { currentUser } = useUser();
  const [post, setPost] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);

  useEffect(() => {
    getSinglePost().then((post) => setPost(post));
  }, [currentUser]);
  //console.log(post);

  useEffect(() => {
    if (post) {
      const { latitude, longitude } = post.destinationCoordinates;
      //console.log(post.destinationCoordinates);
      const options = {
        method: "GET",
        url: "https://api.weatherbit.io/v2.0/current",
        params: {
          lat: latitude,
          lon: longitude,
          key: "ddf26ddeab8640718ca5aa4862c03bcc",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setWeather(response.data);
          //console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      const { latitude, longitude } = post.destinationCoordinates;
      const options = {
        method: "GET",
        url: "https://api.weatherbit.io/v2.0/forecast/daily",
        params: {
          lat: latitude,
          lon: longitude,
          key: "ddf26ddeab8640718ca5aa4862c03bcc",
          days: "7",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setWeeklyWeather(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [post]);

  const getSinglePost = async () => {
    return currentUser && (await getSinglePostDocument(currentUser, postId));
  };

  const differenceDate = () => {
    const startDate = new Date();
    const endDate = new Date(post?.departing);
    const difference = endDate.getTime() - startDate.getTime();
    const differenceDays = difference / (1000 * 3600 * 24);
    return Math.ceil(differenceDays);
  };

  //const addLodgingInfo = () => {};
  if (!post) return <Loading />;

  return (
    <div className="mb-40 font-poppins">
      <div className="relative mt-16 h-full w-full overflow-hidden bg-primary-color md:h-[400px]">
        <Image src={post.image} width={1800} height={1000} />
      </div>
      <div className="mt-16 text-center text-4xl font-bold">{post.title}</div>
      <div className="mt-16 flex text-xs">
        <Button
          text="Add Lodging Info"
          style="btn-primary mr-5 h-12 w-48 px-2"
        />
        <Button
          text="Add Flight Info"
          style="btn-primary mr-5 h-12 w-48 px-2"
        />
        <Button
          text="Add Packet Listing"
          style="btn-primary mr-5 h-12 w-48 px-2"
        />
      </div>
      <div className="mt-16 flex flex-col items-center justify-between">
        <div className="mb-3 text-xl">{`Departing: ${post.departing}`}</div>
        <div className="text-xl">{`Trip to ${
          post.destination
        } is ${differenceDate()} days away`}</div>
      </div>
      <div className="mt-10 flex h-full w-full flex-col justify-between md:flex-row">
        <WeatherLeft
          weather={weather?.data}
          bgWidget={post.image}
          destination={post.destination}
        />
        {weeklyWeather && <WeatherRight weather={weeklyWeather.data} />}
      </div>
    </div>
  );
};

export default SinglePost;
