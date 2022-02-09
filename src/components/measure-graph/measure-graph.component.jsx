import { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
// import { Gauge } from "reaviz";

const MeasureGraph = () => {
  const [angle, setAngle] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setAngle(Math.random() * 0.2 + 0.4);
    }, 200);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-3/4 m-10">
        <GaugeChart
          hideText={true}
          animDelay={0}
          animateDuration={1000}
          colors={["red", "green", "red"]}
          nrOfLevels={3}
          percent={angle}
        />
      </div>
      <div className="relative w-3/4 m-10"></div>
    </div>
  );
};

export default MeasureGraph;
