import { FaCheckCircle } from "react-icons/fa";

const Device = ({ device }) => {
  const handleOnClick = () => {};
  return (
    <div
      className={`flex gap-x-5 items-center justify-start p-3 rounded-lg h-16 ${
        device.activate ? "bg-green-200" : ""
      }`}
    >
      <div className={"w-28 truncate"}>{device.name}</div>
      {device.activate ? (
        <div className="flex flex-grow justify-center items-center border-2 border-green-500 p-2 rounded-md text-green-500 hover:text-white hover:bg-green-500 transition duration-200">
          <FaCheckCircle />
        </div>
      ) : (
        <>
          <button
            className="font-light border-2 border-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-200"
            onClick={handleOnClick}
          >
            Activate
          </button>
          <button className="font-light border-2 border-red-500 p-2 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default Device;
