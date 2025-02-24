// Scores
let score1 = 0;
let score2 = 0;

document.getElementById('score-1').textContent = score1;
document.getElementById('score-2').textContent = score2;

// Period
let timeLeft = 600;
let timerInterval;
let period = 0;

// Shot timer
let shotTime = 24;
let shotTimerInterval;

// Foul Count
let foulCount1 = 0;
let foulCount2 = 0;

// Track whether the timer is running
let isTimerRunning = true;

function hAddfoul1(score) {
    if (foulCount1 < 99) {
        foulCount1 += 1;
        document.getElementById('home-fouls-text').textContent = foulCount1;
    }
}

function hAddfoul2(score) {
    if (foulCount2 < 99) {
        foulCount2 += 1;
        document.getElementById('away-fouls-text').textContent = foulCount2;
    }
}

// Shot Clock
function startShotClock() {
    clearInterval(shotTimerInterval); // Clear any existing timer

    shotTime = 24; // Reset to 24 seconds
    updateShotClockDisplay(); // Update UI immediately

    shotTimerInterval = setInterval(() => {
        if (shotTime > 0) {
            shotTime--;
            updateShotClockDisplay();
            if (shotTime <= 24 && shotTime > 2) {
                const shotscore = document.getElementById('shot-timer');
                shotscore.style.color = '#f94f6d';
            }
            else if (shotTime <= 2 && shotTime > 1) {
                const shotscore = document.getElementById('shot-timer');
                shotscore.style.color = 'orange';
            }
            else if (shotTime <= 1 && shotTime > 0) {
                const shotscore = document.getElementById('shot-timer');
                shotscore.style.color = 'white';
            }
            else if (shotTime <= 0) {
                const shotscore = document.getElementById('shot-timer');
                shotscore.style.color = '#f94f6d';
            }
        }
        else {
            startShotClock();
        }
    }, 1000);
}

// Function to format and update the shot clock display
function updateShotClockDisplay() {
    let seconds = shotTime;
    let formattedTime = `${seconds < 10 ? '0' : ''}${seconds}`;

    document.getElementById('shot-timer').textContent = formattedTime;
}

// Period timer
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer

    timeLeft = 600; // Reset to 10 minutes
    updateTimerDisplay(); // Update UI immediately

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            if (period < 2) {
                addPeriod(); // Move to the next period
                startTimer(); // Restart for the second period
            }
        }
    }, 1000);
}

// Function to format and update the timer display
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.getElementById('time-text').textContent = formattedTime;
}


// Winning Score Colour
function updateScoreColor() {
    const homeScore = document.getElementById('score-1');
    const guestScore = document.getElementById('score-2');

    if (score1 > score2) {
        homeScore.style.color = 'green';
        guestScore.style.color = '#f94f6d'; // Reset to default
    } else if (score2 > score1) {
        guestScore.style.color = 'green';
        homeScore.style.color = '#f94f6d'; // Reset to default
    } else {
        // If tied, reset both to default
        homeScore.style.color = '#f94f6d';
        guestScore.style.color = '#f94f6d';
    }
}

// Period Function
function resetPeriod() {
    period = 1;
    document.getElementById('period-text').textContent = period;
}

function addPeriod() {
    period += 1;
    document.getElementById('period-text').textContent = period;
}

// New Game Function
function newGame() {
    score1 = 0;
    score2 = 0;
    document.getElementById('score-1').textContent = score1;
    document.getElementById('score-2').textContent = score2;
    foulCount1 = 0;
    foulCount2 = 0;
    document.getElementById('home-fouls-text').textContent = foulCount1;
    document.getElementById('away-fouls-text').textContent = foulCount2;
    updateScoreColor();
    if (period != 0) {
        resetPeriod();
    } else if (period == 0) {
        addPeriod();
    }

    startTimer();
    startShotClock();

    const stopText = document.getElementById("stop-text");
    stopText.textContent = "STOP";
}

//Stop Timer Function
function stopButton() {
    const stopText = document.getElementById("stop-text");

    if (isTimerRunning) {
        // Pause the timers
        clearInterval(timerInterval);
        clearInterval(shotTimerInterval);
        stopText.textContent = "START"; // Change button text
    } else {
        // Resume the timers from the current state
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                if (period < 2) {
                    addPeriod(); // Move to the next period
                    startTimer(); // Restart for the second period
                }
            }
        }, 1000);

        shotTimerInterval = setInterval(() => {
            if (shotTime > 0) {
                shotTime--;
                updateShotClockDisplay();
            } else {
                startShotClock();
            }
        }, 1000);

        stopText.textContent = "STOP"; // Change button text back
    }

    isTimerRunning = !isTimerRunning; // Toggle state
}

// Score Button's
let scoreBtn1 = "+1"
let scoreBtn2 = "+2"
let scoreBtn3 = "+3"

// Button Functions
document.getElementById('h-btn-1').textContent = scoreBtn1;
document.getElementById('h-btn-2').textContent = scoreBtn2;
document.getElementById('h-btn-3').textContent = scoreBtn3;

document.getElementById('g-btn-1').textContent = scoreBtn1;
document.getElementById('g-btn-2').textContent = scoreBtn2;
document.getElementById('g-btn-3').textContent = scoreBtn3;


function hAddScore1(score) {

        if (score1 < 99) {
            score1 += 1;
            document.getElementById('score-1').textContent = score1;
            updateScoreColor();
            startShotClock();
        }
}

function hAddScore2(score) {
    if (score1 < 99) {
        score1 += 2;
        document.getElementById('score-1').textContent = score1;
        updateScoreColor();
        startShotClock();
    }
}

function hAddScore3(score) {
    if (score1 < 99) {
        score1 += 3;
        document.getElementById('score-1').textContent = score1;
        updateScoreColor();
        startShotClock();
    }
}

function gAddScore1(score) {
    if (score2 < 99) {
        score2 += 1;
        document.getElementById('score-2').textContent = score2;
        updateScoreColor();
        startShotClock();
    }
}

function gAddScore2(score) {
    if (score2 < 99) {
        score2 += 2;
        document.getElementById('score-2').textContent = score2;
        updateScoreColor();
        startShotClock();
    }
}

function gAddScore3(score) {
    if (score2 < 99) {
        score2 += 3;
        document.getElementById('score-2').textContent = score2;
        updateScoreColor();
        startShotClock();
    }
}
