export const INITIAL_STATE = {
  post: null,
  currentWeather: null,
  weeklyWeather: null,
  openButtonToInput: {
    lodging: false,
    flight: false,
    packingList: false,
  },
  content: {
    lodging: "",
    flight: "",
    packingList: [],
  },
  isExplorePage: false,
};

export const POST_ACTION_TYPE = {
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_WEATHER: "SET_CURRENT_WEATHER",
  SET_WEEKLY_WEATHER: "SET_WEEKLY_WEATHER",
  TOGGLE_BUTTON_TO_INPUT: "TOGGLE_BUTTON_TO_INPUT",
  SET_CONTENT: "SET_CONTENT",
  CHECK_IF_EXPLORE_PAGE: "CHECK_IF_EXPLORE_PAGE",
};

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_ACTION_TYPE.SET_CURRENT_POST:
      return {
        ...state,
        post: payload,
      };
    case POST_ACTION_TYPE.SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: payload,
      };
    case POST_ACTION_TYPE.SET_WEEKLY_WEATHER:
      return {
        ...state,
        weeklyWeather: payload,
      };
    case POST_ACTION_TYPE.TOGGLE_BUTTON_TO_INPUT:
      return {
        ...state,
        openButtonToInput: payload,
      };
    case POST_ACTION_TYPE.SET_CONTENT:
      return {
        ...state,
        content: payload,
      };
    case POST_ACTION_TYPE.CHECK_IF_EXPLORE_PAGE:
      return {
        ...state,
        isExplorePage: payload,
      };
    default:
      new Error(`doesn't have ${type} in PostReducer`);
  }

  console.log(state);
};
