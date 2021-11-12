import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import CustomButton from "../custom-button/custom-button.component";

const Graph = ({ view }) => {
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState({
    view1: [],
    view2: [],
    view3: [],
  });
  const [label, setLabel] = useState([]);

  const parseData = async () => {
    try {
      const res = await fetch("data/Data_tests_oct27_21/acc_803_test.csv");
      const reader = res.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, {
        header: true,
      }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      return rows;
    } catch (error) {
      console.error(error);
    }
  };

  const getStartId = async () => {
    const rows = await parseData();
    const id = rows[rows.length - 2].id;
    localStorage.setItem("startId", id);
  };

  const getEndId = async () => {
    const rows = await parseData();
    const id = rows[rows.length - 2].id;
    localStorage.setItem("endId", id);
    return rows;
  };

  const getData = async () => {
    const rows = await getEndId();
    var startId = parseInt(localStorage.getItem("startId"));
    var endId = parseInt(localStorage.getItem("endId"));
    let data = [];
    let label = [];
    rows.forEach((row) => {
      var rowId = parseInt(row.id);
      if (rowId >= startId && rowId <= endId) {
        data.push([row.acc_x, row.acc_y, row.acc_z]);
        label.push(row.id);
      }
    });
    setData(data);
    setLabel(label);
  };

  useEffect(() => {
    const temp = data;
    let view1 = [];
    let view2 = [];
    let view3 = [];
    temp.forEach((row) => {
      if (view.view1) {
        view1.push(row[0]);
      }
      if (view.view2) {
        view2.push(row[1]);
      }
      if (view.view3) {
        view3.push(row[2]);
      }
    });
    setViewData({ view1, view2, view3 });
  }, [view]);

  /*****************************************/
  const plotData = {
    labels: label,
    datasets: [
      {
        label: "# x",
        data: viewData.view1,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "# y",
        data: viewData.view2,
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "# z",
        data: viewData.view3,
        fill: false,
        backgroundColor: "rgb(1, 2, 3)",
        borderColor: "rgba(1, 2, 3, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
      ],
    },
  };
  /*****************************************/

  return (
    <div>
      <div className="m-2 space-x-2">
        <CustomButton onClick={getStartId}>start</CustomButton>

        <CustomButton onClick={getData}>stop</CustomButton>
      </div>
      <Line data={plotData} options={options} />
    </div>
  );
};

export default Graph;
