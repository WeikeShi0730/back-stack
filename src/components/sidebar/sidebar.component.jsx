import React, { useState } from "react";

import CustomButton from "../../components/custom-button/custom-button.component";

const Sidebar = ({ setView, view }) => {
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState(false);

  const toggleStart = () => {
    setStart(!start);

    toggleStatus();
  };

  const toggleStatus = () => {
    setStatus(!status);
  };

  const toggleView = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    setView({ ...view, [name]: value });
  };
  return (
    <div className="grid grid-cols-1 w-full h-full text-gray-50 bg-gray-600 justify-items-center items-center p-10">
      {/* <div className="flex justify-center" onClick={toggleStart}>
        {start ? (
          <CustomButton>stop</CustomButton>
        ) : (
          <CustomButton>start</CustomButton>
        )}
      </div> */}
      {/* <div className="place-self-start">
        <div>
          status: {status ? <span>connected</span> : <span>disconnected</span>}
        </div>
      </div>
      <div className="place-self-start">
        <div>select view:</div>
        <div>
          <input
            type="checkbox"
            id="view1"
            name="view1"
            checked={view.view1}
            onChange={toggleView}
          />
          <span className="mx-2">view 1</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="view2"
            name="view2"
            checked={view.view2}
            onChange={toggleView}
          />
          <span className="mx-2">view 2</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="view3"
            name="view3"
            checked={view.view3}
            onChange={toggleView}
          />
          <span className="mx-2">view 3</span>
        </div>
      </div> */}
      <div className="place-self-start">
        <div className="">param 1: 112.47</div>
        <div className="">param 2: 12.65</div>
      </div>
    </div>
  );
};

export default Sidebar;
