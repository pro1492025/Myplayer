
let playpause = document.querySelector('.playpause')
let Psrc = document.querySelector('.playpause img')
let Mysong = document.querySelector('.mysong')

let songimg = document.querySelector('.song-img img')
let songname = document.querySelector('.song-name')
let songart = document.querySelector('.song-art')

        const progress = document.querySelector("#progress");
        const currTime = document.querySelector(".current-time");
        const totalDuration = document.querySelector(".duration-time");
        const progressLine = document.querySelector(".progress-line");
let songstaue = "pause"
let index = 0


playpause.addEventListener('click', Songplay)

function Songplay(){

    if(songstaue == "pause"){
        Mysong.play()
        songstaue = "play"
        Psrc.src='icon/pause.svg'
}else{
        Mysong.pause()
        songstaue = "pause"
        Psrc.src='icon/play.svg'
}
}


function updateProgress(e){
          if ( songstaue == "play") {
            const { duration, currentTime } = e.target;
            // Update progress bar width
            const progressPercent = (currentTime / duration) * 100;
            progress.value = progressPercent;
            progressLine.style.width = `${progressPercent}%`;
            if(progressPercent==100){
              return nextsong()
            }
            // Calculate display for duration
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
              durationSeconds = `0${durationSeconds}`;
            }
            // Delay switching duration Fullsent to avoid NaN
            if (durationSeconds) {
              totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
            }
            // Calculate display for currentTime
            let currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
              currentSeconds = `0${currentSeconds}`;
            }
            currTime.textContent = `${currentMinutes}:${currentSeconds}`;
          }
        }
        
        function progressSlide(e){
          const { value } = e.target;
          const progressTime = Math.ceil((Mysong.duration / 100) * value);
          Mysong.currentTime = progressTime;
          console.log(progressTime);
            if(songstaue = "play") {
              progressLine.style.width = `${value}%`;    
           }
        }
        
       
        let Fullsreen = 'off'
        var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }

}


function FullSong(){

  if(Fullsreen == 'off'){
      openFullscreen() 
      Fullsreen = 'on'
}else{
      closeFullscreen()
      Fullsreen = 'off'
}
}

let selnew=document.querySelector('.song-loop')
fetch("player.json")
.then(res => res.json())
.then(data =>{
let Data=data.music

for(let i=0;i<Data.length;i++){


let newdiv=document.createElement('div')
newdiv.innerHTML=
`<div class="play-song" onclick="Songplayer('${Data[i].Isong}','${Data[i].Tsong}','${Data[i].Asong}','${Data[i].Src}',${i})">
<div class="song-poster"><img src="${Data[i].Isong}" alt="${Data[i].Isong}"></div>
<div class="song-text">${Data[i].Tsong}</div>
</div>`
selnew.appendChild(newdiv)
}

})
let Hidenum=document.querySelector('.hidden-num')

function Songplayer(A,B,C,D,num){
    document.querySelector('.main-player').style.display = 'flex'
    songimg.src=`${A}` 
    songname.innerText=`${B}`
    songart.innerText=`${C}`
    Mysong.src=`${D}`
   
    document.querySelector('.hidden-num').value = num
    Mysong.play()
    songstaue = "play"
    Psrc.src='icon/pause.svg'
}


fetch("player.json")
.then(res => res.json())
.then(data =>{

   Mydata=data.music

})


 function nextsong() {
  
    songimg.src=`${Mydata[ parseInt(Hidenum.value)+1 ].Isong}` 
    songname.innerText=`${Mydata[ parseInt(Hidenum.value)+1 ].Tsong}`
    songart.innerText=`${Mydata[ parseInt(Hidenum.value)+1 ].Asong}`
    Mysong.src=`${Mydata[ parseInt(Hidenum.value)+1 ].Src}`
 
    document.querySelector('.hidden-num').value = parseInt(Hidenum.value)+1
    
    Mysong.play()
        songstaue = "play"
        Psrc.src='icon/pause.svg'
  
  }



function prevsong() {
  
    songimg.src=`${Mydata[ parseInt(Hidenum.value)-1 ].Isong}` 
    songname.innerText=`${Mydata[ parseInt(Hidenum.value)-1 ].Tsong}`
    songart.innerText=`${Mydata[ parseInt(Hidenum.value)-1 ].Asong}`
    Mysong.src=`${Mydata[ parseInt(Hidenum.value)-1 ].Src}`
 
    document.querySelector('.hidden-num').value = parseInt(Hidenum.value)-1
     
    Mysong.play()
        songstaue = "play"
        Psrc.src='icon/pause.svg'
}
let Mutes ='off'
 function muteSwitch() {
  if(Mutes == 'off'){
    Mysong.muted = true
    Mutes ='on'
  }else{
    Mysong.muted = false
    Mutes ='off'
  }
 }

//log in
 let Usercoll = document.querySelector('.User-icon')
let logshow='off'
let logtext=document.querySelector('.User-text div')
let FuckN=localStorage.getItem('Fuckname')


   
if(FuckN == null || FuckN == '' || FuckN == undefined){
  logtext.innerHTML='<button onclick="logIn()">LOG IN</button>'
  }else{

  document.querySelector('.User-text span').innerText=`${FuckN}`
  Usercoll.innerText=`${FuckN[0].toUpperCase()}`  
  logtext.innerHTML='<button onclick="logOut()">LOG OUT</button>'

}
function logIn() {
  window.location.href="login.html"
}
function logOut() {
  localStorage.removeItem('Fuckname')
  localStorage.clear()
  location.reload() 

}

function logonoff(){

  if( logshow == 'off'){
      document.querySelector('.User-text').style.display = 'flex'
      logshow ='on'
  }else{
      document.querySelector('.User-text').style.display = 'none'
      logshow ='off'
  }
  
  }



//log in  
document.addEventListener('keydown',()=>{
      if(event.key == "p" || Event.key == "p"){
  Songplay()
}else if(event.key == "o" || Event.key == "o"){
nextsong()
}else if(event.key == "i" || Event.key == "i"){
prevsong()
}else if(event.key == "f" || Event.key == "f"){
  FullSong()
}else if(event.key == "m" || Event.key == "m"){
  muteSwitch()
}
})
        Mysong.addEventListener("timeupdate", updateProgress);
        progress.addEventListener("input", progressSlide);
