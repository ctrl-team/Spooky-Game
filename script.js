/*szymson przestan szukać easter eggów*/

window.onload = async function() {
  let punkty = document.getElementById("punkty")
  let screen_orient_alert = document.getElementById("error")
  const canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  let StartButton = document.getElementById("startb")
  let Mute = document.getElementById("mute")
  const ctx = canvas.getContext("2d");
  const sounds = [
    "./img/whereareyou.mp3",
    "./img/hideseek.mp3",
    "./img/iseeyou.mp3"
  ];

  const popsound =
    "./img/pop.wav";

  const candyimg = [
    "./img/cukierek.png",
    "./img/lizak.png",
    "./img/krowka.png",
    "./img/cukierek2.png"
  ];

  const vegeimg = [
    "./img/pomidor.png",
    "./img/marchewka.png",
    "./img/salatka.png",
    "./img/oguras.png"
  ];

  class candy {
    constructor(type) {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * 600) - 600;
      this.img = new Image();
      this.type = type;
      this.height = 60;
      this.width = 60; 
      this.randomspeed = false
      if(this.randomspeed == true){
        this.yspeed = Math.floor(Math.random() * 9) + 5;
      }
      else{
        this.yspeed = 5;
      }
      if (this.type == "good") {
        this.img.src = candyimg[Math.floor(Math.random() * candyimg.length)];
      } else if (this.type == "bad") {
        this.img.src = vegeimg[Math.floor(Math.random() * vegeimg.length)];
        this.height = 80;
        this.width = 80;
      }
    }

    make() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    fall() {
      this.y += this.yspeed;
    }
  }
  let pumpkinman = new Image();
  pumpkinman.src =
    "./img/pumpkinman.png";

  let player = {
    x: canvas.width / 2,
    y: canvas.height - 200,
    width: 200,
    height: 200,
    LEFT: false,
    RIGHT: false,
    points: 0,
    sounds: true
  };
  let count = 0;
  let candies = [];
  function action(e) {
    
    count++;

    window.requestAnimationFrame(action);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(pumpkinman, player.x, player.y, player.width, player.height);

    if (count % 45 == 0) {
      candies.push(new candy("good"));
    }

    if (count % 100 == 0) {
      candies.push(new candy("bad"));
    }

    if (count % 1000 == 0) {
        let sound = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
      if(player.sounds==true){
        sound.play();
      }
    }

    for (let i = 0; i < candies.length; i++) {
      if (
        /*
    _____   _                  __  __ _____  _   _ 
   |_   _| | |                |  \/  |  __ \| \ | |
     | |   | | _____   _____  | \  / | |  | |  \| |
     | |    |/ _ \ \ / / _ \ | |\/| | |  | | . ` |
    _| |_  | | (_) \ V /  __/ | |  | | |__| | |\  |
   |_____| |_|\___/ \_/ \___| |_|  |_|_____/|_| \_|
                                                 
                                                 
      */
        candies[i].x < player.x + player.width &&
        candies[i].x + candies[i].width > player.x &&
        candies[i].y < player.y + player.height &&
        candies[i].y + candies[i].height > player.y
      ) {
          let sound = new Audio(popsound);
          if(player.sounds){
          sound.play();
      
        }
        if (candies[i].type == "good") {
          player.points += 1;
        } else if (candies[i].type == "bad") {
          player.points -= 1;
          if (player.points < 0) player.points = 0;
        }

        punkty.innerHTML = player.points;
        candies.splice(candies.indexOf(candies[i]), 1);
      }

      if (candies[i].y >= canvas.height) {
        if (candies[i].type == "good") {
          player.points -= 1;
        }

        candies.splice(candies.indexOf(candies[i]), 1);

        if (player.points < 0) player.points = 0;
        punkty.innerHTML = player.points;
      } else {
        candies[i].make();
        candies[i].fall();
      }
    }

    function move() {
      if (player.x < 0) {
        player.x = 0;
      }
      if (player.x > canvas.width - 200) {
        player.x = canvas.width - 200;
      }
      if (player.LEFT) {
        player.x -= 20;
      }
      if (player.RIGHT) {
        player.x += 20;
      }
    }

    document.onkeydown = function(e) {
      if (player.x > 0) {
        if (e.key == "a") player.LEFT = true;
      } else {
        if (e.key == "a") player.LEFT = false;
      }

      if (player.x < canvas.width - 200) {
        if (e.key == "d") player.RIGHT = true;
      } else {
        if (e.key == "d") player.RIGHT = false;
      }
    };

    document.onkeyup = function(e) {
      if (e.key == "a") player.LEFT = false;
      if (e.key == "d") player.RIGHT = false;
    };

    move();
  }
  StartButton.addEventListener("click", ()=>{
    action();
    punkty.innerHTML = 0;
    StartButton.style.display = "none"
    document.getElementById("title").style.display = "none"
    document.getElementById("btns").style.display = "none"
  })
  Mute.addEventListener("click", ()=>{
    if(player.sounds == true){  
      player.sounds = false   
      Mute.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
    else
    {
      player.sounds = true   
      Mute.innerHTML = '<i class="fas fa-volume-up"></i>'
    }
  
  })
};
