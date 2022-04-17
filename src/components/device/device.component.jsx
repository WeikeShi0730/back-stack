import React from "react";

const Device = ({ device }) => {
  return (
    <div className="flex gap-x-5 items-center justify-center">
      <div className="w-28 truncate">{device.name}</div>
      <button className="border border-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white">
        Activate
      </button>
      <button className="border border-red-500 p-2 rounded-md hover:bg-red-500 hover:text-white">
        Remove
      </button>
    </div>
  );
};

export default Device;
