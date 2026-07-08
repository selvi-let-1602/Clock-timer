// ==========================================
// 1. DIGITAL CLOCK LOGIC
// ==========================================
function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, make it 12

    // Add leading zeros to numbers less than 10 (e.g., "5" becomes "05")
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Display the time
    document.getElementById('digital-clock').innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
}

// Run the clock immediately, then update it every 1 second (1000 milliseconds)
updateClock();
setInterval(updateClock, 1000);


// ==========================================
// 2. COUNTDOWN TIMER LOGIC
// ==========================================
let countdownInterval;
let totalSecondsRemaining = 0;

const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes-input');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerDisplay() {
    let minutes = Math.floor(totalSecondsRemaining / 60);
    let seconds = totalSecondsRemaining % 60;

    // Add leading zeros
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerDisplay.innerText = `${minutes}:${seconds}`;
}

startBtn.addEventListener('click', () => {
    // If a timer is already running, clear it first
    clearInterval(countdownInterval);

    // Get minutes from input, if empty or invalid default to 5 minutes
    const inputMinutes = parseInt(minutesInput.value);
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        alert("Please enter a valid number of minutes!");
        return;
    }

    // Convert minutes to total seconds
    totalSecondsRemaining = inputMinutes * 60;
    updateTimerDisplay();

    // Start the interval to count down every second
    countdownInterval = setInterval(() => {
        totalSecondsRemaining--;
        updateTimerDisplay();

        // When the timer hits zero
        if (totalSecondsRemaining <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.innerText = "Time's Up!";
            alert("Beep Beep! Timer finished.");
        }
    }, 1000);
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    totalSecondsRemaining = 0;
    timerDisplay.innerText = "00:00";
    minutesInput.value = "";
});
