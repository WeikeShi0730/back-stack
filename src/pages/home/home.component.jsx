import React from "react";

const Home = () => {
  return (
    <div className="m-24 p-16 flex flex-col flex-grow font-light">
      <p>
        <div className="text-7xl">Back Stack:</div>
        <br /> Tracker of{" "}
        <span className="underline text-xl">spine alignment</span>, focusing on
        rehabilitating stroke vicims.
      </p>
      <br />
      <p>
        Losing track of your position? There is something you can do about it.
      </p>
      <br />
      <br />
      <br />
      <br />
      <p>
        Back Stack works in <span className="underline text-xl">3</span> easy
        steps:
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
      </p>
    </div>
  );
};
export default Home;
