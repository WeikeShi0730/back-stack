import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Graph from "../../components/graph/graph.component";

const Measure = () => {
  const [view, setView] = useState({
    view1: false,
    view2: false,
    view3: false,
  });

  return (
    <div className="grid grid-cols-12 h-full">
      {/* <div className="col-span-10 place-self-center"> */}
      <div className="col-span-10">
        <Graph view={view} />
      </div>
      <div className="col-span-2">
        <Sidebar setView={setView} view={view} />
      </div>
    </div>
  );
};

export default Measure;
