import { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const MeasureGraph = () => {
  const [lateralAngle, setLateralAngle] = useState(0.5);
  const [medialAngle, setMedialAngle] = useState(0.5);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLateralAngle(parseFloat((Math.random() * 0.2 + 0.4).toFixed(2)));
      setMedialAngle(parseFloat((Math.random() * 0.2 + 0.4).toFixed(2)));
    }, 250);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center relative w-3/4 m-10">
        <div>Lateral angle</div>
        <ReactSpeedometer
          height={200}
          maxValue={1}
          value={lateralAngle}
          currentValueText={`${lateralAngle}`}
          needleHeightRatio={0.7}
          needleTransitionDuration={500}
          segments={7}
          ringWidth={47}
          segmentColors={[
            "#bf616a",
            "#d08770",
            "#ebcb8b",
            "#a3be8c",
            "#ebcb8b",
            "#d08770",
            "#bf616a",
          ]}
        />
      </div>
      <div className="flex flex-col justify-center items-center relative w-3/4 m-10">
        <div>Medial angle</div>
        <ReactSpeedometer
          height={200}
          maxValue={1}
          value={medialAngle}
          currentValueText={`${medialAngle}`}
          needleHeightRatio={0.7}
          needleTransitionDuration={500}
          segments={7}
          ringWidth={47}
          segmentColors={[
            "#bf616a",
            "#d08770",
            "#ebcb8b",
            "#a3be8c",
            "#ebcb8b",
            "#d08770",
            "#bf616a",
          ]}
        />
      </div>
    </div>
  );
};

export default MeasureGraph;
