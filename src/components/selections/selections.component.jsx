import { useContext } from "react";
import Select from "react-select";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";

const Selections = () => {
  const { date, setDate, startTime, setStartTime, endTime, setEndTime } =
    useContext(SelectionsContext);

  const dateOptions = [
    // test dates!!!
    { value: "2022-02-01", label: "Feb 1, 2022" },
    { value: "2022-02-02", label: "Feb 2, 2022" },
  ];

  const startTimeOptions = date
    ? [
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
