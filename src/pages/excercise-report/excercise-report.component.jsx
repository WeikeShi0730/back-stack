import { useState, useEffect, createContext } from "react";
// import Sidebar from "../../components/sidebar/sidebar.component";
import Selections from "../../components/selections/selections.component";
import Graph from "../../components/excercise-report-graph/excercise-report-graph.component";
import Comparison from "../../components/comparison/comparison.component";
import { auth, subscribeToAuthState } from "../../firebase/firebase.utils";

export const SelectionsContext = createContext();

const ExcerciseReport = () => {
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  });

  const value = {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    currentUser,
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
          <Comparison date={date} />
        </div>
      </SelectionsContext.Provider>
    </div>
  );
};

export default ExcerciseReport;
