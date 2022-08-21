import PostInput from "./postInput";
import Button from "../ui/button";

const PostBtnsAndInputs = ({ state, keyPressHandler, clickHandler }) => {
  if (state.isExplorePage) return;

  return (
    <div className="mt-16">
      {state.openButtonToInput.lodging ? (
        <PostInput
          keyPressHandler={keyPressHandler}
          iconName="IoBed"
          name="lodging"
          placeholder="lodging info"
        />
      ) : (
        <Button
          text="Add Lodging Info"
          style="btn-primary mr-5 h-12 w-48 px-2"
          id="lodging"
          clickHandler={clickHandler}
        />
      )}
      {state.openButtonToInput.flight ? (
        <PostInput
          keyPressHandler={keyPressHandler}
          iconName="MdFlight"
          name="flight"
          placeholder="flight info"
        />
      ) : (
        <Button
          text="Add Flight Info"
          style="btn-primary mr-5 h-12 w-48 px-2"
          id="flight"
          clickHandler={clickHandler}
        />
      )}
      {state.openButtonToInput.packingList ? (
        <PostInput
          keyPressHandler={keyPressHandler}
          iconName="FaSuitcase"
          name="packingList"
          placeholder="packing list"
        />
      ) : (
        <Button
          text="Add Packing List"
          style="btn-primary mr-5 h-12 w-48 px-2"
          id="packingList"
          clickHandler={clickHandler}
        />
      )}
    </div>
  );
};

export default PostBtnsAndInputs;
