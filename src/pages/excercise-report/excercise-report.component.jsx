import { useState, useEffect, createContext } from "react";
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
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    subscribeToAuthState((user) => {
      if (isSubscribed) {
        setCurrentUser(user);
      }
    });
    return () => (isSubscribed = false);
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

  return (
    <div className="h-full">
      <SelectionsContext.Provider value={value}>
        <Selections />
        <Graph />
        <Comparison />
      </SelectionsContext.Provider>
    </div>
  );
};

export default ExcerciseReport;
