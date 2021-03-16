setTimeOnTick = (domH,domM,domS,timerH,timerM,timerS) => {
    domH.innerText = displayNeatTime(timerH);
    domM.innerText = displayNeatTime(timerM);
    domS.innerText = displayNeatTime(timerS);
};

displayNeatTime = (t) => {
    if(t.toString().length == 1){
        return `0${t}`
    } else {
        return t;
    }
}