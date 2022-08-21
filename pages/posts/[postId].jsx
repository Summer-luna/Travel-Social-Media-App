import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import {
  getAllContent,
  getSinglePostDocument,
  getUserDocument,
  updateAdditionalInfo,
} from "../../utils/firebase.util";
import { useUser } from "../../context/userContext";
import Image from "next/image";
import Button from "../../components/ui/button";
import axios from "axios";
import WeatherLeft from "../../components/weather/weather-left";
import Loading from "../../components/ui/loading";
import WeatherRight from "../../components/weather/weather-right";
import { IoBed } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListItem from "../../components/todos/listItem";
import {
  INITIAL_STATE,
  POST_ACTION_TYPE,
  postReducer,
} from "../../utils/postReducer";
import PostBtnsAndInputs from "../../components/posts/postBtnsAndInputs";

const SinglePost = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { currentUser } = useUser();

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  // get single post data when first render || when currentUser Changes
  useEffect(() => {
    const getSinglePost = async () => {
      if (currentUser) {
        const post = await getSinglePostDocument(currentUser, postId);
        dispatch({ type: POST_ACTION_TYPE.SET_CURRENT_POST, payload: post });
      }
    };

    getSinglePost();
  }, [currentUser]);

  // fetch today weather date based on latitude and longitude, when first render || post changes
  useEffect(() => {
    if (state.post) {
      const { latitude, longitude } = state.post.destinationCoordinates;
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
          dispatch({
            type: POST_ACTION_TYPE.SET_CURRENT_WEATHER,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [state.post]);

  // fetch weekly weather date based on latitude and longitude, when first render || post changes
  useEffect(() => {
    if (state.post) {
      const { latitude, longitude } = state.post.destinationCoordinates;
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
          dispatch({
            type: POST_ACTION_TYPE.SET_WEEKLY_WEATHER,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [state.post]);

  // update content when content=true || content changes
  useEffect(() => {
    const timeId = setTimeout(async () => {
      if (postId) await updateAdditionalInfo(postId, state.content);
    }, 500);

    return () => clearTimeout(timeId);
  }, [state.content]);

  // get all contents when first render || postId changes
  useEffect(() => {
    postId &&
      getAllContent(postId).then((res) => {
        if (res.data)
          dispatch({ type: POST_ACTION_TYPE.SET_CONTENT, payload: res.data });
      });
  }, [postId]);

  useEffect(() => {
    const checkIfIsExplorePost = () => {
      if (!currentUser || !state.post) return;

      if (currentUser.uid !== state.post.userId) {
        return dispatch({
          type: POST_ACTION_TYPE.CHECK_IF_EXPLORE_PAGE,
          payload: true,
        });
      }

      return dispatch({
        type: POST_ACTION_TYPE.CHECK_IF_EXPLORE_PAGE,
        payload: false,
      });
    };
    checkIfIsExplorePost();
  }, [state.post]);

  const clickHandler = (e) => {
    const { id } = e.target;
    dispatch({
      type: POST_ACTION_TYPE.TOGGLE_BUTTON_TO_INPUT,
      payload: { ...state.openButtonToInput, [id]: true },
    });
  };

  const keyPressHandler = (e) => {
    const { name, value } = e.target;

    if (e.key === "Enter") {
      if (name === "packingList") {
        const id = uuidv4();
        dispatch({
          type: POST_ACTION_TYPE.SET_CONTENT,
          payload: {
            ...state.content,
            [name]: [
              ...state.content.packingList,
              { id: id, item: value, itemChecked: false },
            ],
          },
        });
      } else {
        dispatch({
          type: POST_ACTION_TYPE.SET_CONTENT,
          payload: {
            ...state.content,
            [name]: value,
          },
        });
      }

      dispatch({
        type: POST_ACTION_TYPE.TOGGLE_BUTTON_TO_INPUT,
        payload: { ...state.openButtonToInput, [name]: false },
      });
    }

    if (e.key === "Escape") {
      dispatch({
        type: POST_ACTION_TYPE.TOGGLE_BUTTON_TO_INPUT,
        payload: { ...state.openButtonToInput, [name]: false },
      });
    }
  };

  const deleteListItem = (e) => {
    const { id } = e.target;

    const listItems = state.content.packingList.filter((item) => {
      return item.id !== id;
    });

    if (listItems) {
      dispatch({
        type: POST_ACTION_TYPE.SET_CONTENT,
        payload: { ...state.content, packingList: listItems },
      });
    }
  };

  const checkListItem = (e) => {
    const { id } = e.target;
    const newItems = state.content.packingList.map((item) => {
      if (item.id === id) {
        item.itemChecked = !item.itemChecked;
      }
      return item;
    });
    dispatch({
      type: POST_ACTION_TYPE.SET_CONTENT,
      payload: { ...state.content, newItems },
    });
  };

  const differenceDate = () => {
    const startDate = new Date();
    const endDate = new Date(state.post?.departing);
    const difference = endDate.getTime() - startDate.getTime();
    const differenceDays = difference / (1000 * 3600 * 24);
    return Math.ceil(differenceDays);
  };

  const renderContent =
    state.content &&
    state.content.packingList.map((item) => {
      return (
        <ListItem
          key={item.id}
          item={item}
          id={item.id}
          deleteListItem={deleteListItem}
          checkListItem={checkListItem}
          packingList={state.content.packingList}
          isExplorePage={state.isExplorePage}
        />
      );
    });

  if (!state.post) return <Loading />;

  return (
    <div className="mb-40 font-poppins">
      <div className="relative mt-16 h-full w-full overflow-hidden bg-primary-color md:h-[400px]">
        <Image src={state.post.image} width={1800} height={1000} />
      </div>
      <PostBtnsAndInputs
        state={state}
        keyPressHandler={keyPressHandler}
        clickHandler={clickHandler}
      />
      <div className="mt-16 flex flex-col ">
        <div className="mb-3 text-xl">{`Departing: ${
          state.post.departing
        }, is ${differenceDate()} days away`}</div>
        <div className="mb-3 flex items-center text-xl">
          <IoBed className="mr-3 text-xl text-form-icon-color" />
          <div>{`Lodging Info: ${state.content && state.content.lodging}`}</div>
        </div>
        <div className="mb-3 flex items-center text-xl">
          <MdFlight className="mr-3 text-xl text-form-icon-color" />
          <div>{`Flight Info: ${state.content && state.content.flight}`}</div>
        </div>
        <div className="mb-3 flex items-center text-xl">
          <FontAwesomeIcon
            icon="fa-solid fa-suitcase"
            className="mr-3 text-xl text-form-icon-color"
          />
          <div>Packing List</div>
        </div>
        <div>
          <ul>{renderContent}</ul>
        </div>
      </div>
      <div className="mt-10 flex h-full w-full flex-col justify-between md:flex-row">
        <WeatherLeft
          weather={state.currentWeather?.data}
          bgWidget={state.post.image}
          destination={state.post.destination}
        />
        {state.weeklyWeather && (
          <WeatherRight weather={state.weeklyWeather.data} />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
