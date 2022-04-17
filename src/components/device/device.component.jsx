import { FaCheckCircle } from "react-icons/fa";

const Device = ({ device }) => {
  return (
    <div
      className={`flex gap-x-5 items-center justify-start p-3 rounded-lg h-16 ${
        device.activate ? "bg-green-200" : ""
      }`}
    >
      <div className={"w-28 truncate"}>{device.name}</div>
      {device.activate ? (
        <div className="border-2 border-green-500 p-2 rounded-md text-green-500 flex flex-grow justify-center items-center">
          <FaCheckCircle />
        </div>
      ) : (
        <>
          <button className="font-light border-2 border-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white">
            Activate
          </button>
          <button className="font-light border-2 border-red-500 p-2 rounded-md hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default Device;
