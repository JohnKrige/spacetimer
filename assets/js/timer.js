//Timer DOM objects
const timerHours = document.querySelector('.hours');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const startButton = document.querySelector('.startButton');
const pauseButton = document.querySelector('.pauseButton');
const resetButton = document.querySelector('.resetButton');
const timerMs = document.querySelector('.ms');

// Instantiate the main timer of the app
let timerSound = new Audio('../sounds/bigGong.mp3')

const timer = new Timer('start',0,0,0,{
    onStart(){
    },

    onTick(){
        setTimeOnTick(timerHours,timerMinutes,timerSeconds,timer.hours,timer.minutes,timer.seconds);
        timerMs.innerText = displayNeatTime(timer.ms);
    },

    onComplete(){

        // Repeaters are stopeed and resetted
        repeaters.forEach((rep) => {
            rep.resetTimer();
        });
    },
    
    onReset(){
        timerHours.innerText = timer.hours;
        timerMinutes.innerText = timer.minutes;
        timerSeconds.innerText = timer.seconds;
        timerMs.innerText = "00"

        repeaters.forEach((rep) => {
            rep.resetTimer();
        });
    },
});

















