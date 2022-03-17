import React, { useState, useEffect } from "react";
import { getDiviceList } from "../../firebase/firebase.utils";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    const getData = async () => {
      const deviceList = await getDiviceList();
      console.log(deviceList);
      if (isSubscribed) {
        setDeviceList(deviceList);
      }
    };
    getData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="w-80 m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
      <div className="flex flex-col">
        <div className="">My devices</div>
        {deviceList.map((device, index) => {
          return (
            <div key={index} className="bg-slate-100 p-3 my-3 rounded-lg">
              {device}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceList;
