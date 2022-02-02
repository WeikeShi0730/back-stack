import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  ReferenceLine,
  // Tooltip,
  // Legend,
  Line,
} from "recharts";
import { dbRef } from "../../firebase/firebase.utils";
import { useListVals } from "react-firebase-hooks/database";
// import CustomButton from "../custom-button/custom-button.component";

const Graph = ({ view }) => {
  // const [viewData, setViewData] = useState({
  //   view1: [],
  //   view2: [],
  //   view3: [],
  // });
  // const [label, setLabel] = useState([]);
  const [list] = useListVals(dbRef);

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

  // /*****************************************/
  // const plotData = [
  //     {
  //       label: "# x",
  //       data: viewData.view1,
  //       fill: false,
  //       backgroundColor: "rgb(255, 99, 132)",
  //       borderColor: "rgba(255, 99, 132, 0.2)",
  //     },
  //     {
  //       label: "# y",
  //       data: viewData.view2,
  //       fill: false,
  //       backgroundColor: "rgb(54, 162, 235)",
  //       borderColor: "rgba(54, 162, 235, 0.2)",
  //     },
  //     {
  //       label: "# z",
  //       data: viewData.view3,
  //       fill: false,
  //       backgroundColor: "rgb(1, 2, 3)",
  //       borderColor: "rgba(1, 2, 3, 0.2)",
  //     },
  //   ]

  const chartData = [
    { value: 15, time: 1503611308914 },
    { value: 20, time: 1503613184594 },
    { value: -15, time: 1503616882654 },
    { value: 15, time: 1503616962277 },
    { value: -8, time: 1503617297689 },
  ];

  /*****************************************/

  return (
    <div className="">
      {/* <div className="m-2 space-x-2">
         <CustomButton onClick={getStartId}>start</CustomButton>

        <CustomButton onClick={getData}>stop</CustomButton> 
      </div> */}
      <div className="flex justify-center items-center">
        <div className="w-10/12 h-full">
          <ResponsiveContainer aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                axisLine={false}
                dataKey="time"
                domain={["auto", "auto"]}
                name="Time"
                tickFormatter={(unixTime) => moment(unixTime).format("HH:mm")}
                type="number"
              />
              <YAxis
                tick={false}
                type="number"
                domain={[-100, 100]}
                axisLine={false}
              />
              <ReferenceLine y={80} stroke="white">
                <Label
                  value="left"
                  position="insideLeft"
                  offset={-20}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={0} stroke="black">
                <Label
                  value="0"
                  position="insideLeft"
                  offset={-20}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={-80} stroke="white">
                <Label
                  value="right"
                  position="insideLeft"
                  offset={-20}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <Line
                data={chartData}
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                axisLine={false}
                dataKey="time"
                domain={["auto", "auto"]}
                name="Time"
                tickFormatter={(unixTime) => moment(unixTime).format("HH:mm")}
                type="number"
              />
              <YAxis
                tick={false}
                type="number"
                domain={[-100, 100]}
                axisLine={false}
              />
              <ReferenceLine y={80} stroke="white">
                <Label
                  value="front"
                  position="insideLeft"
                  offset={-20}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={0} stroke="black">
                <Label
                  value="0"
                  position="insideLeft"
                  offset={-20}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <ReferenceLine y={-80} stroke="white">
                <Label
                  value="back"
                  position="insideLeft"
                  offset={-20}
                  style={{ textAnchor: "middle" }}
                />
              </ReferenceLine>
              <Line
                data={chartData}
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graph;
