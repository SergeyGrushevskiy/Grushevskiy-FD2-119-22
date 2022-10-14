"use strict";
// добавляем картинки
let fishimg = new Image(); // Основная рыбка!
fishimg.src = "image/fish/fish3.png";

let fish2 = new Image();
fish2.src = "image/fish/fish2.png"; // рыбка

let fish3 = new Image();
fish3.src = "image/fish/рыбка3.png"; // рыбка

let fish4 = new Image();
fish4.src = "image/fish/рыбка4.png"; // рыбка

let fish5 = new Image();
fish5.src = "image/fish/fish5.png"; // рыбка

let sharks = new Image(); // Акула
sharks.src = "image/fish/shark.png"

let sharks1 = new Image(); // Акула
sharks1.src = "image/fish/shark1.png"

let expl = new Image();
expl.src = "image/blood.png"; // Кровь 

let eat = new Image(); // Червяк
eat.src = "image/worms.png"

let eat1 = new Image(); // Червяк 2 
eat1.src = "image/worms1.png"


// Счётчик 
let newscore = 0;
let nicktext = "";

// задаем таймеры
let timerGame = 0;

// считает сколько раз запущен таймер до 1000
let timer = 0;

// задаем массив рыбок
let enemyFish = [];

// Задаем массив акулы
let arrShark = [];

// задаем массив еды
let arrEat= [];

// задаем массив поедания пищи
let blood = [];

let arrScore = [];

// определяем размеры окна
let bodyHeight = document.body.offsetHeight;
let bodyWidth = document.body.offsetWidth;

// игровые размеры 
let playing = {
      height: bodyHeight,
      width: bodyWidth,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
};


// задаем размеры 

let fishSize = Math.round(((bodyHeight + bodyWidth) / 2) / 20); // Рыбка
let enemyFishSize = Math.round(((bodyHeight + bodyWidth) / 2) / 20); // Враги
let arrSharkSize = Math.round(((bodyHeight + bodyWidth) / 2) / 11); // Акула
let arrEatSize = Math.round(((bodyHeight + bodyWidth) / 2) / 50); // Еда
let bloodSize = Math.round(((bodyHeight + bodyWidth) / 2) / 11); // Кровь
let healthSize = Math.round(((bodyHeight + bodyWidth) / 2) / 15); // Жизни



// Таблица рекордов
let scoreTableHeight;
let scoreTableWidth;

// Таблица "О игре"
let aboutGameHeight;
let aboytGameWidth;

// скорость спрайта
let bloodSpeed = 0;

// ускорение спрайта
let bloodAccel = 0.2;

// этот класс отвечает за еду     
let newEat = new Eat();

// этот класс отвечает за врагов
let newEnemy = new Enemy();

// этот класс отвечает за акулу
let newShark = new Shark();

// этот класс отвечает за управление
let controll = new ClockController();

// этот класс отвечает за рыбку
let fish = new Fish();

let isPlaying = false;

let tableNone = false;

let randPass = 0;

let scoreData ;

// при загрузке страницы 
window.onload = startDocument;

function startDocument() {
            //  задаем хэш
            location.hash = "menu";
          }


  // при нажатии кнопки, отображается окошко 'О игре'                             
  function aboutTheGame() { 
        aboutGame.style.display = "block";
        if (!tableNone) {
            // read();
              aboutGame.style.top = "50%";
              aboutGame.style.left = "70%";
              aboutGame.style.transform = "translateZ(0) translateX(-50%) translateY(-50%)";
              tableNone = true;

               }else {
                    aboutGame.style.top = "0";
                    aboutGame.style.left = "50%";
                    aboutGame.style.transform = "translateZ(0) translateX(-50%)  translateY(-100%) ";
                    tableNone = false;
                  }
}


// при нажатии кнопки, двигаем таблицу рекордов
function setting() {

  scoreTable.style.display = "block";
   if (!tableNone) {
      // read();
         scoreTable.style.top = "50%";
         scoreTable.style.left = "30%";
         scoreTable.style.transform = "translateZ(0) translateX(-50%) translateY(-50%)";
         tableNone = true;
         
       } else {
                scoreTable.style.top = "0";
                scoreTable.style.left = "50%";
                scoreTable.style.transform = "translateZ(0) translateX(-50%)  translateY(-100%) ";
                tableNone = false;
             }
}

// подписываемся на изменения закладок
window.onhashchange = controll.switchURLHash;

// при перезагрузе или уходе со страницы, если игра запущена выдавать предупреждение
window.onbeforeunload = controll.befUnload;

// подписываемся на изменение экрана
window.addEventListener("resize", controll.resize, false);

// находим тэг конвас  и задаём фон
let newConwas = document.querySelector(".gameCanvas");
newConwas.setAttribute("height", playing.height);
newConwas.setAttribute("width", playing.width);
let context = newConwas.getContext('2d');


            var img = new Image();
            img.src = "image/fon/поле3.png";
            img.onload = function() {
                var pattern = context.createPattern(img, "repeat");
                context.fillStyle = pattern;
                
            };
        
// находим нужные дивы
let nicknameInfo = document.querySelector(".nickInfo");
let nickneme = document.querySelector(".nickname");
let wrapper = document.querySelector(".menuDiv");
let gameWrapper = document.querySelector(".gameDiv");
let gameOverWrapper = document.querySelector(".gameOverDiv");
let aboutGame = document.querySelector(".aboutDiv");
let scoreTable = document.querySelector(".tableDiv");

function startHash() {
         location.hash = "game";
};

function startMenuHash() {
        location.hash = "menu";
};

// по нажатию на кнопку, запускаем игру
function startGame() {
        randPass = randomDiap(1, 5000);
        isPlaying = true;

        location.hash = "game";

        // скрываем главное меню
        wrapper.style.display = "none";
        
        // открываем игровые элементы
        gameWrapper.style.display = "block";

        // запоминаем имя 
        nicktext = nickneme.value;

        // если поле не запелнено, присваиваем user
        if (nicktext == "") nicktext = "Игрок";

        nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);

        // показываем количекство жизней 
        healthVeiv();
        
        clickSound(backAudio); // Запускаем аудио
        
        controll.start();
        gameRun();
}

  // запуск главного меню
  function startMenu() {

        location.hash = "menu";

        if (isPlaying) {
          backAudio.pause();
        }

        // если есть таймер удаляем его
        if (timerGame) {

          cancelAnimationFrame(timerGame);
          timerGame = 0;
        }

        // открываем главное меню
        wrapper.style.display = "block";

        // скрываем игровые элементы
        gameWrapper.style.display = "none";
        gameOverWrapper.style.display = "none";


        // устанавливаем начальные значения

        enemyFish.length = 0;
        fish.life = 4;
        newscore = 0;
        nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);
}

function gameOver() {

        let overScore = document.querySelector(".overInfo");

        // скрываем игровые элементы
        gameWrapper.style.display = "none";
        gameOverWrapper.style.display = "block";


        // отписываемся от событий
        controll.remList();

        if (timerGame) {

          cancelAnimationFrame(timerGame);
          timerGame = 0;
        }

        newConwas.style.cursor = "default";

        backAudio.pause();

        isPlaying = false;

        overScore.innerText = nicktext + " : " + scoreText(newscore);

}

function gameRun() {

        // если есть таймер удаляем его, если нету устанавливаем
        if (timerGame) {

          cancelAnimationFrame(timerGame);
          timerGame = 0;
        }

        timerGame = requestAnimationFrame(gameRun);

        updateGame();
        renderGame();
    };

function updateGame() {

              timer++;

              if (timer > 1000) timer = 0;
              
              // создаем рыбок
              if (timer % 30 === 0) {
                newEnemy.addEnemy();
              }
              newEnemy.enemyMove(); // Движение рыбок

              newShark.sharkMove(); /// создаем акулу
              if (timer % 90 === 0) {
                newShark.addShark();
              }

              newShark.sharkMove(); // Движение акулы

              // создаем еду
              if (timer % 99 === 0) {
                newEat.addEat();
              }
              newEat.eatMove(); // Движение еды

              // анимация крови
              for (let i = 0; i < blood.length; i++) {

                //скорость анимации
                blood[i].animX = blood[i].animX + bloodAccel;

                // смена  спрайта
                if (blood[i].animX > 6) { blood[i].animY++; blood[i].animX = 0 };

                // если строка закончилась удаляем 
                if (blood[i].animY > 0) blood.splice(i, 1);
              }

              // двигаем рыбку со скоротью 0, при нажатии на клавишу скорость увеличиваем
              fish.moveFish();
  
}  

  function renderGame() {

              context.fillRect(playing.top, playing.left, playing.width, playing.height);

              // рисуем рыбок
              newEnemy.enemyPaint();

              // рисуем акулy
              newShark.sharkPaint();

             // рисуем еду для рыб                      
              newEat.eatPaint();              

              // рисуем кровь
              for (let i = 0; i < blood.length; i++) {

              // рисуем анимацию шаг 85
              context.drawImage(expl, 85 * Math.floor(blood[i].animX), 85 * Math.floor(blood[i].animY), 85, 85, blood[i].x, blood[i].y, bloodSize, bloodSize);
              };
              fish.fishPaint();
}


  // случайное число
  function randomDiap(n, m) {
            return Math.floor(Math.random() * (m - n + 1)) + n;
  }

  // перевод градусов в радианы
  function toRadians(angle) {
            return angle * (Math.PI / 180);
  }




// функция приводит счет к строке
function scoreText(number) {

          let s = String(number);;
          let str = "";
          let n = str.length - s.length;
          str = str.slice(0, n);
          str = str + number;
          return str;
}

//показывает количество жизней
function healthVeiv() {

          let healthContainer = document.querySelector(".healthPoint");

          healthContainer.style.display = "flex";
          healthContainer.style.position = "absolute";

          // если у родительского эллемента есть дочерние , удаляем 
          if (healthContainer.children.length > 0) {
            while (healthContainer.children.length !== 0) {
              healthContainer.removeChild(healthContainer.lastChild);
              
            }
          }
          for (let i = 0; i < fish.life - 1; i++) {
            let healthImg = document.createElement("IMG");
            healthImg.src = "image/heart.png";
            healthImg.style.height = healthSize + "px";
            healthImg.style.width = healthSize + "px";
            healthImg.style.marginTop = healthSize / 5 + "px";
            healthImg.style.display = "block";
            healthContainer.appendChild(healthImg);
          }
}
