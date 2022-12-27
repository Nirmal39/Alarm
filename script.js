const clock = document.querySelector(".clock"),
hourHand = document.querySelector(".hour-hand"),
minuteHand = document.querySelector(".minute-hand"),
secondHand = document.querySelector(".second-hand"),
am = document.querySelector(".am"),
pm = document.querySelector(".pm")
// function to initialize all lines and numbers for the clock.
function initClock(){
    const numbers = clock.querySelector(".numbers")
    const lines = clock.querySelector(".lines")
    for(let i = 1;i<=12;i++){
        numbers.innerHTML += `<div class="number" style="--i: ${i}"><span>${i}</span></div>`;
        lines.innerHTML += `<div class="line" style="--i:${i}"></div>`;
    }
    setInterval(setTime,1000);
}

initClock();

let alarmRinging = false;
// Function to set the time using clock hands in clock and also for ringing alarm.
function setTime(){
    const  now = new Date();
    const today = now.getDay();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 180;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + 180;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = (hours / 12) * 360 + 180;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    if(hours>=12){
        am.classList.remove("active");
        pm.classList.add("active");
    }else{
        am.classList.add("active");
        pm.classList.remove("active")
    }
    let minutesString = minutes.toString();

    if (minutesString.length < 2) {
      minutesString = "0" + minutesString;
    }


    let hoursString = hours.toString();

    if (hoursString.length < 2) {
      hoursString = "0" + hoursString;
    }


    alarms.forEach((alarm) => {
      let dayMatch = false;
      alarm.days.forEach((day) => {
        if (day === correct_today(today)) {
          dayMatch = true;
        }
      });


      if (
        alarm.time === `${hoursString}:${minutesString}` &&
        alarm.active &&
        dayMatch &&
        alarmRinging === false
      )
        //if all conditon match
        ringAlarm();
    });

    const tick = new Audio("tick.mp3");
    tick.play();
}
// the ring alarm function tha will play the Audio.
function ringAlarm() {
    alarmRinging = true;
    const audio = new Audio("alarm.mp3");
    audio.play();
    audio.addEventListener("ended", () => {
      alarmRinging = false;
    });
  }
// the number of alarms we have will be stored in alarms.
const alarms = [
    {
        id: 1,
        time: "22:59",
        name: "Wake up",
        days: [0, 1, 2, 3, 4, 5, 6],
        active: true,
      },
      {
        id: 2,
        time: "05:00",
        name: "Wake up",
        days: [1, 2, 3, 4, 5],
        active: true,
      },
      {
        id: 3,
        time: "06:00",
        name: "Wake up",
        days: [1, 2, 3, 4, 5],
        active: true,
      }
  ];

const alarmList = document.querySelector(".alarms")
// Function to create alarm that we saw in the list.
function initAlarms(){
    
  alarmList.innerHTML = ""
    if(alarms.length){
        
        alarms.forEach((alarm)=>{
            const alarmElement = document.createElement("div");
            alarmElement.classList.add("alarm");
            alarmElement.dataset.id = alarm.id;
            let alarmDays = "";
            alarm.days.forEach((day) =>{
                daysletter = dayName(day)
                alarmDays += `<div class="day">${daysletter}</div>`;
            })
            active = alarm.active ? "checked":"";
            alarmElement.innerHTML = `                
            <div class="head">
            <div class="name">${alarm.name}</div>
            </div>
            <div class="body">
                <div class="left">
                    <div class="time">${alarm.time}</div>
                </div>
                <div class="days">
                    ${alarmDays}
                </div>
                <label class="toggle">
                    <input type="checkbox" class="checkbox" hidden ${active}>
                    <div class="track"></div>
                    <div class="thumb"></div>
                </label>
            </div>
            <div class="delete">
                <img src="delete.png" alt =""/>
            </div>`;


        alarmList.appendChild(alarmElement);
        });
    }
    else{
        alarmList.innerHTML = `<div class="no-alarms">No Alarms,click on below + Button to Add Alarm</div>`
    }
}

initAlarms()
// Function to get the Day name to diplay it in alarm.
function dayName(day){
    return ["M","T","W","T","F","S","S"][day];
}
// this is to delete and also toggle the alarm from the list .
alarmList.addEventListener("click", (e)=>{
    if(e.target.classList.contains("checkbox")){
        const alarmId = e.target.parentElement.parentElement.parentElement.dataset.id;
        
        const alarm = alarms.find((alarm) => alarm.id == alarmId)
        alarm.active = !alarm.active;
    }
    if(e.target.classList.contains("delete")){
        const alarmId = e.target.parentElement.dataset.id;

        const alarm = alarms.find((alarm) => alarm.id == alarmId)
        alarms.splice(alarms.indexOf(alarm),1)
        alarmList.innerHTML ="";
        initAlarms();
    }
})

const add_alarm = document.getElementById("add-alarm-btn")
const close =  document.querySelector(".close")
const Hour = document.querySelector(".hour")
const Minute = document.querySelector(".minute")
const cancel =  document.querySelector(".cancel")
const save =  document.querySelector(".save")

add_alarm.addEventListener("click", AddAlarm)

// function to open after clicking add button.
function AddAlarm(){
    var element = document.getElementById("add-alarm-modal");
    element.classList.add("active")
}


// function to close after clicking close button
close.addEventListener("click", function(){
  var element = document.getElementById("add-alarm-modal");
  element.classList.remove("active");
})

const H_up = Hour.querySelector(".up")


const M_up = Minute.querySelector(".up")

H_up.addEventListener("click",(e)=>{
  add_1_H(e);
});


M_up.addEventListener("click",(e)=>{
  add_1_M(e);
});

// function to add 1 to hour on clicking + button.
function add_1_H(e){
  var numH = Hour.querySelector(".number");
  numH.innerHTML = parseInt(numH.innerHTML) + 1;
  if (numH.innerHTML.length < 2) {
    numH.innerHTML = "0" + numH.innerHTML;
  }
  if(parseInt(numH.innerHTML) > 23){
    numH.innerHTML = "00";
  }

}
// function to add 1 to minute on clicking + button.
function add_1_M(e){
  var numM = Minute.querySelector(".number");
  numM.innerHTML = parseInt(numM.innerHTML) + 1;
  if (numM.innerHTML.length < 2) {
    numM.innerHTML = "0" + numM.innerHTML;
  }
  if(parseInt(numM.innerHTML) > 59){
    numM.innerHTML = "00";
  }

}

const H_down = Hour.querySelector(".down")

const M_down = Minute.querySelector(".down")

H_down.addEventListener("click",(e)=>{
  minus_1_H(e);
});

M_down.addEventListener("click",(e)=>{
  minus_1_M(e);
});


// function to minus 1 to hour on clicking - button.
function minus_1_H(e){
  var num = Hour.querySelector(".number");
  num.innerHTML = parseInt(num.innerHTML) - 1;
  if (num.innerHTML.length < 2) {
    num.innerHTML = "0" + num.innerHTML;
  }
  if(parseInt(num.innerHTML) < 0){
    num.innerHTML = "23";
  }
}
// function to minus 1 to minute on clicking - button.
function minus_1_M(e){
  var num = Minute.querySelector(".number");
  num.innerHTML = parseInt(num.innerHTML) - 1;
  if (num.innerHTML.length < 2) {
    num.innerHTML = "0" + num.innerHTML;
  }
  if(parseInt(num.innerHTML) < 0){
    num.innerHTML = "59";
  }
}


// function to close the modal on clicking cancel button.
cancel.addEventListener("click", function(){
  var element = document.getElementById("add-alarm-modal");
  element.classList.remove("active")
})


const days =  document.querySelectorAll(".day");
// for making the days class selected in modal.
days.forEach((day) => {
  day.addEventListener("click",(e)=>{
    if(e.target.classList.contains("active")){
      e.target.classList.remove("active")
    }
    else{
      e.target.classList.add("active")
    }
  })
})


// function to close the modal on clicking and save the detais present in modal.
save.addEventListener("click", function(){
  var text = document.getElementById("name").value;

  if(alarms.length == 0){
    var Id = 1
  }
  else{
    var Id = alarms.slice(-1)[0].id;
    Id = parseInt(Id) + 1;
  }     
  var alarm_days = []

  for(let i = 0;i< days.length;i++){
    if(days[i].classList.contains("active")){
      alarm_days.push(i%17)
    }
  }
  var H_num = Hour.querySelector(".number").innerHTML;
  var M_num = Minute.querySelector(".number").innerHTML;

  var Child_Alarm = {
    id :Id,
    time: `${H_num}:${M_num}`,
    name: text,
    days: alarm_days,
    active: true,
  }

  console.log(alarm_days)
  alarms.push(Child_Alarm)
  initAlarms()

  var element = document.getElementById("add-alarm-modal");
  element.classList.remove("active")
})

// Function to correct the day number according to this program
// because the number convention starts with sunday but mine starts with monday
function correct_today(day){
  return [7,0,1,2,3,4,5][day];
}