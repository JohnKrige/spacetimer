// Jacking up the timerClass a smidge - adding in this.name
class IntervalFromStart extends Timer{
    constructor(type,mainTime,h,m,s,name,callbacks){
        super(type,h,m,s,callbacks);
        this.name = name;
        this.mainTime = mainTime;

        if(callbacks){
            this.domElements = callbacks.domElements;
            this.onDelete = callbacks.onDelete;
        }

        // Used to store DOM elements.
        this.dom = {}; 

        this.sound.sound = new Audio('../sounds/littleGong.mp3');
    }

    setTime = () => {
        if(this.type === 'start'){
            this.totalTime = this.hours * 3600 + this.minutes * 60 + this.seconds;
            this.timeElapsed = 0;
            this.timeRemaining = this.totalTime;
        } else if (this.type === 'end'){
            if(!this.totalOriginal){
                this.totalOriginal = this.hours * 3600 + this.minutes * 60 + this.seconds;
            };
            this.timeElapsed = 0;
            this.timeRemaining = this.mainTime - this.totalOriginal;
            this.totalTime = this.mainTime - this.totalOriginal;
        }
    };

    deleteInterval(){
        this.dom.interval.remove();
        this.onDelete();
    }

    addListeners(){
        // Delete button
        this.dom.delete.addEventListener('click', ()=> {
            this.deleteInterval();
        });

        this.dom.sound.addEventListener('click', () => {
            if(this.sound.type === 'mute'){
                this.sound.type = 'sound';
                this.dom.sound.innerHTML = '<i class="fas fa-volume-up"></i>';

            } else{
                this.sound.type = 'mute';
                this.dom.sound.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        })
    }
}

// Main time is NOT entered for from start timers. It is the total time of the Main timer
function createStartInterval(type,mainTime,h,m,s,name){
    return new IntervalFromStart(type,mainTime,h,m,s,name,{
        onStart(){
        },
    
        onTick(){
            setTimeOnTick(this.dom.hours,this.dom.minutes,this.dom.seconds,this.hours,this.minutes,this.seconds);

            if(this.type === 'start'){
                let xval = this.timeRemaining/this.totalTime * this.dom.lineBase.getAttribute('x2')
                this.dom.lineTick.setAttribute('x2',xval);
            } else {
                let xval = this.timeRemaining/this.totalTime * this.dom.lineBase.getAttribute('x2')
                this.dom.lineTick.setAttribute('x2',xval);
            }
        },
    
        onComplete(){
            console.log('Done!')
        },
        
        onReset(){
            this.dom.lineTick.setAttribute('x2', this.dom.lineBase.getAttribute('x2'))
            this.dom.hours.innerText = displayNeatTime(this.hours);
            this.dom.minutes.innerText = displayNeatTime(this.minutes);
            this.dom.seconds.innerText = displayNeatTime(this.seconds);
        },
    
        timerHTML(div){
            let newDiv = document.createElement('div')
            newDiv.setAttribute("class",`interval interval${this.name}`)
            newDiv.innerHTML = `
            <div class="intervalTimes">
                <p class="intervalHours intervalFrame">${displayNeatTime(this.hours)} </p>
                <p class="intervalMinutes intervalFrame"> ${displayNeatTime(this.minutes)}</p>
                <p class="intervalSeconds intervalFrame"> ${displayNeatTime(this.seconds)}</p>
            </div>
            <div class="intervalBar">
                <svg class="intervalSVG" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                    <line class="lineBase" x1="0" y1="5" x2="90" y2="5"/>
                    <line class="lineTick" x1="0" y1="5" x2="90" y2="5"/>
                </svg>
            </div>
            <div class="intervalOptions">
                <p class="deleteInterval intervalOption"><i class="fas fa-trash-alt"></i></p>
                <p class="intervalMenu intervalOption"><i class="fas fa-volume-up"></i></p>
            </div>
            `
            div.appendChild(newDiv);
        },

        domElements(){
            const thisInt = document.querySelector(`.interval${this.name}`)
            this.dom.interval = thisInt;
            this.dom.hours = thisInt.querySelector('.intervalHours');
            this.dom.minutes = thisInt.querySelector('.intervalMinutes');
            this.dom.seconds = thisInt.querySelector('.intervalSeconds');
            this.dom.delete = thisInt.querySelector('.deleteInterval');
            this.dom.sound = thisInt.querySelector('.intervalMenu');
            this.dom.lineTick = thisInt.querySelector('.lineTick');
            this.dom.lineTick = thisInt.querySelector('.lineTick');
            this.dom.lineBase = thisInt.querySelector('.lineBase');
        },

        onDelete(){
            intervals = intervals.filter(x => x.name !== this.name);
        },
    });
};



