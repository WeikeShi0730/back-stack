import React, { useState } from "react";
import { addDevice } from "../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";
import Loading from "../loading/loading.component";

const DeviceConnectionForm = () => {
  const history = useHistory();
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSerialNumber(() => value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await addDevice(serialNumber);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 mb-4 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
        <div className="text-center m-5">Connect my device</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base">Serial number</label>
            <input
              required
              autoComplete="off"
              name="serialNumber"
              type="text"
              className="w-full p-2 text-xs md:text-md text-primary border rounded-md outline-none transition duration-150 ease-in-out mb-4"
              id="serialNumber"
              placeholder="Serial number..."
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none font-light"
            >
              Connect
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeviceConnectionForm;
