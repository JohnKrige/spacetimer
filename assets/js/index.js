// Timer main DOM Objects
const setTimer = document.querySelector('.setTimer');

// Timer DOM objects
const muteTimer = document.querySelector('.settings');

//Interval (from start) DOM objects
const intervalDiv = document.querySelector('.intervalsDiv');
const fromEndDiv = document.querySelector('.intervalsFromEnd');
const addFromStart = document.querySelector('.addFromStart');
const addFromEnd = document.querySelector('.addFromEnd');
const addButton = document.querySelectorAll('.addButton');
const addRepeater = document.querySelector('.addRepeater');
const newInterval = document.querySelector('.new-interval-button');
const intervalMenu = document.querySelector('.interval-menu');
const closeNewTimer = document.querySelector('.new-interval-close');
const newIntervalDiv = document.querySelector('.new-interval');
const repeaterDiv = document.querySelector('.repeaters');

//Interval (from end) DOM objects

// Modal DOM objects
const timerModalHoursInput = document.querySelector('#timer-modal-hours-input');
const timerModalMinutesInput = document.querySelector('#timer-modal-minutes-input');
const timerModalSecondsInput = document.querySelector('#timer-modal-seconds-input');
const timerModal = document.querySelector('.timer-modal');
const timerModalErrorMessage = document.querySelector('#timer-modal-error-message');
const closeTimer = document.querySelector('.timer-modal-close');
const setTimerButton = document.querySelector('.timer-modal-submit');
const timerModalTitle = document.querySelector('.timer-modal-title');

const messageModal = document.querySelector('.messageModal');
const messageModalBody = document.querySelector('.messageModalBody');
const messageModalTitle = document.querySelector('.messageModalTitle');
const messageModalClose = document.querySelector('.messageModalClose');
const messageModalOptions = document.querySelector('.messageModalOptions');
let setTimerFromModal; // This is going to be set in a function if triggered

// styling svg for large screens

//====================================================================================================================================================================================================================

// Event listeners

//====================================================================================================================================================================================================================
// Timer - main
startButton.addEventListener('click', () => {
    timer.startTimer();

    intervals.forEach((int) => {
        int.startTimer();
    });

    repeaters.forEach((rep) => {
        rep.startTimer();
    });
});

pauseButton.addEventListener('click', ()=> {
    timer.pauseTimer();

    intervals.forEach((int) => {
        int.pauseTimer();
    });

    repeaters.forEach((rep) => {
        rep.pauseTimer();
    });
});

resetButton.addEventListener('click', () => {
    timer.resetTimer();
    setTimeOnTick(timerHours,timerMinutes,timerSeconds,timer.hours,timer.minutes,timer.seconds);

    intervals.forEach((int) => {
        int.resetTimer();
    })
});

muteTimer.addEventListener('click', () => {
    toggleSound();
});

function toggleSound(){
    if(muteTimer.innerHTML === '<i class="fas fa-volume-mute"></i>'){
        muteTimer.innerHTML = '<i class="fas fa-volume-up"></i>'
        timer.sound.type = 'sound'
    } else {
        muteTimer.innerHTML = '<i class="fas fa-volume-mute"></i>'
        timer.sound.type = 'mute'
    }
}

// The modal forms are used for the main timer and intervals
let formType = {};


// Timer Event Listeners
//====================================================================================================================================================================================================================
// Add interval
newInterval.addEventListener('click', () => {
    if(timer.totalTime <= 0){
        displayModalMessage('Adding Intervals','Intervals can only be added once the main timer is set');
        // Adding option to set the main timer from 
        const par = document.createElement('p');
        par.setAttribute('class','setTimerFromModal');
        par.innerText = 'Set Timer'
        messageModalOptions.appendChild(par);
        setTimerFromModal = document.querySelector('.setTimerFromModal');

    } else {
        toggleIntervalMenu();
    }
});

// add interval button listeners
addButton.forEach(button => {
    button.addEventListener('mouseout', () => {
            intervalMenu.style.display = 'none';
    });
    
    button.addEventListener('mouseover', () => {
        intervalMenu.style.display = 'inline-block';
    });
});

function displayModalMessage(title, message){
    messageModal.style.display = 'flex';
    messageModalBody.innerText = message;
    messageModalTitle.innerText = title;
    messageModal.scrollIntoView();
}

function toggleIntervalMenu(){
    if(intervalMenu.style.display !== 'inline-block'){
        intervalMenu.style.display = 'inline-block';
        intervalMenu.scrollIntoView();
    } else {        
        intervalMenu.style.display = 'none';
    }
}

// From start Event Listener
addFromStart.addEventListener('click', () => {
    timerModalTitle.innerText = 'Add Interval';
    formType.name = 'fromStart';
    intervalClick();
});

addFromEnd.addEventListener('click', () => {
    timerModalTitle.innerText = 'Add Interval';
    formType.name = 'fromEnd';
    intervalClick();
})

addRepeater.addEventListener('click', () => {
    numRepeaters = countRepeaters();
    if(numRepeaters >= 2){
        displayModalMessage('Recurring Timers', 'Maximum of 2 reached');
        return;
    } else {
        formType.name = 'repeater';
        intervalClick();
        timerModalTitle.innerText = 'Recurring Interval';
    }
});

function intervalClick(){
    timerModalHoursInput.value = 0;
    timerModalMinutesInput.value = 0;
    timerModalSecondsInput.value = 0;

    toggleIntervalMenu();
    timerModal.style.display = 'flex';
    timerModal.scrollIntoView();
}

// Set timer listeners - used by all timer types to set times/ create timers
setTimer.addEventListener('click', () => {
    setMainTimer();
});

messageModalOptions.addEventListener('click', () => {
    setTimerFromModal.remove();
    setMainTimer();
    hideModalMessage();
});

function setMainTimer(){

    timer.pauseTimer();
    
    formType.name = 'timer';
    // This just sets the form's times to that of the timer's orginal inputs, otherwise it defaults to zeros if it's a new timer
    timerModalHoursInput.value = formType.h ? formType.h : 0;
    timerModalMinutesInput.value = formType.m ? formType.m : 0;
    timerModalSecondsInput.value = formType.s ? formType.s : 0;

    if(intervals.length > 0){
        timerModalErrorMessage.innerText = "Heads up, intervals longer than the time entered will be deleted"
        timerModalErrorMessage.style.display = 'block';
    };

    timerModalTitle.innerText = 'Set Timer';


    timerModal.style.display = 'flex';
};

closeTimer.addEventListener('click', ()=> {
    timerModalErrorMessage.innerText = '';
    timerModalErrorMessage.style.display = 'none';
    timerModal.style.display = 'none';
    timerModalTitle.innerText = '';
});

messageModalClose.addEventListener('click', () => {
    setTimerFromModal.remove();
    hideModalMessage();
});

function hideModalMessage(){
    messageModalBody.innerText = '';
    messageModalTitle.innerText = '';
    messageModal.style.display = 'none';
}

// a list of current intervals 
let intervals = [];
let repeaters = [];
let intervalCounter = 1; 
let repeaterCounter = 1;

setTimerButton.addEventListener('click', () => {
    // timerModalTitle.innerText = '';

    // Validation check of inputs
    var reg = /^\d+$/;
    if(timerModalHoursInput.value.match(reg) && timerModalMinutesInput.value.match(reg) && timerModalSecondsInput.value.match(reg) ){
        let h = parseInt(timerModalHoursInput.value) ? parseInt(timerModalHoursInput.value) : 0; 
        let m =  parseInt(timerModalMinutesInput.value) ? parseInt(timerModalMinutesInput.value) : 0;
        let s = parseInt(timerModalSecondsInput.value) ? parseInt(timerModalSecondsInput.value) : 0;

        // This is to ensure that intervals etc are shorter than the main timer
        inputTotal = h * 3600 + m * 60 + s;

        if(h > 24){
            timerModalErrorMessage.innerText = "A maximum of 24 hours can be entered";
            timerModalErrorMessage.style.display = 'block';
            return;
        } 
        
        if(m > 999){
            timerModalErrorMessage.innerText = "A maximum of 999 minutes can be entered";
            timerModalErrorMessage.style.display = 'block';
            return;
        }
        if(s > 999){
            timerModalErrorMessage.innerText = "A maximum of 999 seconds can be entered";
            timerModalErrorMessage.style.display = 'block';
            return;
        }

        if(formType.name != 'timer' && inputTotal < timer.totalTime){
            if(formType.name === 'fromStart'){
                intervals[intervalCounter] = createStartInterval('start',timer.totalTime,0,0,0,intervalCounter);
                intervals[intervalCounter].setTimer(h,m,s);
                intervals[intervalCounter].timerHTML(intervalDiv);
                intervals[intervalCounter].domElements();
                intervals[intervalCounter].addListeners();
                intervalCounter += 1;
            } 
            else if(formType.name === 'fromEnd'){
                intervals[intervalCounter] = createStartInterval('end',timer.totalTime,0,0,0,intervalCounter,timer.totalTime);
                intervals[intervalCounter].setTimer(h,m,s)
                intervals[intervalCounter].timerHTML(intervalDiv);
                intervals[intervalCounter].domElements();
                intervals[intervalCounter].addListeners();
                intervalCounter += 1;
            }   
            else if(formType.name === 'repeater'){
                    repeaters[repeaterCounter] = createRepeater('repeater',0,0,0,repeaterCounter);
                    repeaters[repeaterCounter].setTimer(h,m,s)
                    repeaters[repeaterCounter].timerHTML(repeaterDiv);
                    repeaters[repeaterCounter].domElements();
                    repeaters[repeaterCounter].addListeners();
                    repeaterCounter += 1;
            }

            else {
                console.log('No form type selected error');
            };

        } 
        else if (formType.name === 'timer'){
            timer.setTimer(h,m,s);
            setTimeOnTick(timerHours,timerMinutes,timerSeconds,timer.hours,timer.minutes,timer.seconds);
            formType.h = h;
            formType.m = m;
            formType.s = s;

            timerMs.innerText = "00"

            // 'from end' timers are adjusted to the new final time
            adjustTimers();

            repeaters.forEach((rep) => {
                rep.resetTimer();
            });
        } 
        else {
            timerModalErrorMessage.innerText = "Interval lengths cannot exceed or equal main timer length"
            timerModalErrorMessage.style.display = 'block';
            return;
        }

        timerModalErrorMessage.style.display = 'none';
        timerModal.style.display = 'none';
        
    } else{
        timerModalErrorMessage.innerText = "Inputs must be numbers"
        timerModalErrorMessage.style.display = 'block';
    };
});

const countRepeaters = () => {
    let numRepeaters = repeaters.filter( rep => rep instanceof Repeater);
    return numRepeaters.length;
};

const adjustTimers = () => {
    intervals.forEach( (int) => {
        if(int.type === 'end'){
            // if the interval time is more than the timer, delete the timer
            if(int.totalOriginal >= timer.totalTime){
                int.deleteInterval();
            } else{
                int.mainTime = timer.totalTime;
                let newTotal = timer.totalTime - int.totalOriginal;
                int.getHourMinuteAndSecondValues(newTotal);
                int.setTime();
                int.dom.hours.innerText = displayNeatTime(int.hours);
                int.dom.minutes.innerText = displayNeatTime(int.minutes);
                int.dom.seconds.innerText = displayNeatTime(int.seconds);
            }
        }
        else{
            if(int.totalTime >= timer.totalTime){
                int.deleteInterval();
            }
        }
    });
};

const help = document.querySelector('.help-button');
const timerRight = document.querySelector('.timer-right');
const timerLeft = document.querySelector('.timer-left');
const timerMid = document.querySelector('.timer-mid');
help.addEventListener('click', () => {
    timerRight.classList.toggle('invisible');
    timerLeft.classList.toggle('invisible');
    timerMid.classList.toggle('invisible');
    toggleHelpButtonInnerText();
});


const toggleHelpButtonInnerText = () => {
    const btn = document.querySelector('.help-button');
    if (btn.innerText === 'Instructions') {
        btn.innerText = 'Back';
    } else {
        btn.innerText = 'Instructions';
    }
};  