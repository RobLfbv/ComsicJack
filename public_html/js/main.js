'use strict';
var canvas;
var game;


//context.fillRect(0, 0, canvas.width, canvas.height);
var PLAYER_HEIGHT = 69;
var PLAYER_WIDTH = 34;

const OBSTACLE_HEIGHT = 90;
const OBSTACLE_WIDTH = 62;

const OBSTACLE_HEIGHTVOL = 16;
const OBSTACLE_WIDTHVOL = 28;

const GROUND_HEIGHT = 265;
const GROUND_WIDTH = 680;

const JUMP_HEIGHT = 275;
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
spritesObstaclesSol.src = "./images/Tentacules3.png";
var stepSol = 0;

var spritesObstaclesVol = new Image();
spritesObstaclesVol.onload = animate;
spritesObstaclesVol.src = "./images/Asteroid2.png";
var stepVol = 0;


var spritesSol = new Image();
spritesSol.src = "./images/Ground1.png";

var spriteCiel = new Image();
spriteCiel.onload = animate;
spriteCiel.src = "./images/Sky220.png";
var stepCiel = 0;

var vivant = 1;

var score = 0;

var spriteStart = new Image();
spriteStart.src = "./images/Start.png";

var start = 0;

var myMusic; 

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}



function draw(tabSol, tabVol) {
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
    //Terrain
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawSky(0,0,Math.floor(stepCiel));
    
    drawSol(game.ground1.x,game.ground1.y);
    drawSol(game.ground2.x,game.ground2.y);
    //Joueur
    drawPerso(0,game.player.y, Math.floor(step));
    drawBar(degre);
    //Obstacle
    for(var i = 0; i<tabSol.length; i++){
    	drawObstacleSol(tabSol[i].x,tabSol[i].y,Math.floor(stepSol));
		drawObstacleVol(tabVol[i].x,tabVol[i].y,Math.floor(stepVol));

    }

    context.font = "30px Arial";
    context.fillStyle = 'white';
    context.fillText(score, 600, 30);
    if(start == 0){
    	drawStart();
    }
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
	context.drawImage(spritesObstaclesSol,76*stepSol,0,76,94,x,y,76,94);
}

function drawObstacleVol(x,y,stepVol){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spritesObstaclesVol,31*stepVol,0,31,16,x,y,31,16);
}

function drawSol(x,y){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spritesSol,x,y);
}

function drawSky(x,y,stepCiel){
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(spriteCiel,680*stepCiel,0,680,250,x,y,680,250);
}
function drawBar(degre){
	var context = canvas.getContext('2d');
	context.fillStyle = 'white';
    context.fillRect(0, 450, 100, 15);
    context.fillStyle = 'green';
    var percent = ((degre-135)/(JUMP_HEIGHT-135))*90;
    context.fillRect(5,453,percent,9)
}
function drawStart(){
	var context = canvas.getContext('2d');
	context.drawImage(spriteStart,0,0,286,77);
}

function update(){
	if(etat == 0){
		step+= 0.07;
		if(step >= 2){step -= 2;}
	}

if(etat == 1){
	step += 0.01;
	if(step >= 2){step -=2;}
}

if(etat == 2){
	step +=0.05;
	if(step>=2){step -=2;}
}
stepSol += 0.05;
if(stepSol>=4){stepSol -= 4;}
stepCiel +=0.04;
if(stepCiel>=2){stepCiel -= 2;}
stepVol +=0.05;
if(stepVol>=2){stepVol -= 2;}
}

function animate(tabSol, tabVol){
	draw(tabSol, tabVol);
	update();
}

function death(tabSol, tabVol){
	for(var i = 0; i<tabSol.length; i++){
		if(game.player.y + PLAYER_HEIGHT> tabSol[i].y && 
			game.player.y < tabSol[i].y + OBSTACLE_HEIGHT && 
			0< tabSol[i].x+OBSTACLE_WIDTH && 29> tabSol[i].x){
			console.log("TES MORT BOUH TES NUL");
			vivant = 0;
		}
	}
	for(var i = 0; i<tabVol.length; i++){
		if(game.player.y + PLAYER_HEIGHT> tabVol[i].y && 
			game.player.y < tabVol[i].y + OBSTACLE_HEIGHTVOL && 
			0< tabVol[i].x+OBSTACLE_WIDTHVOL && 29> tabVol[i].x){
			console.log("TES MORT BOUH TES NUL²");
			vivant = 0;
		}
	}
}

function little(e){
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
}

function detectJump(e){
	if(drapeaubis == 0 && (e.keyCode == 32 || e.keyCode == 38)){
		degre += 50;
		verif1 = 1;
		document.addEventListener('keyup', e => {
			verif2 = 1;
			drapeaubis = 1;
		});
	}
}

function jump(){
	
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
    if(degre<=125){
    	degre = 135;
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
}

function movement(){
	onkeydown = function(e){
		little(e);
		detectJump(e);
	}
	jump();

}

function obstaclesRetour(tabSol,tabVol){
	var stk1;
	for(var i = 0; i<tabSol.length; i++){
		if(tabSol[i].x<=-500){
			stk1 = (Math.random()*(1500-1200))+1200;
			tabSol[i].x = stk1;
		}
	}
	var stk2;
	for(var a = 0; a<tabVol.length; a++){
		if(tabVol[a].x<=-500){
			stk1 = (Math.random()*(1500-1200))+1200;
			tabVol[a].x = stk1;
			stk2 = (Math.random()*230);
			if(stk2>=25 && stk2<=75){
				stk2 = canvas.height/1.5-OBSTACLE_HEIGHT - 100;
			}
			tabVol[a].y = stk2;
		}
	}
}

function play(){
	if(start == 1){
		var tabSol = [game.obstacle1, game.obstacle2, game.obstacle3, game.obstacle4];
		var tabVol = [game.obstacleVol1, game.obstacleVol2, game.obstacleVol3, game.obstacleVol4];
		if(vivant == 1){
			for(var i = 0; i<tabSol.length; i= i+1){
				tabSol[i].x -= tabSol[i].speed.x;	
			}
			for(var a = 0; a<tabVol.length; a= a+1){
				tabVol[a].x -= tabVol[a].speed.x;	
			}
			game.ground1.x -= game.obstacle1.speed.x;
			game.ground2.x -= game.obstacle1.speed.x;
			if(game.ground1.x<=-856){
				game.ground1.x = 856;
			}
			if(game.ground2.x<=-856){
				game.ground2.x = 856;
			}
			movement();
			animate(tabSol, tabVol);
			death(tabSol, tabVol);
			obstaclesRetour(tabSol, tabVol);
			score++;
			requestAnimationFrame(play);
		}
	}else{
		menu();
		requestAnimationFrame(play);
	}

}

function menu(){
	var rect = canvas.getBoundingClientRect(); 
	document.addEventListener('click', event => {
		var posX = (event.clientX - rect.left);
		var posY = (event.clientY - rect.top);
		if( 0 <= posY && 
			77 >= posY &&
			 0<= posX &&
			  286 >= posX){
			start = 1;
			myMusic.play()
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {

		myMusic = new sound("./sounds/CJ_Song.mp3");
		canvas = document.getElementById('canvas');
		game ={
        //variables concernant le joueur
        player:{
        	y: canvas.height / 1.5 - PLAYER_HEIGHT + 10
        },
        //variables concernant les obstacles
        obstacle1: {
        	x: canvas.width-OBSTACLE_WIDTH,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacle2: {
        	x: canvas.width-OBSTACLE_WIDTH+500,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacle3: {
        	x: canvas.width-OBSTACLE_WIDTH+1000,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacle4: {
        	x: canvas.width-OBSTACLE_WIDTH+1500,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT + 10,
        	speed: {
        		x: 4
        	}
        },
        obstacleVol1: {
        	x: canvas.width-OBSTACLE_WIDTH+300,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 6
        	}
        },
        obstacleVol2: {
        	x: canvas.width-OBSTACLE_WIDTH+800,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 6
        	}
        },
        obstacleVol3: {
        	x: canvas.width-OBSTACLE_WIDTH+1300,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 6
        	}
        },
        obstacleVol4: {
        	x: canvas.width-OBSTACLE_WIDTH+1700,
        	y: canvas.height/1.5-OBSTACLE_HEIGHT - 100,
        	speed: {
        		x: 6
        	}
        },
        ground1:{
        	x:0,
        	y:canvas.height / 1.5
        },
        ground2:{
        	x:856,
        	y:canvas.height / 1.5
        }

    },
    play();    
});