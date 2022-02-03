import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
} from "recharts";

const Comparison = ({ date }) => {
  const condition = date !== undefined && date !== null && date.length > 0;

  //   const data = condition
  //     ? date.map((eachDate) => {
  //         return {
  //           id: eachDate.value,
  //           name: eachDate.label,
  //           total: 8,
  //           upright: 2,
  //         };
  //       })
  //     : [];

  const tempData = [
    { id: "2022-02-01", name: "Feb 1, 2022", total: 8, upright: 7 },
    { id: "2022-02-02", name: "Feb 2, 2022", total: 5, upright: 5 },
  ];

  const data = condition ? tempData.slice(0, date.length) : [];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 h-full">
        <ResponsiveContainer width="100%" aspect={8} className="my-5">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 5, bottom: 15, left: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="upright" stackId="a" fill="#82ca9d" />
            <Bar dataKey="total" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Comparison;
