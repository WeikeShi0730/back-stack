import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";

const Measure = () => {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-10 place-self-center">
        <img className="" src="/temp-graph.png" alt="graph" />
      </div>
      <div className="col-span-2">
        <Sidebar />
      </div>
    </div>
  );
};

export default Measure;
