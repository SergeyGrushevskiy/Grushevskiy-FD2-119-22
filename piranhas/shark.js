"use strict";
function Shark() {
  let self = this;
  let sharkImg;
  self.addShark = function () {

    // добавляем врага с координатами
    let sharkItem = {};
    sharkItem.size = arrSharkSize;
    sharkItem.posX = playing.left;
    sharkItem.posY = Math.round(randomDiap(playing.left, playing.width + arrSharkSize));
    sharkItem.speed = randomDiap(2, 3);
    sharkItem.dell = false;
    sharkItem.randomImg = randomDiap(1,2); // Кол-во рандомных картинок рыбок
    sharkItem.angle = randomDiap(0, 90); 
    arrShark.push(sharkItem);
  }

  self.sharkMove = function () {

    // двигаем акулу
    for (let i = 0; i < arrShark.length; i++) {

        arrShark[i].posX = Math.round(arrShark[i].posX + arrShark[i].speed * Math.cos(toRadians(arrShark[i].angle)))
        // arrShark[i].posY = Math.round(arrShark[i].posY + arrShark[i].speed * Math.sin(toRadians(arrShark[i].angle)))

      // Пытаемся сделать, чтобы акула двигалась за нашей рыбой 

      // Удаляем при столкновении
      if (arrShark[i].dell) {
        arrShark.splice(i, 1);
      }
    }
  }


  self.sharkPaint = function () {
    for (let i = 0; i < arrShark.length; i++) {
      // задаем изображения 
      switch (arrShark[i].randomImg) {
       
        case 1:
          sharkImg = sharks;
          context.drawImage(sharkImg, arrShark[i].posX, arrShark[i].posY, arrShark[i].size, arrShark[i].size);
          break;

        case 2:
          sharkImg = sharks1;
          context.drawImage(sharkImg, arrShark[i].posX, arrShark[i].posY, arrShark[i].size, arrShark[i].size);
          break;
      }
    }
  }
}
