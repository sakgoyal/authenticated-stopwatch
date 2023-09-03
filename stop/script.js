window.onload = function () {
    // https://www.tutorjoes.in/JS_tutorial/stop_clock_in_js
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    let days = hours = minutes = seconds = timeDiff = 0;
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
            console.log("days: " + days + " hours: " + hours + " minutes: " + minutes + " seconds: " + seconds + " timeDiff ms: " + timeDiff);
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
}