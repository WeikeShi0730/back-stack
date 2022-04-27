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
          setDeviceList(deviceList);
          setLoading(false);
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
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-4 sm:py-8 px-5 sm:px-10 text-sm md:text-base lg:text-lg">
        <div className="flex flex-col">
          <div className="text-center">My devices</div>
          {deviceList.map((device, index) => {
            return (
              <div
                key={index}
                className="bg-slate-100 my-3 rounded-lg break-all "
              >
                <Device device={device} setDeviceList={setDeviceList} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DeviceList;
