import { useState, useEffect, createContext } from "react";
// import Sidebar from "../../components/sidebar/sidebar.component";
import Selections from "../../components/selections/selections.component";
import Graph from "../../components/excercise-report-graph/excercise-report-graph.component";
import Comparison from "../../components/comparison/comparison.component";
import { subscribeToAuthState } from "../../firebase/firebase.utils";

export const SelectionsContext = createContext();

const ExcerciseReport = () => {
  const [dates, setDates] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [datas, setDatas] = useState([])

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  });

  const value = {
    dates,
    setDates,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    currentUser,
    datas,
    setDatas,
  };

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

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
          <Comparison />
        </div>
      </SelectionsContext.Provider>
    </div>
  );
};

export default ExcerciseReport;
