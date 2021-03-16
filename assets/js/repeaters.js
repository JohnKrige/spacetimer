class Repeater extends Timer{
    constructor(type,h,m,s,name,callbacks){
        super(type,h,m,s,callbacks);
        this.name = name;

        if(callbacks){
            this.domElements = callbacks.domElements;
            this.onDelete = callbacks.onDelete;
        }

        // Used to store DOM elements.
        this.dom = {}; 

        this.sound.sound = new Audio(`../sounds/ping${name}.mp3`);
    }

    ticker = () => {
        this.timeElapsed = Math.round((this.timeElapsed - 0.02) * 100) /100;

        if(this.timeElapsed % this.totalTime == 0 && this.timeElapsed < -0.02){
            this.onComplete();
        }
    };

    deleteInterval(){
        this.dom.repeater.remove();
        this.onDelete();
    }

    addListeners(){
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

    resetTimer = () => {
        this.pauseTimer();
        this.timeElapsed = 0;
    };
}

function createRepeater(type,h,m,s,name){
    return new Repeater(type,h,m,s,name,{
        onStart(){
        },
    
        onTick(){},
    
        onComplete(){
            try {
                this.dom.animation.beginElement();
            } catch (err){
                console.log(err);
            }
            

            if (this.sound.type === 'sound'){
                this.sound.sound.play();
            }
        },
        
        onReset(){},
    
        timerHTML(div){
            let newDiv = document.createElement('div')
            newDiv.setAttribute("class",`repeater${this.name}`)
            newDiv.innerHTML = `
                <div class="repeater">
                    <div class="repeater-leftside"> 
                        <div class="repeater-info">
                            <p class="repeater-display repeater-display-title">Repeats</p>
                            <p class="repeater-display repeater-display-time">
                                <span>${this.hours}h</span> 
                                <span>${this.minutes}m</span>
                                <span>${this.seconds}s</span>
                            </p>
                        </div>
                        <div class="repeater-blinker">
                            <svg width="40" height="40">
                                <circle id="animation${this.name}" r="8" cx="20" cy="20" fill="rgba(209, 15, 15, 0.5)" stroke="rgba(0,0,0,0.5)" />
                                
                                <animate 
                                        xlink:href="#animation${this.name}"
                                        attributeName="fill"
                                        values="rgba(209, 15, 15, 0.3);rgb(209, 15, 15);rgba(209, 15, 15, 0.3)"
                                        dur="0.4s"
                                        begin="indefinite"
                                        fill="freeze" />
                            </svg>
                        </div>
                    </div>
                    <div class="repeater-buttons">
                            <p class="repeater-icon repeater-delete"><i class="fas fa-trash-alt"></i></p>
                            <p class="repeater-icon repeater-volume"><i class="fas fa-volume-up"></i></p>
                    </div>
                </div>
            `
            div.appendChild(newDiv);
        },

        domElements(){
            const thisRepeater = document.querySelector(`.repeater${this.name}`)
            this.dom.repeater = thisRepeater;
            this.dom.delete = thisRepeater.querySelector('.repeater-delete');
            this.dom.sound = thisRepeater.querySelector('.repeater-volume');
            this.dom.animation = thisRepeater.querySelector('animate');
        },

        onDelete(){
            repeaters = repeaters.filter(x => x.name !== this.name);
        },
    });
};



