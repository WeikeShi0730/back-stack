import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Graph from "../../components/graph/graph.component";

const Measure = () => {
  const [toggle, setToggle] = useState()

  return (
    <div className="grid grid-cols-12 h-full">
      {/* <div className="col-span-10 place-self-center"> */}
      <div className="col-span-10">
        <Graph toggle={toggle} />
      </div>
      <div className="col-span-2">
        <Sidebar setToggle={setToggle} />
      </div>
    </div>
  );
};

export default Measure;
