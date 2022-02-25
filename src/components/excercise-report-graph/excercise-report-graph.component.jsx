import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  ReferenceLine,
  Tooltip,
  // Legend,
  Line,
} from "recharts";
import { dbRef, getUserData } from "../../firebase/firebase.utils";
import { useListVals } from "react-firebase-hooks/database";
import { colors } from "../../config";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";
// import CustomButton from "../custom-button/custom-button.component";

const Graph = () => {
  // const [viewData, setViewData] = useState({
  //   view1: [],
  //   view2: [],
  //   view3: [],
  // });
  // const [label, setLabel] = useState([]);
  const [list] = useListVals(dbRef);
  const { date, startTime, endTime, currentUser } = useContext(SelectionsContext);

  const timeFormat = (unixTime) => {
    return moment(unixTime).format("HH:mm");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-500 bg-opacity-20 backdrop-blur-sm p-2 rounded-md shadow-lg">
          <p className="text-lg">{`Time : ${timeFormat(label)}`}</p>
          {payload.map((eachPayload, index) => {
            return (
              <div key={index}>
                <p className="text-lg">{`${eachPayload.payload.value} °`}</p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const tempChartDatas = [
    {
      date: "2022-02-01",
      value: [
        { value: 14, time: new Date("2022-01-01T08:11:38").getTime() },
        { value: 11, time: new Date("2022-01-01T09:11:38").getTime() },
        { value: 10, time: new Date("2022-01-01T10:11:38").getTime() },
        { value: 7, time: new Date("2022-01-01T11:11:38").getTime() },
        { value: 7, time: new Date("2022-01-01T12:11:38").getTime() },
        { value: 1, time: new Date("2022-01-01T13:11:38").getTime() },
        { value: -1, time: new Date("2022-01-01T14:11:38").getTime() },
        { value: -5, time: new Date("2022-01-01T15:11:38").getTime() },
        { value: 5, time: new Date("2022-01-01T16:11:38").getTime() },
        { value: 1, time: new Date("2022-01-01T17:11:38").getTime() },
        { value: 10, time: new Date("2022-01-01T18:11:38").getTime() },
        { value: 18, time: new Date("2022-01-01T19:11:38").getTime() },
        { value: -15, time: new Date("2022-01-01T20:00:00").getTime() },
      ],
    },
    {
      date: "2022-02-02",
      value: [
        { value: 18, time: new Date("2022-01-01T08:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T09:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T10:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T11:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T12:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T13:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T14:11:38").getTime() },
        { value: 15, time: new Date("2022-01-01T15:11:38").getTime() },
        { value: 5, time: new Date("2022-01-01T16:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T17:11:38").getTime() },
        { value: 17, time: new Date("2022-01-01T18:11:38").getTime() },
        { value: -18, time: new Date("2022-01-01T19:11:38").getTime() },
        { value: -18, time: new Date("2022-01-01T20:00:00").getTime() },
      ],
    },
  ];

  const dates = date ? date.map((eachDate) => eachDate.value) : [];
  const dataWithSelectedDates = date
    ? tempChartDatas.reduce((acc, current) => {
        if (dates.includes(current.date)) {
          acc.push(current.value);
        }
        return acc;
      }, [])
    : [];
  const graphDatas =
    startTime !== null &&
    startTime !== undefined &&
    endTime !== null &&
    endTime !== undefined
      ? dataWithSelectedDates.map((dataWithSelectedDate) => {
          return dataWithSelectedDate.filter((eachdataWithSelectedDate) => {
            return (
              eachdataWithSelectedDate.time >= startTime.value &&
              eachdataWithSelectedDate.time <= endTime.value
            );
          });
        })
      : dataWithSelectedDates;

  return (
    <div className="">
      {/* <div className="m-2 space-x-2">
         <CustomButton onClick={getStartId}>start</CustomButton>

        <CustomButton onClick={getData}>stop</CustomButton> 
      </div> */}
      <div className="flex justify-center items-center">
        <div className="w-11/12 h-full">
          <ResponsiveContainer aspect={3} className="my-5">
            <LineChart margin={{ top: 5, right: 5, bottom: 15, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                axisLine={false}
                dataKey="time"
                domain={["auto", "auto"]}
                name="Time"
                tickFormatter={(date) => moment(date).format("HH:mm")}
                type="number"
              >
                <Label
                  value="Time (HH:mm)"
                  offset={-10}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis
                tick={false}
                type="number"
                domain={[-100, 100]}
                axisLine={false}
              />
              <ReferenceLine y={80} stroke="white">
                <Label
                  value="Left (°)"
                  position="insideLeft"
                  offset={-30}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={0} stroke="black">
                <Label
                  value="0"
                  position="insideLeft"
                  offset={-30}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={-80} stroke="white">
                <Label
                  value="Right (°)"
                  position="insideLeft"
                  offset={-30}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              {graphDatas.map((graphData, index) => {
                return (
                  <Line
                    connectNulls
                    key={index}
                    strokeWidth={2}
                    data={graphData}
                    type="monotone"
                    dataKey="value"
                    stroke={colors[index]}
                  />
                );
              })}
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend verticalAlign="top" height={36} /> */}
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer aspect={3} className="my-5">
            <LineChart margin={{ top: 5, right: 5, bottom: 15, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                axisLine={false}
                dataKey="time"
                domain={["auto", "auto"]}
                name="Time"
                tickFormatter={(unixTime) => moment(unixTime).format("HH:mm")}
                type="number"
              >
                <Label
                  value="Time (HH:mm)"
                  offset={-10}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis
                tick={false}
                type="number"
                domain={[-100, 100]}
                axisLine={false}
              />
              <ReferenceLine y={80} stroke="white">
                <Label
                  value="Front (°)"
                  position="insideLeft"
                  offset={-30}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={0} stroke="black">
                <Label
                  value="0"
                  position="insideLeft"
                  offset={-30}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={-80} stroke="white">
                <Label
                  value="Back (°)"
                  position="insideLeft"
                  offset={-30}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              {graphDatas.map((graphData, index) => {
                return (
                  <Line
                    connectNulls
                    key={index}
                    strokeWidth={2}
                    data={graphData}
                    type="monotone"
                    dataKey="value"
                    stroke={colors[index]}
                  />
                );
              })}
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend verticalAlign="top" height={36} /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graph;
