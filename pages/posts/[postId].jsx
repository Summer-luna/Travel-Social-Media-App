import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getAllContent,
  getSinglePostDocument,
  updateAdditionalInfo,
} from "../../utils/firebase.util";
import { useUser } from "../../context/userContext";
import Image from "next/image";
import Button from "../../components/ui/button";
import axios from "axios";
import WeatherLeft from "../../components/posts/weather-left";
import Loading from "../../components/ui/loading";
import WeatherRight from "../../components/posts/weather-right";
import FormInput from "../../components/ui/formInput";
import { IoBed } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { capitalize } from "lodash/string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SinglePost = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { currentUser } = useUser();
  const [post, setPost] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [open, setOpen] = useState({
    lodging: false,
    flight: false,
    packingList: false,
  });
  const [content, setContent] = useState({
    lodging: "",
    flight: "",
    packingList: [],
  });

  // get single post data when first render || when currentUserChanges
  useEffect(() => {
    //currentUser && getSinglePostDocument(currentUser, postId).then((post)=>setPost(post))
    getSinglePost().then((post) => setPost(post));
  }, [currentUser]);

  // fetch today weather date based on latitude and longitude, when first render || post changes
  useEffect(() => {
    if (post) {
      const { latitude, longitude } = post.destinationCoordinates;
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
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [post]);

  // fetch weekly weather date based on latitude and longitude, when first render || post changes
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

  // update content when content=true || content changes
  useEffect(() => {
    const timeId = setTimeout(async () => {
      if (postId) await updateAdditionalInfo(postId, content);
    }, 500);

    return () => clearTimeout(timeId);
  }, [content]);

  // get all contents when first render || postId changes
  useEffect(() => {
    postId &&
      getAllContent(postId).then((res) => {
        if (res.data) {
          setContent(res.data);
        }
      });
  }, [postId]);

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

  const clickHandler = (e) => {
    const { id } = e.target;
    setOpen((prevState) => ({ ...prevState, [id]: true }));
  };

  const keyPressHandler = (e) => {
    const { name, value } = e.target;
    if (e.key === "Enter") {
      setContent((prevState) => ({ ...prevState, [name]: value }));
      setOpen((prevState) => ({ ...prevState, [name]: false }));
    }

    if (e.key === "Escape") {
      setOpen((prevState) => ({ ...prevState, [name]: false }));
    }
  };

  //const addLodgingInfo = () => {};
  if (!post) return <Loading />;

  return (
    <div className="mb-40 font-poppins">
      <div className="relative mt-16 h-full w-full overflow-hidden bg-primary-color md:h-[400px]">
        <Image src={post.image} width={1800} height={1000} />
      </div>
      <div className="mt-16 text-center text-4xl font-bold">{post.title}</div>
      <div className="mt-16 flex items-center text-xs"></div>
      {open.lodging ? (
        <div
          className="my-2.5 mr-5 grid h-14 w-full max-w-sm grid-cols-8 items-center rounded-[55px] bg-form-input-color px-2"
          onKeyUp={keyPressHandler}
        >
          <span className="col-span-1 ml-3 text-center">
            <IoBed className="text-xl text-form-icon-color" />
          </span>
          <input
            type="text"
            name="lodging"
            placeholder={capitalize("Lodging Info")}
            className="placeholder: color-[#aaa] col-span-6 w-full border-0 bg-transparent font-semibold leading-4 text-[#333] outline-0 placeholder:font-medium"
            required
          />
        </div>
      ) : (
        <Button
          text="Add Lodging Info"
          style="btn-primary mr-5 h-12 w-48 px-2"
          id="lodging"
          clickHandler={clickHandler}
        />
      )}
      {open.flight ? (
        <div
          className="my-2.5 mr-5 grid h-14 w-full max-w-sm grid-cols-8 items-center rounded-[55px] bg-form-input-color px-2"
          onKeyUp={keyPressHandler}
        >
          <span className="col-span-1 ml-3 text-center">
            <MdFlight className="text-xl text-form-icon-color" />
          </span>
          <input
            type="text"
            name="flight"
            placeholder={capitalize("Flight Info")}
            className="placeholder: color-[#aaa] col-span-6 w-full border-0 bg-transparent font-semibold leading-4 text-[#333] outline-0 placeholder:font-medium"
            required
          />
        </div>
      ) : (
        <Button
          text="Add Flight Info"
          style="btn-primary mr-5 h-12 w-48 px-2"
          id="flight"
          clickHandler={clickHandler}
        />
      )}
      {open.packingList ? (
        <div
          className="my-2.5 mr-5 grid h-14 w-full max-w-sm grid-cols-8 items-center rounded-[55px] bg-form-input-color px-2"
          onKeyUp={keyPressHandler}
        >
          <span className="col-span-1 ml-3 text-center">
            <IoBed className="text-xl text-form-icon-color" />
          </span>
          <input
            type="text"
            name="packingList"
            placeholder={capitalize("packing list")}
            className="placeholder: color-[#aaa] col-span-6 w-full border-0 bg-transparent font-semibold leading-4 text-[#333] outline-0 placeholder:font-medium"
            required
          />
        </div>
      ) : (
        <Button
          text="Add Packing List"
          style="btn-primary mr-5 h-12 w-48 px-2"
          id="packingList"
          clickHandler={clickHandler}
        />
      )}

      <div className="mt-16 flex flex-col ">
        <div className="mb-3 text-xl">{`Departing: ${
          post.departing
        }, is ${differenceDate()} days away`}</div>
        <div className="mb-3 flex items-center text-xl">
          <IoBed className="mr-3 text-xl text-form-icon-color" />
          <div>{`Lodging Info: ${content && content.lodging}`}</div>
        </div>
        <div className="mb-3 flex items-center text-xl">
          <MdFlight className="mr-3 text-xl text-form-icon-color" />
          <div>{`Flight Info: ${content && content.flight}`}</div>
        </div>
        {/*<div className="mb-3 flex items-center text-xl">
          <FontAwesomeIcon
            icon="fa-solid fa-suitcase"
            className="mr-3 text-xl text-form-icon-color"
          />
          <div>Packing List</div>
        </div>
        <div>
          <div>{content && content.packingList}</div>
        </div>*/}
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
