"use strict";
function Enemy() {
  let self = this;
  let enemyImg;
  self.addEnemy = function () {

    // добавляем врага с координатами
    let enemyItem = {};
    enemyItem.size = enemyFishSize;
    enemyItem.posX = playing.top;
    enemyItem.posY = Math.round(randomDiap(playing.top, playing.width + enemyFishSize));
    enemyItem.speed = randomDiap(1, 3);
    enemyItem.dell = false;
    enemyItem.randomImg = randomDiap(1, 4); // Кол-во рандомных картинок рыбок
    enemyItem.angle = randomDiap(0, 90);
    enemyFish.push(enemyItem);
  }

  self.enemyMove = function () {

    // двигаем рыбок врага
    for (let i = 0; i < enemyFish.length; i++) {
      enemyFish[i].posX = Math.round(enemyFish[i].posX + enemyFish[i].speed * Math.cos(toRadians(enemyFish[i].angle)))
      // enemyFish[i].posY = Math.round(enemyFish[i].posY + enemyFish[i].speed * Math.sin(toRadians(enemyFish[i].angle)));

      if (enemyFish[i].dell) {
        enemyFish.splice(i, 1);
      }
    }
  }

  self.enemyPaint = function () {

    for (let i = 0; i < enemyFish.length; i++) {

      // задаем изображения противника
      switch (enemyFish[i].randomImg) {
        case 1:
          enemyImg = fish2;
          context.drawImage(enemyImg, enemyFish[i].posX, enemyFish[i].posY, enemyFish[i].size, enemyFish[i].size);
          break;

        case 2:
          enemyImg = fish3;
          context.drawImage(enemyImg, enemyFish[i].posX, enemyFish[i].posY, enemyFish[i].size, enemyFish[i].size);
          break;

        case 3:
          enemyImg = fish4;
          context.drawImage(enemyImg, enemyFish[i].posX, enemyFish[i].posY, enemyFish[i].size, enemyFish[i].size);
          break;

        case 5:
            enemyImg = fish5;
            context.drawImage(enemyImg, enemyFish[i].posX, enemyFish[i].posY, enemyFish[i].size, enemyFish[i].size);
            break;
      }
    }
  }
}
