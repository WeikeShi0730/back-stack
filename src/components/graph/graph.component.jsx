import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";

const Graph = ({ toggle }) => {
  const [data, setData] = useState([]);
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
      console.log(rows);
      return rows;
    } catch (error) {
      console.error(error);
    }
  };

  const getStartId = async () => {
    const rows = await parseData();
    const id = rows[rows.length - 2].id;
    localStorage.setItem("startId", id);
    //console.log("startId", localStorage.getItem("startId"));
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
    //console.log("object", startId, endId);
    rows.forEach((row) => {
      var rowId = parseInt(row.id);
      if (rowId >= startId && rowId <= endId) {
        data.push(row.acc_x);
        label.push(row.id);
      }
    });
    setData(data);
    setLabel(label);
  };

//   useEffect(() => {
//     if (toggle === true) {
//       getStartId();
//     } else if (toggle === false) {
//       getData();
//     }
//     // return () => {
//     //   cleanup;
//     // };
//   }, [toggle]);

  /*****************************************/
  const plotData = {
    labels: label,
    datasets: [
      {
        label: "#",
        data: data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  /*****************************************/

  return (
    <div>
      <div>
        <button onClick={getStartId}>start</button>
      </div>
      <div>
        <button onClick={getData}>stop</button>
      </div>
      <Line data={plotData} />
    </div>
  );
};

export default Graph;
