
const today = new Date();

let lajt = today.getTime() + (25 * 1000)

const workTime = 25*60;
let tickAmount = 100;
let progress = 0;

setInterval(() => {
  console.log(progress)

  if(progress >= 100){
    console.log('pomodoro done')
    return;
  }
  
  progress += tickAmount/workTime;
  progress = parseFloat(progress.toFixed(2))
  //parseFloat((prev.progress + workTime/100).toFixed(2))
}, 1000)


console.log(lajt - today)