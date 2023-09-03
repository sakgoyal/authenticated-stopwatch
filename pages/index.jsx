import { useEffect, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [logstart, setLogstart] = useState(0);
  const [logend, setLogend] = useState(0);


  async function handleButton(endpoint) {
    try {
      if (!username) {
        console.error('Error: username is required');
        setUserData(null);
        return;
      }
      // fetch data from API endpoint by sending the username and the logstart and logend times in the body
      console.log(username, logstart, logend);
      const response = await fetch(`/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, logstart, logend}), });
      if (response.ok) {
        setUserData(await response.json());
      } else {
        setUserData(null);
        console.error('Error:', await response.json().error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // wait for window to load before running script
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  useEffect(() => {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let timeDiff = 0;
    let appendDays = document.getElementById("days")
    let appendHours = document.getElementById("hours")
    let appendMinutes = document.getElementById("minutes")
    let appendSeconds = document.getElementById("seconds")
    let buttonStartStop = document.getElementById('button-start-stop');
    let buttonReset = document.getElementById('button-reset');
    let Interval; // for setInterval
    let started = false; // for start/stop button
    let startTime; // for start/stop button
    buttonStartStop.onclick = function () {
      clearInterval(Interval);
      if (!started) {
          startTime = new Date();
          setLogstart(startTime);
          console.log("started at: " + startTime);
          Interval = setInterval(function () {
              timeDiff = new Date() - startTime;
              days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
              seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); 

              appendSeconds.innerHTML = zeroPad(seconds, 2);
              appendMinutes.innerHTML = zeroPad(minutes, 2);
              appendHours.innerHTML = zeroPad(hours, 2);
              appendDays.innerHTML = zeroPad(days, 2);
          }, 1000);

          buttonStartStop.innerHTML = "Stop";
      } else {
          buttonStartStop.innerHTML = "Start";
          setLogend(new Date());
          console.log("stopped at: " + new Date());
          console.log("time difference: " + timeDiff/1000 + " seconds");
      }
      started = !started;
  }

  buttonReset.onclick = function () {
      clearInterval(Interval);
      appendSeconds.innerHTML = "00";
      appendMinutes.innerHTML = "00";
      appendHours.innerHTML = "00";
      appendDays.innerHTML = "00";
      buttonStartStop.innerHTML = "Start";
      started = false;
      seconds = 0;
      minutes = 0;
      hours = 0;
      days = 0;
  }
  }, []);

  return (
    <>
      <style jsx global>{`
    body {
      background-color: #3b4149;
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
        Arial, Helvetica, sans-serif, "Lucida Grande";
      height: 100%;
    } 

    .wrapper {
      width: 800px;
      margin: 30px auto;
      color: #febd69;
      text-align: center;
    }

    h1 {
      font-family: "Roboto", sans-serif;
      font-weight: 100;
      font-size: 2.6em;
      color: #febd69;
      text-transform: uppercase;
    }

    #days,
    #hours,
    #minutes,
    #seconds,
    #colon {
      font-size: 2em;
    }

    #colon {
      width: 25px;
      text-align: center;
    }

    button {
      border-radius: 5px;
      background-color: #232f3e;
      color: white;
      border: solid 1px white;
      text-decoration: none;
      cursor: pointer;
      font-size: 1.2em;
      padding: 18px 10px;
      width: 180px;
      margin: 10px;
      outline: none;
    }

    button:hover {
      transition: all 0.5s ease-in-out;
      background-color: white;
      border: solid 1px white;
      color: grey;
    }`}
      </style>
      <div style={{ display: "flex", flexDirection: "column", textAlignLast: "center" }}>
        <h1>User Data Search</h1>
        <div id="userSearch">
        <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => handleButton("getUser")}>Get User Data</button>
        <button onClick={() => handleButton("setUser")}>Set User Data</button>
        {userData && (
          <div> <h2>User Data</h2> <pre>{JSON.stringify(userData, null, 2)}</pre> </div>
        )}
      </div>
      </div>
      <div className="wrapper">
        <h1>JavaScript Stopwatch</h1>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div id="days">00</div> <div id="colon">:</div>
            <div id="hours">00</div> <div id="colon">:</div>
            <div id="minutes">00</div> <div id="colon">:</div>
            <div id="seconds">00</div>
          </div>
          <div>
            <button id="button-start-stop">Start</button>
            <button id="button-reset">Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
