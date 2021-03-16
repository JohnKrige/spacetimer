class Timer {
    constructor(type,hours, minutes, seconds, callbacks){
        this.type = type;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;

        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onComplete = callbacks.onComplete;
            this.onTick = callbacks.onTick;
            this.onReset = callbacks.onReset;
            this.timerHTML = callbacks.timerHTML;
        }

        this.totalTime;
        this.timeRemaining;
        this.timeElapsed;
        this.ms;

        this.sound = {}
        this.sound.type = 'sound'
        this.sound.sound = new Audio('../sounds/bigGong.mp3');

        this.setTime();
        this.getHourMinuteAndSecondValues();
    }

    startTimer = () => {
        this.pauseTimer();
        // Logic for when the timer starts (initially or after pausing)
        this.ticking = setInterval(this.ticker, 20);

        if(this.onStart){
            this.onStart();
        }
    }

    pauseTimer = () => {
        // Pauses the timer
        clearInterval(this.ticking);
        this.sound.sound.pause();
    }

    ticker = () => {
        this.timeRemaining = (this.timeRemaining - 0.02).toFixed(2);

        //Sets the values of the hours, minutes and seconds remaining
        this.getHourMinuteAndSecondValues();

        // When time runs out, do these things. For now these are just getting tested. 
        if(this.timeRemaining == 0){
            this.stopTimer();
        } 

        if(this.onTick){
            this.onTick();
        }  
    };

    stopTimer = () => {
        this.pauseTimer();

        if(this.onComplete){
            this.onComplete();
        }

        if (this.sound.type === 'sound'){
            this.sound.sound.play();
        }

    };

    resetTimer = () => {
        this.getHourMinuteAndSecondValues(this.totalTime);
        this.timeRemaining = this.totalTime;
        this.pauseTimer();

        if(this.onReset){
            this.onReset();
        }
    };

    setTime = () => {
            this.totalTime = this.hours * 3600 + this.minutes * 60 + this.seconds;
            this.timeElapsed = 0;
            this.timeRemaining = this.totalTime;
    };

    setTimer = (h,m,s) => {
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
        this.setTime();
        this.getHourMinuteAndSecondValues();
    };

    getHourMinuteAndSecondValues = (val) => {
        let total = val ? val: this.timeRemaining;
        let h = Math.ceil((total - (total % 3600)) / 3600);
        let s = Math.ceil((total - h * 3600) % 60);
        let m = Math.ceil(((total - h * 3600) - s) / 60);
        let ms = (total - h * 3600) % 60;
        ms = ( (1-(s-ms)).toFixed(2).slice(2) );

        if(total > 0){
            this.hours = h;
            this.minutes = m;
            this.seconds = s;
            this.ms = ms;
        } else {
            this.seconds = 0;
            this.ms = 0;
        }
    };
}

