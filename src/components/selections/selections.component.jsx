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
    let isSubscribed = true;
    const getData = async () => {
      try {
        if (currentUser) {
          setLoading(true);
          const dates = await getUserData();
          setLoading(false);
          if (isSubscribed) {
            let dateOptions = [];
            dates.forEach((date) => {
              dateOptions.push({
                value: date,
                label: moment(date, "YYYY-MM-DD").format("LL"),
              });
            });
            setDateOptions(dateOptions);
          }
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getData();
    return () => (isSubscribed = false);
  }, [currentUser]);

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
          isLoading={loading}
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
