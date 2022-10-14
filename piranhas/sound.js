// добавляем музыку
let crashSound = new Audio("audio/eat.mp3");
crashSound.volume = 0.3;

let backAudio = new Audio("audio/Betkhoven.mp3");
backAudio.volume = 0.2;

let endAudio = new Audio("audio/theEnd.mp3");
endAudio.volume = 0.5;


  // функция запускает музыку
  function clickSound(clickAudio) {
    clickAudio.currentTime = 0; // в секундах
    clickAudio.play();
}


  // функция запуска музыки (запускается с кнопки)
  function soundClick() {

    shotSound.play(); // запускаем звук
    shotSound.pause(); //останавливаем

    crashSound.play();
    crashSound.pause();

    backAudio.play();
    backAudio.pause();

    endAudio.play();
    endAudio.pause();
}
function soundStop(){
  audio.volume = 0;
}