import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSinglePostDocument } from "../../utils/firebase.util";
import { useUser } from "../../context/userContext";
import Image from "next/image";
import Button from "../../components/ui/button";

import axios from "axios";
import WeatherLeft from "../../components/posts/weather-left";
import Loading from "../../components/ui/loading";

const SinglePost = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { currentUser } = useUser();
  const [post, setPost] = useState(null);
  const [weather, setWeather] = useState(null);

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
          console.log(response.data);
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
    <div className="font-poppins">
      <div className="relative mt-16 h-[500px] w-full overflow-hidden bg-primary-color">
        {post && <Image src={post?.image} width={1800} height={1000} />}
      </div>
      <div className="mt-16 text-center text-4xl font-bold">{post?.title}</div>
      <div className="mt-16">
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
      <div className="mt-16 flex justify-between">
        <div className="text-xl">{`My Trip to ${post?.destination}`}</div>
        <div className="text-xl">{`Departing: ${post?.departing}`}</div>
        <div className="text-xl">{`${
          post?.destination
        } is ${differenceDate()} days away`}</div>
      </div>
      <div className="flex h-full w-full flex-row justify-between">
        <WeatherLeft
          weather={weather?.data}
          bgWidget={post.image}
          destination={post.destination}
        />
        <div className="w-2/3 bg-amber-200">Week</div>
      </div>
    </div>
  );
};

export default SinglePost;
