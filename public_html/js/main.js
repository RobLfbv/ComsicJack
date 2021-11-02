'use strict';
var canvas;
var game;


//context.fillRect(0, 0, canvas.width, canvas.height);
var PLAYER_HEIGHT = 69;
var PLAYER_WIDTH = 34;
const OBSTACLE_HEIGHT = 89;
const OBSTACLE_WIDTH = 62;

const GROUND_HEIGHT = 265;
const GROUND_WIDTH = 680;

const JUMP_HEIGHT = 180;
var player_fall = 5;
var degre = 0;

var drapeau = 0;
var drapeaubis = 0;
var verif1 = 0;
var verif2 = 0;
var isLittle = 0;

var sprites = new Image();
sprites.onload = animate;
sprites.src = "./images/CJ_Running.png";
var step = 0;
var etat = 0;

var spritesObstaclesSol = new Image();
spritesObstaclesSol.onload = animate;
spritesObstaclesSol.src = "./images/Tentacules2.png";
var stepSol = 0;
var etatSol = 0;

var spritesSol = new Image();
spritesSol.src = "./images/Ground1.png";

var vivant = 1;

var score = 0;

function draw() {
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    //Terrain
    /*context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    */
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height/1.5);
    drawSol(game.ground1.x,game.ground1.y);
    drawSol(game.ground2.x,game.ground2.y);
    //Joueur
    drawPerso(0,game.player.y, Math.floor(step));

    //Obstacle
    drawObstacleSol(game.obstacle.x,game.obstacle.y,Math.floor(stepSol));
	context.font = "30px Arial";
	context.fillText("Hello World", 250, 250);
 }
function drawPerso(x,y,step){
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    if(etat == 0){
        context.drawImage(sprites,34*step,0,34,72,x,y,34,72);
    }else if(etat == 1){
        context.drawImage(sprites,29*step,0,29,63,x,y,29,63);
        
    }else if(etat == 2){
    	context.drawImage(sprites,27*step,0,27,48,x,y,27,48);
    }
}

function drawObstacleSol(x,y,stepSol){
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.drawImage(spritesObstaclesSol,62*stepSol,0,62,89,x,y,62,89);
}

function drawSol(x,y){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spritesSol,x,y);
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
	
	if(etat == 2){
		step +=0.05;
		if(step>=2){step -=2}
	}
	stepSol += 0.05;
	if(stepSol>=2){stepSol -= 2;}
}

function animate(){
    draw();
    update();
}

function death(){
	if(game.player.y + PLAYER_HEIGHT> game.obstacle.y && 
        game.player.y < game.obstacle.y + OBSTACLE_HEIGHT && 
        0< game.obstacle.x+OBSTACLE_WIDTH && 29> game.obstacle.x){
		console.log("TES MORT BOUH TES NUL");
        vivant = 0;
	}

}

function play(){
    if(vivant == 1){
        game.obstacle.x -= game.obstacle.speed.x;
        game.ground1.x -= game.obstacle.speed.x;
        game.ground2.x -= game.obstacle.speed.x;
        if(game.ground1.x<=-865){
        	game.ground1.x = 865;
        }
        if(game.ground2.x<=-865){
        	game.ground2.x = 865;
        }
        animate();
        death();

        onkeydown = function(e){
        if(e.keyCode == 40){
			if(game.player.y>=canvas.height/1.5 - 69){
				PLAYER_HEIGHT = 48;
				game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10;
				sprites.src = "./images/CJ_Little.png";
				etat = 2;
			}
			isLittle = 1;
			player_fall = 15;
        	
           	document.addEventListener('keyup', e => {
           		PLAYER_HEIGHT = 69;
           		if(game.player.y>=canvas.height/1.5 - 69){
           			game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10;	
           		}
           		sprites.src = "./images/CJ_Running.png";
           		etat = 0;
           		player_fall = 5;
           		isLittle = 0;
       		});	
         }

         if(drapeaubis == 0 && (e.keyCode == 32 || e.keyCode == 38)){
          degre += 90;
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
   sprites.src = "./images/CJ_Jet.png";
   verif1 = 0;
}
    //On impose une limite de saut
    if(degre>JUMP_HEIGHT){
    	degre = JUMP_HEIGHT;
    }

    //On fait sauter le joueur si le joueur à relacher le saut et si Jack est en dessous de la hauteur de saut
    if(drapeau == 1 && game.player.y>= canvas.height / 1.5 - PLAYER_HEIGHT + 10 - degre){
    	game.player.y -= 10;//monter
    }

    //Si le personnage est inférieur 
    if(drapeau == 1 && game.player.y < canvas.height / 1.5 - PLAYER_HEIGHT + 10 - degre){
    	drapeau = 0;
    }
    //On le fait tomber
    if(drapeau == 0 && game.player.y<canvas.height / 1.5 - PLAYER_HEIGHT + 10){
    	game.player.y += player_fall;//descendre
    }
    if(drapeaubis == 1 && drapeau == 0 && game.player.y>=canvas.height / 1.5 - PLAYER_HEIGHT + 10){
    	if(isLittle == 1){
			PLAYER_HEIGHT = 48;
    		game.player.y = canvas.height / 1.5 - PLAYER_HEIGHT + 10;
			sprites.src = "./images/CJ_Little.png";
			step = 0;
			etat = 2;

    	}else{
    		sprites.src = "./images/CJ_Running.png";
			etat = 0;
    	}
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
            y: canvas.height / 1.5 - PLAYER_HEIGHT + 10
        },
        //variables concernant les obstacles
        obstacle: {
            x: canvas.width-OBSTACLE_WIDTH,
            y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
                speed: {
                    x: 5
                }
        },
        ground1:{
        	x:0,
        	y:canvas.height / 1.5
        },
        ground2:{
        	x:865,
        	y:canvas.height / 1.5
        }

    },
        play();    

});