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
import { getDateData } from "../../firebase/firebase.utils";
import { colors } from "../../config";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";
import Loading from "../loading/loading.component";

const Graph = () => {
  const { dates, startTime, endTime, setDatas } = useContext(SelectionsContext);
  const [graphDatas, setGraphDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const datas = await getDateData(dates, startTime, endTime);
        setLoading(false);
        const graphDatas = datas.map((data) => data.data);
        setDatas(datas);
        setGraphDatas(graphDatas);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };

    if (
      dates !== undefined &&
      dates !== null &&
      dates.length > 0 &&
      startTime &&
      endTime
    ) {
      getData();
    }
  }, [dates, startTime, endTime, setDatas]);

  const timeFormat = (unixTime) => {
    return moment.unix(unixTime).format("HH:mm");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-500 bg-opacity-30 backdrop-blur-md p-2 rounded-md shadow-lg">
          <p className="text-lg">{`Time : ${timeFormat(label)}`}</p>
          {payload.map((eachPayload, index) => {
            return (
              <div key={index}>
                <p className="text-lg">{`${eachPayload.value.toFixed(1)} °`}</p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {loading && <Loading />}
      <div className="">
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
                {graphDatas.map((graphData, index) => {
                  return (
                    <Line
                      connectNulls
                      key={index}
                      strokeWidth={2}
                      data={graphData}
                      type="monotone"
                      dataKey="avgX"
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
                {graphDatas.map((graphData, index) => {
                  return (
                    <Line
                      connectNulls
                      key={index}
                      strokeWidth={2}
                      data={graphData}
                      type="monotone"
                      dataKey="avgY"
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
    </>
  );
};

export default Graph;
