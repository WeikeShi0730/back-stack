import { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import {
  subscribeToFirestore,
  subscribeToAuthState,
  auth,
} from "../../firebase/firebase.utils";

const MeasureGraph = () => {
  const [lateralAngle, setLateralAngle] = useState(0.5);
  const [medialAngle, setMedialAngle] = useState(0.5);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    const unsubscribe = currentUser
      ? subscribeToFirestore(currentUser.uid, (snapshot) => {
          const { dataArray } = snapshot.data();
          const lastDataPoint = dataArray.pop();
          const { Ax, Ay } = lastDataPoint;
          setLateralAngle(Ax);
          setMedialAngle(Ay);
        })
      : () => {};
    return () => unsubscribe();
  });

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center relative w-3/4 m-10">
        <div>Lateral angle</div>
        <ReactSpeedometer
          width={400}
          ringWidth={50}
          maxValue={1}
          value={lateralAngle}
          currentValueText={`${lateralAngle}`}
          needleHeightRatio={0.7}
          needleTransitionDuration={500}
          segments={7}
          valueTextFontWeight={"300"}
          textColor={"black"}
          labelFontSize={"12px"}
          segmentColors={[
            "#bf616a",
            "#d08770",
            "#ebcb8b",
            "#a3be8c",
            "#ebcb8b",
            "#d08770",
            "#bf616a",
          ]}
          customSegmentStops={[0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1]}
          customSegmentLabels={[
            {
              text: "Left",
              position: "INSIDE",
              color: "#d8dee9",
            },
            {},
            {},
            {
              text: "Center",
              position: "INSIDE",
              color: "#d8dee9",
            },
            {},
            {},
            {
              text: "Right",
              position: "INSIDE",
              color: "#d8dee9",
            },
          ]}
        />
      </div>
      <div className="flex flex-col justify-center items-center relative w-3/4 m-10">
        <div>Medial angle</div>
        <ReactSpeedometer
          width={400}
          maxValue={1}
          value={medialAngle}
          currentValueText={`${medialAngle}`}
          needleHeightRatio={0.7}
          needleTransitionDuration={500}
          segments={7}
          ringWidth={47}
          valueTextFontWeight={"300"}
          textColor={"black"}
          segmentColors={[
            "#bf616a",
            "#d08770",
            "#ebcb8b",
            "#a3be8c",
            "#ebcb8b",
            "#d08770",
            "#bf616a",
          ]}
          customSegmentStops={[0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1]}
          customSegmentLabels={[
            {
              text: "Back",
              position: "INSIDE",
              color: "#d8dee9",
            },
            {},
            {},
            {
              text: "Center",
              position: "INSIDE",
              color: "#d8dee9",
            },
            {},
            {},
            {
              text: "Front",
              position: "INSIDE",
              color: "#d8dee9",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MeasureGraph;
