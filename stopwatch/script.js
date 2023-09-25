let isRunning = false;
let startTime;
let interval;
let laps = [];
let lapCounter = 1;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - (laps.reduce((acc, lap) => acc + lap, 0) * 1000);
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    laps = [];
    lapCounter = 1;
    document.getElementById("laps").innerHTML = "";
}

function updateTime() {
    const currentTime = new Date(Date.now() - startTime);
    const minutes = String(currentTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(currentTime.getUTCMilliseconds()).padStart(3, "0").slice(0, 2);
    document.getElementById("display").textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        const currentTime = new Date(Date.now() - startTime);
        const lapTime = currentTime.getUTCSeconds() + currentTime.getUTCMilliseconds() / 1000;
        laps.push(lapTime);
        
        const lapDiv = document.createElement("div");
        const lapCounterSpan = document.createElement("span");
        lapCounterSpan.textContent = `Lap ${lapCounter}:`;
        lapCounterSpan.style.color = 'rgb(0, 255, 123)'; // Green color for lap counter
        lapCounterSpan.style.marginRight = '20px';
        lapDiv.appendChild(lapCounterSpan);
        
        const lapTimeSpan = document.createElement("span");
        lapTimeSpan.textContent = `${lapTime.toFixed(2)}s`;
        lapTimeSpan.style.color = 'white'; // White color for lap time
        lapDiv.appendChild(lapTimeSpan);
        
        document.getElementById("laps").prepend(lapDiv);
        lapCounter++;
    }
}

