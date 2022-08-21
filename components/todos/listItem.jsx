import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const ListItem = ({
  item,
  id,
  deleteListItem,
  checkListItem,
  packingList,
  isExplorePage,
}) => {
  const findItem = packingList.find((item) => {
    return item.id === id;
  });

  return (
    <li className="mb-3 flex items-center">
      {findItem.itemChecked ? (
        <div
          className="mr-3 cursor-pointer"
          id={id}
          onClick={isExplorePage ? undefined : checkListItem}
        >
          <FaRegCheckCircle className="pointer-events-none" />
        </div>
      ) : (
        <div
          className="mr-3 cursor-pointer"
          id={id}
          onClick={isExplorePage ? undefined : checkListItem}
        >
          <FaRegCircle className="pointer-events-none" />
        </div>
      )}
      <div className={findItem.itemChecked ? "line-through" : ""}>
        {item.item}
      </div>
      {!isExplorePage && (
        <div
          id={id}
          onClick={deleteListItem}
          className="ml-10 h-5 w-5 cursor-pointer"
        >
          <TiDelete className="pointer-events-none text-2xl" />
        </div>
      )}
    </li>
  );
};

export default ListItem;
