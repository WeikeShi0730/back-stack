import React, { useState, useEffect } from "react";
import { getDiviceList } from "../../firebase/firebase.utils";
import Loading from "../loading/loading.component";
import Device from "../device/device.component";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const getData = async () => {
      try {
        if (isSubscribed) {
          setLoading(true);
          const deviceList = await getDiviceList();
          setLoading(false);
          setDeviceList(deviceList);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    getData();
    return () => (isSubscribed = false);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
        <div className="flex flex-col">
          <div className="text-center">My devices</div>
          {deviceList.map((device, index) => {
            return (
              <div
                key={index}
                className="bg-slate-100 p-3 my-3 rounded-lg break-all"
              >
                <Device device={device} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DeviceList;
