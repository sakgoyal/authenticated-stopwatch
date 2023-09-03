import UserSearch from './UserSearch';

export default function Home() {
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
        <UserSearch />
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
