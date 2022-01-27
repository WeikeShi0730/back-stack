import React from "react";

const Home = () => {
  return (
    <div className="m-24 p-16 flex flex-col flex-grow font-light">
      <div>
        <p className="text-7xl">Back Stack</p>
        <br /> Tracker of{" "}
        <span className="underline decoration-green-700 underline-offset-1 text-2xl">
          spine alignment
        </span>
        , focusing on rehabilitating stroke vicims.
      </div>
      <br />
      <div>
        <p>
          Losing track of your position? There is something you can do about it.
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <p>
          Back Stack works in{" "}
          <span className="underline decoration-green-700 underline-offset-1 text-2xl">
            3
          </span>{" "}
          easy steps:
        </p>
        <ul>
          <br />
          <li>1. Place Stack on your back.</li>
          <br />
          <li>
            2. Get real-time feedback for instant correction and track your
            progress via the mobile app.
          </li>
          <br />
          <li>3. Get your personal analysis and progress report.</li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
