document.addEventListener("DOMContentLoaded", () => {
    let counterLaps = 0;
    const elementButtonStartStop = document.querySelector("#buttonStartStop");
    const elementButtonReset = document.querySelector("#buttonReset");
    const elementButtonLap = document.querySelector("#buttonLap");
    const elementContainerLaps = document.getElementById("container-laps");
    let timerInterval = null;
    let timerStatus = "STOPPED";
    let elapsedMilliseconds = 0;
    let elapsedSeconds = 0;
    let elapsedMinutes = 0;
    let elapsedHours = 0;
    let elapsedMillisecondsWithLeadingZeroes = `00`;
    let elapsedSecondsWithLeadingZeroes = `00`;
    let elapsedMinutesWithLeadingZeroes = `00`;
    let elapsedHoursWithLeadingZeroes = `00`;
    function activateStopWatch() {
        elapsedMilliseconds++;
        if (elapsedMilliseconds / 100 === 1) {
            elapsedMilliseconds = 0;
            elapsedSeconds++;
            if (elapsedSeconds / 60 === 1) {
                elapsedSeconds = 0;
                elapsedMinutes++;
                if (elapsedMinutes / 60 === 1) {
                    elapsedMinutes = 0;
                    elapsedHours++;
                }
            }
        }
        if (elapsedMilliseconds < 10) {
            elapsedMillisecondsWithLeadingZeroes = `0${elapsedMilliseconds.toString()}`
        } else {
            elapsedMillisecondsWithLeadingZeroes = elapsedMilliseconds;
        }
        if (elapsedSeconds < 10) {
            elapsedSecondsWithLeadingZeroes = `0${elapsedSeconds.toString()}`
        } else {
            elapsedSecondsWithLeadingZeroes = elapsedSeconds;
        }
        if (elapsedMinutes < 10) {
            elapsedMinutesWithLeadingZeroes = `0${elapsedMinutes.toString()}`
        } else {
            elapsedMinutesWithLeadingZeroes = elapsedMinutes;
        }
        if (elapsedHours < 10) {
            elapsedHoursWithLeadingZeroes = `0${elapsedHours.toString()}`
        } else {
            elapsedHoursWithLeadingZeroes = elapsedHours;
        }
        let displayTimer = document.getElementById("timer");
        displayTimer.innerText = `${elapsedHoursWithLeadingZeroes}:${elapsedMinutesWithLeadingZeroes}:${elapsedSecondsWithLeadingZeroes}:${elapsedMillisecondsWithLeadingZeroes}`;
    }
    function _changeTimerButtonState(timerStatus = "STARTED") {
        if (timerStatus === "STOPPED") {
            timerInterval = window.setInterval(activateStopWatch, 10);
            document.getElementById("buttonStartStop").innerHTML = `<i class="fa-solid fa-pause" id="pause"></i>`;
            timerStatus = "STARTED";
        }
        else {
            window.clearInterval(timerInterval);
            document.getElementById("buttonStartStop").innerHTML = `<i class="fa-solid fa-play" id="play"></i>`;
            timerStatus = "STOPPED";
        }
        return timerStatus;
    }
    elementButtonStartStop.addEventListener("click", () => {
        timerStatus = _changeTimerButtonState(timerStatus = timerStatus)
    });
    elementButtonLap.addEventListener("click", () => {
        counterLaps++;
        let newLapNode = document.createElement("div");
        newLapNode.classList.add("new-lap");
        let newlySavedLapTime = document.createElement("li");
        newlySavedLapTime.innerText = `Lap #${counterLaps}: ${elapsedHoursWithLeadingZeroes}:${elapsedMinutesWithLeadingZeroes}:${elapsedSecondsWithLeadingZeroes}:${elapsedMillisecondsWithLeadingZeroes}`;
        newLapNode.appendChild(newlySavedLapTime);
        console.log("Saving new lap time.");
        elementContainerLaps.appendChild(newLapNode);
    });
    elementButtonReset.addEventListener("click", () => {
        elapsedMilliseconds = 0;
        elapsedSeconds = 0;
        elapsedMinutes = 0;
        elapsedHours = 0;
        elapsedMillisecondsWithLeadingZeroes = `00`;
        elapsedSecondsWithLeadingZeroes = `00`;
        elapsedMinutesWithLeadingZeroes = `00`;
        elapsedHoursWithLeadingZeroes = `00`;
        document.getElementById("timer").innerHTML = "00:00:00:00";
        timerStatus = _changeTimerButtonState();
        while (elementContainerLaps.firstChild) {
            elementContainerLaps.removeChild(elementContainerLaps.firstChild);
        }
        counterLaps = 0;
    });
});