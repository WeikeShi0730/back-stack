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
import { dbRef } from "../../firebase/firebase.utils";
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
  const { date } = useContext(SelectionsContext);

  // const [graphData, setGraphData] = useState();

  // const parseData = async () => {
  //   try {
  //     const res = await fetch("data/Data_tests_oct27_21/acc_803_test.csv");
  //     const reader = res.body.getReader();
  //     const result = await reader.read(); // raw array
  //     const decoder = new TextDecoder("utf-8");
  //     const csv = decoder.decode(result.value); // the csv text
  //     const results = Papa.parse(csv, {
  //       header: true,
  //     }); // object with { data, errors, meta }
  //     const rows = results.data; // array of objects
  //     return rows;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getStartId = async () => {
  //   const rows = await parseData();
  //   const id = rows[rows.length - 2].id;
  //   localStorage.setItem("startId", id);
  // };

  // const getEndId = async () => {
  //   const rows = await parseData();
  //   const id = rows[rows.length - 2].id;
  //   localStorage.setItem("endId", id);
  //   return rows;
  // };

  // const getData = async () => {
  //   const rows = await getEndId();
  //   var startId = parseInt(localStorage.getItem("startId"));
  //   var endId = parseInt(localStorage.getItem("endId"));
  //   let data = [];
  //   let label = [];
  //   rows.forEach((row) => {
  //     var rowId = parseInt(row.id);
  //     if (rowId >= startId && rowId <= endId) {
  //       data.push([row.acc_x, row.acc_y, row.acc_z]);
  //       label.push(row.id);
  //     }
  //   });
  //   setData(data);
  //   setLabel(label);
  // };

  // useEffect(() => {
  //   const temp = list;
  //   // setGraphData(temp);
  //   let view1 = [];
  //   let view2 = [];
  //   let view3 = [];
  //   let label = [0];
  //   temp.forEach((row) => {
  //     label.push(label[label.length - 1] + 1);
  //     if (view.view1) {
  //       view1.push(row.Ax);
  //     }
  //     if (view.view2) {
  //       view2.push(row.Ay);
  //     }
  //     if (view.view3) {
  //       view3.push(row.Az);
  //     }
  //   });
  //   setViewData({ view1, view2, view3 });
  //   setLabel(label);
  // }, [view, list]);

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
        { value: 15, time: 1503611308914 },
        { value: 20, time: 1503613184594 },
        { value: -15, time: 1503616882654 },
        { value: 15, time: 1503616962277 },
        { value: -8, time: 1503617297689 },
      ],
    },

    {
      date: "2022-02-02",
      value: [
        { value: 18, time: 1503611308914 },
        { value: 17, time: 1503613184594 },
        { value: 15, time: 1503616882654 },
        { value: 5, time: 1503616962277 },
        { value: -18, time: 1503617297689 },
      ],
    },
  ];

  const dateValues = date ? date.map((eachDate) => eachDate.value) : [];
  console.log(dateValues);
  const chartDatas = date
    ? tempChartDatas.reduce((acc, current) => {
        if (dateValues.includes(current.date)) {
          acc.push(current);
        }
        return acc;
      }, [])
    : [];

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
              {chartDatas.map((chartData, index) => {
                return (
                  <Line
                    connectNulls
                    key={index}
                    strokeWidth={2}
                    data={chartData.value}
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
              {chartDatas.map((chartData, index) => {
                return (
                  <Line
                    connectNulls
                    key={index}
                    strokeWidth={2}
                    data={chartData.value}
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
