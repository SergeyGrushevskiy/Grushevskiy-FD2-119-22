"use strict";
function Eat() {
  let self = this;
  let eatImg;
  self.addEat = function () {

    // добавляем еду с координатами
    let eatItem = {};
    eatItem.size = arrEatSize;
    eatItem.posY = playing.top;
    eatItem.posX = randomDiap(playing.top, playing.height - enemyFishSize);
    eatItem.randomImg = randomDiap(1, 2); // Кол-во рандомных картинок рыбок
    eatItem.dell = false;
    eatItem.speed = randomDiap(1,1.2); // Скорость
    eatItem.angle = randomDiap(0,90)
    arrEat.push(eatItem);
  }

  // // Расположение еды
   self.eatMove = function () {

 // двигаем еду
     for (let i = 0; i < arrEat.length; i++) {

  arrEat[i].posX = Math.round(arrEat[i].posX + arrEat[i].speed )
  arrEat[i].posY = Math.round(arrEat[i].posY + arrEat[i].speed *   Math.cos(toRadians(arrEat[i].angle)) )

      // // удаяем ЕДУ  после того как съели
      if (arrEat[i].dell) {
        arrEat.splice(i, 1);
    }
    }
  }

  self.eatPaint = function () {
    for (let i = 0; i < arrEat.length; i++) {
      // задаем изображения еды
      switch (arrEat[i].randomImg) {
       
        case 1:
          eatImg = eat;
          context.drawImage(eatImg, arrEat[i].posX, arrEat[i].posY, arrEat[i].size, arrEat[i].size);
          break;

          case 2:
            eatImg = eat1;
            context.drawImage(eatImg, arrEat[i].posX, arrEat[i].posY, arrEat[i].size, arrEat[i].size);
            break;

      }
    }
  }
}
