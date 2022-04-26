import { useState, useEffect, useContext } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { SelectionsContext } from "../../pages/excercise-report/excercise-report.component";

const Comparison = () => {
  const { dates, startTime, endTime, datas } = useContext(SelectionsContext);
  const [plotDatas, setPlotDatas] = useState([]);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    let isSubscribed = true;
    if (
      isSubscribed &&
      dates !== undefined &&
      dates !== null &&
      startTime &&
      endTime
    ) {
      console.log(datas);
      let plotDatas = [];
      for (const data of datas) {
        let total = data.data.length;
        let upright = 0;
        for (const eachMinute of data.data) {
          if (
            Math.abs(eachMinute.avgX) <= 15 &&
            Math.abs(eachMinute.avgY) <= 15
          ) {
            upright++;
          }
        }
        plotDatas.push({
          value: data.date.value,
          label: data.date.label,
          bad: total,
          upright: upright,
        });
      }
      setPlotDatas(plotDatas);

      const height = (dates.length > 0 ? dates.length : 1) * 100;
      setHeight(height);
    }

    return () => (isSubscribed = false);
  }, [dates, startTime, endTime, datas]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const bad =
        payload[0].dataKey === "bad" ? payload[0].value : payload[1].value;
      const upright =
        payload[0].dataKey === "upright" ? payload[0].value : payload[1].value;
      return (
        <div className="bg-slate-50 bg-opacity-80 backdrop-blur-md p-2 rounded-md shadow-lg">
          <div>
            Total: <span className="text-[#d08770]">{bad + upright} min</span>
          </div>
          <div>
            Upright:{" "}
            <span className="text-[#a3be8c]">
              {upright} min, {((upright * 100) / (bad + upright)).toFixed(0)}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-11/12">
        <div className="text-sm md:text-base lg:text-lg text-center m-5">
          Comparison
        </div>
        <ResponsiveContainer width="100%" height={height} className="my-5">
          <BarChart
            data={plotDatas}
            layout="vertical"
            padding={{ top: 15, right: 5, bottom: 15, left: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="label" type="category" scale="band" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="bad" stackId="a" fill="#d08770" />
            <Bar dataKey="upright" stackId="a" fill="#a3be8c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Comparison;
