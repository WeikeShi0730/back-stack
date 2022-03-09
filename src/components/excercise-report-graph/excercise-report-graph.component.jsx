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
// import CustomButton from "../custom-button/custom-button.component";

const Graph = () => {
  const { date, startTime, endTime, currentUser } =
    useContext(SelectionsContext);

  const [datas, setDatas] = useState();
  const [graphDatas, setGraphDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDateData(date[0].value);
        // console.log(Object.values(data));
        setDatas(Object.values(data));
      } catch (error) {
        console.error(error.message);
      }
    };

    if (date !== undefined && date !== null && date.length > 0) {
      getData();
    }
  }, [date]);

  useEffect(() => {
    let graphData = [];
    const filteredDatas =
      datas && startTime && endTime
        ? datas.filter((data) => {
            return data.Hours >= startTime.value && data.Hours < endTime.value;
          })
        : [];

    // const interval = 1;
    if (filteredDatas.length > 0) {
      let compressedDatas = [];
      let timeMin = filteredDatas[0].Minutes;
      // let timeMax = timeMin + interval;
      let valueX,
        valueY,
        avgX,
        avgY,
        count = 0;
      for (let data of filteredDatas) {
        // need to be able to adjust interval to 10 minutes
        if (data.Minutes > timeMin) {
          // console.log(valueX);
          avgX = valueX / count;
          avgY = valueY / count;
          compressedDatas.push({ time: data.Minutes, avgX: avgX, avgY: avgY });
          valueX = valueY = avgX = avgY = count = 0;
          timeMin = data.Minutes;
        }
        valueX += data.kalAngleX;
        valueY += data.kalAngleY;
        count++;
      }
      console.log(compressedDatas);
      // setCompressedDatas(compressedDatas);
      graphData.push(compressedDatas);
      setGraphDatas(graphData);
    }

    // filteredDatas.push({ date: "", value: filteredData });

    // console.log(filteredDatas);
    // setFilteredDatas(filteredDatas);
    // datas &&
    //   datas.forEach((data) => {
    //     console.log(data.Hours);
    //   });
  }, [startTime, endTime, datas]);

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
  );
};

export default Graph;
