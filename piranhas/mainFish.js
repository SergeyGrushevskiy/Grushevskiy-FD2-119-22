"use strict";
function Fish() {
  let self = this;
  self.posX = playing.width / 2 - fishSize / 2;
  self.posY = playing.height - fishSize;
  self.speedX = 0;
  self.speedY = 0;
  self.life = 3 ;

  self.moveFish = function () {

    self.posX += self.speedX;
    self.posY += self.speedY;

    // выход за пределы слева
    if (fish.posX <= playing.left) fish.posX = playing.left;

    // выход за пределы справа
    if (fish.posX + fishSize > playing.width) fish.posX = playing.width - fishSize;

    // выход за пределы снизу
    if (fish.posY + fishSize > playing.height) fish.posY = playing.height - fishSize;

    // выход за пределы сверху
    if (fish.posY < playing.top) fish.posY = playing.top;
    

    // удар рыбок
    for (let i = 0; i < enemyFish.length; i++) {

      if (Math.abs(enemyFish[i].posY - self.posY) <= enemyFish[i].size && Math.abs(enemyFish[i].posX - self.posX) <= enemyFish[i].size) {
        clickSound(crashSound);
       
        // добавляем кровь в массив
        blood.push({ x: enemyFish[i].posX, y: enemyFish[i].posY, animX: bloodSpeed, animY: bloodSpeed });

        // // помечаем, что попали
        enemyFish[i].dell = true;
        // self.life--; // Убираем жизнь
        // healthVeiv(); // Убираем сердечко

         newscore++; // Добавляем очки
         nicknameInfo.innerText = nicktext + " : " + scoreText(newscore); // Прибавляем к счёту
       }
      }

        // удар еды ( червяк)
     for (let i = 0; i < arrEat.length; i++) {

      if (Math.abs(arrEat[i].posY - self.posY) <= arrEat[i].size && Math.abs(arrEat[i].posX - self.posX) <= arrEat[i].size) {
        clickSound(crashSound);

        // добавляем кровь в массив
        blood.push({ x: arrEat[i].posX, y: arrEat[i].posY, animX: bloodSpeed, animY: bloodSpeed });

        // помечаем, что попали
        arrEat[i].dell = true;
        // self.life--; // Убираем жизнь
        // healthVeiv();

         newscore++; // Добавляем очки
         fish.posX++;
         fish.posY++;
         nicknameInfo.innerText = nicktext + " : " + scoreText(newscore); // Прибавляем к счёту
    
       }
      }
  
          // удар акулы
          for (let i = 0; i < arrShark.length; i++) {

            if (Math.abs(arrShark[i].posY - self.posY) <= arrShark[i].size && Math.abs(arrShark[i].posX - self.posX) <= arrShark[i].size) {

              // добавляем кровь в массив
              blood.push({ x: arrShark[i].posX, y: arrShark[i].posY, animX: bloodSpeed, animY: bloodSpeed });

              // // помечаем, что попали
              arrShark[i].dell = true;
              clickSound(endAudio);

              self.life--; // Убираем жизнь
             healthVeiv();
            }
          // если жизни закончились - игра закончена
          if (self.life <= 0 && blood.length === 0) {
            clickSound(endAudio);
            gameOver();
     }
    }
    }
          // //Рост рыбки
          // function fat(????){
          //     ????.style.width = `${????.bodyWidth+3.5}px`;
          //     ????.style.height = ????.style.width;
          //     ????.style.borderRadius = ????.style.height
          // }

          self.fishPaint = function () {
            // рисуем рыбку
            context.drawImage(fishimg, fish.posX, fish.posY, fishSize, fishSize);
          }

        }
