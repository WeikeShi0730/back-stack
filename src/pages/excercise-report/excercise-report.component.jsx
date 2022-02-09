import { useState, createContext } from "react";
// import Sidebar from "../../components/sidebar/sidebar.component";
import Selections from "../../components/selections/selections.component";
import Graph from "../../components/excercise-report-graph/excercise-report-graph.component";
import Comparison from "../../components/comparison/comparison.component";

export const SelectionsContext = createContext();

const ExcerciseReport = () => {
  //   const [view, setView] = useState({
  //     view1: false,
  //     view2: false,
  //     view3: false,
  //   });
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const value = {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  };

  return (
    <div className="h-full">
      <SelectionsContext.Provider value={value}>
        <div className="">
          <Selections />
        </div>
        <div className="">
          <Graph />
        </div>
        <div className="">
          <Comparison date={date} />
        </div>
      </SelectionsContext.Provider>
    </div>
    // <div className="grid grid-cols-12 h-full">
    //   {/* <div className="col-span-10 place-self-center"> */}
    //   <div className="col-span-12">
    //     <Graph view={view} />
    //   </div>
    //   <div className="col-span-2">
    //         <Sidebar setView={setView} view={view} />
    //       </div>
    // </div>
  );
};

export default ExcerciseReport;
