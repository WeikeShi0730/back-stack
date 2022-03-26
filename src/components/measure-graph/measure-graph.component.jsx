import { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import {
  subscribeToAuthState,
  subscribeToDb,
  auth,
  getDiviceList,
} from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";

const MeasureGraph = () => {
  const [lateralAngle, setLateralAngle] = useState(0);
  const [medialAngle, setMedialAngle] = useState(0);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    let isSubscribed = true;
    const getData = async () => {
      try {
        setLoading(true);
        const deviceList = await getDiviceList();
        setLoading(false);
        if (isSubscribed) {
          setDeviceList(deviceList);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    if (currentUser) {
      getData();
    }
    return () => {
      isSubscribed = false;
    };
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe =
      currentUser && deviceList.length > 0
        ? subscribeToDb(deviceList[0], (snapshot) => {
            const dataObjects = snapshot.val();
            if (dataObjects) {
              let { kalmanAngleX, kalmanAngleY } = dataObjects;
              kalmanAngleX = Math.min(Math.max(kalmanAngleX, -30), 30);
              kalmanAngleY = Math.min(Math.max(kalmanAngleY, -30), 30);
              setLateralAngle(kalmanAngleY);
              setMedialAngle(kalmanAngleX);
            }
          })
        : () => {};
    return () => unsubscribe();
  });

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="flex flex-col justify-center items-center relative w-3/4 m-10">
          <div>Medial angle</div>
          <ReactSpeedometer
            width={400}
            ringWidth={50}
            maxValue={1}
            value={(medialAngle + 30) / 60}
            currentValueText={`${medialAngle.toFixed(0)}°`}
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
            customSegmentStops={[
              0,
              1 / 7,
              2 / 7,
              3 / 7,
              4 / 7,
              5 / 7,
              6 / 7,
              1,
            ]}
            customSegmentLabels={[
              {
                text: "Front",
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
                text: "Back",
                position: "INSIDE",
                color: "#d8dee9",
              },
            ]}
          />
        </div>
        <div className="flex flex-col justify-center items-center relative w-3/4 m-10">
          <div>Lateral angle</div>
          <ReactSpeedometer
            width={400}
            maxValue={1}
            value={(lateralAngle + 30) / 60}
            currentValueText={`${lateralAngle.toFixed(0)}°`}
            needleHeightRatio={0.7}
            needleTransitionDuration={500}
            segments={7}
            ringWidth={47}
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
            customSegmentStops={[
              0,
              1 / 7,
              2 / 7,
              3 / 7,
              4 / 7,
              5 / 7,
              6 / 7,
              1,
            ]}
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
      </div>
    </>
  );
};

export default MeasureGraph;
