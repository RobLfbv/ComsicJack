'use strict';
var canvas;
var game;



var PLAYER_HEIGHT = 69;
var PLAYER_WIDTH = 34;
const OBSTACLE_RADIUS = 20;

const JUMP_HEIGHT = 180;
var player_fall = 5;
var degre = 0;

var drapeau = 0;
var drapeaubis = 0;
var verif1 = 0;
var verif2 = 0;

var sprites = new Image();
sprites.onload = animate;
sprites.src = "./src/sprites/CJ_Runing/cj_running.png";
var step = 0;
var etat = 0;

var vivant = 1;



function draw() {
    var context = canvas.getContext('2d');
    context.imgaeSmoothingEnabled = false;
    //Terrain
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height/1.5);
    //Joueur
    drawPerso(0,game.player.y, Math.floor(step));

    //Obstacle
    obstacle();
 }
function drawPerso(x,y,step){
    var context = canvas.getContext('2d');
    context.imgaeSmoothingEnabled = false;
    if(etat == 0){
        context.drawImage(sprites,34*step,0,34,72,x,y,34,72);
    }else if(etat == 1){
        context.drawImage(sprites,27*step,0,27,63,x,y,34,72);
    }
}

function update(){
    if(etat == 0){
        step+= 0.05;
        if(step >= 2){step -= 2}
    }
    
    if(etat == 1){
        step += 0.01;
        if(step >= 2){step -=2}
    }
}

function animate(){
    draw();
    update();
}

function death(){
	if(game.player.y + PLAYER_HEIGHT>=game.obstacle.y && 
        game.player.y <= game.obstacle.y && 
        0<=game.obstacle.x+OBSTACLE_RADIUS && 34>=game.obstacle.x){
		console.log("TES MORT BOUH TES NUL");
        vivant = 0;
	}

}

function obstacle(){
    var context = canvas.getContext('2d');
    context.imgaeSmoothingEnabled = false;
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(game.obstacle.x, game.obstacle.y, game.obstacle.r, 0, Math.PI*2, false);
    context.fill();  
}

function play(){
    if(vivant == 1){
        game.obstacle.x -= game.obstacle.speed.x;
        animate();
        death();

        onkeydown = function(e){

           if(e.keyCode == 40){

              if(drapeaubis == 1){
                 player_fall = 10;
             }
             PLAYER_HEIGHT = 15;

             document.addEventListener('keyup', e => {
                console.log("bonk");
                player_fall = 5;
                PLAYER_HEIGHT = 30;
            });
         }

         if(drapeaubis == 0 && e.keyCode == 32){
          degre += 60;
          verif1 = 1;
          document.addEventListener('keyup', e => {
           verif2 = 1;
           drapeaubis = 1;
       });
      }
  }
  if(verif1 == 1 && verif2 == 1){
   etat = 1;
   drapeau = 1;
   sprites.src = "./src/sprites/CJ_Jumping/cj_jet.png";
   verif1 = 0;
}
    //On impose une limite de saut
    if(degre>JUMP_HEIGHT){
    	degre = JUMP_HEIGHT;
    }

    //On fait sauter le joueur si le joueur à relacher le saut et si Jack est en dessous de la hauteur de saut
    if(drapeau == 1 && game.player.y>= canvas.height / 1.5 - PLAYER_HEIGHT - degre){
    	game.player.y -= 10;//monter
    }

    //Si le personnage est inférieur 
    if(drapeau == 1 && game.player.y < canvas.height / 1.5 - PLAYER_HEIGHT - degre){
    	drapeau = 0;
    }
    //On le fait tomber
    if(drapeau == 0 && game.player.y<canvas.height / 1.5 - PLAYER_HEIGHT){
    	game.player.y += player_fall;//descendre
    }
    if(drapeaubis == 1 && drapeau == 0 && game.player.y>=canvas.height / 1.5 - PLAYER_HEIGHT){
        sprites.src = "./src/sprites/CJ_Runing/cj_running.png";
        etat = 0;
        drapeaubis = 0;
        degre = 0;
        verif2 = 0;
    }
    requestAnimationFrame(play);
}
}

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('canvas');
    game ={
        //variables concernant le joueur
        player:{
            y: canvas.height / 1.5 - PLAYER_HEIGHT
        },
        //variables concernant les obstacles
        obstacle: {
            x: canvas.width-OBSTACLE_RADIUS,
            y: canvas.height/1.5-OBSTACLE_RADIUS,
            r: OBSTACLE_RADIUS,
                speed: {
                    x: 5
                }
        }
        
    },
        play();    

});