This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- - - -

## BackStack
- - - -

### Health tracking app

The purpose of the app is to track and monitor users' real-time sitting posture and provide visualized feedback to help users with better sitting positions.

Users are to register an account and also link the BackStack device with a serial number provided. Users are to wear a device, programmed by Arduino Nano to detect current lateral and medial angles of the users' back. Those angles are also stored in the Firebase database for a detailed and visualized graphing purpose. The graph could show both angles for each minute for a selected period of time of a day, and users can also select multiple days to compare to see if progress has been made.
This tracking device is created and developed for people who spend hours working seated. It monitors slouching, provides real-time position angels, warns of bad postures, generates daily usage reports, and compares behaviors between days. It helps reduce spine pain.
- - - -

### Technology
- - - -

#### Hardware

* Arduino Nano

#### Software / Web application

* React.js
* Tailwind CSS
* Firebase
* Recharts
- - - -

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
