

"use strict";

function ClockController() {

  let self = this;
  self.accel = 4;
  self.keyUP = 38;
  self.keyDoun = 40;
  self.keyLeft = 37;
  self.keyRight = 39;
  self.keyFire = 32;
  self.speedStop = 0;
  self.keyBang = 17;

  self.start = function () {

    // двигаем рыбку мышкой 
    gameWrapper.addEventListener("mousemove", self.flyFish, false);

    // подписываемся на тач события
    gameWrapper.addEventListener("touchstart", self.fireFishtouch, false);

    gameWrapper.addEventListener("touchend", function (EO) {
  
    }, false);

    gameWrapper.addEventListener("touchmove", self.flyFishtouch, false);


    // управление кнопками
    document.addEventListener("keydown", self.keyFish, false);

    // управление кнопками
    document.addEventListener("keyup", self.stop, false);

  }

  self.remList = function () {

    // отписываемся от событий

    gameWrapper.removeEventListener("mousemove", self.flyFish, false);
    gameWrapper.removeEventListener("touchstart", self.fireFishtouch, false);

    gameWrapper.removeEventListener("touchend", function (EO) {
     
    }, false);
    // $('.gameDiv').unbind("swipeDown");


    gameWrapper.removeEventListener("touchmove", self.flyFishtouch, false);

    document.removeEventListener("keydown", self.keyFish, false);

    document.removeEventListener("keyup", self.stop, false);
  }

  self.flyFish = function (EO) {


    fish.posX = EO.pageX - fishSize / 2;
    fish.posY = EO.pageY - fishSize / 2;

  }

  self.flyFishtouch = function (EO) {

   

    // получам массив касаний
    var touchInfo = EO.targetTouches[0];

    fish.posX = touchInfo.pageX - fishSize / 2;

    fish.posY = touchInfo.pageY - fishSize;

  }

  self.keyFish = function (EO) {

    self.accel = 5;

    switch (EO.keyCode) {

      case self.keyUP:
        fish.speedY = -self.accel;

        // выход за пределы сверху
        if (fish.posY <= playing.top) {
          fish.posY = playing.top;
          fish.speedY = 0;
        }

        break;

      case self.keyDoun:

        fish.speedY = self.accel;

        break;

      case self.keyLeft:

        fish.speedX = -self.accel;

        break;

      case self.keyRight:

        fish.speedX = self.accel;

        break;

      case self.keyFire:

    }
  }

  self.stop = function (EO) {

    if (EO.keyCode === self.keyRight || EO.keyCode === self.keyLeft) {

      fish.speedX = self.speedStop;
    }

    if (EO.keyCode === self.keyDoun || EO.keyCode === self.keyUP) {

      fish.speedY = self.speedStop;
    }
  }

  self.switchURLHash = function (EO) {

    let toClose;

    // узнаемм заначение закладки
    let URLHash = window.location.hash;

    // удаляем первый символ
    let stateStr = URLHash.substr(1);

    switch (stateStr) {

      case "menu":

        // если переход в меню из запущеной игры
        if (isPlaying) {

          toClose = confirm("В случае перезагрузки страницы Вы вернетесь в главное меню");

          if (toClose) {
            // отписываемся от событий
            self.remList();
            startMenu();
            isPlaying = false;
          }

          else location.hash = "game";
        }

        // если game over
        else startMenu();

        break;

      // если закладка игры
      case "game":
        startGame();
        break;
    }
  }

  self.befUnload = function (EO) {

    if (isPlaying) {

      EO.returnValue = "В случае перезагрузки страницы Вы вернетесь в главное меню";
    }
  }
}