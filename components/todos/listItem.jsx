import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";

const ListItem = ({ item, id, deleteListItem }) => {
  const [itemChecked, setItemChecked] = useState(false);

  const listItemChecked = () => {
    setItemChecked((preValue) => {
      return !preValue;
    });
  };

  return (
    <li className="mb-3 flex items-center">
      {itemChecked ? (
        <FaRegCheckCircle
          className="mr-3 cursor-pointer"
          onClick={listItemChecked}
        />
      ) : (
        <FaRegCircle
          className="mr-3 cursor-pointer"
          onClick={listItemChecked}
        />
      )}
      <div>{item.item}</div>
      <div
        id={id}
        onClick={deleteListItem}
        className="ml-10 h-5 w-5 cursor-pointer bg-red-400"
      >
        <TiDelete className="pointer-events-none text-2xl" />
      </div>
    </li>
  );
};

export default ListItem;
