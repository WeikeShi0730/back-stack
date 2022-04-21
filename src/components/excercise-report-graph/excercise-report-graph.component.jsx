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
  Legend,
  Line,
} from "recharts";
import { getDateData } from "../../firebase/firebase.utils";
import { colors } from "../../config";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";
import Loading from "../loading/loading.component";

const Graph = () => {
  const { dates, datas, startTime, endTime, setDatas } =
    useContext(SelectionsContext);
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    let isSubscribed = true;
    const getData = async () => {
      try {
        setLoading(true);
        const datas = await getDateData(dates, startTime, endTime);
        setLoading(false);
        if (isSubscribed) {
          setDatas(datas);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    if (dates !== undefined && dates !== null && startTime && endTime) {
      getData();
    }
    return () => (isSubscribed = false);
  }, [dates, startTime, endTime, setDatas]);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        const height =
          window.innerWidth < 1536
            ? window.innerWidth < 1280
              ? window.innerWidth < 1024
                ? window.innerWidth < 768
                  ? 300
                  : 350
                : 400
              : 450
            : 500;
        setHeight(height);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const timeFormat = (unixTime) => {
    return moment.unix(unixTime).format("HH:mm");
  };

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="bg-slate-500 bg-opacity-30 backdrop-blur-md p-2 rounded-md shadow-lg">
  //         <p className="text-lg">{`Time : ${timeFormat(label)}`}</p>
  //         {payload.map((eachPayload, index) => {
  //           return (
  //             <div key={index}>
  //               <p className="text-lg">{`${eachPayload.value.toFixed(1)} °`}</p>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      {loading && <Loading />}
      <div className="">
        <div className="flex justify-center items-center">
          <div className="w-11/12 h-full">
            <ResponsiveContainer width="100%" height={height} className="my-5">
              <LineChart margin={{ top: 5, right: 5, bottom: 15, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  axisLine={false}
                  dataKey="time"
                  domain={["auto", "auto"]}
                  name="Time"
                  tickFormatter={(unixTime) => timeFormat(unixTime)}
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
                  domain={[-45, 45]}
                  axisLine={false}
                />
                <ReferenceLine y={40} stroke="">
                  <Label
                    value="Back (°)"
                    position="insideLeft"
                    offset={-30}
                    style={{ textAnchor: "middle" }}
                  />
                </ReferenceLine>
                <ReferenceLine y={15} stroke="#bf616a" strokeDasharray="3 3">
                  <Label
                    value="15°"
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
                <ReferenceLine y={-15} stroke="#bf616a" strokeDasharray="3 3">
                  <Label
                    value="-15°"
                    position="insideLeft"
                    offset={-30}
                    style={{ textAnchor: "middle" }}
                  />
                </ReferenceLine>
                <ReferenceLine y={-40} stroke="">
                  <Label
                    value="Front (°)"
                    position="insideLeft"
                    offset={-30}
                    style={{ textAnchor: "middle" }}
                  />
                </ReferenceLine>
                {datas.map((data, index) => {
                  return (
                    <Line
                      connectNulls
                      key={index}
                      strokeWidth={2}
                      name={data.date.label}
                      data={data.data}
                      type="monotone"
                      dataKey="avgX"
                      stroke={colors[index]}
                    />
                  );
                })}
                {/* <Tooltip content={<CustomTooltip />} cursor={false} /> */}
                <Legend verticalAlign="top" height={36} />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={height} className="my-5">
              <LineChart margin={{ top: 5, right: 5, bottom: 15, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  axisLine={false}
                  dataKey="time"
                  domain={["auto", "auto"]}
                  name="Time"
                  tickFormatter={(unixTime) => timeFormat(unixTime)}
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
                  domain={[-45, 45]}
                  axisLine={false}
                />
                <ReferenceLine y={40} stroke="">
                  <Label
                    value="Right (°)"
                    position="insideLeft"
                    offset={-30}
                    style={{ textAnchor: "middle" }}
                  />
                </ReferenceLine>
                <ReferenceLine y={15} stroke="#bf616a" strokeDasharray="3 3">
                  <Label
                    value="15°"
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
                <ReferenceLine y={-15} stroke="#bf616a" strokeDasharray="3 3">
                  <Label
                    value="-15°"
                    position="insideLeft"
                    offset={-30}
                    style={{ textAnchor: "middle" }}
                  />
                </ReferenceLine>
                <ReferenceLine y={-40} stroke="">
                  <Label
                    value="Left (°)"
                    position="insideLeft"
                    offset={-30}
                    style={{ textAnchor: "middle" }}
                  />
                </ReferenceLine>
                {datas.map((data, index) => {
                  return (
                    <Line
                      connectNulls
                      key={index}
                      strokeWidth={2}
                      name={data.date.label}
                      data={data.data}
                      type="monotone"
                      dataKey="avgY"
                      stroke={colors[index]}
                    />
                  );
                })}
                {/* <Tooltip content={<CustomTooltip />} /> */}
                <Legend verticalAlign="top" height={36} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
