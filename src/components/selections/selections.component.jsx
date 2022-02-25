import { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";
import { getUserData, auth } from "../../firebase/firebase.utils";

const Selections = () => {
  const { date, setDate, startTime, setStartTime, endTime, setEndTime } =
    useContext(SelectionsContext);
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (auth.currentUser) {
          const { uid } = auth.currentUser;
          const res = await getUserData(uid);
          const { data } = res;
          let dateOptions = [];
          data.forEach((eachData) => {
            dateOptions.push({
              value: Object.keys(eachData)[0],
              label: Object.keys(eachData)[0],
            });
          });
          setDateOptions(dateOptions);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // const dateOptions = [
  //   // test dates!!!
  //   { value: "2022-02-01", label: "Feb 1, 2022" },
  //   { value: "2022-02-02", label: "Feb 2, 2022" },
  // ];

  const startTimeOptions = date
    ? [
        { value: new Date("2022-01-01T00:00:00").getTime(), label: "00:00" },
        { value: new Date("2022-01-01T01:00:00").getTime(), label: "01:00" },
        { value: new Date("2022-01-01T02:00:00").getTime(), label: "02:00" },
        { value: new Date("2022-01-01T03:00:00").getTime(), label: "03:00" },
        { value: new Date("2022-01-01T04:00:00").getTime(), label: "04:00" },
        { value: new Date("2022-01-01T05:00:00").getTime(), label: "05:00" },
        { value: new Date("2022-01-01T06:00:00").getTime(), label: "06:00" },
        { value: new Date("2022-01-01T07:00:00").getTime(), label: "07:00" },
        { value: new Date("2022-01-01T08:00:00").getTime(), label: "08:00" },
        { value: new Date("2022-01-01T09:00:00").getTime(), label: "09:00" },
        { value: new Date("2022-01-01T10:00:00").getTime(), label: "10:00" },
        { value: new Date("2022-01-01T11:00:00").getTime(), label: "11:00" },
        { value: new Date("2022-01-01T12:00:00").getTime(), label: "12:00" },
        { value: new Date("2022-01-01T13:00:00").getTime(), label: "13:00" },
        { value: new Date("2022-01-01T14:00:00").getTime(), label: "14:00" },
        { value: new Date("2022-01-01T15:00:00").getTime(), label: "15:00" },
        { value: new Date("2022-01-01T16:00:00").getTime(), label: "16:00" },
        { value: new Date("2022-01-01T17:00:00").getTime(), label: "17:00" },
        { value: new Date("2022-01-01T18:00:00").getTime(), label: "18:00" },
        { value: new Date("2022-01-01T19:00:00").getTime(), label: "19:00" },
        { value: new Date("2022-01-01T20:00:00").getTime(), label: "20:00" },
        { value: new Date("2022-01-01T21:00:00").getTime(), label: "21:00" },
        { value: new Date("2022-01-01T22:00:00").getTime(), label: "22:00" },
        { value: new Date("2022-01-01T23:00:00").getTime(), label: "23:00" },
      ]
    : [{ value: null, label: "Select a date first" }];

  const endTimeOptions = startTime
    ? startTimeOptions.filter(({ value }) => value > startTime.value)
    : [{ value: null, label: "Select start time first" }];

  //********* custom styles for selection *********/
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(100, 116, 139, .1)",
      backdropFilter: "blur(3px)",
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
    <div className="flex justify-center m-5">
      <Select
        isMulti
        instanceId="data"
        value={date}
        onChange={(date) => {
          setDate(date);
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
  );
};

export default Selections;
