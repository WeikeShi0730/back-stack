import { useContext, useState, useEffect } from "react";
import moment from "moment";
import Select from "react-select";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";
import { getUserData } from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";

const Selections = () => {
  const {
    dates,
    setDates,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    currentUser,
  } = useContext(SelectionsContext);
  const [dateOptions, setDateOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (currentUser) {
          setLoading(true);
          const dates = await getUserData();
          setLoading(false);
          let dateOptions = [];
          dates.forEach((date) => {
            dateOptions.push({
              value: date,
              label: moment(date).format("ll"),
            });
          });
          setDateOptions(dateOptions);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getData();
  }, [currentUser]);

  // const startTimeOptions = date
  //   ? [
  //       { value: new Date("2022-01-01T00:00:00").getTime(), label: "00:00" },
  //       { value: new Date("2022-01-01T01:00:00").getTime(), label: "01:00" },
  //       { value: new Date("2022-01-01T02:00:00").getTime(), label: "02:00" },
  //       { value: new Date("2022-01-01T03:00:00").getTime(), label: "03:00" },
  //       { value: new Date("2022-01-01T04:00:00").getTime(), label: "04:00" },
  //       { value: new Date("2022-01-01T05:00:00").getTime(), label: "05:00" },
  //       { value: new Date("2022-01-01T06:00:00").getTime(), label: "06:00" },
  //       { value: new Date("2022-01-01T07:00:00").getTime(), label: "07:00" },
  //       { value: new Date("2022-01-01T08:00:00").getTime(), label: "08:00" },
  //       { value: new Date("2022-01-01T09:00:00").getTime(), label: "09:00" },
  //       { value: new Date("2022-01-01T10:00:00").getTime(), label: "10:00" },
  //       { value: new Date("2022-01-01T11:00:00").getTime(), label: "11:00" },
  //       { value: new Date("2022-01-01T12:00:00").getTime(), label: "12:00" },
  //       { value: new Date("2022-01-01T13:00:00").getTime(), label: "13:00" },
  //       { value: new Date("2022-01-01T14:00:00").getTime(), label: "14:00" },
  //       { value: new Date("2022-01-01T15:00:00").getTime(), label: "15:00" },
  //       { value: new Date("2022-01-01T16:00:00").getTime(), label: "16:00" },
  //       { value: new Date("2022-01-01T17:00:00").getTime(), label: "17:00" },
  //       { value: new Date("2022-01-01T18:00:00").getTime(), label: "18:00" },
  //       { value: new Date("2022-01-01T19:00:00").getTime(), label: "19:00" },
  //       { value: new Date("2022-01-01T20:00:00").getTime(), label: "20:00" },
  //       { value: new Date("2022-01-01T21:00:00").getTime(), label: "21:00" },
  //       { value: new Date("2022-01-01T22:00:00").getTime(), label: "22:00" },
  //       { value: new Date("2022-01-01T23:00:00").getTime(), label: "23:00" },
  //     ]
  //   : [{ value: null, label: "Select a date first" }];

  const startTimeOptions = dates
    ? [
        { value: 0, label: "00:00" },
        { value: 1, label: "01:00" },
        { value: 2, label: "02:00" },
        { value: 3, label: "03:00" },
        { value: 4, label: "04:00" },
        { value: 5, label: "05:00" },
        { value: 6, label: "06:00" },
        { value: 7, label: "07:00" },
        { value: 8, label: "08:00" },
        { value: 9, label: "09:00" },
        { value: 10, label: "10:00" },
        { value: 11, label: "11:00" },
        { value: 12, label: "12:00" },
        { value: 13, label: "13:00" },
        { value: 14, label: "14:00" },
        { value: 15, label: "15:00" },
        { value: 16, label: "16:00" },
        { value: 17, label: "17:00" },
        { value: 18, label: "18:00" },
        { value: 19, label: "19:00" },
        { value: 20, label: "20:00" },
        { value: 21, label: "21:00" },
        { value: 22, label: "22:00" },
        { value: 23, label: "23:00" },
      ]
    : [{ value: null, label: "Select a date first" }];

  const endTimeOptions = startTime
    ? startTimeOptions.filter(({ value }) => value > startTime.value)
    : [{ value: null, label: "Select start time first" }];

  //********* custom styles for selection *********/
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(100, 116, 139, 0.2)",
      backdropFilter: "blur(10px)",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(100, 116, 139, 0)",
    }),
  };
  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      text: "black",
      primary50: "rgba(100, 116, 139, 0.1)",
      primary25: "rgba(100, 116, 139, 0.2)",
      primary: "rgba(100, 116, 139, 0.3)",
    },
  });

  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-center m-5">
        <Select
          isMulti
          instanceId="data"
          value={dates}
          onChange={(dates) => {
            setDates(dates);
          }}
          options={dateOptions}
          // isLoading={dateLoading}
          placeholder="Date..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-80"
          styles={customStyles}
          theme={theme}
        />
        <Select
          instanceId="session"
          value={startTime}
          onChange={(startTime) => {
            setStartTime(startTime);
          }}
          options={startTimeOptions}
          // isLoading={startTimeLoading}
          placeholder="Start time..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-48"
          styles={customStyles}
          theme={theme}
        />
        <Select
          instanceId="driver"
          value={endTime}
          onChange={(endTime) => {
            setEndTime(endTime);
          }}
          options={endTimeOptions}
          // isLoading={endTimeLoading}
          placeholder="End time..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-48"
          styles={customStyles}
          theme={theme}
        />
      </div>
    </>
  );
};

export default Selections;
