import React, { useState } from "react";

import CustomButton from "../../components/custom-button/custom-button.component";

const Sidebar = () => {
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState(false);
  const toggleStart = () => {
    setStart(!start);
    toggleStatus();
  };

  const toggleStatus = () => {
    setStatus(!status);
  };
  return (
    <div className="grid grid-cols-1 w-full h-full text-gray-50 bg-gray-600 justify-items-center items-center p-10">
      <div className="flex justify-center" onClick={toggleStart}>
        {start ? (
          <CustomButton>stop</CustomButton>
        ) : (
          <CustomButton>start</CustomButton>
        )}
      </div>
      <div className="place-self-start">
        <div>
          status: {status ? <span>connected</span> : <span>disconnected</span>}
        </div>
      </div>
      <div className="place-self-start">
        <div>select view:</div>
        <div>🔘 view 1</div>
        <div>🔘 view 2</div>
        <div>🔘 view 3</div>
      </div>
      <div className="place-self-start">
        <div className="">param 1: 112.47</div>
        <div className="">param 2: 12.65</div>
      </div>
    </div>
  );
};

export default Sidebar;
